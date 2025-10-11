use anyhow::{Context, Result};
use bytes::Bytes;
use http::StatusCode;
use mime_guess::from_path;
use notify::{Event, EventKind, RecursiveMode, Watcher};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use tokio::fs;
use tokio::sync::broadcast;
use tracing::{error, info, warn};
use wtransport::endpoint::{Endpoint, IncomingSession};
use wtransport::tls::Identity;
use wtransport::ServerConfig;

const STATIC_ROOT: &str = "/app/dist";
const CERT_PATH: &str = "/certs/app.localhost.pem";
const KEY_PATH: &str = "/certs/app.localhost-key.pem";
const BIND_ADDR: &str = "0.0.0.0:4433";
const PUBLIC_URL: &str = "https://app.localhost:4433";

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    info!("Starting WebTransport server on {}", BIND_ADDR);

    let (reload_tx, _) = broadcast::channel::<()>(100);
    let reload_tx = Arc::new(reload_tx);

    let reload_tx_clone = Arc::clone(&reload_tx);
    tokio::spawn(async move {
        if let Err(e) = watch_files(reload_tx_clone).await {
            error!("File watcher error: {}", e);
        }
    });

    let identity = Identity::load_pemfiles(CERT_PATH, KEY_PATH)
        .await
        .context("Failed to load TLS certificates")?;

    let config = ServerConfig::builder()
        .with_bind_address(BIND_ADDR.parse()?)
        .with_identity(&identity)
        .build();

    let server = Endpoint::server(config)?;

    info!("WebTransport server listening on {}", BIND_ADDR);
    info!("Hot reload endpoint: {}/_hot_reload", PUBLIC_URL);
    info!("Watching {} for changes", STATIC_ROOT);

    loop {
        let incoming = server.accept().await;
        let reload_tx = Arc::clone(&reload_tx);
        tokio::spawn(async move {
            if let Err(e) = handle_connection(incoming, reload_tx).await {
                error!("Connection error: {}", e);
            }
        });
    }
}

async fn handle_connection(
    incoming: IncomingSession,
    reload_tx: Arc<broadcast::Sender<()>>,
) -> Result<()> {
    let session_request = incoming.await?;
    info!(
        "New session from: {:?}",
        session_request.authority()
    );

    // Get path before accepting (accept consumes session_request)
    let path = session_request.path().to_string();
    let connection = session_request.accept().await?;

    if path == "/_hot_reload" {
        info!("Hot reload WebTransport connection established");
        handle_hot_reload(connection, reload_tx).await?;
    } else {
        info!("HTTP/3 request for: {}", path);
        handle_http_request(connection, &path).await?;
    }

    Ok(())
}

async fn handle_hot_reload(
    connection: wtransport::Connection,
    reload_tx: Arc<broadcast::Sender<()>>,
) -> Result<()> {
    let mut reload_rx = reload_tx.subscribe();

    loop {
        tokio::select! {
            _ = reload_rx.recv() => {
                info!("Sending reload signal to client");
                match connection.open_uni().await {
                    Ok(opening_stream) => {
                        match opening_stream.await {
                            Ok(mut stream) => {
                                if let Err(e) = stream.write_all(b"reload").await {
                                    warn!("Failed to send reload signal: {}", e);
                                    break;
                                }
                            }
                            Err(e) => {
                                warn!("Failed to open stream: {}", e);
                                break;
                            }
                        }
                    }
                    Err(e) => {
                        warn!("Failed to open uni stream: {}", e);
                        break;
                    }
                }
            }
            else => break,
        }
    }

    Ok(())
}

async fn handle_http_request(
    connection: wtransport::Connection,
    request_path: &str,
) -> Result<()> {
    let file_path = resolve_file_path(request_path)?;

    match fs::read(&file_path).await {
        Ok(contents) => {
            let mime_type = from_path(&file_path)
                .first_or_octet_stream()
                .to_string();

            info!(
                "Serving file: {} ({})",
                file_path.display(),
                mime_type
            );

            send_response(
                connection,
                StatusCode::OK,
                &mime_type,
                Bytes::from(contents),
            )
            .await?;
        }
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => {
            warn!("File not found: {}", file_path.display());
            send_404(connection).await?;
        }
        Err(e) => {
            error!("Error reading file {}: {}", file_path.display(), e);
            send_500(connection).await?;
        }
    }

    Ok(())
}

fn resolve_file_path(request_path: &str) -> Result<PathBuf> {
    let mut path = request_path.trim_start_matches('/').to_string();

    if path.is_empty() || path.ends_with('/') {
        path.push_str("index.html");
    }

    let static_root = Path::new(STATIC_ROOT);
    let file_path = static_root.join(&path);

    let canonical = file_path
        .canonicalize()
        .unwrap_or_else(|_| file_path.clone());

    if !canonical.starts_with(static_root) {
        anyhow::bail!("Path traversal attempt: {}", request_path);
    }

    Ok(canonical)
}

async fn send_response(
    connection: wtransport::Connection,
    status: StatusCode,
    content_type: &str,
    body: Bytes,
) -> Result<()> {
    let opening_stream = connection.open_uni().await?;
    let mut stream = opening_stream.await?;

    let headers = format!(
        "HTTP/3 {} {}\r\ncontent-type: {}\r\ncontent-length: {}\r\n\r\n",
        status.as_u16(),
        status.canonical_reason().unwrap_or("Unknown"),
        content_type,
        body.len()
    );

    stream.write_all(headers.as_bytes()).await?;
    stream.write_all(&body).await?;

    Ok(())
}

async fn send_404(connection: wtransport::Connection) -> Result<()> {
    let body = Bytes::from_static(b"<html><body><h1>404 Not Found</h1></body></html>");
    send_response(connection, StatusCode::NOT_FOUND, "text/html", body).await
}

async fn send_500(connection: wtransport::Connection) -> Result<()> {
    let body =
        Bytes::from_static(b"<html><body><h1>500 Internal Server Error</h1></body></html>");
    send_response(
        connection,
        StatusCode::INTERNAL_SERVER_ERROR,
        "text/html",
        body,
    )
    .await
}

async fn watch_files(reload_tx: Arc<broadcast::Sender<()>>) -> Result<()> {
    let (tx, mut rx) = tokio::sync::mpsc::channel(100);

    let mut watcher = notify::recommended_watcher(move |res: Result<Event, notify::Error>| {
        if let Ok(event) = res {
            if matches!(
                event.kind,
                EventKind::Create(_) | EventKind::Modify(_) | EventKind::Remove(_)
            ) {
                let _ = tx.blocking_send(event);
            }
        }
    })?;

    watcher.watch(Path::new(STATIC_ROOT), RecursiveMode::Recursive)?;

    info!("Watching {} for changes", STATIC_ROOT);

    while let Some(event) = rx.recv().await {
        info!("File change detected: {:?}", event);
        let _ = reload_tx.send(());
    }

    Ok(())
}

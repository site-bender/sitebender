use anyhow::{Context, Result};
use bytes::Bytes;
use h3::server::RequestStream;
use h3_quinn::quinn;
use http::{Method, StatusCode};
use mime_guess::from_path;
use notify::{Event, EventKind, RecursiveMode, Watcher};
use std::net::SocketAddr;
use std::path::{Path, PathBuf};
use std::sync::Arc;
use tokio::fs;
use tokio::sync::broadcast;
use tracing::{error, info, warn};

const STATIC_ROOT: &str = "/app/dist";
const CERT_PATH: &str = "/certs/app.localhost.pem";
const KEY_PATH: &str = "/certs/app.localhost-key.pem";
const BIND_ADDR: &str = "0.0.0.0:4433";
const PUBLIC_URL: &str = "https://app.localhost:4433";

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    info!("Starting Quinn HTTP/3 server on {}", BIND_ADDR);

    let (reload_tx, _) = broadcast::channel::<()>(100);
    let reload_tx = Arc::new(reload_tx);

    let reload_tx_clone = Arc::clone(&reload_tx);
    tokio::spawn(async move {
        if let Err(e) = watch_files(reload_tx_clone).await {
            error!("File watcher error: {}", e);
        }
    });

    let cert = fs::read(CERT_PATH)
        .await
        .context("Failed to read certificate")?;
    let key = fs::read(KEY_PATH)
        .await
        .context("Failed to read private key")?;

    let cert_chain = rustls_pemfile::certs(&mut &cert[..])
        .collect::<Result<Vec<_>, _>>()
        .context("Failed to parse certificate")?;

    let key_der = rustls_pemfile::private_key(&mut &key[..])
        .context("Failed to parse private key")?
        .context("No private key found")?;

    let mut tls_config = rustls::ServerConfig::builder()
        .with_no_client_auth()
        .with_single_cert(cert_chain, key_der)
        .context("Failed to create TLS config")?;

    tls_config.max_early_data_size = u32::MAX;
    tls_config.alpn_protocols = vec![b"h3".to_vec()];

    let server_config = quinn::ServerConfig::with_crypto(Arc::new(
        quinn::crypto::rustls::QuicServerConfig::try_from(tls_config)
            .context("Failed to create QUIC config")?,
    ));

    let addr: SocketAddr = BIND_ADDR.parse()?;
    let endpoint = quinn::Endpoint::server(server_config, addr)?;

    info!("HTTP/3 server listening on {}", BIND_ADDR);
    info!("SSE endpoint: {}/events", PUBLIC_URL);
    info!("Watching {} for changes", STATIC_ROOT);

    while let Some(conn) = endpoint.accept().await {
        let reload_tx = Arc::clone(&reload_tx);
        tokio::spawn(async move {
            if let Err(e) = handle_connection(conn, reload_tx).await {
                error!("Connection error: {}", e);
            }
        });
    }

    Ok(())
}

async fn handle_connection(
    conn: quinn::Incoming,
    reload_tx: Arc<broadcast::Sender<()>>,
) -> Result<()> {
    let connection = conn.await?;
    info!("New connection from: {}", connection.remote_address());

    let mut h3_conn = h3::server::Connection::new(h3_quinn::Connection::new(connection))
        .await
        .context("Failed to create H3 connection")?;

    loop {
        match h3_conn.accept().await {
            Ok(Some((req, stream))) => {
                let reload_tx = Arc::clone(&reload_tx);
                tokio::spawn(async move {
                    if let Err(e) = handle_request(req, stream, reload_tx).await {
                        error!("Request error: {}", e);
                    }
                });
            }
            Ok(None) => {
                break;
            }
            Err(e) => {
                error!("Accept error: {}", e);
                break;
            }
        }
    }

    Ok(())
}

async fn handle_request(
    req: http::Request<()>,
    mut stream: RequestStream<h3_quinn::BidiStream<Bytes>, Bytes>,
    reload_tx: Arc<broadcast::Sender<()>>,
) -> Result<()> {
    let path = req.uri().path();
    info!("HTTP/3 request: {} {}", req.method(), path);

    if path == "/events" && req.method() == Method::GET {
        handle_sse(stream, reload_tx).await?;
    } else {
        handle_static_file(stream, path).await?;
    }

    Ok(())
}

async fn handle_sse(
    mut stream: RequestStream<h3_quinn::BidiStream<Bytes>, Bytes>,
    reload_tx: Arc<broadcast::Sender<()>>,
) -> Result<()> {
    info!("SSE connection established");

    let response = http::Response::builder()
        .status(StatusCode::OK)
        .header("content-type", "text/event-stream")
        .header("cache-control", "no-cache")
        .header("connection", "keep-alive")
        .body(())
        .context("Failed to build SSE response")?;

    stream
        .send_response(response)
        .await
        .context("Failed to send SSE response headers")?;

    let mut reload_rx = reload_tx.subscribe();

    loop {
        tokio::select! {
            result = reload_rx.recv() => {
                match result {
                    Ok(_) => {
                        info!("Sending reload event to client");
                        let event = "event: reload\ndata: {}\n\n";
                        if let Err(e) = stream.send_data(Bytes::from(event)).await {
                            warn!("Failed to send reload event: {}", e);
                            break;
                        }
                    }
                    Err(e) => {
                        warn!("Broadcast error: {}", e);
                        break;
                    }
                }
            }
            else => break,
        }
    }

    stream.finish().await.ok();
    info!("SSE connection closed");

    Ok(())
}

async fn handle_static_file(
    mut stream: RequestStream<h3_quinn::BidiStream<Bytes>, Bytes>,
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

            let response = http::Response::builder()
                .status(StatusCode::OK)
                .header("content-type", mime_type)
                .header("content-length", contents.len())
                .body(())
                .context("Failed to build response")?;

            stream
                .send_response(response)
                .await
                .context("Failed to send response headers")?;

            stream
                .send_data(Bytes::from(contents))
                .await
                .context("Failed to send response body")?;

            stream.finish().await.ok();
        }
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => {
            warn!("File not found: {}", file_path.display());
            send_error(stream, StatusCode::NOT_FOUND, "Not Found").await?;
        }
        Err(e) => {
            error!("Error reading file {}: {}", file_path.display(), e);
            send_error(stream, StatusCode::INTERNAL_SERVER_ERROR, "Internal Server Error")
                .await?;
        }
    }

    Ok(())
}

async fn send_error(
    mut stream: RequestStream<h3_quinn::BidiStream<Bytes>, Bytes>,
    status: StatusCode,
    message: &str,
) -> Result<()> {
    let body = format!("<html><body><h1>{} {}</h1></body></html>", status.as_u16(), message);

    let response = http::Response::builder()
        .status(status)
        .header("content-type", "text/html")
        .header("content-length", body.len())
        .body(())
        .context("Failed to build error response")?;

    stream
        .send_response(response)
        .await
        .context("Failed to send error response headers")?;

    stream
        .send_data(Bytes::from(body))
        .await
        .context("Failed to send error response body")?;

    stream.finish().await.ok();

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

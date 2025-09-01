# Visualization, Logging, and Debugging (Declarative Authoring)

This note outlines a small, composable approach for charts/visuals, logging/telemetry, and debug tooling using component names (no Act/Do namespaces). Authoring stays declarative in JSX; runtime remains pluggable and SSR‑safe.

## Goals
- Purely declarative authoring components that compile to Adaptive IR.
- SSR‑first with minimal client hydration; no hard coupling to a specific chart or logging SDK.
- Data is produced by existing injectors/operators/comparators; visuals just consume the right(value).

## Authoring components

- Visualization (Viz namespace)
  - Viz.Line, Viz.Bar, Viz.Area, Viz.Pie
  - Props: data, x, y, color, series, options (kept minimal; renderer‑agnostic)

- Debug (dev‑only by default)
  - Debug.Log, Debug.Trace, Debug.State, Debug.Value

- Telemetry/analytics (production)
  - Log (structured log), Trace (span/attrs), Breadcrumb, Track (analytics), PageView

- Guards and conditions
  - When.Authenticated, When.Authorized, When.Clicked, When.Submitted, If/Conditional

## Examples (authoring)

### Simple line chart from an operand pipeline

```tsx
<Viz.Line
  data={Aggregate({ by: "date", op: "sum", of: From.Element({ selector: "#sales" }) })}
  x="date"
  y="value"
/>
```

### Grouped bar chart with a guard

```tsx
<When.Authenticated fallback={<p>Please sign in</p>}>
  <Viz.Bar
    data={GroupBy({ key: "category" })(From.Element({ selector: "#items" }))}
    x="category"
    y="count"
  />
</When.Authenticated>
```

### Click handler that logs and updates state

```tsx
<When.Clicked target="add-to-cart">
  <Log level="info" message="Added to cart" data={{ sku: From.Element({ selector: "#sku" }) }} />
  {/* Optionally, a state update component could live here, e.g., <Set key="cart" value={...} /> */}
</When.Clicked>
```

### Dev‑only debugging

```tsx
<Debug.State keys={["user", "cart"]} />
<Debug.Value of={From.Element({ selector: "#subtotal" })} />
<Debug.Log level="debug" message="Render Home" />
```

## Compile/runtime mapping (high‑level)

- Viz.*
  - Compiles to a “viz node” referencing: type (Line/Bar/etc.), data operand, and minimal props.
  - SSR emits a container (canvas/svg/div). Client hydrates via a renderer adapter (e.g., Chart.js, Vega‑Lite, ECharts).

- Log / Trace / Breadcrumb / Track / PageView
  - Compile to effect nodes with structured payloads.
  - Runtime routes through adapters: console/JSON (default), OpenTelemetry, analytics provider.
  - Redaction rules can be applied at compile or runtime (PII paths).

- Debug.*
  - Compiles behind a dev flag. In production builds these can be stripped or no‑op.

- Guards (When.*)
  - Already established pattern. For visualization/logging, they just wrap components; the compiler emits Conditional/authorized IR.

## Data shaping for charts
- Treat chart data as a result of regular pipelines:
  - From.Element / From.Constant / From.Http (future)
  - GroupBy, Aggregate, Map/Filter/Reduce operators
- Viz components receive the final operand; no chart performs aggregation itself.

## Adapters
- Charts: a chart renderer adapter is chosen at hydrate time; server‑side render‑to‑image optional for emails/PDF.
- Logs: console/JSON default; pluggable sinks (file, HTTP, third‑party).
- Tracing: OpenTelemetry on server; minimal browser tracer optional.
- Analytics: Segment/PostHog/GA via an adapter; server‑first where possible.

## Safety & performance
- No secrets in client code; credentials handled server‑side.
- Dev‑only Debug components are inert in production.
- Batch/throttle client logs; flush on navigation.
- Prefer stable keys/ids for viz containers to avoid full re‑mounts.

---

This document is design/authoring guidance. Implementation should follow the small, incremental “slice” approach: one component + adapter at a time, keeping the repo green.

# OUR LOCAL SETUP

The system is fully operational with HTTPS via a local reverse proxy. Current state:

  - ✅ Prometheus scrapes metrics and compacts every 1m (dev speed) for fast Thanos shipping.
  - ✅ Thanos Sidecar is healthy and watching Prometheus TSDB.
  - ✅ Thanos Store Gateway is healthy and serves blocks from MinIO.
  - ✅ Thanos Querier provides a single API/UI that Grafana uses.
  - ✅ Grafana is provisioned to the Querier and loads dashboards from /dashboards.
  - ✅ MinIO is running; bucket "thanos" exists for Thanos blocks.
  - ✅ Caddy terminates TLS for *.localhost and enforces basic auth for core UIs.

IMPORTANT: MinIO is for local development only. Production will use Storacha (https://storacha.network/) or another distributed store.

## Config files

### Prometheus

```yaml
# ops/prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  # CORRECT PLACEMENT FOR external_labels: inside the 'global' section
  external_labels:
    cluster: local-docker
    replica: A

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
  - job_name: "node-exporter"
    static_configs:
      - targets: ["node-exporter:9100"]
  # Scrape Apache Jena Fuseki metrics
  - job_name: "fuseki"
    metrics_path: /metrics # Fuseki often exposes metrics on this standard path
    static_configs:
      - targets: ["fuseki:3030"] # Uses Docker's internal DNS to find the container
    scrape_interval: 15s
```

### Thanos

```yaml
# ops/thanos/thanos-config.yaml
type: S3
config:
  bucket: "thanos" # The bucket name we created (or will be created automatically)
  endpoint: "minio:9000"
  access_key: "minioadmin"
  secret_key: "minioadmin"
  insecure: true # Uses HTTP instead of HTTPS, which is fine for local development
  signature_version2: false

Notes:
- Both Sidecar and Store Gateway read this file from `/config/thanos/thanos-config.yaml`.
- Querier does not need object storage config.
```

### Docker (excerpt – current)

```yaml
# docker-compose.yml (key parts)
networks:
  monitoring:
    driver: bridge

volumes:
  prometheus_data: {}
  grafana_data: {}
  minio_data: {}
  thanos_sidecar_data: {}
  thanos_store_data: {}
  fuseki_data: {}
  fuseki_config: {}

services:
  # Apache Jena Fuseki - RDF Database and SPARQL Endpoint
  fuseki:
    image: stain/jena-fuseki:latest
    container_name: fuseki
    restart: unless-stopped
    environment:
    - FUSEKI_DATASET_1=my_dataset
    - ADMIN_PASSWORD=admin123
    volumes:
    - fuseki_data:/fuseki-base/databases
    - fuseki_config:/fuseki-base/configuration
    ports:
    - "43030:3030"
    networks:
    - monitoring
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3030/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Prometheus
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    command:
    - --config.file=/config/prometheus/prometheus.yml
    - --storage.tsdb.path=/prometheus
    - --web.enable-lifecycle
    - --storage.tsdb.min-block-duration=1m
    - --storage.tsdb.max-block-duration=1m
    volumes:
    - ./ops/prometheus:/config/prometheus:ro
    ports:
    - "44090:9090"
    networks:
      - monitoring

  # Exposes hardware & OS metrics from the host
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    ports:
    - "49100:9100"
    networks:
      - monitoring
    privileged: true
    pid: "host"
    command:
    - --path.rootfs=/host
    volumes:
      - /:/host:ro

  # THANOS SIDECAR - Attaches to Prometheus and uploads data to MinIO
  thanos-sidecar:
    image: quay.io/thanos/thanos:v0.39.2
    container_name: thanos-sidecar
    user: "65534"
    restart: unless-stopped
    command:
      - sidecar
      - --prometheus.url=http://prometheus:9090
      - --tsdb.path=/prometheus
    - --objstore.config-file=/config/thanos/thanos-config.yaml
    volumes:
    - prometheus_data:/prometheus
    - ./ops/thanos:/config/thanos:ro
    depends_on:
      - prometheus
      - minio
    networks:
      - monitoring

  # THANOS QUERIER - The single endpoint for Grafana to query all data (Prometheus + MinIO)
  thanos-querier:
    image: quay.io/thanos/thanos:v0.39.2
    container_name: thanos-querier
    restart: unless-stopped
    command:
      - query
      - --http-address=0.0.0.0:10902
      - --grpc-address=0.0.0.0:10901
      - --endpoint=thanos-sidecar:10901
      - --endpoint=thanos-storegateway:10901
    ports:
  - "45002:10902"
    depends_on:
      - thanos-sidecar
    networks:
      - monitoring

  # THANOS STOREGATEWAY - Serves metrics from the blocks in MinIO (long-term storage)
  thanos-storegateway:
    image: quay.io/thanos/thanos:v0.39.2
    container_name: thanos-storegateway
    restart: unless-stopped
    user: "0"
    command:
      - store
      - --http-address=0.0.0.0:10902
      - --grpc-address=0.0.0.0:10901
      - --data-dir=/var/thanos
      - --objstore.config-file=/config/thanos/thanos-config.yaml
    volumes:
      - ./ops/thanos:/config/thanos:ro
      - thanos_store_data:/var/thanos
    depends_on:
      - minio
    networks:
      - monitoring

  # The visualization dashboard
  grafana:
    image: grafana/grafana-enterprise:latest
    container_name: grafana
    restart: unless-stopped
    depends_on:
      - prometheus
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_SERVER_PROTOCOL=http1
      - GF_INSTALL_PLUGINS=grafana-polystat-panel
      - GF_PATHS_PROVISIONING=/provisioning
    volumes:
      - grafana_data:/var/lib/grafana
      - ./ops/grafana/provisioning:/provisioning:ro
      - ./ops/grafana/dashboards:/dashboards:ro
    ports:
      - "43001:3000"
    networks:
      - monitoring

  # Local S3-compatible storage for the next phase (Thanos)
  minio:
    image: minio/minio:latest
    container_name: minio
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    volumes:
      - minio_data:/data
    ports:
      - "49000:9000"
      - "49001:9001"
    networks:
      - monitoring

  # Caddy reverse proxy with TLS (mkcert)
  caddy:
    image: caddy:2-alpine
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - ./ops/certs:/certs:ro
    depends_on:
      - grafana
      - prometheus
      - thanos-querier
      - fuseki
      - minio
    networks:
      - monitoring

```

Ports and aliases (dev):
- Prometheus: http://localhost:44090 → https://prometheus.localhost
- Thanos Querier: http://localhost:45002 → https://thanos.localhost
- Grafana: http://localhost:43001 → https://grafana.localhost
- Fuseki: http://localhost:43030 → https://fuseki.localhost
- MinIO console: http://localhost:49001 → https://minio.localhost
- Node Exporter: http://localhost:49100 (no proxy)

Config convention:
- All configs mount under `/config/*` from `./ops/*` on the host to avoid image-specific `/etc` paths.

Prometheus dev compaction:
- For fast local testing, block durations are set to 1m via compose. Revert to 2h for normal operation.

### Grafana provisioning (enabled)

Datasource (Thanos default): `ops/grafana/provisioning/datasources/datasource.yml`

```yaml
apiVersion: 1
datasources:
  - name: Thanos
    type: prometheus
    url: http://thanos-querier:10902
    access: proxy
    isDefault: true
```

Dashboards provider: `ops/grafana/provisioning/dashboards/dashboards.yml`

```yaml
apiVersion: 1
providers:
  - name: local-json
    type: file
    options:
      path: /dashboards
      foldersFromFilesStructure: true
```

Place dashboards JSON in `ops/grafana/dashboards/`.

### HTTPS, proxy, and auth

- TLS certs are generated with mkcert and stored in `./ops/certs`.
- Caddy terminates TLS and proxies pretty local domains.
- Basic auth protects UIs with `admin:admin` (changeable).

`Caddyfile` (excerpt):

```caddyfile
grafana.localhost {
  tls /certs/grafana.localhost.pem /certs/grafana.localhost-key.pem
  basicauth {
    admin <bcrypt-hash>
  }
  reverse_proxy grafana:3000
}

prometheus.localhost {
  tls /certs/prometheus.localhost.pem /certs/prometheus.localhost-key.pem
  basicauth {
    admin <bcrypt-hash>
  }
  reverse_proxy prometheus:9090
}

thanos.localhost {
  tls /certs/thanos.localhost.pem /certs/thanos.localhost-key.pem
  basicauth {
    admin <bcrypt-hash>
  }
  reverse_proxy thanos-querier:10902
}

fuseki.localhost {
  tls /certs/fuseki.localhost.pem /certs/fuseki.localhost-key.pem
  reverse_proxy fuseki:3030
}

minio.localhost  {
  tls /certs/minio.localhost.pem /certs/minio.localhost-key.pem
  reverse_proxy minio:9001
}
```

Login at the proxy prompt:
- Username: `admin`
- Password: `admin`

Rotate the password by generating a new bcrypt hash and updating the Caddyfile basicauth entries.

### Thanos notes

- MinIO bucket `thanos` is required for Store Gateway; it’s created in dev.
- Querier peers: sidecar (live Prometheus) + storegateway (object storage blocks).
- Store Gateway data dir: `/var/thanos` (backed by named volume `thanos_store_data`).

---

## TODO / recommendations

- Security
  - Change all default passwords; store secrets via Docker secrets or env files excluded from VCS.
  - Optionally add basicauth to Fuseki as well.
  - Consider SSO/OIDC in front of Grafana/Prometheus via Caddy plugins or an identity proxy.

- Observability hardening
  - Add Thanos Compactor for downsampling/retention management.
  - Restore Prometheus block durations to 2h for normal use (lower churn, better performance).
  - Consider remote-write or Thanos Receive if multi-tenant ingestion is needed.
  - Add healthchecks for Thanos components in compose.

- UX/dev ergonomics
  - Add starter dashboards JSON into `ops/grafana/dashboards`.
  - Provision Grafana folders and alerts; wire alerting contact points.
  - Add scripts for mkcert generation and service restarts.

- Reliability & data
  - Configure MinIO lifecycle/retention for the `thanos` bucket (dev) and plan Storacha mapping for prod.
  - Backups/snapshots strategy for Grafana data volume.

- Infra polish
  - Use non-root users where possible; we currently run storegateway as root to simplify local volume perms.
  - Split compose into profiles (dev/prod) to toggle compaction speeds and auth policies.

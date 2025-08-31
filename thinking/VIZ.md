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

The system is fully operational and waiting. Here is the state of our stack:

    ✅ Prometheus is running, scraping metrics, and writing data to its internal storage.
    ✅ Thanos Sidecar is now healthy, connected to Prometheus, and monitoring its data directory.
    ✅ Thanos Querier is running and providing a unified API endpoint to Grafana.
    ✅ Grafana is connected to the Querier and displaying dashboards.
    ✅ MinIO is running and ready to receive data.

**IMPORTANT NOTE:** MinIO is used for local testing. We will not use MinIO or AWS in production. Instead we will use the Storacha distributed data service (https://storacha.network/). Keep this in mind when planning.

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
  # NEW: Add a job to scrape Apache Jena Fuseki metrics
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
```

### Docker

```yaml
# docker-compose.yml
networks:
  monitoring:
    driver: bridge

volumes:
  prometheus_data: {}
  grafana_data: {}
  minio_data: {}
  thanos_sidecar_data: {}
  fuseki_data: {}
  fuseki_config: {}

services:
  # Apache Jena Fuseki - RDF Database and SPARQL Endpoint
  fuseki:
    image: stain/jena-fuseki:latest
    container_name: fuseki
    restart: unless-stopped
    environment:
      - FUSEKI_DATASET_1=my_dataset # Creates a persistent dataset with this name
      # Optional: Set admin password for the web UI
      - ADMIN_PASSWORD=admin123
    volumes:
      - fuseki_data:/fuseki-base/databases # Persistent volume for database files
      - fuseki_config:/fuseki-base/configuration # Persistent volume for config
    ports:
      - "3030:3030" # Exposes the Fuseki web UI and SPARQL endpoint
    networks:
      - monitoring # Attach it to the same network so Prometheus can scrape it
    # Optional: Healthcheck to ensure the service is fully started
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3030/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # The monitoring backbone: time-series database
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--web.enable-lifecycle" # Allows config reload via API call
      - "--storage.tsdb.min-block-duration=2h"
      - "--storage.tsdb.max-block-duration=2h"
    volumes:
      - ./ops/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - monitoring

  # Exposes hardware & OS metrics from the host
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    # REMOVED the complex volumes and command
    ports:
      - "9100:9100"
    networks:
      - monitoring
    # ADD these lines to run with necessary Linux capabilities
    privileged: true
    pid: "host"
    command:
      - "--path.rootfs=/host"
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
      - --objstore.config-file=/etc/thanos/minio-bucket.yaml
    volumes:
      - prometheus_data:/prometheus
      - ./ops/thanos/thanos-config.yaml:/etc/thanos/minio-bucket.yaml:ro
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
      - "10902:10902" # Expose the HTTP Query UI and API
    depends_on:
      - thanos-sidecar
    networks:
      - monitoring

  # THANOS STOREGATEWAY - Serves metrics from the blocks in MinIO (long-term storage)
  thanos-storegateway:
    image: quay.io/thanos/thanos:v0.39.2
    container_name: thanos-storegateway
    restart: unless-stopped
    command:
      - store
      - --http-address=0.0.0.0:10909
      - --grpc-address=0.0.0.0:10908
      - --objstore.config-file=/etc/thanos/minio-bucket.yaml
    volumes:
      - ./ops/thanos/thanos-config.yaml:/etc/thanos/minio-bucket.yaml:ro
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
      - GF_INSTALL_PLUGINS=grafana-polystat-panel # Optional: useful for advanced panels
      - GF_DATASOURCES_DEFAULT_URL=http://thanos-querier:10902 # <-- TELL GRAFANA TO USE THANOS
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3001:3000" # Map host port 3001 to container port 3000
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
      - MINIO_ROOT_PASSWORD=minioadmin # Change these for real deployment!
    volumes:
      - minio_data:/data
    ports:
      - "9000:9000" # S3 API Port
      - "9001:9001" # Web UI Port
    networks:
      - monitoring

```

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
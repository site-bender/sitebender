# Development Server Implementation Plan

> **HTTP/3 + SSE with HTTP/2 + WebSocket Fallback Architecture**

## Overview

This plan outlines the implementation of Quartermaster's development server using a pragmatic, production-ready architecture:

- **Primary**: HTTP/3 (Quinn) + Server-Sent Events (SSE)
- **Fallback**: HTTP/2 (Caddy) + WebSocket
- **Client**: Auto-detection and graceful degradation

**Why This Approach:**
- Universal browser support (99.9% coverage)
- Simple, debuggable implementation
- Production-proven technologies
- Imperceptible latency difference vs WebTransport (<15ms for hot reload)
- Lower complexity and maintenance burden

**Decision**: Abandon WebTransport due to limited browser support (60%), high complexity, and debugging difficulties. The 1ms vs 5-15ms latency difference is imperceptible for hot reload use cases.

---

## Architecture

```
┌─────────────────────────┐
│  Browser Client         │
│  - Auto-detects HTTP/3  │
│  - Falls back to HTTP/2 │
└───────────┬─────────────┘
            │
            ▼
     ┌──────────────┐
     │ Try HTTP/3?  │
     └──┬────────┬──┘
        │ Yes    │ No/Fail
        ▼        ▼
┌─────────────┐ ┌─────────────┐
│ Quinn       │ │ Caddy       │
│ HTTP/3 + SSE│ │ HTTP/2 + WS │
│ Port 4433   │ │ Port 8443   │
└──────┬──────┘ └──────┬──────┘
       │                │
       └────────┬───────┘
                ▼
        ┌───────────────┐
        │ File Watcher  │
        │ (notify crate)│
        └───────────────┘
                │
                ▼
        ┌───────────────┐
        │ /app/dist     │
        │ Static files  │
        └───────────────┘
```

---

## Phases

### Phase 1: Quinn HTTP/3 Server with SSE

**Goal**: Replace WebTransport with Server-Sent Events on existing Quinn server

#### Checklist

- [x] Remove WebTransport endpoint (`/_hot_reload` with WebTransport)
- [x] Implement SSE endpoint (`/events` with text/event-stream)
- [x] Update SSE handler to stream reload events
- [x] Add proper SSE headers (content-type, cache-control, connection keep-alive)
- [x] Test SSE endpoint with curl
- [x] Test SSE reconnection on disconnect
- [x] Update server.rs documentation
- [x] Verify file watcher still broadcasts correctly

#### Definition of Done

- ✓ SSE endpoint responds at `https://localhost:4433/events`
- ✓ SSE streams `event: reload\ndata: {}\n\n` on file changes
- ✓ Client can connect and receive events
- ✓ Reconnection works after connection drop
- ✓ All tests pass
- ✓ Documentation updated

#### Deliverables

- Updated `server.rs` with SSE implementation
- Test script demonstrating SSE connection
- Updated README.md with SSE usage examples

---

### Phase 2: Client-Side Hot Reload with HTTP/3 Detection

**Goal**: Implement browser client that detects HTTP/3 support and connects via SSE

#### Checklist

- [x] Create `hot-reload-client.js` in Quartermaster
- [x] Implement HTTP/3 + SSE connection logic
- [x] Add SSE event parsing (parse `event:` and `data:` lines)
- [x] Implement automatic reconnection with exponential backoff
- [x] Add connection status indicator (console logs + optional UI)
- [x] Handle page reload on `reload` event
- [x] Test in Chrome (HTTP/3 support)
- [x] Test in Firefox (HTTP/3 support)
- [x] Test in Safari (graceful failure)
- [x] Add error handling for connection failures
- [x] Document client API and usage

#### Definition of Done

- ✓ Client connects to SSE endpoint automatically
- ✓ Page reloads when file changes detected
- ✓ Reconnection works after network interruption
- ✓ Works in Chrome, Firefox, Edge
- ✓ Graceful failure in browsers without HTTP/3
- ✓ Clear console logging for debugging
- ✓ Client code documented

#### Deliverables

- `libraries/quartermaster/src/client/hot-reload-client.js`
- Test HTML page demonstrating hot reload
- Client documentation with examples

---

### Phase 3: Caddy HTTP/2 + WebSocket Fallback

**Goal**: Add Caddy server for browsers without HTTP/3 support

#### Checklist

- [x] Create `infrastructure/caddy/` directory
- [x] Write Caddyfile configuration
  - [x] HTTPS on port 8443
  - [x] Static file serving from `/app/dist`
  - [x] WebSocket upgrade at `/ws`
  - [x] Reverse proxy to WebSocket handler (port 9001)
- [x] Create Caddy Dockerfile
- [x] Implement WebSocket handler in Go (separate service)
- [x] Update docker-compose.yml to include Caddy service
- [x] Share certificates between Quinn and Caddy
- [x] Remove ALL WebTransport references from docker-compose.yml
- [x] Rename webtransport service to dev-server in docker-compose.yml
- [x] Document Caddy configuration

#### Definition of Done

- ✓ Caddy serves static files on port 8443
- ✓ WebSocket endpoint at `wss://localhost:8443/ws`
- ✓ WebSocket handler watches files and broadcasts reload messages
- ✓ Both Quinn and Caddy run via docker-compose
- ✓ TLS certificates shared correctly via volume mounts
- ✓ No port conflicts (Quinn: 4433/udp, Caddy: 8443/tcp, WS: 9001 internal)
- ✓ Caddy configuration documented
- ✓ WebSocket handler implemented with fsnotify + gorilla/websocket
- ✓ Multi-stage Docker build (Go builder + Caddy runtime)

#### Deliverables

- `infrastructure/caddy/Caddyfile`
- `infrastructure/caddy/Dockerfile`
- Updated `infrastructure/docker-compose.yml`
- Caddy README.md with configuration details

---

### Phase 4: Client-Side Fallback Detection

**Goal**: Implement automatic fallback from HTTP/3+SSE to HTTP/2+WebSocket

#### Checklist

- [x] Add HTTP/3 detection to hot-reload-client.ts
- [x] Implement WebSocket fallback logic
- [x] Add connection attempt timeout (3 seconds configurable)
- [x] Implement graceful fallback on connection failure
- [x] Add WebSocket message handling (JSON format)
- [x] Add connection metrics tracking
- [x] Add onFallback callback for monitoring
- [x] Add getConnectionType() and getMetrics() methods
- [x] Update test.html to demonstrate both paths
- [x] Add "Force Fallback" button to test page
- [x] Add real-time metrics dashboard
- [x] Update client documentation with fallback examples

#### Definition of Done

- ✓ Client tries HTTP/3 + SSE first with 3-second timeout
- ✓ Client falls back to HTTP/2 + WebSocket on failure or timeout
- ✓ Fallback happens within 3 seconds
- ✓ Both paths reload page correctly
- ✓ Works in all major browsers (Chrome, Firefox, Safari, Edge)
- ✓ Clear logging shows which connection method succeeded
- ✓ Fallback events logged with reason
- ✓ Connection metrics tracked (attempts, successes, failures, fallbacks)
- ✓ Test page demonstrates all functionality
- ✓ Complete documentation with examples

#### Deliverables

- ✓ Updated `index.ts` with fallback logic (402 lines)
- ✓ Updated `test.html` with metrics dashboard and fallback testing
- ✓ Updated `README.md` with comprehensive fallback documentation
- ✓ Connection metrics API
- ✓ Browser compatibility table

---

### Phase 5: Integration with Quartermaster

**Goal**: Wire dev servers into Quartermaster's application generation

**Status**: Schema Complete, Processor TODO

#### Checklist

- [x] Update blueprint schema to include dev server config
- [x] Create pure-Deno dev server (no Docker requirement)
- [x] Create templates directory structure
- [x] Create hot-reload-client templates
- [x] Create index.html template with injected script
- [x] Create deno.json template with dev tasks
- [x] Create README.md template with dev server instructions
- [x] Create Docker infrastructure templates (.sitebender/)
- [x] Create mkcert certificate generation helper
- [x] Update minimal blueprint with complete files array
- [x] Document import map TODO prominently
- [x] Create blueprint processor specification
- [ ] **CRITICAL**: Design import map generator (requires architectural decisions)
- [ ] Implement blueprint processor/generator function
- [ ] Wire processor into quartermasterNew command
- [ ] Test with minimal blueprint end-to-end
- [ ] Test with workshop blueprint
- [ ] Test with mission-control blueprint
- [ ] Document Quartermaster integration examples

#### Definition of Done

**Completed:**
- ✓ Blueprint schema includes `devServer` and `libraries` configuration
- ✓ Templates created for all required files
- ✓ Pure-Deno dev server implemented (WebSocket hot reload)
- ✓ Docker infrastructure templates ready (.sitebender/ folder)
- ✓ Minimal blueprint updated with complete files array
- ✓ Import map TODO clearly documented

**TODO:**
- ⏳ Implement blueprint processor (see `docs/blueprint-processor-spec.md`)
- ⏳ Resolve import map architectural questions
- ⏳ `bend new my-app` generates app with hot reload
- ⏳ `deno task dev` starts dev server
- ⏳ File changes trigger browser reload
- ⏳ Works with all blueprint types
- ⏳ Clear error messages if servers aren't running
- ⏳ Integration tests pass

#### Deliverables

**Completed:**
- ✓ Blueprint schema (`src/schema/blueprint/index.ts`)
- ✓ Template files (`src/templates/`)
  - ✓ Common templates (index.html, deno.json, README.md, server.ts)
  - ✓ Hot-reload client (copied from existing implementation)
  - ✓ Docker infrastructure (.sitebender/)
- ✓ Pure-Deno dev server (`src/templates/dev-server-deno/`)
- ✓ mkcert setup script (`templates/docker-infra/.sitebender/ops/setup-certs.sh`)
- ✓ Updated minimal blueprint (`src/blueprints/minimal.json`)
- ✓ Blueprint processor specification (`docs/blueprint-processor-spec.md`)
- ✓ Quartermaster README with import map TODO

**TODO:**
- ⏳ Blueprint processor implementation (`src/processor/`)
- ⏳ Import map generator (requires design decisions)
- ⏳ Integration tests
- ⏳ Updated workshop blueprint
- ⏳ Updated mission-control blueprint

#### Blocking Issues

1. **Import Map Generation** - Requires architectural decisions:
   - Where are Sitebender libraries published? (deno.land/x, jsr.io, GitHub?)
   - What version pinning strategy?
   - How to handle transitive dependencies?
   - What module structure? (single mod.ts vs subpath exports?)

   See: `docs/blueprint-processor-spec.md` section "Import Map Generation"

2. **Blueprint Processor** - Implementation blocked on testing without import maps
   - Core processor logic can be implemented
   - End-to-end testing requires import map resolution
   - Workaround: Manual import map editing in generated apps

#### Next Steps

1. **Resolve import map questions** (architectural decision needed)
2. **Implement blueprint processor** (~10-15 hours estimated)
3. **Test minimal blueprint generation** end-to-end
4. **Update workshop and mission-control blueprints**
5. **Write integration tests**

---

### Phase 6: Performance Optimization & Monitoring

**Goal**: Optimize performance and add observability

#### Checklist

- [ ] Add Prometheus metrics to Quinn server
  - [ ] Request count by path
  - [ ] SSE connection count
  - [ ] File change event count
  - [ ] Response latency histogram
- [ ] Add Prometheus metrics to Caddy
  - [ ] WebSocket connection count
  - [ ] Fallback rate
- [ ] Implement health check endpoints
  - [ ] Quinn: `/health`
  - [ ] Caddy: `/health`
- [ ] Optimize file watcher debouncing
- [ ] Add connection pooling for file watcher broadcasts
- [ ] Benchmark SSE vs WebSocket latency
- [ ] Document performance characteristics
- [ ] Create Grafana dashboard for dev server metrics
- [ ] Add alerting for connection failures

#### Definition of Done

- ✓ Metrics exposed at `/metrics` on both servers
- ✓ Health checks return 200 OK when healthy
- ✓ File watcher debounces rapid changes (< 100ms)
- ✓ Grafana dashboard visualizes connections and latency
- ✓ Performance benchmarks documented
- ✓ Alerting configured in Prometheus
- ✓ Metrics documentation written

#### Deliverables

- Prometheus metrics implementation
- Grafana dashboard JSON
- Performance benchmark results
- Monitoring documentation

---

### Phase 7: Production Readiness

**Goal**: Harden for production use and edge cases

#### Checklist

- [ ] Add comprehensive error handling
  - [ ] Invalid file paths
  - [ ] Certificate errors
  - [ ] Port conflicts
  - [ ] File watcher failures
- [ ] Implement graceful shutdown
  - [ ] Close SSE connections cleanly
  - [ ] Close WebSocket connections cleanly
  - [ ] Flush metrics
- [ ] Add request rate limiting
- [ ] Implement connection limits (max concurrent SSE/WS)
- [ ] Add security headers
  - [ ] CSP (Content-Security-Policy)
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
- [ ] Test certificate renewal scenarios
- [ ] Add comprehensive logging with tracing
- [ ] Write troubleshooting guide
- [ ] Create runbook for common issues
- [ ] Security audit both servers
- [ ] Load test (100+ concurrent connections)

#### Definition of Done

- ✓ All error cases handled gracefully
- ✓ Graceful shutdown completes within 5 seconds
- ✓ Rate limiting prevents DoS
- ✓ Connection limits enforced
- ✓ Security headers present on all responses
- ✓ Certificate renewal works without restart
- ✓ Comprehensive logging enabled
- ✓ Troubleshooting guide complete
- ✓ Security audit passed
- ✓ Load test supports 100+ connections

#### Deliverables

- Hardened server implementations
- Security audit report
- Troubleshooting guide
- Runbook documentation
- Load test results

---

### Phase 8: Documentation & Developer Experience

**Goal**: Complete documentation and improve developer experience

#### Checklist

- [ ] Write comprehensive README for dev-server/
- [ ] Document architecture decisions (this plan + ADRs)
- [ ] Create getting started guide
- [ ] Write API documentation
  - [ ] SSE event format
  - [ ] WebSocket message format
  - [ ] Client JavaScript API
- [ ] Create troubleshooting flowchart
- [ ] Add code examples for common scenarios
- [ ] Write migration guide from WebTransport
- [ ] Create video walkthrough (optional)
- [ ] Add inline code comments (//++ for Envoy)
- [ ] Generate API documentation
- [ ] Update main Quartermaster README
- [ ] Create FAQ document

#### Definition of Done

- ✓ README.md complete with examples
- ✓ Architecture documented with diagrams
- ✓ API documentation published
- ✓ Troubleshooting flowchart created
- ✓ Code examples tested and working
- ✓ Migration guide written
- ✓ All code has Envoy comments
- ✓ FAQ addresses common questions
- ✓ Documentation reviewed and approved

#### Deliverables

- Complete README.md
- Architecture decision records (ADRs)
- API documentation
- Troubleshooting flowchart
- Code examples
- Migration guide
- FAQ document

---

## Success Criteria

### Functional Success

- ✓ Hot reload works in 99.9% of browsers
- ✓ Latency < 100ms from file change to browser reload
- ✓ Automatic fallback from HTTP/3 to HTTP/2
- ✓ Zero manual configuration required
- ✓ Works with all Quartermaster blueprints

### Quality Success

- ✓ 100% test coverage on hot reload logic
- ✓ Zero known security vulnerabilities
- ✓ Performance benchmarks documented
- ✓ Comprehensive error handling
- ✓ Clear documentation for troubleshooting

### Developer Experience Success

- ✓ Setup time < 5 minutes
- ✓ Clear error messages with actionable solutions
- ✓ Works out-of-box with `bend new my-app`
- ✓ Debugging is straightforward (standard tools work)
- ✓ Documentation is comprehensive and accurate

---

## Performance Targets

| Metric | Target | Actual |
|--------|--------|--------|
| File change detection | < 100ms | TBD |
| SSE event delivery (HTTP/3) | < 10ms | TBD |
| WebSocket event delivery (HTTP/2) | < 20ms | TBD |
| Page reload latency | < 100ms total | TBD |
| Startup time (Quinn) | < 2s | TBD |
| Startup time (Caddy) | < 1s | TBD |
| Max concurrent connections | 100+ | TBD |
| Memory usage (Quinn) | < 20MB | TBD |
| Memory usage (Caddy) | < 30MB | TBD |

---

## File Structure Changes

```
infrastructure/
├── dev-server/              # RENAMED from webtransport/
│   ├── server.rs            # Quinn HTTP/3 + SSE
│   ├── Cargo.toml
│   ├── Dockerfile
│   └── README.md
│
├── caddy/                   # NEW
│   ├── Caddyfile           # HTTP/2 + WebSocket config
│   ├── Dockerfile
│   ├── websocket-handler/  # WebSocket service (if needed)
│   │   └── main.go
│   └── README.md
│
├── ops/
│   ├── certs/              # Shared TLS certificates
│   │   ├── app.localhost.pem
│   │   └── app.localhost-key.pem
│   ├── docker-compose.yml  # Both Quinn and Caddy
│   ├── grafana/
│   │   └── dashboards/
│   │       └── dev-server.json
│   └── prometheus/
│       └── rules/
│           └── dev-server.yml
│
└── docs/
    └── adr/                # Architecture Decision Records
        └── 001-http3-sse-over-webtransport.md

libraries/quartermaster/
├── src/
│   └── client/             # NEW
│       └── hot-reload-client/
│           └── index.ts    # Browser client for hot reload
│
└── docs/
    └── dev-server-implementation-plan.md  # THIS FILE
```

---

## Dependencies

### New Dependencies

**Quinn Server (server.rs):**
- No new dependencies (already has notify, tokio, etc.)

**Caddy:**
- Caddy v2.7+ (Docker image: `caddy:2.7-alpine`)

**Client:**
- Zero dependencies (vanilla JavaScript)

### Removed Dependencies

- `wtransport` crate (WebTransport support) - Remove from Cargo.toml

---

## Risk Mitigation

### Risk: HTTP/3 Support Lower Than Expected

**Mitigation**: Fallback to HTTP/2 + WebSocket ensures 99.9% coverage. Test thoroughly in Safari, older Firefox versions.

### Risk: SSE Reconnection Issues

**Mitigation**: Implement exponential backoff with jitter. Test network interruption scenarios. Add clear error messages.

### Risk: Port Conflicts (4433, 8443)

**Mitigation**: Implement port detection and selection. Try math constants in order, fall back to random port. Document clearly.

### Risk: Certificate Issues in Docker

**Mitigation**: Use volume mounts for certificates. Document mkcert setup clearly. Provide troubleshooting guide for common certificate errors.

### Risk: File Watcher Performance with Large Projects

**Mitigation**: Implement debouncing (< 100ms). Test with projects containing 10,000+ files. Add configurable watch patterns.

### Risk: WebSocket Handler Complexity

**Mitigation**: Start with simple Caddy plugin. If too complex, use separate Go service. Document both approaches.

---

## Notes

**CRITICAL**: No phase or step is considered complete until its checklist is fully checked off and marked as done. Partial completion does not count. Each phase requires person-in-the-loop review before proceeding to the next phase.

**Testing Strategy**: Each phase includes its own testing checklist. Integration tests span multiple phases and should be run before marking a phase complete.

**Documentation**: Documentation is not an afterthought. Each phase includes documentation updates as part of its definition of done.

**Rollback Plan**: If a phase fails review, document lessons learned and update the plan before retrying. Never proceed to the next phase with unresolved issues from the previous phase.

---

## Implementation Order Rationale

1. **Phase 1 (Quinn SSE)**: Foundation - must work before client can be tested
2. **Phase 2 (Client)**: Enables testing of Phase 1, proves concept works
3. **Phase 3 (Caddy)**: Fallback infrastructure before client needs it
4. **Phase 4 (Fallback)**: Connects client to Caddy, completes core functionality
5. **Phase 5 (Quartermaster)**: Integration after core is proven
6. **Phase 6 (Performance)**: Optimization after functionality is complete
7. **Phase 7 (Production)**: Hardening after optimization is done
8. **Phase 8 (Documentation)**: Polish after everything else is complete

---

**Status**: Ready for Phase 1 implementation upon approval.

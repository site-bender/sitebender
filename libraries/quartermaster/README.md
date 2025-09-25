# Quartermaster

Studio application generator CLI using declarative blueprints. Provisions complete application skeletons with import-map wiring and pre-wired Warden/Steward/axe tasks.

## Philosophy

Quartermaster is Studio's scaffolding system that generates applications from declarative JSON blueprints rather than templates. Unlike traditional generators that copy files, Quartermaster understands the Studio architecture and generates properly wired applications with all governance, testing, and accessibility infrastructure in place from day one.

## Core Concepts

### Blueprint-Driven Generation

Applications are defined as data, not templates:

```json
{
  "name": "my-app",
  "type": "application",
  "libraries": ["architect", "pagewright", "custodian"],
  "features": {
    "authentication": "sentinel",
    "state": "custodian",
    "testing": "declarative"
  }
}
```

### Zero-Configuration Wiring

Quartermaster automatically:

- Generates import maps with correct library paths
- Wires Warden contracts for architectural enforcement
- Configures Steward for style normalization
- Sets up axe accessibility testing
- Creates declarative test harnesses

### Application Types

Pre-defined blueprints for common patterns:

#### Core Scaffolds

- **minimal**: Bare-bones Studio app with Architect + Pagewright
- **workshop**: Interactive development environment with IR visualization
- **athenaeum**: Documentation site powered by Envoy

#### Common Application Scaffolds

- **blog**: Markdown → JSX → Static site with RSS, categories, and search
- **dashboard**: Real-time metrics visualization with Operator events and charts
- **collaborative-doc**: CRDT-based editor with Agent for multi-user editing
- **data-explorer**: SPARQL query interface over triple store with visual results
- **form-builder**: Schema → Pagewright forms with validation and persistence
- **event-debugger**: Operator event flow visualizer with filters and replay
- **api-gateway**: Declarative routing with Sentinel authentication and rate limiting
- **knowledge-base**: Envoy-powered documentation site with HATEOAS navigation

#### Specialized Scaffolds

- **e-commerce**: Product catalog, cart, checkout with distributed state
- **social-feed**: P2P social network with CRDTs and decentralized identity
- **project-manager**: Tasks, boards, timelines with real-time collaboration
- **analytics-platform**: Event aggregation, metrics, and visualizations
- **content-cms**: Triple store-backed CMS with version control
- **iot-dashboard**: Sensor data collection and real-time monitoring
- **chat-app**: End-to-end encrypted messaging with Agent
- **wiki**: Collaborative knowledge management with version history

## Usage

```bash
# Generate from blueprint
deno run -A quartermaster new my-app --blueprint=minimal

# Dry run to preview generation
deno run -A quartermaster new my-app --blueprint=workshop --dry-run

# Custom blueprint
deno run -A quartermaster new my-app --blueprint=./custom.json
```

## Blueprint Schema

Blueprints define:

- Library dependencies and versions
- Directory structure
- Import map configuration
- Warden contract rules
- Steward style rules
- Test configuration
- Build pipelines

## Integration with Studio Libraries

Quartermaster understands the relationships between Studio libraries and ensures proper:

- Import boundaries (no circular dependencies)
- Contract enforcement (Warden rules)
- Testing setup (declarative components)
- Documentation generation (Envoy integration)

## Declarative Testing Integration

Generated applications include declarative testing infrastructure:

- TestHarness components pre-configured
- Mock data triple stores
- IO interception wiring (Agent)
- Contract verification setup (Auditor)

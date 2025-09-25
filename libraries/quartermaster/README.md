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

- **minimal**: Bare-bones Studio app with Architect + Pagewright
- **workshop**: Interactive development environment with IR visualization
- **athenaeum**: Documentation site powered by Envoy

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

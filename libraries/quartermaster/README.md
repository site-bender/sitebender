# Quartermaster: Application Generator & Orchestrator

> **Voice-guided, collaborative application scaffolding with production-quality development infrastructure from day one**

Quartermaster is Studio's intelligent application generator that creates complete, production-ready applications from declarative blueprints. Unlike traditional scaffolding tools that copy templates, Quartermaster understands Studio's architecture and generates properly wired applications with governance, testing, accessibility, HTTPS development server, and time-travel debugging built in from the start.


## Philosophy

**Applications as data, generated through conversation.**

Quartermaster bridges the gap between intent and implementation:

- **You describe** what you're building (voice or GUI)
- **AI guides** you through configuration decisions
- **Quartermaster generates** complete Studio applications
- **Blueprints live** in triple stores as structured data
- **Time-travel tracks** every decision for perfect auditability

This is not just code generation—it's **application orchestration**. Quartermaster is itself a Studio application that generates Studio applications, embodying the "code as data" philosophy at every level.

## Target Audience

Quartermaster democratizes application development for:

- **Designers** - Build interactive prototypes that become production apps
- **UX Engineers** - Convert wireframes directly to working applications
- **Hobbyists** - Create sophisticated apps without deep technical knowledge
- **Small Business Owners** - Launch web applications without hiring developers
- **Bloggers & Content Creators** - Publish with semantic markup and accessibility
- **Architects** - Prototype distributed systems with real infrastructure

**Greenfield projects only**. Quartermaster is for building the future, not migrating the past.

## Core Features

### 1. Voice-Controlled Setup

Describe your application naturally, and Quartermaster guides you through configuration:

```bash
# Start voice-guided generation
bend new --voice

# AI conversation:
AI: "What would you like to build?"
You: "A blog with real-time comments and authentication"
AI: "I'll set up a blog blueprint with Sentinel authentication and
     Operator for real-time updates. Should comments be editable?"
You: "Yes, and I want markdown support"
AI: "Great! Adding markdown processing and edit capabilities..."
```

Voice interface includes:

- Natural language blueprint configuration
- Context-aware suggestions from Envoy knowledge graph
- Educational explanations of architectural choices
- Accessibility for developers with visual impairments
- Hands-free workflow for designers working in visual tools

**Why voice-first?** The immediate future of development is conversational. Quartermaster makes expertise accessible through dialogue, not documentation.

### 2. Multi-Modal Interface

Choose your preferred interaction style:

#### Voice Interface (Primary)

- Conversational blueprint configuration
- AI-guided decision making
- Hands-free operation
- Natural language intent capture

#### Visual GUI (Web-First)

- Browser-based configuration wizard
- Feature checkboxes and configuration forms
- Live preview of generated structure
- Sketch-to-app: Draw wireframes, generate blueprints

#### CLI (Direct)

- Command-line blueprint generation
- Scriptable and automatable
- Perfect for CI/CD integration
- Power-user efficiency

#### Collaborative Mode

- Real-time multi-user blueprint editing
- Agent CRDTs for conflict-free collaboration
- Team discusses and configures together
- Decision history tracked in triple store

**Why multi-modal?** Different tasks need different interfaces. Design discussions benefit from voice and sketches. Production deployment needs CLI. All modes work with the same underlying blueprint data.

### 3. HTTPS Development Server

Production-quality development environment from first run:

```bash
bend new my-app --blueprint=minimal

# Quartermaster automatically:
# 1. Checks for mkcert installation
# 2. Guides installation if needed (one-time setup)
# 3. Generates local SSL certificates
# 4. Starts HTTPS server on port 25144
# 5. Opens browser to https://localhost:25144 (b:2, e:5, n:14, d:4)

✓ Certificates generated
✓ Server running on https://localhost:25144
✓ File watching active - changes trigger hot reload
✓ AI assistant available at /assistant
```

**Port Selection Philosophy**: If 25144 is unavailable, Quartermaster tries math constants in order:

- `31415` - π (pi)
- `27182` - e (Euler's number)
- `16180` - φ (golden ratio)
- `14142` - √2 (Pythagoras' constant)
- `26180` - φ² (golden ratio squared)
- Falls back to random available port if all taken

**Why HTTPS by default?**

- Service Workers require HTTPS (even in dev)
- WebAuthn and modern APIs expect secure contexts
- Matches production environment exactly
- No surprises when deploying
- Forces best practices from day one

#### mkcert Integration

First-time setup is guided and explained:

```
┌─────────────────────────────────────────────────────┐
│  HTTPS Development Setup                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Quartermaster uses HTTPS for development to        │
│  match production environments and enable modern    │
│  web APIs (Service Workers, WebAuthn, etc.)         │
│                                                     │
│  This requires a one-time certificate setup using   │
│  mkcert, which creates a local certificate          │
│  authority trusted by your system.                  │
│                                                     │
│  What happens:                                      │
│  1. Install mkcert via your package manager         │
│  2. Run 'mkcert -install' to trust the CA           │
│  3. Generate certificate for localhost              │
│                                                     │
│  Your password is needed to add the certificate     │
│  authority to your system's trust store (step 2).   │
│                                                     │
│  Alternative: Skip and run these commands yourself  │
│                                                     │
│  [Continue with Guided Setup]  [Manual Setup]       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Quartermaster detects your OS and package manager, provides exact commands, and explains each step. You maintain full control.

### 4. Time-Travel Configuration

Every decision is tracked in the triple store:

```bash
# View configuration history
bend history

# Output:
# 2024-01-15 14:30:22 - Added Architect library
#   Reason: Enable reactive calculations
#   Suggested by: AI (user approved)
#
# 2024-01-15 14:31:45 - Added Sentinel authentication
#   Reason: User requested login capability
#   Configuration: OAuth2 + WebAuthn
#
# 2024-01-15 14:35:12 - Removed Custodian
#   Reason: User decided state is simple enough for Architect
#   Suggested by: User

# Branch and explore alternatives
bend branch what-if-custodian
bend replay --from=14:31:45 --change="add custodian"

# Compare configurations
bend compare main what-if-custodian
```

Time-travel features:

- **Complete audit trail** - Every blueprint decision recorded
- **Why explanations** - AI captured reasoning for each choice
- **Branch and compare** - Explore alternative configurations
- **Replay with changes** - "What if I had chosen differently?"
- **Team coordination** - See who decided what and why
- **Learning tool** - Understand past decisions when revisiting code

**Why time-travel?** Code as data enables complete history. Understanding past decisions is critical for maintenance and learning.

### 5. Sketch-to-App

Draw wireframes, get working applications:

```bash
# Launch sketch interface
bend new my-app --sketch

# Or from GUI: drag image files into wizard
# Or from CLI with image path:
bend new my-app --from-sketch=./wireframe.png
```

Sketch-to-app workflow:

1. **Draw wireframes** (paper, Figma, Excalidraw, etc.)
2. **Upload to Quartermaster** (drag-drop or file path)
3. **AI analyzes layout** - Identifies components, navigation, data flow
4. **Suggests blueprint** - Maps wireframe to Pagewright components
5. **You refine** - Approve, modify, or regenerate
6. **Generate app** - Complete Studio application from design

Recognized elements:

- **Navigation patterns** → Routing structure
- **Form fields** → Architect calculations + validation
- **Lists and grids** → Data iteration components
- **Buttons and actions** → Event handlers
- **Text hierarchy** → Semantic HTML structure
- **Relationships between screens** → Application flow

**Why sketch-to-app?** Designers think visually. Bridge the design-to-code gap by accepting design artifacts as input.

### 6. Real-Time Collaboration

Configure applications together with distributed teams:

```bash
# Start collaborative session
bend new my-app --collaborate

# Share session link with team
# https://sitebender.studio/session/abc-123-def

# Features:
# - Live cursor tracking
# - Real-time blueprint updates
# - Voice chat integrated
# - Decision consensus voting
# - Role-based permissions
```

Collaboration features:

- **CRDT-based editing** (Agent) - Conflict-free concurrent changes
- **Presence awareness** - See who's viewing/editing what
- **Voice coordination** - Team voice chat for discussion
- **Decision voting** - Consensus on major architectural choices
- **Role permissions** - Control who can modify what
- **Session replay** - Review team discussions later

**Why collaborative?** Applications are built by teams. Configuration should be too.

### 7. Blueprint Marketplace

Share and discover community blueprints:

```bash
# Browse marketplace
bend marketplace

# Search for specific patterns
bend marketplace search "e-commerce"

# Install community blueprint
bend marketplace install @community/shopify-alternative

# Publish your own (cryptographically signed)
bend marketplace publish ./my-blueprint.json
```

Marketplace features:

- **Cryptographic signing** (Warden) - Verify blueprint authenticity
- **Community ratings** - Quality and usefulness metrics
- **Usage statistics** - See popular patterns
- **Version tracking** - Blueprint evolution over time
- **Dependency resolution** - Automatic library compatibility
- **Security scanning** - Warden contract validation

**Why marketplace?** Best practices emerge from community. Share patterns that work.

## Architecture

Quartermaster is itself a Studio application, demonstrating the platform's capabilities through self-application. It generates production-ready Studio applications with proper wiring, governance, testing, and observability built in from day one.

## Application Blueprints

### Core Scaffolds

**minimal** - Bare-bones Studio application

- Libraries: Architect, Pagewright
- Use case: Learning, simple sites
- Generated: Basic routing, single page
- Dev server: HTTPS on port 25144

**workshop** - Interactive development environment

- Libraries: Architect, Pagewright, Envoy
- Use case: Exploring IR, debugging Studio apps
- Generated: Visual IR inspector, live editing
- Features: Code graph visualization, time-travel debugging

**mission-control** - Documentation site

- Libraries: Pagewright, Envoy
- Use case: Library documentation, knowledge bases
- Generated: HATEOAS navigation, semantic search
- Features: Markdown processing, syntax highlighting

### Common Application Scaffolds

**blog** - Content publishing platform

- Markdown → JSX → Static HTML
- RSS feed generation
- Categories, tags, search
- Comments with Operator real-time updates
- SEO optimization, semantic markup

**dashboard** - Metrics visualization

- Real-time charts with Operator events
- Customizable widgets
- Data source connectors
- Alert thresholds
- Export capabilities

**collaborative-doc** - Shared document editor

- CRDT-based (Agent) editing
- Multi-user cursors
- Change tracking
- Comment threads
- Version history

**data-explorer** - SPARQL query interface

- Triple store browser
- Visual query builder
- Results as tables/graphs/JSON
- Export to various formats
- Query templates

**form-builder** - Dynamic form generator

- Schema → Pagewright forms
- Architect calculations + validation
- Multi-step workflows
- Conditional fields
- Persistence options

**event-debugger** - Operator event visualizer

- Event flow graphs
- Filter and search events
- Time-travel replay
- Event payload inspection
- Performance profiling

**api-gateway** - Declarative routing

- Sentinel authentication
- Rate limiting
- Request/response transformation
- Logging and monitoring
- OpenAPI documentation

**knowledge-base** - Searchable documentation

- Envoy-powered
- HATEOAS navigation
- Full-text search
- Relationship graphs
- Auto-generated indexes

### Specialized Scaffolds

**e-commerce** - Online store

- Product catalog with semantic data
- Shopping cart (distributed state)
- Checkout flow with validation
- Inventory management
- Order tracking

**social-feed** - P2P social network

- CRDTs for distributed posts
- Decentralized identity (DIDs)
- End-to-end encryption
- Content moderation tools
- Federation support

**project-manager** - Task coordination

- Kanban boards
- Gantt timelines
- Real-time collaboration
- Resource allocation
- Reporting dashboards

**analytics-platform** - Event aggregation

- Data ingestion pipelines
- Metrics computation
- Visualization library
- Alerting rules
- Funnel analysis

**content-cms** - Content management

- Triple store backend
- Version control (Git-like)
- Multi-language support
- Media library
- Preview/publish workflow

**iot-dashboard** - Sensor monitoring

- Real-time data streams
- Device management
- Alert rules
- Historical analysis
- Control panels

**chat-app** - Messaging platform

- End-to-end encryption (Agent)
- Real-time delivery (Operator)
- File sharing
- Group conversations
- Message search

**wiki** - Collaborative knowledge

- Version history
- Link graphs
- Full-text search
- Access control
- Export formats

### Workflow Application Scaffolds

**workflow-designer** - Visual workflow editor

- Drag-and-drop canvas (Agent CRDTs)
- Node palette (Operator triggers/actions)
- Live preview (Custodian state)
- Contract validation (Warden)
- Collaborative editing

**automation-platform** - Multi-tenant automation

- Sentinel user isolation
- Operator event processing
- Envoy monitoring dashboard
- Distributed execution (Agent)
- Template library

**data-pipeline-builder** - ETL workflows

- Extract, Transform, Load nodes
- Real-time data flow visualization
- Performance monitoring
- Auditor data quality contracts
- Schedule orchestration

**ci-cd-orchestrator** - DevOps pipelines

- Git integration
- Docker orchestration
- Test automation
- Deployment workflows
- Notification integrations

**marketing-automation** - Customer journeys

- Email campaign workflows
- Customer segmentation
- A/B testing
- Analytics integration
- Conversion tracking

**business-process-modeler** - Enterprise workflows

- Approval processes
- Document automation
- Enterprise system integration
- Compliance tracking
- Audit trail generation

**iot-automation** - Device workflows

- Sensor data pipelines
- Device control rules
- Real-time monitoring
- Edge computing distribution
- Alert automation

## Usage Examples

### Voice-Guided Generation

```bash
# Start with voice
bend new --voice

# Conversation flow:
You: "I want to build a blog"
AI: "Great! A blog blueprint includes markdown processing and RSS.
     Do you need user authentication?"
You: "Yes, for commenting"
AI: "I'll add Sentinel authentication. OAuth2, WebAuthn, or both?"
You: "WebAuthn"
AI: "Perfect. Should comments update in real-time?"
You: "Yes"
AI: "Adding Operator for real-time events. Generating blueprint..."

✓ Blueprint: blog + sentinel + operator
✓ Validation: Warden contracts passed
✓ Generation: 24 files created
✓ HTTPS server: https://localhost:25144
✓ Time-travel: Configuration logged to triple store
```

### GUI-Based Generation

```bash
# Launch visual wizard
bend new --gui

# Opens browser to configuration interface:
# 1. Application name and type
# 2. Library selection (checkboxes)
# 3. Feature configuration (forms)
# 4. Live preview (file structure)
# 5. Generate (with history)
```

### CLI Direct Generation

```bash
# Generate from preset blueprint
bend new my-blog --blueprint=blog

# Customize with flags
bend new my-shop --blueprint=e-commerce --auth=sentinel --database=turso

# From custom blueprint file
bend new my-app --blueprint=./custom-blueprint.json

# Dry run to preview
bend new my-app --blueprint=minimal --dry-run
```

### Sketch-Based Generation

```bash
# From wireframe image
bend new my-app --from-sketch=./wireframe.png

# AI analyzes and suggests:
# "I see a navigation bar, sidebar, and content area.
#  This looks like a dashboard. Suggested blueprint: dashboard
#  Detected: 3 chart widgets, real-time data indicators
#  Libraries: Architect (reactive), Operator (real-time)
#  Proceed with generation? [yes/no/modify]"
```

### Collaborative Generation

```bash
# Start collaborative session
bend new team-project --collaborate

# Share session URL with team
Session: https://sitebender.studio/session/xyz-789
AI: "3 team members joined. Ready to configure."

# Team discusses via voice, makes decisions together
# Blueprint updates in real-time for all participants
# Final blueprint reflects team consensus
```

### Feature Addition to Existing App

```bash
# Add authentication to existing app
cd my-app
bend add feature sentinel-auth

# AI guides configuration:
AI: "I'll add Sentinel authentication.
     Current app has Architect and Pagewright.
     Integration points needed:
     - Login route
     - Protected routes wrapper
     - Session management
     Proceed? [yes/customize]"

# Add real-time collaboration
bend add feature agent-crdt

# Add workflow automation
bend add feature workflow-designer
```


## Blueprint Marketplace

### Publishing Blueprints

```bash
# Publish to marketplace
cd my-custom-blueprint
bend marketplace publish

# Prompts:
# - Name: "restaurant-pos"
# - Description: "Point-of-sale system for restaurants"
# - Category: "specialized"
# - License: "MIT"
# - Keywords: ["pos", "restaurant", "payments"]

# Quartermaster:
# 1. Validates blueprint (Warden contracts)
# 2. Generates cryptographic signature
# 3. Creates listing in marketplace triple store
# 4. Publishes to IPFS (content-addressed)
# 5. Indexes in marketplace search
```

### Discovering Blueprints

```bash
# Browse by category
bend marketplace browse --category=e-commerce

# Search by keywords
bend marketplace search "real-time collaboration"

# View details
bend marketplace info @community/restaurant-pos

# Output:
# Name: restaurant-pos
# Author: @chef-dev
# Rating: 4.8/5 (127 reviews)
# Downloads: 3,421
# Libraries: Architect, Pagewright, Sentinel, Operator
# Features: Table management, order processing, kitchen display,
#           payment integration, inventory tracking
# Last Updated: 2024-01-10
# Warden Status: ✓ Validated
# Signature: 0x4f2a...9c8e (verified)
```

### Installing Community Blueprints

```bash
# Install blueprint
bend marketplace install @community/restaurant-pos

# Quartermaster:
# 1. Verifies cryptographic signature
# 2. Checks Warden contracts
# 3. Resolves dependencies
# 4. Downloads from IPFS
# 5. Ready for generation

# Generate from marketplace blueprint
bend new my-restaurant --blueprint=@community/restaurant-pos
```

### Blueprint Ratings

```bash
# Rate after using
bend marketplace rate @community/restaurant-pos --stars=5 \
  --review="Perfect for my use case. Well documented."

# Report issues
bend marketplace report @community/restaurant-pos \
  --issue="Warden contract violation in v2.1.3"
```

## Editor Integration

### VSCode Extension

Install from VSCode marketplace:

```bash
code --install-extension sitebender.quartermaster
```

Features:

- **Command Palette**: `Quartermaster: New Application`
- **Sidebar Panel**: Blueprint wizard interface
- **Status Bar**: Dev server status, port, Warden violations
- **WebView**: Embedded GUI for configuration
- **AI Chat**: Integrated assistant in sidebar
- **Time-Travel Panel**: Configuration history browser

### Zed Integration

Install Quartermaster extension:

```bash
zed --install-extension quartermaster
```

Features:

- **Command Mode**: `bend:new`, `bend:add`, `bend:history`
- **Split View**: Configuration GUI alongside code
- **Collaboration**: Shared editing sessions
- **Voice Commands**: Hands-free blueprint configuration

### Web Interface (Standalone)

Launch without any editor:

```bash
bend gui
# Opens https://localhost:25144/quartermaster
```

Browser-based GUI includes all features:

- Voice-guided setup
- Visual wizard
- Sketch upload
- Collaborative sessions
- Marketplace browser
- Time-travel visualization

**Why web-first?** Universal accessibility. Works everywhere: editors, browsers, mobile devices. The web as universal VM.

## Configuration Examples

### Minimal Blog

```bash
bend new my-blog --voice

You: "Simple blog with markdown"
AI: "Generating minimal blog..."

# Result:
Libraries: Pagewright (content), Architect (routing)
Features: Markdown processing, RSS feed, semantic markup
Dev Server: https://localhost:25144
Files: 12 created
```

### Real-Time Dashboard

```bash
bend new metrics-dash --blueprint=dashboard

AI: "Dashboard blueprint selected. Configuration options:

Data sources:
  1. WebSocket streams
  2. HTTP polling
  3. Operator events (recommended)

Choose: 3

Chart types:
  □ Line charts
  □ Bar charts
  □ Pie charts
  ☑ Real-time gauges

Customization:
  Widget library: Standard
  Update frequency: 1s
  Data retention: 24h

Generating..."

# Result:
Libraries: Architect, Pagewright, Operator
Features: Real-time charts, data streaming, alerts
Dev Server: https://localhost:25144
Files: 28 created
```

### Collaborative Editor

```bash
bend new team-docs --blueprint=collaborative-doc --collaborate

# Starts multi-user session
AI: "Collaborative document editor. Session started.
     Share URL: https://sitebender.studio/session/abc-123

     Waiting for team members...

     ✓ alice@example.com joined
     ✓ bob@example.com joined

     Team ready. Configure together..."

# Team voice chat + GUI configuration
# Real-time consensus on architectural choices
# Generated with full collaboration history

# Result:
Libraries: Architect, Pagewright, Agent (CRDTs)
Features: Multi-cursor editing, change tracking, comments
Dev Server: https://localhost:25144
Collaborators: 3
Files: 35 created
```

## Design Decisions

### Why Voice-First?

**Decision**: Make voice the primary interface, GUI secondary\
**Rationale**:

- Natural for non-technical users
- Accessible for visual impairments
- Faster than clicking through forms
- Captures intent, not just configuration
- AI guides expertise through conversation

**Alternative Considered**: GUI-first with voice optional\
**Why Voice Primary**: Immediate future is conversational interfaces. Voice enables expertise sharing through dialogue.

### Why HTTPS by Default?

**Decision**: Generate SSL certificates, run HTTPS dev server\
**Rationale**:

- Service Workers require secure context
- WebAuthn only works on HTTPS
- Modern APIs expect TLS
- Matches production exactly
- Forces best practices early

**Alternative Considered**: HTTP with optional HTTPS\
**Why HTTPS Always**: No surprises in production. Development should mirror deployment.

### Why Triple Store for Blueprints?

**Decision**: Store blueprints as RDF triples in semantic database\
**Rationale**:

- SPARQL queries over configuration
- Semantic relationships captured
- Time-travel through history
- Links to documentation (Envoy)
- Enables reasoning about architecture

**Alternative Considered**: JSON files\
**Why Triples**: Relationships and history are first-class. JSON is flat.

### Why Greenfield Only?

**Decision**: No migration tooling for legacy frameworks\
**Rationale**:

- Target audience is non-developers building new things
- Migration is complex, framework-specific
- Community can add if needed
- Focus effort on excellent greenfield experience

**Alternative Considered**: React/Vue/Angular migration wizards\
**Why Greenfield**: Building the future, not patching the past. Our audience doesn't have legacy codebases.

### Why Math Constant Ports?

**Decision**: Prefer 25144 (bend), 31415 (π), 27182 (e), 16180 (φ) for dev server\
**Rationale**:

- Delightful detail
- Memorable
- Unlikely to conflict
- Shows attention to craft

**Alternative Considered**: Random high port\
**Why Math**: Joy matters. Small touches make tools feel crafted with care.

### Why Web-First GUI?

**Decision**: Build configuration GUI as web app, embed in editors\
**Rationale**:

- Universal platform (browsers, VSCode webviews, Zed)
- Single codebase for all editors
- Dogfoods Studio (GUI built with Studio)
- Mobile-accessible if needed
- Web as universal VM philosophy

**Alternative Considered**: Native GUI per editor\
**Why Web**: Write once, run everywhere. The web's original promise.

### Why Collaborative by Default?

**Decision**: Real-time collaboration built into architecture\
**Rationale**:

- Applications are built by teams
- Configuration should be collaborative
- Captures decision consensus
- Enables remote work
- CRDT architecture makes it natural

**Alternative Considered**: Single-user with manual merging\
**Why Collaborative**: Studio is distributed by default. Quartermaster should be too.

### Why Sketch-to-App?

**Decision**: Accept wireframes/sketches as input to generation\
**Rationale**:

- Designers think visually
- Bridge design-to-code gap
- Faster iteration from mockup to prototype
- Non-developers use visual tools

**Alternative Considered**: Code-only configuration\
**Why Sketch**: Meet users where they are. Designers start with drawings.

## Performance Characteristics

### Blueprint Generation

- Small apps (minimal): < 100ms
- Medium apps (blog): < 500ms
- Large apps (e-commerce): < 2s
- Includes: Validation, file generation, import maps, contracts

### Dev Server Startup

- Certificate check: < 50ms
- SSL setup: < 100ms
- Server start: < 200ms
- Total: < 500ms to first request

### Hot Reload

- File change detection: < 10ms
- Rebuild (incremental): 20-200ms depending on change
- Browser refresh: < 50ms
- Total: < 300ms change-to-visible

### Voice Processing

- Speech-to-text: 100-500ms (depends on provider)
- AI processing: 500-2000ms (depends on complexity)
- Blueprint update: < 50ms
- Total: 1-3s per voice interaction

### Collaborative Sync

- CRDT merge: < 10ms
- Network propagation: 50-200ms (depends on connection)
- UI update: < 16ms (60fps)
- Total: < 300ms change visible to all participants

## Error Handling

Quartermaster provides clear, actionable error messages:

### Missing Dependencies

```
┌─────────────────────────────────────────────────────┐
│  Missing Dependency: mkcert                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Quartermaster needs mkcert to generate SSL         │
│  certificates for HTTPS development.                │
│                                                     │
│  Install for your system:                           │
│                                                     │
│  macOS (Homebrew):                                  │
│    brew install mkcert                              │
│                                                     │
│  Linux (Arch):                                      │
│    sudo pacman -S mkcert                            │
│                                                     │
│  Linux (other):                                     │
│    curl -L https://github.com/FiloSottile/mkcert/   │
│         releases/download/v1.4.4/mkcert-v1.4.4-     │
│         linux-amd64 -o mkcert                       │
│    chmod +x mkcert                                  │
│    sudo mv mkcert /usr/local/bin/                   │
│                                                     │
│  After installing, run: bend new my-app               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Port Conflicts

```
Port 25144 (bend) is already in use.
Trying 31415 (π) ... in use.
Trying 27182 (e) ... in use.
Trying 16180 (φ) ... in use.
Trying 14142 (√2) ... available!

✓ Server running on https://localhost:14142
```

### Blueprint Validation

```
┌─────────────────────────────────────────────────────┐
│  Blueprint Validation Failed                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Issue: Circular dependency detected                │
│                                                     │
│  Your blueprint includes:                           │
│    - custodian (requires toolsmith)                 │
│    - workflow-engine (requires custodian)           │
│    - toolsmith (requires workflow-engine) ← CYCLE   │
│                                                     │
│  Studio libraries cannot have circular              │
│  dependencies (enforced by Warden).                 │
│                                                     │
│  Suggestion: Remove workflow-engine, or             │
│              use operator for workflow instead      │
│                                                     │
│  Learn more: https://localhost:25144/_envoy/warden  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Voice Recognition Errors

```
AI: "I didn't quite catch that. I heard:
     'I want to build a flog with authentication'

     Did you mean:
     1. blog with authentication
     2. fog computing application
     3. Something else (please repeat)

     Choose 1-3 or speak again:"
```

## Testing Quartermaster

Quartermaster includes comprehensive self-tests:

```bash
# Run full test suite
deno task test

# Test specific components
deno task test:blueprint-validation
deno task test:voice-interface
deno task test:collaborative-session
deno task test:marketplace

# Integration tests
deno task test:integration

# Property-based tests (via Quarrier)
deno task test:properties
```

Generated applications include test infrastructure:

```typescript
// tests/blueprint-validation.test.ts
import { assertEquals } from "@std/assert"
import validateBlueprint from "../src/validateBlueprint/index.ts"

Deno.test("Blueprint validation accepts valid minimal blueprint", () => {
	const blueprint = {
		name: "test-app",
		libraries: ["architect", "pagewright"],
	}

	const result = validateBlueprint(blueprint)
	assertEquals(result.ok, true)
})
```

## Contributing

Quartermaster follows Studio's functional programming principles:

1. **Pure functions only** - No mutations, no side effects
2. **One function per file** - Located in folder with function name
3. **Envoy documentation** - Every exported function has //++ comment
4. **100% test coverage** - No exceptions
5. **Property-based tests** - For all validation logic
6. **Type safety** - Full TypeScript, no `any`

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for details.

## License

[MIT](../../LICENSE)

## See Also

- [Warden](../warden/README.md) - Architectural governance
- [Steward](../steward/README.md) - Style enforcement
- [Envoy](../envoy/README.md) - Documentation and observability
- [Agent](../agent/README.md) - Distributed collaboration
- [Operator](../operator/README.md) - Event-driven architecture
- [Custodian](../custodian/README.md) - State management
- [Sentinel](../sentinel/README.md) - Authentication & authorization

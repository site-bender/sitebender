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

## Visual Workflow Blueprint Templates

Quartermaster now includes comprehensive blueprint templates for visual workflow-enabled applications, bringing n8n-style visual development to the entire Studio ecosystem.

### Workflow-Enabled Application Scaffolds

Pre-built blueprints that include complete visual workflow infrastructure:

#### Core Workflow Templates

- **workflow-designer**: Visual node-based workflow editor with real-time collaboration
  - Drag-and-drop canvas powered by Agent's CRDT collaboration
  - Built-in node palette with Operator triggers and actions
  - Live preview with Custodian state visualization
  - Warden contract validation for workflow logic

- **automation-platform**: Multi-tenant workflow automation system
  - Sentinel-powered user isolation and permissions
  - Operator-based event processing and triggers
  - Envoy dashboard for workflow monitoring and analytics
  - Distributed execution with Agent coordination

- **data-pipeline-builder**: Visual ETL and data processing workflows
  - Extract, Transform, Load node components
  - Real-time data flow visualization
  - Performance monitoring and optimization
  - Auditor-verified data quality contracts

#### Industry-Specific Workflow Blueprints

- **ci-cd-orchestrator**: DevOps pipeline designer
  - Git integration with automated triggers
  - Docker container orchestration nodes
  - Testing and deployment workflow templates
  - Slack/Teams notification integrations

- **marketing-automation**: Customer journey workflow builder
  - Email campaign automation templates
  - Customer segmentation and targeting
  - A/B testing workflow patterns
  - Analytics and conversion tracking

- **business-process-modeler**: Enterprise workflow management
  - Approval workflow templates
  - Document processing automation
  - Integration with enterprise systems
  - Compliance and audit trail generation

- **iot-automation**: Internet of Things workflow platform
  - Sensor data processing pipelines
  - Device control and automation rules
  - Real-time monitoring and alerting
  - Edge computing workflow distribution

### Workflow Blueprint Features

#### Visual Editor Scaffolding

Generated applications include complete visual workflow editing infrastructure:

```json
{
  "name": "my-workflow-app",
  "blueprint": "workflow-designer",
  "features": {
    "visual_editor": {
      "canvas": "agent-crdt-collaboration",
      "node_palette": "operator-triggers-actions",
      "state_visualization": "custodian-reactive",
      "validation": "warden-contracts"
    },
    "execution_engine": {
      "orchestrator": "operator-distributed",
      "monitoring": "envoy-realtime",
      "security": "sentinel-isolation"
    }
  }
}
```

#### Pre-Configured Node Libraries

Blueprints include comprehensive node libraries:

- **Trigger Nodes**: HTTP webhooks, file watchers, scheduled tasks, database changes
- **Action Nodes**: API calls, file operations, data transformations, notifications
- **Logic Nodes**: Conditionals, loops, switches, aggregations
- **Integration Nodes**: Database connectors, cloud services, third-party APIs

#### Workflow Orchestration Templates

Ready-to-use workflow patterns for common scenarios:

- **Event-Driven Architecture**: Microservice communication patterns
- **Batch Processing**: Large-scale data processing workflows
- **Real-Time Streaming**: Live data analysis and transformation
- **Human-in-the-Loop**: Approval and review processes
- **Error Handling**: Retry policies and failure recovery
- **Monitoring & Alerting**: System health and performance tracking

### Integration with Visual Workflow Ecosystem

#### Seamless Library Integration

Generated workflow applications leverage the entire Studio ecosystem:

- **Envoy**: Real-time workflow execution dashboards and analytics
- **Operator**: Event-driven workflow triggers and distributed execution
- **Agent**: Collaborative workflow editing with real-time synchronization
- **Custodian**: Visual state machine design and execution monitoring
- **Architect**: Conditional workflow logic and reactive data pipelines
- **Warden**: Cryptographic workflow validation and contract enforcement
- **Sentinel**: Zero-knowledge authentication and authorization workflows

#### Progressive Enhancement

Workflow applications support multiple interaction modes:

- **CLI Mode**: Text-based workflow definition and execution
- **Web Interface**: Browser-based visual workflow editor
- **3D Visualization**: Immersive workflow design and monitoring
- **API Integration**: Programmatic workflow creation and management

### Advanced Workflow Capabilities

#### Collaborative Development

Multi-user workflow development environment:

```bash
# Generate collaborative workflow platform
deno run -A quartermaster new workflow-team --blueprint=workflow-designer

# Features auto-configured:
# - Real-time collaborative editing (Agent CRDTs)
# - Conflict-free workflow merging
# - Version control with branch/merge workflows
# - Live cursor tracking and user awareness
```

#### Distributed Execution

Scalable workflow execution infrastructure:

- **Horizontal Scaling**: Automatic workflow distribution across nodes
- **Fault Tolerance**: Automatic retry and recovery mechanisms
- **Load Balancing**: Intelligent workflow scheduling and resource allocation
- **Edge Computing**: Workflow execution at network edge locations

#### Security & Compliance

Enterprise-grade security features:

- **Zero-Knowledge Authentication**: Privacy-preserving user verification
- **Encrypted Workflow Storage**: Client-side encryption of sensitive workflows
- **Audit Trail Generation**: Comprehensive logging and compliance reporting
- **Role-Based Access Control**: Granular permissions and workflow isolation

### Why Workflow Blueprints Transform Development

#### Accelerated Time-to-Market

Pre-configured workflow infrastructure eliminates months of setup:

- Complete visual editing environment ready in minutes
- Production-ready security and scalability built-in
- Comprehensive monitoring and analytics pre-configured
- Industry-standard integration patterns included

#### Democratized Automation

Visual workflow tools enable non-programmers to create sophisticated automation:

- Drag-and-drop interface removes coding barriers
- Pre-built node libraries cover common use cases
- Template library provides proven workflow patterns
- Collaborative editing enables domain expert participation

#### Maintainable Complexity

Visual representation makes complex workflows understandable:

- Graph-based visualization shows data flow clearly
- Modular design enables easy modification and testing
- Version control tracks workflow evolution over time
- Documentation generation creates automatic workflow guides

The integration of workflow blueprints with Quartermaster transforms Studio from a development framework into a comprehensive visual automation platform, enabling teams to build sophisticated workflow applications with the same ease as traditional web applications.

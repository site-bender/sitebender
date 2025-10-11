# Custodian Implementation Plan

> **Comprehensive roadmap for building Studio's state management system with progressive enhancement, continuations, and visual workflow design**

## Overview

This plan outlines the implementation of Custodian from foundational web principles (URL-as-state, stateless HTTP) to sophisticated visual state machine workflows with event sourcing and distributed state synchronization. Custodian rejects the antipattern of duplicating server state on the client, instead embracing the web's original stateless design with progressive enhancement.

## Implementation Philosophy

- **Stateless by Default**: URL and forms encode all UI state
- **Progressive Enhancement**: Works without JavaScript, enhances with it
- **Server as Source of Truth**: No client-side state duplication
- **Continuations for Flows**: Cryptographically signed resumable workflows
- **Event Sourcing Integration**: State machines emit events via Operator
- **Visual Design**: State machines as visual workflows (n8n-style)
- **Pure Functions**: All state transitions are deterministic and testable

## Phases

### Phase 1: URL-as-State Foundation

**Goal**: Complete UI state encoded in URLs with stateless server rendering

#### Milestones

**M1.1: URL State Model**

- Define URL structure for UI state (query params, fragments)
- State serialization functions (pure, curried)
- State deserialization functions
- URL generation from state object
- URL validation and sanitization

**M1.2: Server-Side Rendering**

- Read state from URL query parameters
- Render appropriate UI for current state
- No client-side state required
- Works in Lynx/IE11 (text browsers)
- Semantic HTML only (no JavaScript)

**M1.3: Form-Based State Mutations**

- Forms as state transition mechanisms
- HTTP POST/PUT/DELETE methods
- Server processes form → new state → new URL
- Form validation server-side
- Redirect to new URL after mutation

**M1.4: Idempotent Operations**

- UUID-based operation IDs
- Server-generated UUIDs in forms
- Idempotency key checking
- Exactly-once semantics
- Operation result caching

**M1.5: Client-Side URL Updates**

- JavaScript intercepts link clicks
- Update URL via pushState
- Re-render without page load
- Fallback: works without JavaScript
- History API integration

#### Definition of Done

- ✓ All UI state in URL query params
- ✓ Server renders from URL state
- ✓ Works perfectly in Lynx (no JavaScript)
- ✓ Forms submit via HTTP, redirect to new state
- ✓ JavaScript intercepts and updates locally
- ✓ 100% test coverage on state serialization
- ✓ Property-based tests for URL encoding/decoding
- ✓ Zero client-side state duplication

#### Deliverables

- URL state schema documentation
- State serialization library
- Server-side rendering integration
- Form handling utilities
- Progressive enhancement layer
- Test suite

---

### Phase 2: Cryptographic Continuations

**Goal**: Resumable multi-step workflows with tamper-proof continuation tokens

#### Milestones

**M2.1: Continuation Data Model**

- Continuation structure (step, data, remaining steps)
- Rollback chain (previous continuation)
- Expiration timestamp
- Nonce for replay prevention
- TypeScript types for Continuation IR

**M2.2: Cryptographic Signing**

- Ed25519 signing of continuations
- HMAC for symmetric key scenarios
- Signature verification
- Key rotation support
- Tamper detection

**M2.3: Continuation Serialization**

- Base64 encoding for URLs
- JSON serialization of continuation data
- Compression for large continuations
- Size limits (prevent DoS)
- URL-safe encoding

**M2.4: Resumable Workflows**

- Multi-step form wizards
- Save-for-later functionality
- Bookmark mid-workflow and resume
- Continuation expiration handling
- Graceful degradation (expired continuations)

**M2.5: Privacy-Aware Continuations**

- Public data (goes in URL)
- Private data (server-side only)
- Proof of validity without exposure
- Zero-knowledge resumption tokens
- Selective disclosure

#### Definition of Done

- ✓ Continuations cryptographically signed
- ✓ Tamper detection functional
- ✓ Multi-step forms resumable from bookmark
- ✓ Continuation expiration enforced
- ✓ Private data never in URLs
- ✓ Zero-knowledge proofs validate state
- ✓ Property-based tests for crypto invariants
- ✓ Security audit on continuation implementation

#### Deliverables

- Continuation data model
- Signing/verification library
- Serialization utilities
- Workflow wizard components
- Privacy mechanisms
- Security documentation

---

### Phase 3: State Machine Primitives

**Goal**: Pure functional state machines with declarative definitions

#### Milestones

**M3.1: State Machine Model**

- Discriminated unions for states
- Event type definitions
- Transition functions (pure)
- Guard predicates
- Action lists per transition

**M3.2: State Machine Execution**

- Current state tracking
- Event processing
- Transition validation
- Guard evaluation
- Action execution

**M3.3: State Machine as Data**

- State machines as RDF triples
- SPARQL queries over state machines
- State machine serialization (Turtle/JSON/YAML)
- State machine versioning
- State machine composition

**M3.4: Server-Side State Machines**

- Form submissions as state machine events
- Server computes next state
- Redirect to URL with new state
- Works without JavaScript
- Stateless HTTP semantics

**M3.5: Client-Side Enhancement**

- JavaScript intercepts form submissions
- Local state machine execution
- Optimistic state transitions
- Background sync to server
- Conflict resolution

#### Definition of Done

- ✓ State machines defined as discriminated unions
- ✓ Transitions are pure functions
- ✓ State machines stored as RDF triples
- ✓ Server-side execution functional
- ✓ Client-side progressive enhancement works
- ✓ Works identically with/without JavaScript
- ✓ 100% test coverage on state transitions
- ✓ Property-based tests for state machine invariants

#### Deliverables

- State machine data model
- Execution engine
- Triple store integration
- Server-side handlers
- Client-side enhancement layer
- Test suite

---

### Phase 4: Event Sourcing Integration

**Goal**: State machines emit events to Operator, state derived from event history

#### Milestones

**M4.1: State Transitions as Events**

- Every state transition produces event
- Events published to Operator
- Event payload includes (from state, to state, event trigger)
- Events stored as RDF triples
- SPARQL queries over state history

**M4.2: State from Event Replay**

- Current state derived by folding events
- Replay from any point in history
- Time-travel debugging
- Event validation (Warden contracts)
- Idempotent event application

**M4.3: CQRS Pattern**

- Commands (form submissions) produce events
- Events update state machines
- Queries are nullipotent (pure reads)
- Command/query separation enforced
- Event audit trail

**M4.4: Event Snapshots**

- Periodic state snapshots
- Snapshot validation (hash of events)
- Replay from snapshot + subsequent events
- Snapshot pruning strategies
- Performance optimization

**M4.5: Distributed State Machines**

- State machine events via Operator P2P
- CRDT-based state convergence (via Agent)
- Conflict-free state synchronization
- Vector clock ordering
- Eventual consistency

#### Definition of Done

- ✓ All state transitions produce events
- ✓ Events published to Operator triple store
- ✓ Current state derived from event replay
- ✓ Time-travel debugging functional
- ✓ CQRS pattern enforced
- ✓ Snapshots accelerate replay
- ✓ Distributed state machines synchronize
- ✓ Property-based tests for event sourcing invariants

#### Deliverables

- Event emission integration
- Event replay engine
- CQRS utilities
- Snapshot mechanism
- Distributed state synchronization
- Event sourcing test suite

---

### Phase 5: Generator-Based State Machines

**Goal**: Resumable state machines using generator functions

#### Milestones

**M5.1: Generator State Machine Model**

- Generator functions for state transitions
- Yield points as state checkpoints
- Resumable execution via `next()`
- State carried through generator
- Generator composition

**M5.2: Generator Continuation**

- Serialize generator state
- Resume from serialized checkpoint
- Continuation token includes generator state
- Crash-resilient workflows
- Long-running workflows

**M5.3: Generator Error Handling**

- Try/catch within generators
- Error state transitions
- Rollback on error
- Compensation actions
- Error recovery workflows

**M5.4: Generator Performance**

- Lazy evaluation of states
- Only compute next state when needed
- Memory-efficient for large state spaces
- Stream-like processing
- Backpressure handling

**M5.5: Generator Testing**

- Property-based tests for generators
- Generator state snapshot testing
- Resumption testing
- Error path testing
- Performance benchmarks

#### Definition of Done

- ✓ State machines can use generators
- ✓ Generator state serializable
- ✓ Resumption from continuation works
- ✓ Error handling functional
- ✓ Performance meets targets (< 1ms transitions)
- ✓ Generators integrate with event sourcing
- ✓ Property-based tests pass
- ✓ Documentation on generator patterns

#### Deliverables

- Generator state machine implementation
- Continuation serialization for generators
- Error handling utilities
- Performance benchmarks
- Generator testing framework
- Generator pattern documentation

---

### Phase 6: Visual State Machine Designer

**Goal**: n8n-style visual workflow designer for state machines

#### Milestones

**M6.1: Canvas & Node System**

- Drag-and-drop canvas (HTML5 Canvas or SVG)
- State nodes (draggable, connectable)
- Transition edges (Bezier curves)
- Node palette (state types: start, end, form, decision, etc.)
- Grid snapping and alignment

**M6.2: State Node Configuration**

- Visual property editing
- Form field configuration
- Action definitions
- Guard conditions
- Metadata (labels, colors, icons)

**M6.3: Transition Configuration**

- Event triggers
- Guard conditions (visual expression builder)
- Action lists
- Transition priority
- Visual path styling (color, thickness, dashed)

**M6.4: Validation & Analysis**

- Deadlock detection
- Unreachable state detection
- Infinite loop prevention
- Required field validation
- Visual error indicators

**M6.5: Code Generation**

- State machine → TypeScript code
- RDF triple generation
- YAML/JSON export
- Import from code
- Bidirectional sync

#### Definition of Done

- ✓ Visual designer functional
- ✓ Drag-and-drop state creation
- ✓ Transition drawing with Bezier curves
- ✓ Node configuration UI complete
- ✓ Validation detects deadlocks/loops
- ✓ Generated code matches visual design
- ✓ Bidirectional sync works
- ✓ Designer built with Pagewright

#### Deliverables

- Visual designer application
- Canvas rendering engine
- Node/edge configuration UI
- Validation engine
- Code generation utilities
- Designer documentation

---

### Phase 7: Real-Time State Execution Visualization

**Goal**: Watch state machines execute in real-time with visual feedback

#### Milestones

**M7.1: Execution Highlighting**

- Active state pulsing/highlighting
- Transition animations
- State history breadcrumb trail
- Event trigger indicators
- Time-in-state display

**M7.2: Data Flow Visualization**

- Show data moving through transitions
- Input/output displays
- Variable values at each state
- Continuation token inspection
- Event payload display

**M7.3: Execution Metrics**

- State duration tracking
- Transition count
- Error count
- Retry attempts
- Performance metrics (latency per state)

**M7.4: Debugging Tools**

- State breakpoints
- Step-through execution
- Variable inspection
- Event replay with debugging
- Causal chain visualization

**M7.5: Multi-Instance Visualization**

- Show multiple state machine instances
- Instance filtering (by entity, status)
- Aggregate statistics
- Heatmaps (state utilization)
- Flow diagrams (common paths)

#### Definition of Done

- ✓ Active states highlighted in real-time
- ✓ Transition animations smooth
- ✓ Data flow visible
- ✓ Execution metrics displayed
- ✓ Debugging tools functional
- ✓ Multi-instance view works
- ✓ Visualization integrates with Envoy
- ✓ Performance (60fps animations)

#### Deliverables

- Execution visualization engine
- Animation system
- Metrics dashboard
- Debugging UI
- Multi-instance visualizer
- Visualization documentation

---

### Phase 8: Collaborative State Machine Design

**Goal**: Real-time multi-user state machine editing

#### Milestones

**M8.1: CRDT-Based Canvas**

- State machines as CRDTs (via Agent)
- Conflict-free collaborative editing
- Real-time node position sync
- Automatic conflict resolution
- Offline editing support

**M8.2: Presence & Cursors**

- Show collaborator cursors
- User color coding
- Active selection indicators
- Name labels
- Idle/active status

**M8.3: Voice Integration**

- Voice chat during collaboration
- Voice commands for editing ("add state", "connect to", etc.)
- AI-assisted state machine design
- Natural language → state machine
- Context-aware suggestions

**M8.4: Permission System**

- Role-based editing permissions (Warden)
- Read-only vs edit access
- State-level permissions
- Approval workflows for critical changes
- Audit trail of changes

**M8.5: Session Management**

- Collaborative session creation
- Session links (shareable URLs)
- Session replay
- Session archival
- Session recovery after disconnect

#### Definition of Done

- ✓ Multiple users edit simultaneously
- ✓ CRDT prevents conflicts
- ✓ Cursor/presence visible
- ✓ Voice chat functional
- ✓ Voice commands work
- ✓ Permissions enforced
- ✓ Sessions shareable via URL
- ✓ Collaboration via Operator events

#### Deliverables

- CRDT canvas implementation
- Presence system
- Voice integration
- Permission enforcement
- Session management
- Collaboration documentation

---

### Phase 9: Workflow State Recovery

**Goal**: Automatic recovery from crashes, network partitions, and failures

#### Milestones

**M9.1: Checkpoint Strategy**

- Auto-save intervals (configurable)
- State snapshots on transitions
- Incremental state updates
- Checkpoint visualization
- Checkpoint pruning

**M9.2: Crash Recovery**

- Restore from last checkpoint
- Replay missed events
- Validate state consistency
- Resume from safe point
- Recovery UI (show recovery progress)

**M9.3: Network Partition Handling**

- Offline state queue
- Partition detection
- CRDT merge on reconnection
- Conflict resolution strategies
- Visual partition indicators

**M9.4: Failure Modes**

- Timeout handling
- Resource exhaustion (memory, storage)
- Invalid state detection
- Rollback mechanisms
- Compensation workflows

**M9.5: Recovery Testing**

- Chaos testing (random crashes)
- Network partition simulation
- Concurrent state mutations
- Byzantine fault injection
- Recovery time measurement

#### Definition of Done

- ✓ State survives crashes
- ✓ Recovery from checkpoint functional
- ✓ Network partitions heal gracefully
- ✓ Offline state queued correctly
- ✓ Chaos tests pass
- ✓ Recovery time < 1s
- ✓ No data loss
- ✓ Property-based tests for recovery invariants

#### Deliverables

- Checkpoint implementation
- Recovery engine
- Partition handling
- Failure mode handlers
- Chaos test suite
- Recovery documentation

---

### Phase 10: State Machine Analytics

**Goal**: Performance analysis and optimization insights

#### Milestones

**M10.1: Flow Analytics**

- State utilization heatmaps
- Transition frequency
- Bottleneck detection
- Path analysis (common flows)
- Abandonment points

**M10.2: User Journey Analysis**

- Path visualization (user flows)
- Conversion funnels
- Drop-off analysis
- Time-to-completion metrics
- Cohort analysis

**M10.3: Performance Optimization**

- Slow state detection
- Optimization suggestions
- A/B testing alternate flows
- Parallelization opportunities
- State coalescing

**M10.4: Predictive Analytics**

- Next-state prediction (ML-based)
- Abandonment risk detection
- Completion time estimation
- Resource demand forecasting
- Anomaly detection

**M10.5: Analytics Dashboard**

- Real-time metrics visualization
- Historical trend analysis
- Custom metric queries (SPARQL)
- Export to BI tools
- Alert configuration

#### Definition of Done

- ✓ Heatmaps show state utilization
- ✓ Bottlenecks identified automatically
- ✓ User journeys visualized
- ✓ Conversion funnels computed
- ✓ Optimization suggestions provided
- ✓ Predictive analytics functional
- ✓ Dashboard integrated with Envoy
- ✓ All metrics queryable via SPARQL

#### Deliverables

- Analytics engine
- Flow analysis tools
- User journey visualizer
- Optimization recommender
- Predictive models
- Analytics dashboard

---

### Phase 11: Workflow Integration

**Goal**: State machines integrate with Operator workflows

#### Milestones

**M11.1: State Machine as Workflow**

- State machines as workflow phases
- Embedded state machines in workflows
- State callbacks (on enter, on exit)
- State machine composition
- Nested state machines

**M11.2: Cross-Workflow Communication**

- State machine events trigger workflows
- Workflow events trigger state transitions
- Event-based orchestration
- Conditional workflow triggers
- Workflow blocking based on state

**M11.3: Distributed Workflow State**

- State machines distributed across nodes (Agent)
- Phase execution on different executors
- State synchronization via Operator
- Distributed state recovery
- Consensus on state transitions

**M11.4: External System Integration**

- State machine events to webhooks
- External events trigger transitions
- API polling → state machine events
- Integration templates (GitHub, Slack, etc.)
- Scheduled state transitions (cron-like)

**M11.5: Workflow Templates**

- Common workflow patterns
- State machine libraries
- Template marketplace
- Version control for state machines
- Template customization

#### Definition of Done

- ✓ State machines embed in workflows
- ✓ Cross-workflow events functional
- ✓ Distributed state machines work
- ✓ External integrations functional
- ✓ 10+ workflow templates available
- ✓ Template marketplace operational
- ✓ Integration via Operator events
- ✓ Documentation for integration patterns

#### Deliverables

- Workflow integration layer
- Event routing system
- Distributed state implementation
- External integration library
- Template marketplace
- Integration documentation

---

### Phase 12: State Monad Integration

**Goal**: State monad for threading state through computations

#### Milestones

**M12.1: State Monad Implementation**

- State monad data structure
- `bind` and `return` operations
- `get`, `put`, `modify` primitives
- Monad laws validation
- Type-safe state threading

**M12.2: State Monad Composition**

- Compose state transformations
- Sequential state operations
- Parallel state operations (where safe)
- Error handling with Either monad
- Monad transformer stack

**M12.3: State Machine with Monad**

- State transitions as monadic computations
- Thread state through transition chain
- Pure state transformations
- Effect isolation
- Referential transparency

**M12.4: Performance Optimization**

- Lazy evaluation of monadic chain
- Memoization of state computations
- Batching state updates
- Minimal allocations
- Benchmarking vs direct style

**M12.5: Testing & Documentation**

- Property-based tests for monad laws
- Monadic state machine examples
- Tutorial on State monad usage
- Performance comparison docs
- Best practices guide

#### Definition of Done

- ✓ State monad implemented
- ✓ Monad laws verified (property tests)
- ✓ State machines can use monads
- ✓ Composition works correctly
- ✓ Performance acceptable (< 10% overhead)
- ✓ Documentation complete
- ✓ Examples for common patterns
- ✓ Integration with existing state machines

#### Deliverables

- State monad implementation
- Composition utilities
- State machine integration
- Performance benchmarks
- Tutorial documentation
- Example repository

---

### Phase 13: Integration & Ecosystem

**Goal**: Seamless integration with all Studio libraries

#### Milestones

**M13.1: Architect Integration**

- State changes trigger Architect calculations
- Form values reactive to state
- Calculation results update state
- Bidirectional data binding
- No VDOM overhead

**M13.2: Operator Integration**

- State transitions produce events
- Events trigger state transitions
- Event-driven state machines
- Distributed state via Operator
- CQRS pattern enforcement

**M13.3: Agent Integration**

- State machines as CRDTs
- Distributed state convergence
- Conflict-free state sync
- Peer-to-peer state machines
- Offline-first state management

**M13.4: Warden Integration**

- State transition validation (contracts)
- State machine contract enforcement
- Capability-based state access
- Transition authorization
- Audit trail via events

**M13.5: Sentinel Integration**

- Authentication-gated states
- Authorization checks per transition
- User-specific state machines
- Session state management
- DID-based state signing

#### Definition of Done

- ✓ All Studio libraries integrate
- ✓ State-driven architecture works
- ✓ No tight coupling
- ✓ State as universal mechanism
- ✓ Documentation for each integration
- ✓ Examples for common patterns
- ✓ Integration tests pass

#### Deliverables

- Integration documentation
- Example applications
- Integration test suite
- Migration guides
- Best practices documentation

---

### Phase 14: Documentation & Developer Experience

**Goal**: Comprehensive documentation and excellent DX

#### Milestones

**M14.1: API Documentation**

- Envoy-generated API docs
- TSX component reference
- Function signatures
- Usage examples
- State machine patterns

**M14.2: Tutorials & Guides**

- Getting started guide
- State machine tutorial
- Continuation patterns
- Event sourcing with state machines
- Visual designer guide

**M14.3: Migration Guides**

- From client-side state (Redux, MobX)
- From server-side frameworks
- From traditional routing
- URL-as-state migration
- Breaking change documentation

**M14.4: Pattern Library**

- Common state machine patterns
- Form wizard patterns
- Multi-step checkout
- Approval workflows
- Onboarding flows

**M14.5: Troubleshooting**

- Common errors and solutions
- Debugging techniques
- State machine visualization tips
- Performance tuning
- Support resources

#### Definition of Done

- ✓ API documentation complete
- ✓ 10+ tutorials published
- ✓ Migration guides available
- ✓ 20+ pattern examples
- ✓ Troubleshooting documentation
- ✓ All examples tested
- ✓ Documentation searchable
- ✓ Code samples compileable

#### Deliverables

- Complete API reference
- Tutorial library
- Migration guides
- Pattern documentation
- Troubleshooting guide
- Example repository

---

### Phase 15: Production Hardening & Release

**Goal**: Battle-tested, production-ready release

#### Milestones

**M15.1: Chaos Testing**

- Random state mutations
- Continuation corruption scenarios
- Network partitions during workflows
- Concurrent state machine instances
- Resource exhaustion

**M15.2: Performance Validation**

- Sustained load testing (24+ hours)
- Memory leak detection
- State transition latency (< 1ms)
- Large state machine performance
- Visualization performance (60fps)

**M15.3: Security Audit**

- Continuation signing review
- Cryptographic implementation audit
- XSS/CSRF prevention verification
- Privacy leak analysis
- Penetration testing

**M15.4: Compatibility Testing**

- Browser compatibility (including Lynx)
- Works without JavaScript
- Progressive enhancement verified
- Deno compatibility
- Mobile browser testing

**M15.5: Release Preparation**

- Semantic versioning
- Changelog generation
- Release notes
- Deprecation notices
- Upgrade path documentation

#### Definition of Done

- ✓ Chaos tests pass
- ✓ Performance targets met
- ✓ Security audit passed
- ✓ Works in Lynx (no JS)
- ✓ Progressive enhancement verified
- ✓ Release documentation complete
- ✓ Breaking changes documented
- ✓ v1.0.0 released

#### Deliverables

- Chaos test suite
- Performance test results
- Security audit report
- Compatibility matrix
- Release package
- Migration guide

---

## Success Metrics

### Functional

- ✓ State machines work without JavaScript
- ✓ Continuations cryptographically secure
- ✓ Event sourcing via Operator
- ✓ Visual designer functional
- ✓ Collaborative editing works
- ✓ Distributed state synchronizes

### Performance

- ✓ < 1ms state transition latency
- ✓ < 100ms continuation signing
- ✓ 60fps visual animations
- ✓ < 1s crash recovery time
- ✓ 1000+ concurrent state machines
- ✓ Zero data loss

### Quality

- ✓ 100% test coverage
- ✓ Property-based tests for invariants
- ✓ Security audit passed
- ✓ Documentation for all public APIs
- ✓ Examples for common patterns

### Ecosystem

- ✓ Integrates with all Studio libraries
- ✓ Used by Quartermaster workflows
- ✓ Used by Operator state machines
- ✓ Visual designer adopted
- ✓ Community patterns emerging

---

## Risk Mitigation

### Technical Risks

**Risk**: Continuation security vulnerabilities
**Mitigation**: Cryptographic signing with Ed25519, external security audit, time-bound tokens

**Risk**: Visual designer performance with large state machines
**Mitigation**: Canvas virtualization, level-of-detail rendering, WASM acceleration

**Risk**: State synchronization conflicts
**Mitigation**: CRDT-based state, vector clocks, comprehensive conflict tests

**Risk**: Generator serialization complexity
**Mitigation**: Well-defined serialization format, extensive testing, fallback to explicit state

### Organizational Risks

**Risk**: Scope creep (too many features)
**Mitigation**: Phased approach, clear milestones, defer non-essential features

**Risk**: Visual designer complexity
**Mitigation**: Start simple, iterate based on feedback, reference n8n patterns

**Risk**: Documentation falls behind
**Mitigation**: Envoy auto-generation, docs as code, regular doc reviews

---

## Dependencies

### Internal Studio Libraries

- **Toolsmith**: Curried functions, functional utilities (Either, Maybe, etc.)
- **Operator**: Event emission, CQRS, event sourcing integration
- **Agent**: CRDT state machines, distributed synchronization
- **Warden**: State transition validation, contracts
- **Sentinel**: Authentication/authorization for state access
- **Pagewright**: Visual designer UI components
- **Envoy**: Documentation generation, analytics dashboard

### External Dependencies

- **Deno**: Runtime (standard library for crypto, HTTP)
- **Web Crypto API**: Continuation signing (Ed25519)
- **Temporal**: Timestamp representation
- **SPARQL**: Query language for state history
- **HTML5 Canvas/SVG**: Visual designer rendering

### Optional Enhancements

- **ML libraries**: Predictive analytics (future phase)
- **Graph databases**: State machine relationship queries
- **Blockchain**: Snapshot consensus (community-driven)

---

## Timeline

**Phase 1-3**: URL-as-state, continuations, state machine primitives (2-3 months)
**Phase 4-6**: Event sourcing, generators, visual designer (3-4 months)
**Phase 7-9**: Execution visualization, collaboration, recovery (3-4 months)
**Phase 10-12**: Analytics, workflow integration, State monad (2-3 months)
**Phase 13-15**: Ecosystem integration, documentation, hardening (2-3 months)

**Total**: ~12-18 months to v1.0.0

**Note**: Timelines are estimates. Everything is ASAP, prioritized by value and dependencies. Phases may overlap or execute in parallel where possible.

---

## Post-v1.0 Roadmap

### Future Enhancements

- Machine learning-based state prediction
- GraphQL interface for state queries
- State machine schema evolution tools
- Multi-region state replication
- Advanced visual designer features (sub-machines, macros)
- State machine marketplace (community templates)
- IDE integrations (VSCode, Zed state machine plugins)

### Community Contributions

- Additional workflow templates
- State machine patterns library
- Visual designer themes
- Performance optimizations
- Language bindings (if needed)

---

## Conclusion

Custodian restores the web's fundamental stateless architecture while adding sophisticated state management capabilities through progressive enhancement. By encoding state in URLs, using cryptographic continuations for workflows, and integrating event sourcing with visual state machine design, Custodian provides the foundation for applications that work everywhere—from text browsers to distributed P2P systems—without sacrificing modern DX or capabilities.

The implementation builds methodically from web fundamentals to advanced distributed state synchronization, always maintaining the principle that **the web's original design was right: stateless, semantic, progressive**.

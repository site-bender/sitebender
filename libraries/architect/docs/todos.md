# Architect Implementation Todos

This document outlines the path to achieve the vision described in the README. Tasks are organized by priority and dependencies.

## Core Philosophy: Data-Centric Architecture

**CRITICAL**: Everything in Architect derives from data, not from UI widgets. The data shapes the interface, not the other way around. This is the fundamental paradigm shift that makes Architect revolutionary:

- Forms are generated from data types, not HTML widgets
- Validation rules come from the data schema (SHACL/database constraints)
- UI components are selected based on data characteristics
- The entire application can be stored as data and reconstructed

Remember: **Data is the single source of truth. UI is just a view of that data.**

## NEW: Declarative Testing Infrastructure

### Mock Response Generation Components

- [ ] `<MockResponse>` - Base response builder component
- [ ] `<From.TripleStore>` - Generate from SPARQL queries
- [ ] `<From.Generator>` - Generate from SHACL/OWL schemas
- [ ] `<From.Fixture>` - Load from fixture files
- [ ] `<Transform>` - Apply transformations to responses

### Scenario State Management

- [ ] `<Scenario>` - Container for test scenarios
- [ ] `<State>` - Define initial state as triples
- [ ] `<Transition>` - State transitions based on triggers
- [ ] `<Timeline>` - Time-based state changes
- [ ] `<Branch>` - Conditional scenario paths

### Data Generation from Schemas

- [ ] SHACL to mock data generator
- [ ] OWL2 to mock data generator
- [ ] JSON Schema to mock data generator
- [ ] Respect all constraints (min/max, patterns, etc.)
- [ ] Generate edge cases automatically

### TestHarness Meta-Component

- [ ] `<TestHarness>` - Orchestrates all testing libraries
- [ ] Coordinate with Agent's IoInterceptor
- [ ] Integrate with Auditor's contract verification
- [ ] Connect to Custodian's state machines
- [ ] Link to Envoy's observability

### Cross-Library Test Integration

- [ ] Implement contract testing framework from cross-library-testing-strategy.md
- [ ] Create integration test runner for multi-library workflows
- [ ] Build system test orchestrator for end-to-end scenarios
- [ ] Connect all test execution to triple store for replay
- [ ] Generate test documentation automatically via Envoy

## Phase 1: Foundation Cleanup (Week 1-2)

### Remove Legacy Code

- [ ] Delete `src/constructors/elements` folder entirely (HTML elements belong in Pagewright)
- [ ] Remove all element constructors that duplicate Pagewright functionality
- [ ] Clean up commented console.log statements throughout codebase
- [ ] Remove unused/incomplete stub files in `src/pending`

### Fix Import Architecture

- [ ] Replace dynamic imports in `composeOperators` with static registry pattern
- [ ] Create operator registry at `src/operations/operators/registry.ts`
- [ ] Create injector registry at `src/injectors/registry.ts`
- [ ] Create comparator registry at `src/operations/comparators/registry.ts`
- [ ] Update all composers to use registries instead of dynamic imports
- [ ] Ensure all imports follow Warden rules (direct imports, no barrels)

### Organize Behavior Components

- [ ] Move all constructor functions to use JSX pattern
- [ ] Create `src/components/validation/` for validation components
- [ ] Create `src/components/calculation/` for calculation components
- [ ] Create `src/components/display/` for display components
- [ ] Create `src/components/formatting/` for formatting components

## Phase 2: JSX Integration (Week 2-3)

### Create JSX Runtime

- [ ] Implement `src/jsx-runtime/index.ts` with createElement function
- [ ] Implement `src/jsx-runtime/jsx-runtime.ts` for automatic JSX transform
- [ ] Create Fragment handler that works with IR
- [ ] Add jsx and jsxs exports for React 17+ transform

### Define IR Specification

- [ ] Create `docs/ir-specification.md` with complete IR format
- [ ] Define IR node types (element, operator, validator, formatter, injector)
- [ ] Document property mappings from JSX to IR
- [ ] Create TypeScript types at `src/types/ir.ts`
- [ ] Add validation functions for IR structure

### Build JSX to IR Pipeline

- [ ] Create `src/compiler/jsxToIr.ts` transformer
- [ ] Hook into TypeScript compiler API (leverage Arborist when ready)
- [ ] Handle nested components properly
- [ ] Preserve source locations for debugging
- [ ] Generate unique IDs for each IR node

## Phase 3: Persistence Layer (Week 3-4)

### JSON Serialization

- [ ] Create `src/persistence/toJson.ts` for IR → JSON
- [ ] Create `src/persistence/fromJson.ts` for JSON → IR
- [ ] Add JSON schema validation
- [ ] Handle circular references
- [ ] Optimize JSON size (consider compression)

### YAML Support

- [ ] Create `src/persistence/toYaml.ts` for IR → YAML
- [ ] Create `src/persistence/fromYaml.ts` for YAML → IR
- [ ] Ensure YAML preserves all IR properties
- [ ] Add YAML schema documentation

### RDF/Turtle Generation

- [ ] Create `src/persistence/toRdf.ts` for IR → RDF triples
- [ ] Create `src/persistence/fromRdf.ts` for RDF → IR
- [ ] Define Architect ontology at `docs/architect.owl`
- [ ] Map IR nodes to RDF subjects
- [ ] Map properties to RDF predicates
- [ ] Handle nested structures as blank nodes or named graphs

### SHACL Constraint Generation

- [ ] Create `src/shacl/generateConstraints.ts`
- [ ] Map validation components to SHACL shapes
- [ ] Generate property shapes from validations
- [ ] Handle complex logical combinations (AND, OR, NOT)
- [ ] Include error messages in SHACL

## Phase 4: Rendering Pipeline (Week 4-5)

### Server-Side Rendering

- [ ] Enhance `src/rendering/ssr/index.ts` for production SSR
- [ ] Create `src/rendering/ssr/irToHtml.ts` for IR → HTML
- [ ] Embed configuration in data attributes
- [ ] Generate hydration scripts
- [ ] Handle async data fetching during SSR
- [ ] Add streaming SSR support

### Client-Side Hydration

- [ ] Create `src/rendering/client/hydrate.ts`
- [ ] Parse data attributes to recover configurations
- [ ] Attach behaviors (**sbCalculate, **sbValidate, \_\_sbFormat)
- [ ] Set up event listeners
- [ ] Initialize dependency tracking
- [ ] Handle progressive enhancement

### Behavior Composition

- [ ] Refactor `src/rendering/buildDomTree` to work with IR
- [ ] Ensure calculation cascading works correctly
- [ ] Implement efficient dependency tracking
- [ ] Add cycle detection in calculations
- [ ] Optimize re-calculation triggers

## Phase 5: Component Library - Data-Centric Architecture (Week 5-6)

### Core Components - Data First!

- [ ] Implement all injector components using From namespace
- [ ] Implement all operator components as JSX
- [ ] Implement all comparator components with Referent/Comparand
- [ ] Implement all formatter components using As namespace
- [ ] Implement all display components as JSX

### Data-Driven Form Components (CRITICAL - This is the Future!)

- [ ] Implement data type fields (NOT widget-based):
  - [ ] BooleanField, TrileanField
  - [ ] IntegerField, FloatField, PrecisionField
  - [ ] StringField, EmailField, PhoneNumberField, UrlField
  - [ ] DateField, TimeField, DateTimeField, MonthDayField, YearMonthField
  - [ ] MemberField (choose one), SubsetField (choose multiple)
  - [ ] AddressField, PostalCodeField, CreditCardField
- [ ] Create widget selection logic based on data characteristics
- [ ] Implement configurable thresholds (RADIO_MAX_ITEMS, etc.)
- [ ] Build form generation from database schemas
- [ ] Ensure validation derives from data types, not widgets

### Component Documentation

- [ ] Generate component documentation from TypeScript
- [ ] Add JSDoc comments to all components
- [ ] Create usage examples for each component
- [ ] Document component props and behavior
- [ ] Add component playground in the-workshop

### Type Safety

- [ ] Add full TypeScript types for all components
- [ ] Ensure props are properly typed
- [ ] Add generic types where appropriate
- [ ] Create type guards for runtime validation
- [ ] Export types for consumer use

## Phase 6: Database Integration - Data as the Single Source of Truth (Week 6-7)

### Data-Centric Storage Philosophy

- [ ] Ensure all UI definitions are purely data (no code strings)
- [ ] Forms derive from database schemas automatically
- [ ] Validation rules come from SHACL/database constraints
- [ ] Widget selection based on data type definitions in schema
- [ ] Support storing entire applications as data

### Query Interface

- [ ] Create `src/database/query.ts` for fetching UI definitions
- [ ] Support different database types (SQL, NoSQL, Triple Store)
- [ ] Add caching layer for UI definitions
- [ ] Handle versioning of UI definitions
- [ ] Support partial updates

### Triple Store Integration

- [ ] Create `src/triplestore/client.ts` for SPARQL queries
- [ ] Implement UI component queries
- [ ] Add SHACL validation before storage
- [ ] Support named graphs for multi-tenancy
- [ ] Handle transaction boundaries

### Migration Tools

- [ ] Create `src/database/migrate.ts` for schema updates
- [ ] Support UI definition versioning
- [ ] Handle backward compatibility
- [ ] Add rollback capabilities
- [ ] Document migration strategies

## Phase 7: Testing & Documentation (Week 7-8)

### Unit Tests

- [ ] Test all injectors with various inputs
- [ ] Test all operators with edge cases
- [ ] Test all comparators with type variations
- [ ] Test IR generation from JSX
- [ ] Test persistence round-trips

### Integration Tests

- [ ] Test full rendering pipeline
- [ ] Test SSR with hydration
- [ ] Test calculation cascading
- [ ] Test validation chains
- [ ] Test database storage and retrieval

### Performance Tests

- [ ] Benchmark rendering performance
- [ ] Test with large component trees
- [ ] Measure hydration time
- [ ] Profile memory usage
- [ ] Optimize hot paths

### Documentation

- [ ] Complete API documentation
- [ ] Add architecture diagrams
- [ ] Create migration guide from v1
- [ ] Write tutorial series
- [ ] Document best practices

## Phase 8: Advanced Features (Week 8+)

### SQL Schema Generation (Future)

- [ ] Create `src/sql/generateSchema.ts`
- [ ] Map validations to CHECK constraints
- [ ] Generate triggers for calculations
- [ ] Create stored procedures for complex operations
- [ ] Support multiple SQL dialects

### GraphQL Integration (Future)

- [ ] Generate GraphQL schema from IR
- [ ] Create resolvers from calculations
- [ ] Add subscription support for reactive updates
- [ ] Generate GraphQL documentation

### OpenAPI Generation (Future)

- [ ] Generate OpenAPI spec from form definitions
- [ ] Include validation rules in schemas
- [ ] Document API endpoints automatically
- [ ] Generate client SDKs

## Development Guidelines

### Code Quality Standards

- One function per file (Warden rule)
- Named exports only
- No barrel files
- Clear separation of concerns
- Comprehensive error handling

### Testing Requirements

- Minimum 80% code coverage
- All public APIs must have tests
- Property-based tests where applicable
- Integration tests for critical paths
- Performance regression tests

### Documentation Standards

- JSDoc for all public functions
- Usage examples for all components
- Architecture decision records (ADRs)
- Inline comments for complex logic
- Update README with new features

## Dependencies on Other Libraries

### Immediate Dependencies

- **Pagewright**: For HTML element rendering
- **Toolsmith**: For functional utilities

### Future Dependencies

- **Arborist**: For JSX transformation hooks
- **Formulator**: For expression parsing
- **Agent**: For distributed synchronization
- **Quarrier**: For property-based testing
- **Auditor**: For proof generation

## Success Metrics

- [ ] All JSX compiles to IR successfully
- [ ] IR round-trips through JSON/YAML/RDF without loss
- [ ] SSR and CSR produce identical DOMs
- [ ] Validation rules work identically on client and server
- [ ] SHACL constraints match JavaScript validations
- [ ] **Forms can be generated purely from data schemas**
- [ ] **Non-developers can create forms using only data field names**
- [ ] **Widget selection is 100% automatic based on data types**
- [ ] **All UI configuration can be stored as data and retrieved**
- [ ] Zero runtime dependencies (except Pagewright)
- [ ] Performance meets or exceeds React for similar operations
- [ ] The-workshop can visualize and edit any Architect component

## Notes

- Keep the existing working rendering pipeline while building the new one
- Maintain backward compatibility until v2 is complete
- Use feature flags to enable new functionality progressively
- Coordinate with other library maintainers for integration points
- Regular check-ins with Warden compliance

## Questions to Resolve

1. Should IR nodes have stable IDs or generate them at runtime?
2. How to handle component versioning in stored UI definitions?
3. Should we support partial hydration or always hydrate everything?
4. How to handle security for stored UI definitions?
5. What's the migration path for existing Architect users?
6. Should calculations be pure or allow side effects?
7. How to handle i18n in stored UI definitions?
8. Should we support custom storage adapters?

## Risk Mitigation

- **Risk**: Dynamic imports breaking with Warden
  - **Mitigation**: Move to static registries immediately
- **Risk**: Performance regression with IR layer
  - **Mitigation**: Benchmark continuously, optimize critical paths
- **Risk**: Breaking changes for existing code
  - **Mitigation**: Maintain v1 compatibility layer during transition
- **Risk**: Complexity overwhelming developers
  - **Mitigation**: Excellent documentation, clear examples, gradual adoption path

## Timeline Summary

- **Week 1-2**: Foundation cleanup and preparation
- **Week 2-3**: JSX integration and IR specification
- **Week 3-4**: Persistence layer implementation
- **Week 4-5**: Rendering pipeline completion
- **Week 5-6**: Component library and documentation
- **Week 6-7**: Database and triple store integration
- **Week 7-8**: Testing, optimization, and documentation
- **Week 8+**: Advanced features and ecosystem integration

This plan transforms Architect from a collection of useful parts into a cohesive, revolutionary system for building data-centric applications.

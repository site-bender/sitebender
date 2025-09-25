# Auditor Implementation Todos

## Core Mission: Formal Verification, Not Just Testing

Auditor proves code correct mathematically, not just by example.

## NEW: Mock Contract Verification

### Contract Validation Components

- [ ] `<ContractVerification>` - Main verification orchestrator
- [ ] `<ValidateRequest>` - Verify requests match schema
- [ ] `<ValidateResponse>` - Verify responses match schema
- [ ] `<ProveInvariants>` - Prove mocks maintain invariants
- [ ] `<DetectDrift>` - Find contract violations

### Mock Coverage Analysis

- [ ] `<MockCoverage>` - Track which mocks were used
- [ ] `<UnhandledRequests>` - Find unmocked requests
- [ ] `<UnusedMocks>` - Find mocks that weren't hit
- [ ] `<CoverageReport>` - Generate coverage metrics

### Contract Generation from Mocks

- [ ] Generate OpenAPI from recorded traffic
- [ ] Generate SHACL from observed data
- [ ] Generate GraphQL schemas from queries
- [ ] Generate property tests from patterns

### Invariant Verification

- [ ] Prove response totals match sum of items
- [ ] Prove discounts never make prices negative
- [ ] Prove authentication tokens are valid
- [ ] Prove rate limits are respected
- [ ] Prove state transitions are valid

### Diff Generation

- [ ] Expected vs actual request/response diff
- [ ] Schema evolution tracking
- [ ] Breaking change detection
- [ ] Compatibility analysis

## Phase 1: Z3 Integration (Highest Priority)

### Basic Z3 Infrastructure

- [ ] Add Z3 WASM bindings
- [ ] Create IR to Z3 translator
- [ ] Implement SMT solver wrapper
- [ ] Add proof certificate generation

### Property Provers

- [ ] Determinism prover
- [ ] Totality prover
- [ ] Bounds prover
- [ ] Termination prover
- [ ] Invariant prover

### Counterexample Generation

- [ ] Convert Z3 models to test inputs
- [ ] Generate minimal failing cases
- [ ] Create regression tests from failures
- [ ] Explain failures in plain English

## Phase 2: IR Analysis Enhancement

### Direct IR Verification

- [ ] Work with Architect's IR format
- [ ] Skip AST when IR available
- [ ] Verify IR transformations
- [ ] Prove optimizations safe

### Complexity Analysis

- [ ] Prove Big-O bounds
- [ ] Detect exponential algorithms
- [ ] Find performance bottlenecks
- [ ] Suggest optimizations

## Phase 3: Property-Based Testing (Fallback)

### When Formal Verification Isn't Possible

- [ ] Generate property tests for unverifiable code
- [ ] Use Quarrier for input generation
- [ ] Shrink counterexamples
- [ ] Statistical confidence metrics

### Integration with Quarrier

- [ ] Use Quarrier's generators
- [ ] Leverage shrinking algorithms
- [ ] Share property definitions
- [ ] Coordinate test execution

## Phase 4: Test Generation (Legacy Support)

### For Code That Can't Be Proven

- [ ] Generate unit tests from properties
- [ ] Create integration tests from scenarios
- [ ] Build regression tests from bugs
- [ ] Produce documentation tests

### Coverage Completion

- [ ] Identify uncovered branches
- [ ] Generate inputs for coverage
- [ ] Create edge case tests
- [ ] Fill verification gaps

## Success Metrics

- [ ] 100% of pure functions formally verified
- [ ] All mocks contract-verified
- [ ] Zero false positives in verification
- [ ] < 1s verification time for typical functions
- [ ] Counterexamples for all failures

## Integration Points

### With Agent
- Verify IO interception correctness
- Prove distributed algorithms
- Validate CRDT properties

### With Architect
- Verify IR transformations
- Prove calculation correctness
- Validate validation logic

### With Warden
- Verify contract compliance
- Prove privacy boundaries
- Validate governance rules

### With Envoy
- Generate verification reports
- Visualize proof trees
- Track verification coverage

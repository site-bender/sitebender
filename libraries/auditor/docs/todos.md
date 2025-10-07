# Auditor Implementation Todos

**Status:** Planning Phase - DO NOT IMPLEMENT YET
**Last Updated:** 2025-01-07

## CRITICAL: Implementation Blocked

**Auditor implementation CANNOT start until:**

1. ✅ **Arborist is complete** - Phase 1 done, API finalized
2. ⏳ **Toolsmith monadic utilities complete** - In progress (fold, map, map2, map3, success, failure, ok, error)
3. ⏳ **Toolsmith branded types complete** - In progress (smart constructors, validation)
4. ⏳ **Toolsmith array utilities complete** - In progress (map, filter, reduce)
5. ⏳ **Quarrier is complete** - Blocked on Toolsmith, provides generators

**Why Blocked:**
- Auditor's entire architecture depends on Result/Validation monads from Toolsmith
- All error handling uses Toolsmith's error creation utilities
- All array operations use Toolsmith's functional utilities (NO native methods)
- Domain types will use Toolsmith's branded type system
- Test data generation depends on Quarrier's generators

**When to Start:**
- Wait for architect's explicit approval
- Verify Toolsmith exports are stable
- Confirm Arborist API is finalized
- Confirm Quarrier generators are available

## Core Mission: Formal Verification, Not Just Testing

Auditor proves code correct mathematically, not just by example.

**Primary Goal:** Use Z3 theorem prover to mathematically verify properties
**Secondary Goal:** Generate comprehensive tests when formal verification isn't possible

## Implementation Phases

See [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) for complete details.

### Phase 1: Z3 Integration Foundation

**Dependencies:** Toolsmith monads ready

- [ ] Research Z3 WASM bindings
- [ ] Implement Z3 initialization
- [ ] Implement IR to Z3 translation
- [ ] Implement Z3 solver wrapper
- [ ] Write Z3 integration tests

### Phase 2: Property Provers

**Dependencies:** Phase 1 complete

- [ ] Implement determinism prover
- [ ] Implement totality prover
- [ ] Implement bounds prover
- [ ] Implement termination prover
- [ ] Implement invariant prover
- [ ] Write prover tests

### Phase 3: Mathematical Property Detection

**Dependencies:** Phase 2 complete, Arborist ready

- [ ] Implement property detection from ParsedFunction
- [ ] Detect purity using Arborist metadata
- [ ] Prove commutativity using Z3
- [ ] Prove associativity using Z3
- [ ] Prove idempotence using Z3
- [ ] Write detection tests

### Phase 4: Counterexample Generation

**Dependencies:** Phase 3 complete

- [ ] Extract counterexamples from Z3 models
- [ ] Generate regression tests from counterexamples
- [ ] Explain failures in plain English
- [ ] Write counterexample tests

### Phase 5: Property-Based Testing (Fallback)

**Dependencies:** Phase 4 complete, Quarrier ready

- [ ] Generate property tests using Quarrier
- [ ] Integrate with Quarrier's checkProperty
- [ ] Leverage Quarrier's shrinking
- [ ] Write property test generation tests

### Phase 6: Test Suite Generation

**Dependencies:** Phase 5 complete

- [ ] Generate unit tests
- [ ] Generate property tests
- [ ] Generate edge case tests
- [ ] Generate branch coverage tests
- [ ] Write test suite generation tests

### Phase 7: Coverage Validation

**Dependencies:** Phase 6 complete

- [ ] Implement coverage validation (100% or explicit ignores)
- [ ] Parse LCOV reports
- [ ] Identify coverage gaps
- [ ] Suggest additional tests
- [ ] Write coverage validation tests

### Phase 8: Test File Writing

**Dependencies:** Phase 7 complete

- [ ] Generate test file content
- [ ] Write to filesystem
- [ ] Format with deno fmt
- [ ] Write file writing tests

### Phase 9: Envoy Integration

**Dependencies:** Phase 8 complete, Envoy ready

- [ ] Format verification results for Envoy
- [ ] Provide mathematical property data
- [ ] Provide proof results
- [ ] Provide gotchas from counterexamples
- [ ] Write Envoy integration tests

### Phase 10: Integration and Testing

**Dependencies:** All phases complete

- [ ] Wire all components together
- [ ] Comprehensive integration tests
- [ ] Self-testing (use Auditor to test Auditor)
- [ ] Performance benchmarking
- [ ] Constitutional compliance verification
- [ ] Update deno.json exports
- [ ] Final documentation review

## Constitutional Rules Compliance

**Every function MUST:**
- ✅ Be curried (data last)
- ✅ Use `function` keyword (NO arrows except type signatures)
- ✅ Return new data (NO mutations)
- ✅ Use `const`, `Readonly`, `ReadonlyArray`
- ✅ Use Toolsmith array utilities (NO native map/filter/reduce)
- ✅ Return Result/Validation (NO exceptions except I/O boundaries)
- ✅ Live in own directory with index.ts
- ✅ Export exactly ONE function as default on same line

## Versioning Policy

**Current Version:** 0.0.1 (pre-production)

**During 0.x development:**
- NO migration paths
- NO backwards compatibility
- NO deprecation warnings
- When design changes: DELETE old, ADD new, UPDATE all docs completely
- Build it RIGHT the FIRST TIME

**After 1.0:** Standard SemVer applies.

## Issue Resolution Protocol

**NO issue trackers. NO tickets. NO backlog.**

**Process:**
1. Hit a problem → Check IMPLEMENTATION_PLAN.md first
2. Still stuck → Present to architect with:
   - Minimal reproduction
   - Error with full context
   - Proposed solution(s)
3. Architect approves
4. Fix immediately
5. Update docs
6. Move on

**Speed is the advantage.** No coordination overhead, no waiting.

## Performance Targets

- Z3 proof (simple): <100ms
- Z3 proof (complex): <1s
- Property detection: <50ms per function
- Test generation: <100ms per function
- Coverage validation: <50ms per file

## Success Criteria

**Phase 2 Complete:**
- ✅ Can prove simple properties with Z3
- ✅ Generates counterexamples for failures
- ✅ All errors use Result monad with suggestions

**Phase 3 Complete:**
- ✅ Detects mathematical properties correctly
- ✅ Proves properties using Z3
- ✅ Integrates with Arborist metadata

**Phase 9 Complete:**
- ✅ Envoy receives high-quality verification data
- ✅ Mathematical properties documented
- ✅ Gotchas from counterexamples included

**Final Completion:**
- ✅ All phases implemented
- ✅ Formal verification working
- ✅ Test generation working
- ✅ 100% coverage achieved
- ✅ Performance targets met
- ✅ Constitutional compliance verified
- ✅ Documentation complete

## Integration with Ecosystem

### With Arborist
- Receives ParsedFile with all metadata
- Uses ParsedFunction for analysis
- Uses body analysis (hasThrow, hasAwait, cyclomaticComplexity)
- Never parses TypeScript directly

### With Quarrier
- Uses generators for test data
- Leverages property-based testing
- Shares property definitions
- Uses shrinking for minimal counterexamples

### With Envoy
- Provides mathematical property data
- Provides proof results
- Provides gotchas from counterexamples
- Provides verification coverage metrics
- Envoy documents these in generated docs

### With Agent (Future)
- Verifies distributed algorithm correctness
- Proves CRDT properties
- Validates consensus mechanisms

---

**This is a PLANNING document. Implementation starts only after architect approval.**

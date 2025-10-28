# Quarrier Implementation Todos

**Status:** Planning Phase - DO NOT IMPLEMENT YET
**Last Updated:** 2025-01-07

## CRITICAL: Implementation Blocked

**Quarrier implementation CANNOT start until:**

1. ✅ **Arborist is complete** - Phase 1 done, API finalized
2. ⏳ **Toolsmith monadic utilities complete** - In progress (fold, map, map2, map3, success, failure, ok, error)
3. ⏳ **Toolsmith branded types complete** - In progress (smart constructors, validation)
4. ⏳ **Toolsmith array utilities complete** - In progress (map, filter, reduce)

**Why Blocked:**

- Quarrier's entire architecture depends on Result/Validation monads from Toolsmith
- All error handling uses Toolsmith's error creation utilities
- All array operations use Toolsmith's functional utilities (NO native methods)
- Domain types will use Toolsmith's branded type system

**When to Start:**

- Wait for architect's explicit approval
- Verify Toolsmith exports are stable
- Confirm Arborist API is finalized

## Implementation Phases

See [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) for complete details.

### Phase 1: PRNG Foundation

**Dependencies:** Toolsmith monads ready

- [ ] Implement createSeed with Result monad
- [ ] Implement advanceSeed (pure function)
- [ ] Implement splitSeed for independence
- [ ] Implement _nextUint32 (internal)
- [ ] Implement _nextFloat53 (internal)
- [ ] Implement _boundedInt without bias
- [ ] Write comprehensive PRNG tests

### Phase 2: Core Generators

**Dependencies:** Phase 1 complete

- [ ] Implement boolean generator with shrinking
- [ ] Implement integer generator with shrinking
- [ ] Implement string generator with shrinking
- [ ] Write generator tests

### Phase 3: Generator Combinators

**Dependencies:** Phase 2 complete

- [ ] Implement array combinator
- [ ] Implement tuple combinator
- [ ] Implement record combinator
- [ ] Implement oneOf combinator
- [ ] Write combinator tests

### Phase 4: Pipeline Composition

**Dependencies:** Phase 3 complete

- [ ] Implement pipe for stage composition
- [ ] Implement identity stage
- [ ] Implement kleisli composition
- [ ] Implement map stage
- [ ] Implement filter stage
- [ ] Implement chain stage
- [ ] Write composition tests

### Phase 5: Shrink Trees

**Dependencies:** Phase 4 complete

- [ ] Implement ShrinkTree creation
- [ ] Implement unfold for lazy trees
- [ ] Implement DFS search
- [ ] Implement resumable shrinking
- [ ] Implement shrinking strategies
- [ ] Write shrinking tests

### Phase 6: Effect System

**Dependencies:** Phase 5 complete

- [ ] Implement Effect ADT
- [ ] Implement effect interpreter
- [ ] Implement effect combinators
- [ ] Write effect tests

### Phase 7: Property Engine

**Dependencies:** Phase 6 complete

- [ ] Implement createProperty
- [ ] Implement createProvenProperty with proof validation
- [ ] Implement checkProperty with shrinking
- [ ] Implement proof validation
- [ ] Write property tests

### Phase 8: Metamorphic Testing

**Dependencies:** Phase 7 complete

- [ ] Implement deriveMetamorphic
- [ ] Implement idempotence derivation
- [ ] Implement involution derivation
- [ ] Implement length-preserving derivation
- [ ] Write metamorphic tests

### Phase 9: Arborist Integration

**Dependencies:** Phase 8 complete

- [ ] Implement fromTypeInfo for type-driven generation
- [ ] Handle all ParsedType variants
- [ ] Write integration tests with Arborist

### Phase 10: Bidirectional Generators

**Dependencies:** Phase 9 complete

- [ ] Implement parse methods for generators
- [ ] Implement round-trip properties
- [ ] Implement validation reuse
- [ ] Write bidirectional tests

### Phase 11: Fake Data Generators

**Dependencies:** Phase 10 complete

- [ ] Implement person generators
- [ ] Implement internet data generators
- [ ] Implement identifier generators
- [ ] Write fake data tests

### Phase 12: Semantic Web Support

**Dependencies:** Phase 11 complete

- [ ] Implement RDF triple generators
- [ ] Implement ontology generators
- [ ] Implement SPARQL testing
- [ ] Write semantic web tests

### Phase 13: Envoy Integration

**Dependencies:** Phase 12 complete, Envoy ready

- [ ] Implement example generation for Envoy
- [ ] Implement property documentation
- [ ] Coordinate integration API
- [ ] Write Envoy integration tests

### Phase 14: Integration and Testing

**Dependencies:** All phases complete

- [ ] Wire all components together
- [ ] Comprehensive integration tests
- [ ] Self-testing (test generators with themselves)
- [ ] Performance benchmarking
- [ ] Constitutional compliance verification
- [ ] Update deno.json exports
- [ ] Final documentation review

## Constitutional Rules Compliance

**Every function MUST:**

- ✅ Be curried (data last)
- ✅ Use `function` keyword (NO arrows except type signatures)
- ✅ Return new data (NO mutations except PRNG state encapsulation)
- ✅ Use `const`, `Readonly`, `ReadonlyArray`
- ✅ Use Toolsmith array utilities (NO native map/filter/reduce)
- ✅ Return Result/Validation (NO exceptions except I/O boundaries)
- ✅ Live in own directory with index.ts
- ✅ Export exactly ONE function as default on same line

**PRNG Exception:** PRNG state may be mutated internally but MUST be encapsulated. External API is pure (seed in, new seed out).

## Zero Dependencies Policy

**NON-NEGOTIABLE:** Quarrier has ZERO external dependencies except Toolsmith and Arborist.

**Why:**

- External dependencies = maintaining THEIR code (all of it)
- External dependencies = can't fix THEIR bugs (PR hell)
- External dependencies = inherit THEIR tech debt
- External dependencies = MASSIVE attack surface
- Building our own = COMPLETE control, IMMEDIATE fixes, ZERO attack surface

**What We Build:**

- ✅ PRNG algorithms
- ✅ Shrinking algorithms
- ✅ Generator combinators
- ✅ All fake data generators

**What We Don't Reinvent:**

- ❌ TypeScript language
- ❌ Triple stores (use Apache Jena Fuseki)
- ❌ Databases

**This is about CONTROL and SAFETY.**

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
3. Artificer approves
4. Fix immediately
5. Update docs
6. Move on

**Speed is the advantage.** No coordination overhead, no waiting.

## Performance Targets

- PRNG operations: <1μs per call
- Simple generation: <10μs per value
- Complex generation: <100μs per value
- Shrinking: <1s for typical counterexamples
- Property checking: <1s for 100 runs

## Success Criteria

**Phase 1 Complete:**

- ✅ PRNG is deterministic and fast
- ✅ Seeds are splittable and independent
- ✅ All errors use Result monad with suggestions

**Phase 7 Complete:**

- ✅ Properties check correctly
- ✅ Shrinking finds minimal counterexamples
- ✅ Proof-carrying properties validate

**Phase 13 Complete:**

- ✅ Envoy receives high-quality examples
- ✅ Integration with Arborist works seamlessly
- ✅ Type-driven generation functional

**Final Completion:**

- ✅ All phases implemented
- ✅ Zero external dependencies maintained
- ✅ Performance targets met
- ✅ 100% test coverage
- ✅ Constitutional compliance verified
- ✅ Documentation complete

---

**This is a PLANNING document. Implementation starts only after architect approval.**

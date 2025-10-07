# Quarrier Library Contract

**Date:** 2025-01-07
**Status:** BINDING
**Version:** Aligned with Quarrier v0.0.1

## Contract Summary

Quarrier is a pure functional property-based testing library using pipeline composition. It generates test data, checks properties, and finds minimal counterexamples through integrated shrinking.

**This contract is BINDING. Zero external dependencies except Toolsmith and Arborist.**

## CRITICAL: Pre-Implementation Status

**Current Status:**
- **Quarrier:** Planning phase only, implementation blocked until Toolsmith ready
- **Toolsmith:** Monadic utilities (Result/Validation) and branded types in progress
- **Arborist:** Phase 1 complete, API finalized, ready for integration

**Implementation Timeline:**
1. Toolsmith monadic utilities stabilize (fold, map, map2, map3, etc.)
2. Toolsmith branded types complete (smart constructors, validation)
3. Toolsmith array utilities complete (map, filter, reduce)
4. Quarrier implementation begins using this contract

**DO NOT implement Quarrier until architect gives explicit approval.**

## API Specifications

### Quarrier Provides

```typescript
//++ Creates deterministic seed from number
createSeed(value: number): Result<SeedError, Seed>

//++ Advances seed to next state (pure function)
advanceSeed(seed: Seed): Seed

//++ Splits seed into two independent seeds
splitSeed(seed: Seed): Readonly<[Seed, Seed]>

//++ Generates bounded integer without modulo bias
boundedInt(min: number) {
  return function(max: number) {
    return function(seed: Seed): Result<BoundsError, GeneratorResult<number>>
  }
}

//++ Creates generator from Arborist type information
fromTypeInfo(
  typeInfo: ParsedType
): Validation<TypeSynthesisError, Generator<unknown>>

//++ Checks property with automatic shrinking
checkProperty<Args>(property: Property<Args>) {
  return function(
    options: CheckOptions
  ): Promise<Result<CheckError, PropertyResult>>
}

//++ Creates proven property with correctness guarantees
createProvenProperty<Args>(
  spec: PropertySpec<Args>
): Validation<ProofError, ProvenProperty<Args>>

//++ Derives metamorphic properties from source
deriveMetamorphic<A, B>(
  metamorphic: Metamorphic<A, B>
): Validation<DerivationError, ReadonlyArray<Property<B>>>
```

### Data Structures

```typescript
type Seed = Readonly<{
  state: number
  stream: number
}>

type Generator<T> = Readonly<{
  next: (seed: Seed) => GeneratorResult<T>
  shrink: (value: T) => ShrinkTree<T>
  parse?: (input: unknown) => Result<ParseError, T>
}>

type GeneratorResult<T> = Readonly<{
  value: T
  nextSeed: Seed
  size: number
}>

type ShrinkTree<T> = Readonly<{
  value: T
  children: () => ReadonlyArray<ShrinkTree<T>>
}>

type Property<Args extends ReadonlyArray<unknown>> = Readonly<{
  name: string
  generators: Readonly<{ [K in keyof Args]: Generator<Args[K]> }>
  predicate: (args: Args) => Effect<boolean>
}>

type Effect<T> =
  | Readonly<{ tag: "Pure", value: T }>
  | Readonly<{ tag: "Async", computation: () => Promise<T> }>
  | Readonly<{ tag: "IO", action: () => T }>
  | Readonly<{ tag: "Random", generator: Generator<T> }>

type PropertyResult =
  | Readonly<{
      tag: "success"
      runs: number
      seed: Seed
      duration?: number
    }>
  | Readonly<{
      tag: "failure"
      counterexample: ReadonlyArray<unknown>
      minimal: ReadonlyArray<unknown>
      shrinks: number
      seed: Seed
      duration?: number
      error?: unknown
    }>

type ProvenProperty<Args extends ReadonlyArray<unknown>> = Readonly<{
  property: Property<Args>
  proof: PropertyProof<Args>
}>

type PropertyProof<Args extends ReadonlyArray<unknown>> = Readonly<{
  generators_deterministic: ProofOf<"deterministic", Args>
  shrink_terminates: ProofOf<"terminating", Args>
  shrink_sound: ProofOf<"sound", Args>
}>
```

## Error Handling

All functions return monads from Toolsmith:

**Result<E, T>** - Fail-fast for sequential operations (seed creation, bounds validation)
**Validation<E, T>** - Error accumulation for parallel operations (type synthesis, property derivation)

### Error Types

```typescript
type SeedError = ArchitectError<"createSeed", [number]> & {
  kind: "InvalidValue" | "OutOfRange"
  value: number
  suggestion: string
}

type BoundsError = ArchitectError<"boundedInt", [number, number, Seed]> & {
  kind: "InvalidBounds" | "MinGreaterThanMax"
  min: number
  max: number
  suggestion: string
}

type GenerationError = ArchitectError<"generate", [Generator<unknown>, Seed]> & {
  kind: "FilterExhausted" | "RecursionLimit" | "InvalidSize"
  attempts?: number
  depth?: number
  suggestion: string
}

type TypeSynthesisError = ArchitectError<"fromTypeInfo", [ParsedType]> & {
  kind: "UnsupportedType" | "InvalidConstraints" | "CircularReference"
  typeInfo: ParsedType
  suggestion: string
}
```

All errors include helpful suggestions, never scold users.

## Division of Responsibilities

### Quarrier Owns

- ✅ PRNG implementation (PCG XSH RR or SplitMix32)
- ✅ Generator protocol and primitives
- ✅ Shrinking algorithms and strategies
- ✅ Pipeline composition algebra
- ✅ Effect system (as values, not monads)
- ✅ Property checking engine
- ✅ Proof-carrying property system
- ✅ Metamorphic property derivation
- ✅ Bidirectional generators (generate + parse)
- ✅ Fake data generation
- ✅ Semantic web generators (RDF, SPARQL)

### Quarrier Consumes

- ✅ ParsedType from Arborist (for type-driven generation)
- ✅ ParsedFunction from Arborist (for property discovery)
- ✅ Result/Validation monads from Toolsmith
- ✅ Error utilities from Toolsmith
- ✅ Array utilities from Toolsmith

### Quarrier Provides

- ✅ Test data to Auditor
- ✅ Examples to Envoy (for documentation)
- ✅ Property specifications
- ✅ Shrinking for minimal failing cases
- ✅ Type-driven generators

### Quarrier NEVER

- ❌ Parses TypeScript/JSX directly
- ❌ Imports SWC WASM or TypeScript compiler
- ❌ Generates actual test files (that's Auditor)
- ❌ Runs tests (that's Auditor)
- ❌ Performs coverage analysis (that's Auditor)
- ❌ Generates documentation (that's Envoy)
- ❌ Uses external dependencies (except Toolsmith/Arborist)

## Usage Pattern

```typescript
import createSeed from "@sitebender/quarrier/random/createSeed"
import integer from "@sitebender/quarrier/generators/primitives/integer"
import checkProperty from "@sitebender/quarrier/property/check"
import { fold } from "@sitebender/toolsmith/monads/result/fold"

// Create deterministic seed
const seedResult = createSeed(42)

const result = fold(
  function handleSeedError(err) {
    console.error(err.message)
    if (err.suggestion) console.log("💡", err.suggestion)
    return null
  }
)(function handleSeed(seed) {
  // Create property
  const addCommutative = {
    name: "addition commutes",
    generators: [integer(-100)(100), integer(-100)(100)],
    predicate: ([a, b]) => ({ tag: "Pure", value: a + b === b + a })
  }

  // Check property
  return checkProperty(addCommutative)({ runs: 1000, seed })
})(seedResult)
```

## Performance Requirements

| Operation | Target | Maximum |
|-----------|--------|---------|
| PRNG call | <1μs | <10μs |
| Simple generation | <10μs | <100μs |
| Complex generation | <100μs | <1ms |
| Shrinking | <1s | <10s |
| Property check (100 runs) | <1s | <5s |

## Enforcement

### Validation

- Quarrier has ZERO external dependencies (except Toolsmith/Arborist)
- All generators are pure functions (except PRNG state encapsulation)
- All operations are deterministic with same seed
- No exceptions, no workarounds
- Warden enforces this contract

### Testing

Quarrier must maintain:
- Self-testing (test generators with themselves)
- Integration tests with Arborist
- Integration tests with Envoy
- Performance benchmarks
- Contract compliance tests

## Success Criteria

- ✅ Zero external dependencies (except Toolsmith/Arborist)
- ✅ All generators deterministic with seeds
- ✅ Shrinking finds minimal counterexamples
- ✅ Performance targets met
- ✅ Helpful error messages with suggestions
- ✅ All errors use Result/Validation monads
- ✅ Integration with Arborist works seamlessly
- ✅ Examples provided to Envoy are high quality

## Versioning Policy

**Current Version:** 0.0.1 (pre-production)

**During 0.x development:**
- NO migration paths
- NO backwards compatibility
- NO deprecation warnings
- When design changes: DELETE old, ADD new, UPDATE all docs
- Build it RIGHT the FIRST TIME

**After 1.0:** Standard SemVer applies.

---

**This contract is BINDING. Zero external dependencies. Pure functional. Pipeline composition.**

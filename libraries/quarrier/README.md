# @sitebender/quarrier

> Pure functional property-based testing through compositional pipelines. Zero dependencies. Zero classes. Mathematical guarantees.

## What is Quarrier?

Quarrier is a revolutionary property-based testing library that treats testing as **algebraic pipeline composition**. Unlike traditional approaches with monadic overhead or deferred features, Quarrier delivers:

1. **Pipeline-Based Testing** - Properties are transformation pipelines: `Seed → Generate → Test → Shrink → Report`
2. **Bidirectional Generators** - Generate _and_ parse with the same logic for round-trip testing
3. **Proof-Carrying Properties** - Properties carry formal correctness proofs without HKT ceremony
4. **Metamorphic Testing** - Properties that derive other properties automatically
5. **Effects as Values** - Not IO monads, just data describing computations
6. **Lazy Shrink Trees** - From day one, not v1.1 - efficient minimal counterexamples immediately

Built with uncompromising functional principles:

- ZERO external dependencies
- ZERO classes or OOP
- ZERO mutation (except PRNG)
- ZERO null/undefined (Result monad)
- 100% pure functions
- 100% deterministic

## The Pipeline Paradigm

Property testing is fundamentally about transformation pipelines:

```typescript
//++ Generator protocol for pure, deterministic value generation
export type Generator<T> = {
  readonly next: (seed: Seed) => GeneratorResult<T>;
  readonly shrink: (value: T) => ShrinkTree<T>;
  readonly parse?: (input: unknown) => Result<T, ParseError>;
};

//++ Pipeline stage that transforms generators
export type Stage<A, B> = (gen: Generator<A>) => Generator<B>;

//++ Compose stages into pipelines
const pipeline = pipe(
  map((x) => x * 2),
  filter((x) => x > 0),
  shrinkToward(0),
);
```

This gives us:

- **Associativity**: Composition is mathematically sound
- **Identity**: The identity stage does nothing
- **Composition**: Build complex from simple

## Core Architecture

### 1. Effects as Values (Not Monads)

```typescript
//++ Effect descriptor for property testing
export type Effect<T> =
  | { readonly tag: "Pure"; readonly value: T }
  | { readonly tag: "Async"; readonly computation: () => Promise<T> }
  | { readonly tag: "IO"; readonly action: () => T }
  | { readonly tag: "Random"; readonly generator: Generator<T> };

//++ Properties return effects, not promises
export type Property<Args> = {
  readonly name: string;
  readonly generators: Generators<Args>;
  readonly predicate: (args: Args) => Effect<boolean>;
};
```

### 2. Bidirectional Generators

Generators that can parse enable powerful patterns:

```typescript
const email: Generator<string> = {
  next: (seed) => generateValidEmail(seed),
  shrink: (email) => shrinkEmail(email),
  parse: (input) => validateEmail(input), // Same validation logic!
};

// Automatic round-trip property
const emailRoundTrip = createProperty("email round-trips", [email], ([e]) =>
  Effect.Pure(email.parse!(e).isOk),
);
```

### 3. Proof-Carrying Properties

Properties carry formal proofs of correctness:

```typescript
export type PropertyProof<Args> = {
  readonly generators_deterministic: ProofOf<"deterministic", Args>;
  readonly shrink_terminates: ProofOf<"terminating", Args>;
  readonly shrink_sound: ProofOf<"sound", Args>;
};

export type ProvenProperty<Args> = {
  readonly property: Property<Args>;
  readonly proof: PropertyProof<Args>;
};
```

### 4. Metamorphic Testing

Properties that transform into other properties:

```typescript
const sortMetamorphic: Metamorphic<[number[]], [number[]]> = {
  source: sortProperty,
  derive: (prop) => [
    idempotenceProperty(prop), // Sorting twice = sorting once
    involutionProperty(prop), // reverse(sort(reverse(x))) = sort(x)
    lengthPreservingProperty(prop), // length unchanged
  ],
};
```

### 5. Resumable Shrinking

Shrink operations can be paused and resumed:

```typescript
export type ShrinkState<T> = {
  readonly tree: ShrinkTree<T>;
  readonly path: ReadonlyArray<number>; // Breadcrumb trail
  readonly visited: Set<string>; // Dedup via hashing
};

// Can pause, save, and resume shrinking across sessions
const session = resumeShrinking(state, predicate);
```

## Why Quarrier Wins

### vs Academic Approaches (HKTs, Monads)

- **No HKT Overhead**: TypeScript-native, not fighting the language
- **Better Performance**: Direct calls, not monadic chains
- **Clear Stack Traces**: No wrapper hell
- **Practical**: Real tools for real developers

### vs Pragmatic Approaches (Deferred Features)

- **Shrink Trees Day One**: Not waiting for v1.1
- **Effects as Values**: Not Promise normalization complexity
- **Bidirectional**: Parse and generate with same logic
- **Proof-Carrying**: Correctness guarantees built-in

### Novel Features Others Lack

- Bidirectional generators
- Metamorphic property derivation
- Resumable shrinking sessions
- Pipeline composition algebra
- Effects as values (not monads)

## Usage Examples

### Property Testing

```typescript
import { createProperty, checkProperty } from "@sitebender/quarrier";
import { integer } from "@sitebender/quarrier/generators";

// Mathematical law as property
const commutative = createProperty(
  "addition commutes",
  [integer(-100, 100), integer(-100, 100)],
  ([a, b]) => Effect.Pure(a + b === b + a),
);

// Check with automatic shrinking
const result = await checkProperty(commutative, { runs: 1000 });
// If fails: minimal counterexample like [0, 1] not [847, -923]
```

### Bidirectional Round-Trip Testing

```typescript
// One generator, two directions
const phoneNumber = createBidirectional({
  generate: (seed) => generatePhone(seed),
  parse: (input) => validatePhone(input),
  shrink: (phone) => simplifyPhone(phone),
});

// Automatic round-trip property
const phoneRoundTrip = createProperty(
  "phone formats round-trip",
  [phoneNumber],
  ([p]) => {
    const formatted = format(p);
    const parsed = phoneNumber.parse!(formatted);
    return Effect.Pure(parsed.isOk && normalize(parsed.value) === normalize(p));
  },
);
```

### Metamorphic Testing

```typescript
// Derive related properties automatically
const encryptionMeta = createMetamorphic(encryptProperty, {
  deriveInverse: true, // decrypt(encrypt(x)) = x
  deriveIdempotent: false, // encrypt not idempotent
  deriveCommutative: false, // order matters
  deriveDistributive: true, // distributes over concatenation
});

// Generates and checks all derived properties
const results = await checkMetamorphic(encryptionMeta);
```

## Architecture

```
quarrier/
├── src/
│   ├── generator/          # Generator protocol & primitives
│   │   ├── protocol/       # Core Generator<T> type
│   │   ├── primitives/     # boolean, integer, string, etc.
│   │   └── combinators/    # map, filter, chain
│   │
│   ├── pipeline/           # Pipeline composition algebra
│   │   ├── compose/        # pipe, kleisli
│   │   └── stages/         # Stage transformers
│   │
│   ├── effect/            # Effects as values
│   │   ├── types/         # Effect ADT
│   │   └── interpret/     # Effect interpreter
│   │
│   ├── shrink/            # Lazy shrink trees
│   │   ├── tree/          # ShrinkTree<T>
│   │   ├── search/        # DFS with resumable state
│   │   └── strategies/    # Type-specific shrinking
│   │
│   ├── property/          # Property engine
│   │   ├── create/        # Property builder
│   │   ├── check/         # Test runner
│   │   └── proof/         # Proof verification
│   │
│   ├── metamorphic/       # Property derivation
│   │   ├── derive/        # Derivation strategies
│   │   └── laws/          # Mathematical laws
│   │
│   └── semantic/          # RDF & ontology generation
│       ├── triple/        # RDF triples
│       ├── ontology/      # OWL generation
│       └── sparql/        # Query testing
```

## Implementation Status

See [docs/todos.md](docs/todos.md) for detailed implementation plan.

Current focus: **Pipeline architecture with immediate shrink trees**

## Design Principles

1. **Pipeline Composition** - Testing as algebraic transformation
2. **Effects as Values** - Not monads, just data
3. **Bidirectional by Design** - Parse and generate symmetrically
4. **Proof-Carrying** - Correctness guaranteed
5. **Lazy but Immediate** - Shrink trees from day one
6. **Zero Dependencies** - Complete control

## Integration

### With @sitebender/arborist

- Type-driven generator synthesis
- Uses Arborist's structured outputs
- Syntax-level type information only

### With @sitebender/auditor

- Property discovery from code
- Test synthesis with minimal cases
- Coverage-guided generation

### With @sitebender/envoy

- Example generation for docs
- Property documentation
- Visual shrink trees

## Why Not fast-check?

- **Zero dependencies** vs 30+ transitive deps
- **Pipeline paradigm** vs traditional approach
- **Bidirectional** vs generate-only
- **Proof-carrying** vs hope-it-works
- **Effects as values** vs ad-hoc async
- **Built for @sitebender** vs generic tool

## Advanced Capabilities

- **Statistical Properties** - Distribution testing, Bayesian inference
- **Concurrent Testing** - Parallel properties, distributed shrinking
- **Formal Methods** - SMT solver integration, symbolic execution
- **Cloud Scale** - Distributed generation, real-time monitoring
- **AI Integration** - ML-guided shrinking, pattern learning

## License

MIT

---

_"Property testing is about finding bugs through mathematical laws. Quarrier makes those laws explicit, compositional, and efficient."_

**Testing is algebraic. The implementation is functional. The delivery is immediate.**

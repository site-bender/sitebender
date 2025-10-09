# Quarrier Implementation Plan - START HERE

**Last Updated:** 2025-01-07
**Status:** Planning Phase - DO NOT IMPLEMENT YET
**AI Instructions:** Read this ENTIRE document before writing ANY code.

## CRITICAL: Implementation Blocked Until Dependencies Ready

**Quarrier implementation CANNOT start until:**

1. ✅ **Arborist is complete** - Phase 1 done, API finalized
2. ⏳ **Toolsmith monadic utilities are complete** - Currently being implemented
3. ⏳ **Toolsmith branded types are complete** - Currently in progress
4. ⏳ **Toolsmith array utilities are complete** - map, filter, reduce needed

**Why This Matters:**

- Quarrier's entire architecture depends on Result/Validation monads from Toolsmith
- All error handling uses Toolsmith's error creation utilities
- All array operations use Toolsmith's functional utilities (NO native methods)
- Domain types will use Toolsmith's branded type system
- Starting before these are ready means rewriting everything later

**Current Status:**

- Arborist: ~95% complete (Phase 1 done, ready for integration)
- Toolsmith monads: In progress (fold, map, map2, map3, success, failure, ok, error)
- Toolsmith branded types: In progress (smart constructors, validation)
- Toolsmith arrays: In progress (map, filter, reduce, etc.)

**When to Start:**

- Wait for architect's explicit approval
- Verify Toolsmith exports are stable
- Confirm Arborist API is finalized
- Then proceed with Phase 1

**This is a PLANNING document.** Use it to understand the architecture, but DO NOT implement until dependencies are ready.

## What Is Quarrier?

Quarrier is a **pure functional property-based testing library** using a **pipeline paradigm** for algebraic composition. It generates test data, checks properties, and finds minimal counterexamples through integrated shrinking.

**Core Principle:** Testing as transformation pipelines: `Seed → Generate → Test → Shrink → Report`

**What It Does:**

- Generates arbitrary values for property-based testing
- Provides bidirectional generators (generate AND parse)
- Implements lazy shrink trees for minimal counterexamples
- Carries formal correctness proofs with properties
- Derives metamorphic properties automatically
- Integrates with Arborist for type-driven generation
- Provides examples for Envoy's documentation
- Supports semantic web testing (RDF triples, SPARQL)

**What It Does NOT Do:**

- Parse TypeScript/JSX (that's Arborist's job)
- Run tests (that's Auditor's job)
- Generate documentation (that's Envoy's job)
- Make assumptions (always ask for clarification)

## Versioning Policy (READ THIS, AI)

**Current Version:** 0.0.1 (pre-production)

**Development Philosophy:**

- NO semantic versioning until version 1.0 production deployment
- NO migration paths, NO legacy support, NO backwards compatibility during 0.x
- NO deprecation warnings, NO aliasing "old ways"
- When we change the design: DELETE the old, ADD the new, UPDATE all documentation completely
- Build it RIGHT the FIRST TIME, then deploy to production (target: next year)
- After 1.0 deployment: proper SemVer versioning begins

**Instructions for AIs:**

- DO NOT ask about migration paths during 0.x development
- DO NOT suggest deprecation strategies or backwards compatibility
- DO NOT preserve "legacy" anything
- DO change designs thoroughly and completely when needed
- DO update ALL documentation to reflect current design (no "deprecated" notes)
- DO delete incorrect/outdated information entirely

**After 1.0:** Standard SemVer applies. Until then, we iterate towards correctness.

## Checklist Synchronization Protocol

**The Iron Rule:** A task is NOT complete until its checklist item is checked `[x]` in this document.

**Atomic Commit Unit:**

```
Implementation + Tests + Checklist Update = ONE commit
```

**Workflow (MANDATORY):**

1. Complete implementation work
2. Write/update tests
3. Check the box in IMPLEMENTATION_PLAN.md: `[ ]` → `[x]`
4. Commit all three together with descriptive message

**Verification Before Commit:**

```bash
# Check which items should be marked complete
git diff libraries/quarrier/docs/IMPLEMENTATION_PLAN.md

# Must show [ ] → [x] for work you just completed
# If no checklist change: STOP, update checklist, then commit
```

**AI Instructions (BINDING):**

- When completing a task, you MUST update the corresponding checklist in the SAME response
- Never mark a task complete without checking the corresponding checklist box `[x]`
- If no matching checklist item exists, add it to the appropriate phase
- Before ending any session where work was completed, verify checklist synchronization
- The checklist update and code change must be in the same commit

**Human Instructions:**

- Before committing completed work, verify `git diff` shows both code AND checklist changes
- If checklist doesn't reflect reality, fix it before committing
- Checklist is source of truth for implementation progress

**Why This Matters:**

- Checklists ARE documentation
- Future sessions need accurate progress tracking
- Prevents duplicate work
- Enables accurate status reporting
- Enforces the constitutional rule about documentation completeness

**Enforcement:** This is not optional. Violating this protocol violates the constitutional documentation rule.

## Critical Architecture Decisions

### 1. Zero External Dependencies (NON-NEGOTIABLE)

**Quarrier has ZERO external dependencies except Toolsmith and Arborist.**

**Why This Is Correct:**

- External dependencies = maintaining THEIR code (all of it)
- External dependencies = can't fix THEIR bugs (PR hell)
- External dependencies = inherit THEIR tech debt
- External dependencies = MASSIVE attack surface
- Building our own = COMPLETE control, IMMEDIATE fixes, ZERO attack surface

**What We Build Ourselves:**

- ✅ PRNG (PCG XSH RR or SplitMix32)
- ✅ Shrinking algorithms (halving, chunk removal, etc.)
- ✅ Generator combinators (map, filter, chain)
- ✅ Effect interpreter
- ✅ Property checker
- ✅ All fake data generators

**What We Don't Reinvent:**

- ❌ TypeScript (use the language)
- ❌ Triple stores (use Apache Jena Fuseki)
- ❌ Databases (use what exists)

**This is about CONTROL and SAFETY, not NIH syndrome.**

### 2. Toolsmith Dependency (Foundation)

**Quarrier uses Toolsmith's monadic utilities, branded types, and array utilities.**

**Required Toolsmith Imports:**

```typescript
// Monadic utilities (currently being implemented)
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"
import { map } from "@sitebender/toolsmith/monads/validation/map"
import { map2, map3 } from "@sitebender/toolsmith/monads/validation/map2"
import { failure, success } from "@sitebender/toolsmith/monads/validation"
import { error, ok } from "@sitebender/toolsmith/monads/result"

// Error creation utilities
import fromTemplate from "@sitebender/toolsmith/error/fromTemplate"
import withSuggestion from "@sitebender/toolsmith/error/withSuggestion"
import withFailedArg from "@sitebender/toolsmith/error/withFailedArg"
import withCause from "@sitebender/toolsmith/error/withCause"

// Functional utilities
import { pipe } from "@sitebender/toolsmith/functional/pipe"
import { compose } from "@sitebender/toolsmith/functional/compose"

// Array utilities (use these instead of native methods)
import map from "@sitebender/toolsmith/array/map"
import filter from "@sitebender/toolsmith/array/filter"
import reduce from "@sitebender/toolsmith/array/reduce"
```

**Branded Types (in progress):**

```typescript
// Quarrier will use branded types for domain concepts
type Seed = number & { readonly __brand: "Seed" }
type GeneratorId = string & { readonly __brand: "GeneratorId" }
type PropertyId = string & { readonly __brand: "PropertyId" }

// Smart constructors validate and return Result
function seed(value: number): Result<SeedError, Seed> {
	// Validation logic
	return ok(value as Seed)
}
```

**IMPORTANT:** Quarrier implementation will NOT start until Toolsmith's monadic utilities, branded types, and array utilities are ready. This is a planning phase only.

### 3. Arborist Integration (Type-Driven Generation)

**Quarrier receives type information from Arborist for type-driven generator synthesis.**

**Allowed:**

```typescript
import type { ParsedType } from "@sitebender/arborist/types"
import type { ParsedFunction } from "@sitebender/arborist/types"
import extractTypes from "@sitebender/arborist/extractTypes"
```

**Usage Pattern:**

```typescript
// Get type information from Arborist
const result = await parseFile("./src/module.ts")

fold(handleError)(function (ast) {
	const typesV = extractTypes(ast)

	return foldV(
		handleErrors,
	)(function (types) {
		// Generate arbitraries from types
		const generators = map(fromTypeInfo)(types)
		return generators
	})(typesV)
})(result)
```

### 4. Error Handling: Result and Validation Monads

**Use Toolsmith error system.** Study these files:

- `@sitebender/toolsmith/error/createError/index.ts`
- `@sitebender/toolsmith/error/withSuggestion/index.ts`
- `@sitebender/toolsmith/error/withFailedArg/index.ts`
- `@sitebender/toolsmith/error/templates/*.ts`
- `@sitebender/toolsmith/types/error/index.ts`

**Error Philosophy:**

- Rich metadata (operation, args, code, severity)
- Helpful suggestions (NOT scolding)
- Failed argument tracking
- Context preservation
- Stack traces for debugging

**Monad Strategy:**

**Result<E, T>** - Fail-fast for sequential operations

```typescript
// Seed creation, I/O operations
function createSeed(value: number): Result<SeedError, Seed>
```

**Validation<E, T>** - Error accumulation for parallel/tree operations

```typescript
// Generating multiple values, accumulate ALL errors
function generateValues<T>(
  generator: Generator<T>
) {
  return function generateWithGenerator(
    count: number
  ): Validation<GenerationError, ReadonlyArray<T>>
}
```

**Why This Approach:**

- Seed creation errors: fail immediately (can't continue without valid seed)
- Generation errors: accumulate all (partial success valuable)
- Example: Value 1 fails but Values 2-5 work → return all successes + all errors

### 5. The Pipeline Paradigm

**Why "Pipeline" Instead of "Monad"?**

**Communication:** Non-developers understand pipelines (water pipes, assembly lines, data pipelines). "Monad" is academic jargon that creates cognitive barriers.

**Technical Reality:** Pipelines ARE function composition. The Generator type with `next` and `shrink` IS effectively a monad. But we call it "pipeline" because:

- ✅ Clearer mental model for non-FP developers
- ✅ Emphasizes data flow (Seed → Value → Shrunk Value)
- ✅ Reduces cognitive load for managers, architects, junior devs
- ✅ Still mathematically sound (composition is associative)

**Example:**

```typescript
// Pipeline terminology (clear)
const userGen = pipe(
	generateBasicUser,
	addFriends,
	validateComplete,
)

// Monad terminology (confusing to non-FP devs)
const userGen = generateBasicUser
	.flatMap(addFriends)
	.flatMap(validateComplete)
```

Both are the same operation, but "pipeline" communicates better.

### 6. Proof-Carrying Properties

**What They Are:**

Proof witnesses are compile-time documentation of invariants that force correctness thinking:

```typescript
type PropertyProof<Args> = {
	readonly generators_deterministic: ProofOf<"deterministic", Args>
	readonly shrink_terminates: ProofOf<"terminating", Args>
	readonly shrink_sound: ProofOf<"sound", Args>
}

type ProofOf<Kind, Subject> = {
	readonly kind: Kind
	readonly subject: Subject
	readonly evidence: unknown // String explanation or formal proof
}
```

**Why They're Brilliant:**

1. **Forces Correctness Thinking** - Can't create property without thinking about:
   - Is my generator deterministic?
   - Will shrinking terminate?
   - Are shrunk values still valid?

2. **Self-Documenting** - Proof witnesses explain WHY the property is correct

3. **Extensible** - Evidence can be:
   - Simple string explanations (for humans)
   - Formal proofs (for verification tools, future)
   - Generated automatically (for common patterns)

4. **Queryable** - Proofs stored in knowledge graph, queryable via SPARQL

5. **Zero Runtime Cost** - Just types and data, no runtime verification

**For Non-Developers:** Explain as "safety certificates" - like structural engineering certificates for buildings. The proof certifies the test is mathematically sound.

**Example:**

```typescript
const addCommutative = createProvenProperty({
	name: "addition commutes",
	generators: [integer(), integer()],
	predicate: ([a, b]) => Effect.Pure(a + b === b + a),
	proof: {
		generators_deterministic: {
			kind: "deterministic",
			subject: [integer(), integer()],
			evidence: "PCG PRNG with fixed seed produces same sequence",
		},
		shrink_terminates: {
			kind: "terminating",
			subject: [integer(), integer()],
			evidence: "Integer shrinking halves toward zero, guaranteed termination",
		},
		shrink_sound: {
			kind: "sound",
			subject: [integer(), integer()],
			evidence: "Shrunk integers are still integers in valid range",
		},
	},
})
```

**Keep this feature.** It's clever, useful, and enforces correctness without runtime cost.

### 7. Integrated Shrinking (Hedgehog Style)

**Committed Decision:** Hedgehog-style integrated shrinking, NOT QuickCheck's separated approach.

**Why Integrated Is Better:**

```typescript
// Integrated (Hedgehog/Quarrier) - shrinking is part of generator
type Generator<T> = {
	next: (seed: Seed) => GeneratorResult<T>
	shrink: (value: T) => ShrinkTree<T> // INTEGRATED
	parse?: (input: unknown) => Result<ParseError, T>
}

// Separated (QuickCheck) - easy to forget shrinking
type Arbitrary<T> = {
	generate: () => T
}
function shrink<T>(value: T): Array<T> // SEPARATE, can forget
```

**Benefits:**

- ✅ Can't forget to implement shrinking
- ✅ Shrinking composes automatically when generators compose
- ✅ Generator knows how values were constructed
- ✅ Better shrinking quality

**This decision is FINAL.** No QuickCheck-style separation.

## API Design (Approved)

### Core Functions

```typescript
//++ Creates deterministic seed from number
//++ Returns Result for validation errors
export default function createSeed(
  value: number
): Result<SeedError, Seed>

//++ Advances seed to next state
//++ Pure function, no mutations
export default function advanceSeed(
  seed: Seed
): Seed

//++ Splits seed into two independent seeds
//++ For parallel generation
export default function splitSeed(
  seed: Seed
): Readonly<[Seed, Seed]>

//++ Generates bounded integer without bias
//++ Returns Result for invalid bounds
export default function boundedInt(
  min: number
) {
  return function boundedIntWithMin(
    max: number
  ) {
    return function boundedIntWithMinAndMax(
      seed: Seed
    ): Result<BoundsError, GeneratorResult<number>>
  }
}

//++ Creates generator from type information
//++ Returns Validation for type synthesis errors
export default function fromTypeInfo(
  typeInfo: ParsedType
): Validation<TypeSynthesisError, Generator<unknown>>

//++ Checks property with automatic shrinking
//++ Returns Result for property check errors
export default function checkProperty<Args extends ReadonlyArray<unknown>>(
  property: Property<Args>
) {
  return function checkWithProperty(
    options: CheckOptions
  ): Promise<Result<CheckError, PropertyResult>>
}

//++ Creates proven property with correctness guarantees
//++ Returns Validation for proof validation errors
export default function createProvenProperty<Args extends ReadonlyArray<unknown>>(
  spec: PropertySpec<Args>
): Validation<ProofError, ProvenProperty<Args>>

//++ Derives metamorphic properties from source property
//++ Returns Validation for derivation errors
export default function deriveMetamorphic<
  A extends ReadonlyArray<unknown>,
  B extends ReadonlyArray<unknown>
>(
  metamorphic: Metamorphic<A, B>
): Validation<DerivationError, ReadonlyArray<Property<B>>>
```

### Error Type Hierarchy

**Base Error Pattern (from Toolsmith):**

```typescript
export type SeedError = ArchitectError<"createSeed", [number]> & {
	readonly kind: "InvalidValue" | "OutOfRange"
	readonly value: number
	readonly suggestion: string
}

export type BoundsError =
	& ArchitectError<"boundedInt", [number, number, Seed]>
	& {
		readonly kind: "InvalidBounds" | "MinGreaterThanMax"
		readonly min: number
		readonly max: number
		readonly suggestion: string
	}

export type GenerationError =
	& ArchitectError<"generate", [Generator<unknown>, Seed]>
	& {
		readonly kind: "FilterExhausted" | "RecursionLimit" | "InvalidSize"
		readonly attempts?: number
		readonly depth?: number
		readonly suggestion: string
	}

export type TypeSynthesisError =
	& ArchitectError<"fromTypeInfo", [ParsedType]>
	& {
		readonly kind:
			| "UnsupportedType"
			| "InvalidConstraints"
			| "CircularReference"
		readonly typeInfo: ParsedType
		readonly suggestion: string
	}

export type CheckError =
	& ArchitectError<"checkProperty", [Property<unknown[]>, CheckOptions]>
	& {
		readonly kind: "InvalidOptions" | "GenerationFailed" | "ShrinkingFailed"
		readonly suggestion: string
	}

export type ProofError =
	& ArchitectError<"createProvenProperty", [PropertySpec<unknown[]>]>
	& {
		readonly kind: "InvalidProof" | "MissingEvidence" | "InconsistentProof"
		readonly proofKind?: string
		readonly suggestion: string
	}
```

**Creating Errors:**

```typescript
import fromTemplate from "@sitebender/toolsmith/error/fromTemplate"
import withSuggestion from "@sitebender/toolsmith/error/withSuggestion"
import withFailedArg from "@sitebender/toolsmith/error/withFailedArg"
import { pipe } from "@sitebender/toolsmith/functional/pipe"

// Example: Seed creation error
const err = pipe(
	fromTemplate("outOfRange")("createSeed")([value])(
		"seed value",
		value,
	),
	withSuggestion(
		"Seed must be a positive integer. Use Math.abs(Math.floor(value)) to ensure validity.",
	),
)

// Example: Type synthesis error
const typeErr = pipe(
	fromTemplate("operationFailed")("fromTypeInfo")([typeInfo])(
		"generator synthesis",
		typeInfo.kind,
	),
	withFailedArg(0)("typeInfo"),
	withSuggestion(
		"This type is not yet supported for automatic generation. Supported types: primitive, array, object, union. Consider creating a custom generator.",
	),
)
```

## Implementation Phases

### Phase 1: PRNG Foundation

- [ ] Implement `src/random/createSeed/index.ts`
  - [ ] Accept number parameter
  - [ ] Return `Result<SeedError, Seed>`
  - [ ] Validate seed value (must be positive integer)
  - [ ] Use Toolsmith error creation
  - [ ] Add helpful suggestions
  - [ ] Write tests for valid and invalid seeds
- [ ] Implement `src/random/advanceSeed/index.ts`
  - [ ] Accept Seed parameter
  - [ ] Return new Seed (pure function)
  - [ ] Use PCG XSH RR or SplitMix32 algorithm
  - [ ] Write tests for determinism
- [ ] Implement `src/random/splitSeed/index.ts`
  - [ ] Accept Seed parameter
  - [ ] Return `Readonly<[Seed, Seed]>`
  - [ ] Ensure independence of split seeds
  - [ ] Write tests for independence
- [ ] Implement `src/random/_nextUint32/index.ts`
  - [ ] Accept Seed parameter
  - [ ] Return `Readonly<{ value: number, nextSeed: Seed }>`
  - [ ] Pure PRNG implementation
  - [ ] Write tests for distribution
- [ ] Implement `src/random/_nextFloat53/index.ts`
  - [ ] Accept Seed parameter
  - [ ] Return `Readonly<{ value: number, nextSeed: Seed }>`
  - [ ] Generate float in [0, 1) range
  - [ ] Write tests for range and distribution
- [ ] Implement `src/random/_boundedInt/index.ts`
  - [ ] Accept min, max, seed parameters
  - [ ] Return `Result<BoundsError, GeneratorResult<number>>`
  - [ ] Avoid modulo bias
  - [ ] Write tests for uniformity

### Phase 2: Core Generators

- [ ] Implement `src/generators/primitives/boolean/index.ts`
  - [ ] Return `Generator<boolean>`
  - [ ] Implement next using PRNG
  - [ ] Implement shrink (true → false)
  - [ ] Write tests
- [ ] Implement `src/generators/primitives/integer/index.ts`
  - [ ] Accept min, max parameters (curried)
  - [ ] Return `Generator<number>`
  - [ ] Implement next using boundedInt
  - [ ] Implement shrink (halve toward zero)
  - [ ] Write tests for bounds and shrinking
- [ ] Implement `src/generators/primitives/string/index.ts`
  - [ ] Accept charset and length parameters (curried)
  - [ ] Return `Generator<string>`
  - [ ] Implement next using character generation
  - [ ] Implement shrink (length first, then characters)
  - [ ] Optional parse for validation
  - [ ] Write tests

### Phase 3: Generator Combinators

- [ ] Implement `src/generators/combinators/array/index.ts`
  - [ ] Accept element generator and size parameters (curried)
  - [ ] Return `Generator<ReadonlyArray<T>>`
  - [ ] Implement next using element generator
  - [ ] Implement shrink (size first, then elements)
  - [ ] Use Toolsmith array utilities
  - [ ] Write tests
- [ ] Implement `src/generators/combinators/tuple/index.ts`
  - [ ] Accept tuple of generators
  - [ ] Return `Generator<Tuple>`
  - [ ] Implement next for each element
  - [ ] Implement shrink for each element
  - [ ] Write tests
- [ ] Implement `src/generators/combinators/record/index.ts`
  - [ ] Accept record of generators
  - [ ] Return `Generator<Record>`
  - [ ] Implement next for each field
  - [ ] Implement shrink for each field
  - [ ] Write tests
- [ ] Implement `src/generators/combinators/oneOf/index.ts`
  - [ ] Accept array of generators
  - [ ] Return `Generator<Union>`
  - [ ] Implement next with weighted selection
  - [ ] Implement shrink with branch switching
  - [ ] Write tests

### Phase 4: Pipeline Composition

- [ ] Implement `src/pipeline/compose/pipe/index.ts`
  - [ ] Accept stages (curried)
  - [ ] Return composed Stage
  - [ ] Verify associativity
  - [ ] Write tests
- [ ] Implement `src/pipeline/compose/identity/index.ts`
  - [ ] Return identity Stage
  - [ ] Verify identity laws
  - [ ] Write tests
- [ ] Implement `src/pipeline/compose/kleisli/index.ts`
  - [ ] Accept dependent generator functions
  - [ ] Return composed generator function
  - [ ] Write tests
- [ ] Implement `src/pipeline/stages/map/index.ts`
  - [ ] Accept transformation function
  - [ ] Return Stage that maps generator
  - [ ] Preserve shrinking
  - [ ] Write tests
- [ ] Implement `src/pipeline/stages/filter/index.ts`
  - [ ] Accept predicate function
  - [ ] Return Stage that filters generator
  - [ ] Implement retry logic
  - [ ] Write tests
- [ ] Implement `src/pipeline/stages/chain/index.ts`
  - [ ] Accept generator-returning function
  - [ ] Return Stage for dependent generation
  - [ ] Preserve shrinking
  - [ ] Write tests

### Phase 5: Shrink Trees

- [ ] Implement `src/shrink/tree/create/index.ts`
  - [ ] Accept value and children function
  - [ ] Return `ShrinkTree<T>`
  - [ ] Lazy evaluation
  - [ ] Write tests
- [ ] Implement `src/shrink/tree/unfold/index.ts`
  - [ ] Accept unfold function
  - [ ] Return `ShrinkTree<T>`
  - [ ] Lazy tree construction
  - [ ] Write tests
- [ ] Implement `src/shrink/search/dfs/index.ts`
  - [ ] Accept tree and predicate
  - [ ] Return minimal failing value
  - [ ] Depth-first search
  - [ ] Write tests
- [ ] Implement `src/shrink/search/resumable/index.ts`
  - [ ] Accept ShrinkState and predicate
  - [ ] Return updated ShrinkState
  - [ ] Support pause/resume
  - [ ] Write tests
- [ ] Implement shrinking strategies
  - [ ] Integer shrinking (halve toward zero)
  - [ ] String shrinking (length first)
  - [ ] Array shrinking (size then elements)
  - [ ] Record shrinking (field by field)
  - [ ] Write tests for each

### Phase 6: Effect System

- [ ] Implement `src/effect/types/index.ts`
  - [ ] Define Effect ADT
  - [ ] Pure, Async, IO, Random variants
  - [ ] Write type tests
- [ ] Implement `src/effect/interpret/index.ts`
  - [ ] Accept Effect and seed
  - [ ] Return `Promise<T>`
  - [ ] Handle all effect types
  - [ ] Write tests
- [ ] Implement effect combinators
  - [ ] map for Effect
  - [ ] chain for Effect
  - [ ] all for parallel effects
  - [ ] Write tests

### Phase 7: Property Engine

- [ ] Implement `src/property/create/index.ts`
  - [ ] Accept name, generators, predicate
  - [ ] Return `Property<Args>`
  - [ ] Normalize predicate to Effect
  - [ ] Write tests
- [ ] Implement `src/property/create/createProvenProperty/index.ts`
  - [ ] Accept PropertySpec with proofs
  - [ ] Return `Validation<ProofError, ProvenProperty<Args>>`
  - [ ] Validate proof witnesses
  - [ ] Write tests
- [ ] Implement `src/property/check/index.ts`
  - [ ] Accept Property and CheckOptions
  - [ ] Return `Promise<Result<CheckError, PropertyResult>>`
  - [ ] Run property with size progression
  - [ ] Interpret effects at boundary
  - [ ] Shrink on failure
  - [ ] Write comprehensive tests
- [ ] Implement `src/property/proof/validate/index.ts`
  - [ ] Accept PropertyProof
  - [ ] Return `Validation<ProofError, void>`
  - [ ] Verify proof consistency
  - [ ] Write tests

### Phase 8: Metamorphic Testing

- [ ] Implement `src/metamorphic/derive/index.ts`
  - [ ] Accept Metamorphic specification
  - [ ] Return `Validation<DerivationError, ReadonlyArray<Property>>`
  - [ ] Derive related properties
  - [ ] Write tests
- [ ] Implement `src/metamorphic/laws/idempotence/index.ts`
  - [ ] Derive idempotence property
  - [ ] f(f(x)) === f(x)
  - [ ] Write tests
- [ ] Implement `src/metamorphic/laws/involution/index.ts`
  - [ ] Derive involution property
  - [ ] f(f(x)) === x
  - [ ] Write tests
- [ ] Implement `src/metamorphic/laws/lengthPreserving/index.ts`
  - [ ] Derive length-preserving property
  - [ ] length(f(x)) === length(x)
  - [ ] Write tests

### Phase 9: Arborist Integration

- [ ] Implement `src/fromTypeInfo/index.ts`
  - [ ] Accept ParsedType from Arborist
  - [ ] Return `Validation<TypeSynthesisError, Generator<unknown>>`
  - [ ] Handle primitive types
  - [ ] Handle array types
  - [ ] Handle object types
  - [ ] Handle union types
  - [ ] Handle generic types
  - [ ] Write comprehensive tests
- [ ] Implement type-specific generators
  - [ ] Primitive type mapping
  - [ ] Array type with element generator
  - [ ] Object type with field generators
  - [ ] Union type with branch selection
  - [ ] Write tests

### Phase 10: Bidirectional Generators

- [ ] Implement parse methods for generators
  - [ ] Email generator with validation
  - [ ] Phone number generator with validation
  - [ ] URL generator with validation
  - [ ] Write tests
- [ ] Implement round-trip properties
  - [ ] Auto-generate from bidirectional generators
  - [ ] Verify parse(generate(seed)) succeeds
  - [ ] Write tests
- [ ] Implement validation reuse
  - [ ] Same logic for generation and validation
  - [ ] Write tests

### Phase 11: Fake Data Generators

- [ ] Implement person generators
  - [ ] Names (first, last, full)
  - [ ] Emails with realistic domains
  - [ ] Phone numbers by region
  - [ ] Addresses with validation
  - [ ] Write tests
- [ ] Implement internet data
  - [ ] URLs with protocols
  - [ ] IP addresses (v4/v6)
  - [ ] User agents
  - [ ] MAC addresses
  - [ ] Write tests
- [ ] Implement identifiers
  - [ ] UUIDs (v4, v7)
  - [ ] ISBNs with check digits
  - [ ] Barcodes (EAN, UPC)
  - [ ] Write tests

### Phase 12: Semantic Web Support

- [ ] Implement RDF triple generators
  - [ ] URI/IRI generators
  - [ ] Triple generation
  - [ ] Literal values with types
  - [ ] Blank nodes
  - [ ] Write tests
- [ ] Implement ontology generators
  - [ ] OWL class generation
  - [ ] Property generation
  - [ ] Restriction generation
  - [ ] Write tests
- [ ] Implement SPARQL testing
  - [ ] Query generation
  - [ ] Result validation
  - [ ] Query properties
  - [ ] Write tests

### Phase 13: Envoy Integration

- [ ] Implement example generation for documentation
  - [ ] Extract examples from property tests
  - [ ] Format for Envoy consumption
  - [ ] Provide minimal and comprehensive examples
  - [ ] Write tests
- [ ] Implement property documentation
  - [ ] Document properties in Envoy format
  - [ ] Include proof witnesses
  - [ ] Show shrinking examples
  - [ ] Write tests
- [ ] Coordinate with Envoy
  - [ ] Define integration API
  - [ ] Test integration points
  - [ ] Verify example quality

### Phase 14: Integration and Testing

- [ ] Wire all components together
  - [ ] Use Toolsmith validation combinators
  - [ ] Implement partial success handling
  - [ ] Accumulate all errors
  - [ ] Write integration tests
- [ ] Comprehensive test coverage
  - [ ] Test all Result returns (Ok and Error cases)
  - [ ] Test all Validation returns
  - [ ] Test error accumulation
  - [ ] Test partial success scenarios
  - [ ] Verify all error messages include suggestions
  - [ ] Test performance against targets
- [ ] Self-testing
  - [ ] Test generators with themselves
  - [ ] Verify PRNG properties
  - [ ] Verify shrinking properties
  - [ ] Verify combinator laws
- [ ] Update `deno.json` exports
  - [ ] Export all generators
  - [ ] Export all combinators
  - [ ] Export property functions
  - [ ] Export all type definitions
  - [ ] Verify all import paths work correctly
- [ ] Final verification
  - [ ] Run `deno task fmt`
  - [ ] Run `deno task lint`
  - [ ] Run `deno task test` with 100% pass rate
  - [ ] Verify constitutional compliance
  - [ ] Check performance benchmarks

## Constitutional Rules Compliance

**Every function MUST:**

- ✅ Be curried (data last)
- ✅ Use `function` keyword (NO arrows except type signatures)
- ✅ Return new data (NO mutations except PRNG state)
- ✅ Use `const`, `Readonly`, `ReadonlyArray`
- ✅ Use Toolsmith array utilities (NO native map/filter/reduce)
- ✅ Return Result/Validation (NO exceptions except I/O boundaries)
- ✅ Live in own directory with index.ts
- ✅ Export exactly ONE function as default on same line

**PRNG Exception:** PRNG state may be mutated internally but MUST be encapsulated. External API is pure (seed in, new seed out).

**Example of correct function structure:**

```typescript
//++ Generates bounded integer without modulo bias
export default function boundedInt(min: number) {
	return function boundedIntWithMin(max: number) {
		return function boundedIntWithMinAndMax(
			seed: Seed,
		): Result<BoundsError, GeneratorResult<number>> {
			// Validation
			if (min > max) {
				return error(createBoundsError(min, max))
			}

			// Generation using Toolsmith utilities
			const result = _nextUint32(seed)
			const range = max - min + 1
			const value = min + (result.value % range)

			return ok({
				value,
				nextSeed: result.nextSeed,
				size: Math.abs(value),
			})
		}
	}
}
```

## Error Message Guidelines

**DO:**

- Provide context: operation, arguments, what failed
- Suggest fixes: "Try X" or "Check Y"
- Include locations when relevant
- Preserve causes: original errors in cause field
- Use severity appropriately: warning/error/critical

**DON'T:**

- Scold the user
- Use vague messages: "Error occurred"
- Hide technical details
- Lose stack traces
- Drop context

**Examples:**

**Good:**

```
createSeed: Value -42 is out of valid range
Suggestion: Seed must be a positive integer. Use Math.abs(Math.floor(value)) to ensure validity.
```

**Bad:**

```
Error: Invalid seed
```

**Good:**

```
fromTypeInfo: Type "ClassDeclaration" not supported for generator synthesis
Suggestion: Quarrier generates values for data types, not classes. Consider using an interface or type alias instead. Supported types: primitive, array, object, union, intersection.
```

**Bad:**

```
Unsupported type
```

## Testing Strategy

**Test Coverage Required:**

1. **PRNG Functions**
   - Valid seeds → Ok(Seed)
   - Invalid seeds → Error with suggestion
   - Determinism (same seed → same sequence)
   - Independence (split seeds are independent)
   - Distribution (uniform for bounded integers)

2. **Generators**
   - Valid generation → Success(value)
   - Shrinking terminates
   - Shrunk values are valid
   - Composition preserves properties

3. **Properties**
   - Property checking works
   - Shrinking finds minimal counterexamples
   - Effects interpreted correctly
   - Proofs validated

4. **Error accumulation**
   - Multiple generation failures accumulate
   - Error messages include context
   - Suggestions are present

## Performance Requirements

Target performance:

- PRNG operations: <1μs per call
- Simple generation: <10μs per value
- Complex generation: <100μs per value
- Shrinking: <1s for typical counterexamples
- Property checking: <1s for 100 runs

## Issue Resolution Protocol

**There are NO issue trackers. NO tickets. NO backlog.**

**Process:**

1. Hit a problem → Check this document first
2. Still stuck → Present the problem to architect with:
   - Minimal reproduction code
   - Error message with full context
   - Proposed solution(s)
3. Architect approves approach
4. Fix immediately
5. Update docs to reflect the fix
6. Move on

**Speed is the advantage.** No coordination overhead, no approval chains, no waiting. Architect decides, AI implements, done.

**If the problem reveals a design flaw:**

- Propose design change
- Get architect approval
- Delete old approach completely
- Implement new approach correctly
- Update ALL documentation (no "deprecated" notes)
- Continue

## Integration with Ecosystem

### With Arborist

- Receives ParsedType for type-driven generation
- Uses syntax-level type information only
- No semantic analysis

### With Auditor

- Provides test data for property verification
- Receives property specifications from code analysis
- Coordinates on mathematical property testing

### With Envoy

- Provides examples for documentation
- Examples are real property test cases
- Minimal and comprehensive examples
- Shrinking examples for edge cases

### With Agent

- Distributed property testing (future)
- Collaborative test design (future)
- Shared test results via CRDTs (future)

## Next Session Start

**When you begin implementation:**

1. Read this document completely
2. Study Toolsmith error system thoroughly
3. Study Toolsmith monad utilities
4. Study Arborist's type system
5. Start with Phase 1: PRNG Foundation
6. Proceed sequentially through phases
7. Write tests for each function before implementation
8. Verify constitutional compliance continuously
9. Run `deno task fmt && deno task lint && deno task test` frequently
10. Update checklist with EVERY completed task

**Remember:** This is building the testing foundation correctly. Quality over speed. Get it right the first time. Zero dependencies means zero compromises.

---

**This document is the source of truth for Quarrier implementation. Follow it precisely.**

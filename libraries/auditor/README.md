# @sitebender/auditor

> "We don't test code. We prove it correct." — The Architect

A revolutionary formal verification system that mathematically proves code correctness through theorem proving, property verification, and automated proof generation.

## What Is Auditor?

Auditor is a formal verification system that:

- **Proves** mathematical correctness using Z3 theorem prover
- **Verifies** properties hold for ALL inputs, not just test cases
- **Generates** counterexamples when properties fail
- **Validates** algebraic laws and invariants mathematically
- **Produces** machine-checkable proofs of correctness

## Core Philosophy

Instead of testing with examples (which can miss edge cases), Auditor proves properties mathematically:

1. **Translates** IR to formal specifications
2. **Expresses** properties in first-order logic
3. **Proves** properties using SMT solving
4. **Generates** counterexamples for failures
5. **Produces** proof certificates for verification

## The Paradigm Shift

### Traditional Testing

```typescript
// Hope these examples cover all cases
test("age validator", () => {
	expect(validate(25)).toBe(true)
	expect(validate(-1)).toBe(false)
	expect(validate(150)).toBe(false)
	// Did we miss edge cases? 🤷
})
```

### Formal Verification with Auditor

```typescript
// Prove it works for ALL possible inputs

export function validateAge(age: number): boolean {
	// Auditor PROVES these properties hold mathematically
}
```

If the properties don't hold, Auditor provides exact counterexamples showing what fails.

## Features

### 🎯 Formal Verification

- **Z3 Integration**: Automated theorem proving
- **SMT Solving**: Satisfiability modulo theories
- **Proof Generation**: Machine-checkable certificates
- **Counterexamples**: Exact inputs that violate properties

### 🔬 Property Verification

- **Mathematical Laws**: Associativity, commutativity, distributivity
- **Invariants**: State consistency across transitions
- **Bounds**: Prove outputs stay within ranges
- **Termination**: Prove functions always complete

### 🔍 IR Analysis

- **Direct IR verification**: Work with Architect's IR format
- **AST analysis**: Via Arborist for TypeScript/JSX
- **Branch coverage**: Prove all paths reachable or dead
- **Complexity analysis**: Prove Big-O bounds

### ⚡ Performance Verification

- **Complexity proofs**: Verify O(n), O(log n), O(1) claims
- **Resource bounds**: Prove memory usage limits
- **Termination proofs**: No infinite loops
- **Optimization verification**: Prove optimizations preserve semantics

### 📊 Test Generation (When Needed)

- **Counterexample tests**: Generate tests from failed proofs
- **Property-based tests**: For unverifiable properties
- **Coverage completion**: Fill gaps proofs can't reach
- **Regression tests**: Capture fixed bugs

## Architecture

```
auditor/
├── src/
│   ├── generateBenchmarks/       # Performance test generation
│   ├── generatePropertyTests/    # Property-based test creation
│   ├── generateTests/            # Main test generation pipeline
│   ├── validateCoverage/         # Coverage validation and reporting
│   ├── patterns/                 # Domain-specific patterns
│   ├── optimizer/                # Test deduplication
│   └── types/                    # Type definitions
└── tests/                        # Auditor testing itself
```

**Note:** TypeScript parsing, signature extraction, branch analysis, and property detection have been moved to @sitebender/arborist to eliminate duplication with envoy.

## Integration with @sitebender/arborist

Auditor delegates ALL TypeScript parsing to @sitebender/arborist:

```typescript
// We use arborist for all AST operations
import parseSourceFile from "@sitebender/arborist/parseSourceFile/index.ts"
import extractSignature from "@sitebender/arborist/extractSignature/index.ts"
import analyzeBranches from "@sitebender/arborist/analyzeBranches/index.ts"
import detectPurity from "@sitebender/arborist/detectProperties/detectPurity/index.ts"
```

### What Parser Provides to Auditor

- TypeScript AST parsing
- Function signature extraction
- Branch analysis for coverage
- Property detection (purity, currying)
- Type constraint extraction

### What Auditor Handles

- Test case generation strategy
- Property test creation
- Edge case generation
- Coverage validation
- Test file writing

## Integration with @sitebender/quarrier

Auditor uses Quarrier for test data generation:

```typescript
// Use quarrier generators for test inputs
import generateInteger from "@sitebender/quarrier/arbitrary/generateInteger/index.ts"
import generateString from "@sitebender/quarrier/arbitrary/generateString/index.ts"
import createProperty from "@sitebender/quarrier/property/createProperty/index.ts"
```

### What Quarrier Provides to Auditor

- Deterministic data generators
- Property-based testing primitives
- Complex type generators
- Shrinking for minimal counterexamples

## Coordination with Other Libraries

### With Parser

- Share the same FunctionSignature type
- Use consistent branch analysis
- Coordinate on new parsing needs

### With Envoy

- Use same property detection from arborist
- Share complexity analysis
- Coordinate on function metadata

### With Quarrier

- Use quarrier's generators for test inputs
- Leverage property testing infrastructure
- Share shrinking algorithms

## For AI Agents Working on Auditor

**BEFORE implementing parsing features:**

1. Check if @sitebender/arborist already has it
2. If not, request it be added to arborist
3. Never duplicate parsing logic locally

**USE quarrier for:**

1. All test data generation
2. Property-based testing infrastructure
3. Shrinking to minimal counterexamples

**COMMUNICATE when you need:**

- New branch patterns detected
- Additional type constraints
- Complex property verification
- Performance benchmarking needs

## Usage

### Basic Test Generation

```typescript
import { generateTests } from "@sitebender/auditor"

// Generate tests for a toolsmith function
const testSuite = await generateTests(
	"libraries/toolsmith/src/vanilla/array/map/index.ts",
	{
		includePropertyTests: true,
		includeBenchmarks: true,
		targetCoverage: 100,
	},
)
```

### Orchestrated Generation

```typescript
import { orchestrateTestGeneration } from "@sitebender/auditor"

// Generate tests for multiple functions
const signatures = {
	"array/map": {
		/* signature */
	},
	"array/filter": {
		/* signature */
	},
	"math/add": {
		/* signature */
	},
}

const testFiles = await orchestrateTestGeneration(signatures)
```

## Test Types Generated

### 1. Unit Tests

Basic functionality tests for simple inputs:

```typescript
it("handles single element array", () => {
	const result = map((x) => x)([1])
	assertEquals(result, [1])
})
```

### 2. Property Tests

Mathematical property verification:

```typescript
it("functor composition law", () => {
	fc.assert(
		fc.property(
			fc.func(fc.integer()),
			fc.func(fc.integer()),
			fc.array(fc.integer()),
			(f, g, arr) => {
				const composed = map(compose(f, g))(arr)
				const sequential = pipe([map(g), map(f)])(arr)
				return deepEqual(composed, sequential)
			},
		),
	)
})
```

### 3. Edge Cases

Boundary condition testing:

```typescript
it("handles null input", () => {
	const result = map((x) => x)(null)
	assertEquals(result, [])
})
```

### 4. Branch Coverage

Tests for all code paths:

```typescript
it("covers branch: isNullish check", () => {
	const result = map((x) => x)(undefined)
	assertEquals(result, []) // Covers the null check branch
})
```

## Configuration

```typescript
type GeneratorConfig = {
	maxPropertyRuns: number // Default: 100
	includeEdgeCases: boolean // Default: true
	includePropertyTests: boolean // Default: true
	includeBenchmarks: boolean // Default: false
	targetCoverage: number // Default: 100
}
```

## Coverage Philosophy

**100% or Death**

Auditor enforces 100% code coverage. If a line can't be tested, it must be explicitly ignored with a reason:

```typescript
// deno-coverage-ignore REASON: Platform-specific code tested in CI
if (Deno.build.os === "windows") {
	path = path.replace(/\//g, "\\")
}
```

## Extended Verification Capabilities

### Component Testing

- JSX component property testing
- HTML validity verification
- Accessibility validation
- Schema.org metadata testing

### Architect Testing

- Reactive calculation verification
- SSR/hydration testing
- Configuration validation

## Development

### Running Tests

```bash
# Test the auditor itself
deno task test:auditor

# Generate tests for toolsmith
deno run --allow-all libraries/auditor/src/main/index.ts
```

### Architecture Principles

- Pure functional programming
- One function per file
- No classes or mutations
- Complete type safety
- 100% test coverage

## Why Auditor?

### The Problem

- Writing tests manually takes 480+ hours for 900+ functions
- Manual tests miss edge cases
- Coverage gaps hide bugs
- Test maintenance is expensive

### The Solution

- Build a generator in 2 weeks
- Generate all tests automatically
- Prove correctness mathematically
- Achieve 100% coverage systematically
- Zero maintenance burden

## Performance

- Generates 30+ tests per function
- Analyzes 4+ branches per function
- Achieves 100% coverage
- Runs in seconds, not hours

## License

Part of the @sitebender monorepo. See root LICENSE.

---

_"In 30 years of coding, I've learned that untested code is broken code. Now we test everything, automatically."_

_— The Architect_

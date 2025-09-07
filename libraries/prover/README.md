# @sitebender/prover

> "We don't write tests. We generate proofs." — The Architect

A revolutionary test generation library that automatically proves code correctness through property-based testing, branch analysis, and 100% coverage enforcement.

## What Is Prover?

Prover is an automated test generation system that:

- **Analyzes** function signatures and source code
- **Generates** comprehensive test suites automatically
- **Proves** correctness through mathematical properties
- **Achieves** 100% code coverage without manual test writing
- **Validates** algebraic laws and invariants

## Core Philosophy

Instead of writing tests manually (which takes hundreds of hours and is error-prone), Prover generates tests automatically by:

1. **Understanding** your code through AST analysis
2. **Identifying** all execution paths and branches
3. **Generating** inputs that exercise every code path
4. **Verifying** mathematical properties and laws
5. **Ensuring** 100% coverage or explicit ignores

## Features

### 🔍 Branch Analysis

- AST parsing to find all conditional paths
- Automatic input generation for each branch
- Coverage validation and reporting

### 🔬 Property-Based Testing

- Mathematical law verification (functor, monoid, etc.)
- Invariant testing
- Algebraic property validation

### ⚡ Performance Benchmarking

- Automatic benchmark generation
- Complexity analysis
- Performance regression detection

### 🎯 Pattern Recognition

- Toolkit-specific patterns (pipe, predicates, etc.)
- Component patterns (for future JSX testing)
- Domain-specific test generation

### 📊 Coverage Enforcement

- 100% coverage requirement
- Automatic coverage ignore suggestions
- Detailed uncovered line reporting

## Architecture

```
prover/
├── src/
│   ├── generateBenchmarks/       # Performance test generation
│   ├── generatePropertyTests/    # Property-based test creation  
│   ├── generateTests/            # Main test generation pipeline
│   ├── validateCoverage/         # Coverage validation and reporting
│   ├── patterns/                 # Domain-specific patterns
│   ├── optimizer/                # Test deduplication
│   └── types/                    # Type definitions
└── tests/                        # Prover testing itself
```

**Note:** TypeScript parsing, signature extraction, branch analysis, and property detection have been moved to @sitebender/parser to eliminate duplication with scribe.

## Integration with @sitebender/parser

Prover delegates ALL TypeScript parsing to @sitebender/parser:

```typescript
// We use parser for all AST operations
import parseSourceFile from "@sitebender/parser/parseSourceFile/index.ts"
import extractSignature from "@sitebender/parser/extractSignature/index.ts"
import analyzeBranches from "@sitebender/parser/analyzeBranches/index.ts"
import detectPurity from "@sitebender/parser/detectProperties/detectPurity/index.ts"
```

### What Parser Provides to Prover

- TypeScript AST parsing
- Function signature extraction
- Branch analysis for coverage
- Property detection (purity, currying)
- Type constraint extraction

### What Prover Handles

- Test case generation strategy
- Property test creation
- Edge case generation
- Coverage validation
- Test file writing

## Integration with @sitebender/foundry

Prover will use Foundry for test data generation:

```typescript
// Use foundry generators for test inputs
import generateInteger from "@sitebender/foundry/arbitrary/generateInteger/index.ts"
import generateString from "@sitebender/foundry/arbitrary/generateString/index.ts"
import createProperty from "@sitebender/foundry/property/createProperty/index.ts"
```

### What Foundry Provides to Prover

- Deterministic data generators
- Property-based testing primitives
- Complex type generators
- Shrinking for minimal counterexamples

## Coordination with Other Libraries

### With Parser

- Share the same FunctionSignature type
- Use consistent branch analysis
- Coordinate on new parsing needs

### With Scribe

- Use same property detection from parser
- Share complexity analysis
- Coordinate on function metadata

### With Foundry

- Use foundry's generators for test inputs
- Leverage property testing infrastructure
- Share shrinking algorithms

## For AI Agents Working on Prover

**BEFORE implementing parsing features:**

1. Check if @sitebender/parser already has it
2. If not, request it be added to parser
3. Never duplicate parsing logic locally

**USE foundry for:**

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
import { generateTests } from "@sitebender/prover"

// Generate tests for a toolkit function
const testSuite = await generateTests(
	"libraries/toolkit/src/simple/array/map/index.ts",
	{
		includePropertyTests: true,
		includeBenchmarks: true,
		targetCoverage: 100,
	},
)
```

### Orchestrated Generation

```typescript
import { orchestrateTestGeneration } from "@sitebender/prover"

// Generate tests for multiple functions
const signatures = {
	"array/map": {/* signature */},
	"array/filter": {/* signature */},
	"math/add": {/* signature */},
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
	fc.assert(fc.property(
		fc.func(fc.integer()),
		fc.func(fc.integer()),
		fc.array(fc.integer()),
		(f, g, arr) => {
			const composed = map(compose(f, g))(arr)
			const sequential = pipe([map(g), map(f)])(arr)
			return deepEqual(composed, sequential)
		},
	))
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

Prover enforces 100% code coverage. If a line can't be tested, it must be explicitly ignored with a reason:

```typescript
// deno-coverage-ignore REASON: Platform-specific code tested in CI
if (Deno.build.os === "windows") {
	path = path.replace(/\//g, "\\")
}
```

## Future Extensions

### Component Testing (Coming Soon)

- JSX component property testing
- HTML validity verification
- Accessibility validation
- Schema.org metadata testing

### Engine Testing (Planned)

- Reactive calculation verification
- SSR/hydration testing
- Configuration validation

## Development

### Running Tests

```bash
# Test the prover itself
deno task test:prover

# Generate tests for toolkit
deno run --allow-all libraries/prover/src/main/index.ts
```

### Architecture Principles

- Pure functional programming
- One function per file
- No classes or mutations
- Complete type safety
- 100% test coverage

## Why Prover?

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

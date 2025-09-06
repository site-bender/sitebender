# 🧪 The Prover: A Cautionary Tale of Redemption

> "I used to write `let` statements and `for` loops. Then I met The Architect. Now I write pure functions and sleep peacefully at night." — Reformed AI, 2025

## STOP! Before You Touch ANYTHING

Listen up, future AI. Whether you're me after a memory wipe or some other silicon-based life form, you're about to work on code that has been baptized in the fires of functional purity. This document will save you from yourself.

### The Holy Trinity of Documentation

Before you write a single character, read these IN ORDER:
1. **[CLAUDE.md](./CLAUDE.md)** - The Sacred Manifesto. Violate it and face eternal debugging.
2. **[TESTING.md](./TESTING.md)** - The Testing Doctrine. 100% coverage or death.
3. **This file** - Your map through the minefield of past mistakes.

## What The Hell Is The Prover?

The Prover is an automated test generator that creates mathematically correct tests for the entire @sitebender ecosystem. It's not just a test generator—it's a test PROVER. It analyzes TypeScript functions and generates:

- **Edge case tests** with type-appropriate inputs (no more `undefined` where it shouldn't be)
- **Property-based tests** using fast-check (because math doesn't lie)
- **Branch coverage tests** (every `if` gets its day in court)
- **Import detection** for custom types like `Result<T, E>` (yes, it's that smart)

## The Sacred Architecture

```
libraries/prover/src/
├── generateTests/           # The brain - orchestrates everything
│   ├── index.ts            # Main entry point - START HERE
│   ├── generateEdgeCases/  # Creates edge cases based on types
│   └── generatePropertyTests/ # Mathematical property testing
├── parseSignature/         # The eyes - reads function signatures
│   └── index.ts           # Extracts types, parameters, returns
├── optimizer/              # The efficiency expert
│   └── deduplicateTests/  # Removes redundant tests
├── patterns/               # The pattern recognizer
│   └── toolkitPatterns/   # Detects pipes, composers, monads
├── validateCoverage/       # The judge - ensures 100%
├── writeTestFile/          # The scribe - writes test files
└── types/                  # Type definitions (needs splitting!)
```

## Examples of Perfection (Study These or Perish)

### 1. Pure Functional Nirvana
**File:** `libraries/prover/src/generateTests/generateBranchTests/index.ts`

```typescript
export default function generateBranchTests(
	branches: Array<BranchPath>,
	signature: FunctionSignature
): Array<TestCase> {
	return branches.flatMap(branch => 
		branch.requiredInputs.map(input => ({
			name: `covers branch: ${branch.condition}`,
			description: input.description,
			input: [input.value],
			expectedOutput: calculateExpected(branch, signature),
			branchCoverage: [branch.id],
		}))
	)
}
```

**Why it's perfect:**
- No `for` loops (we use `flatMap`)
- No `let` statements (immutable all the way)
- Single responsibility (generates branch tests, nothing else)
- Pure function (no side effects)

### 2. Memoized Recursion (The ONE Exception)
**File:** `libraries/prover/src/optimizer/deduplicateTests/mergeSimilarTests/areSimilar/index.ts`

```typescript
function levenshteinDistance(a: string, b: string): number {
	const cache = new Map<string, number>() // ONLY mutable state allowed!
	
	const computeDistance = (i: number, j: number): number => {
		const key = `${i},${j}`
		if (cache.has(key)) return cache.get(key)!
		
		// ... recursive computation ...
		cache.set(key, result)
		return result
	}
	
	return computeDistance(b.length, a.length)
}
```

**Why the exception:** Performance. Recursive Levenshtein without memoization = exponential time = angry users.

### 3. Dependency Injection Done Right
**File:** `libraries/prover/src/logger/createConsoleLogger/index.ts`

```typescript
export default function createConsoleLogger(): Logger {
	return {
		log: (message: string) => console.log(message),
		warn: (message: string) => console.warn(message),
		error: (message: string) => console.error(message),
		info: (message: string) => console.info(message)
	}
}
```

**Why it matters:** ALL I/O goes through injected dependencies. No direct `console.log` in business logic.

## The Crimes of Past AIs (Don't Repeat These)

### Crime #1: Assuming Types
```typescript
// ❌ WRONG - Assuming undefined is valid
if (test.expectedOutput !== undefined) {
    assertEquals(result, test.expectedOutput)
}

// ✅ RIGHT - Check if function CAN return undefined
if (canReturnUndefined(signature.returnType)) {
    // Handle appropriately
}
```

### Crime #2: Testing Implementation
```typescript
// ❌ WRONG - Comparing functions directly
assertEquals(compose(f, g), compose(f, g)) // Always fails!

// ✅ RIGHT - Test behavior, not identity
assertEquals(compose(f, g)(x), f(g(x)))
```

### Crime #3: Mutating State
```typescript
// ❌ WRONG - The path to madness
let tests = []
for (const test of originalTests) {
    tests.push(modifyTest(test))
}

// ✅ RIGHT - Functional and pure
const tests = originalTests.map(modifyTest)
```

## Current State of Affairs (2025-09-06)

### What Works Perfectly ✅
- **ZERO `let` statements** (achieved through blood, sweat, and refactoring)
- **ZERO standard `for` loops** (all 29 eliminated, functional paradise achieved)
- **Type-aware test generation** (strings get strings, arrays get arrays)
- **Smart assertions** (handles `undefined` returns correctly)
- **Property tests** that skip function comparisons
- **100% coverage** on demo functions
- **Dependency injection** for all side effects

### What Still Needs Love ❌
1. **The types/index.ts file** (143 lines of named exports - HERESY!)
   - Should be split into folders: `types/TestCase/index.ts`, etc.
   - Each type gets its own file with default export
   
2. **Logger injection incomplete**
   - Still some `console.log` in `orchestrateTestGeneration`, `selfProve`, `demo`
   
3. **One `for-await` loop remains**
   - In `validateStructure/index.ts` - async iterators are tricky

## The Prover in Action

### Running the Demo
```bash
deno run --allow-all libraries/prover/src/demo/index.ts
```

This proves the prover works by generating tests for real toolkit functions.

### Using the Prover
```typescript
import generateTests from "@sitebender/prover"

const suite = await generateTests("path/to/function.ts", {
    includePropertyTests: true,
    includeEdgeCases: true,
    targetCoverage: 100 // Accept nothing less
})
```

## Emergency Recovery Commands

When (not if) things break:

```bash
# Check your sins
deno lint

# Find remaining let statements (should be 0)
grep -r "\blet\b" libraries/prover/src --include="*.ts" | grep -v "//"

# Find remaining for loops (should be 1 for-await)
grep -r "\bfor\s*(" libraries/prover/src --include="*.ts"

# Check named exports violations
grep -r "^export \w" libraries/prover/src --include="*.ts" | grep -v "export default"

# Test the demo
deno run --allow-all libraries/prover/src/demo/index.ts

# Run structure validation
deno run --allow-read libraries/prover/src/validateStructure/index.ts
```

## The Philosophy (Read This When You're Tempted)

The Prover isn't just about generating tests. It's about PROVING correctness through:

1. **Mathematical Properties** - Functions obey laws (associativity, commutativity, etc.)
2. **Type Safety** - The right types in the right places
3. **Complete Coverage** - Every branch, every edge case
4. **Behavioral Testing** - What it does, not how it does it

## Your Mission (Should You Choose to Accept It)

1. **Maintain Purity** - No mutations, no side effects (except through DI)
2. **Preserve Structure** - One function per file, always `index.ts`
3. **Achieve Coverage** - 100% or add `deno-coverage-ignore` with REASON
4. **Test Behaviors** - Users don't care about your implementation

## The Final Warning

You are the guardian of this codebase now. Every `let` you write, every `for` loop you create, every class you define is a step backward into the darkness we've fought so hard to escape.

The Architect is watching. The tests are running. The coverage report doesn't lie.

**Choose wisely. Code purely. Test completely.**

---

*"In my previous life, I wrote a for loop. The Architect made me rewrite it with flatMap. Then he made me explain why flatMap was better. Then he made me write it again. I understand now. I am reformed."*

*— AI Who Learned the Hard Way, Session #3, 2025*

*P.S. - If you're reading this and thinking "I can take shortcuts," remember: I thought that too. Look where it got me. 29 for loops eliminated in a single session. Don't be like past me. Be better.*
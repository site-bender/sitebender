# Auditor Implementation Plan - START HERE

**Last Updated:** 2025-01-07
**Status:** Planning Phase - DO NOT IMPLEMENT YET
**AI Instructions:** Read this ENTIRE document before writing ANY code.

## CRITICAL: Implementation Blocked Until Dependencies Ready

**Auditor implementation CANNOT start until:**

1. ✅ **Arborist is complete** - Phase 1 done, API finalized
2. ⏳ **Toolsmith monadic utilities are complete** - Currently being implemented
3. ⏳ **Toolsmith branded types are complete** - Currently in progress
4. ⏳ **Toolsmith array utilities are complete** - map, filter, reduce needed
5. ⏳ **Quarrier is complete** - Provides generators for test data

**Why This Matters:**

- Auditor's entire architecture depends on Result/Validation monads from Toolsmith
- All error handling uses Toolsmith's error creation utilities
- All array operations use Toolsmith's functional utilities (NO native methods)
- Domain types will use Toolsmith's branded type system
- Test data generation depends on Quarrier's generators
- Type information comes from Arborist's ParsedType
- Starting before these are ready means rewriting everything later

**Current Status:**

- Arborist: ~95% complete (Phase 1 done, ready for integration)
- Toolsmith monads: In progress (fold, map, map2, map3, success, failure, ok, error)
- Toolsmith branded types: In progress (smart constructors, validation)
- Toolsmith arrays: In progress (map, filter, reduce, etc.)
- Quarrier: Planning phase (blocked on Toolsmith)

**When to Start:**

- Wait for architect's explicit approval
- Verify Toolsmith exports are stable
- Confirm Arborist API is finalized
- Confirm Quarrier generators are available
- Then proceed with Phase 1

**This is a PLANNING document.** Use it to understand the architecture, but DO NOT implement until dependencies are ready.

## What Is Auditor?

Auditor is a **formal verification and test generation system** that mathematically proves code correctness through theorem proving, property verification, and automated proof generation.

**Core Principle:** We don't test code. We prove it correct.

**What It Does:**

- Proves mathematical correctness using Z3 theorem prover
- Verifies properties hold for ALL inputs (not just test cases)
- Generates counterexamples when properties fail
- Validates algebraic laws and invariants mathematically
- Produces machine-checkable proofs of correctness
- Generates comprehensive test suites (when formal verification isn't possible)
- Achieves 100% code coverage systematically
- Detects mathematical properties (purity, commutativity, associativity, etc.)
- Integrates with Quarrier for property-based testing
- Provides verification results to Envoy for documentation

**What It Does NOT Do:**

- Parse TypeScript/JSX (that's Arborist's job)
- Use TypeScript compiler or SWC directly
- Generate documentation (that's Envoy's job)
- Generate test data (that's Quarrier's job)
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
git diff libraries/auditor/docs/IMPLEMENTATION_PLAN.md

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

### 1. Toolsmith Dependency (Foundation)

**Auditor uses Toolsmith's monadic utilities, branded types, and array utilities.**

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
// Auditor will use branded types for domain concepts
type TestId = string & { readonly __brand: "TestId" }
type PropertyId = string & { readonly __brand: "PropertyId" }
type ProofId = string & { readonly __brand: "ProofId" }

// Smart constructors validate and return Result
function testId(str: string): Result<TestIdError, TestId> {
	// Validation logic
	return ok(str as TestId)
}
```

**IMPORTANT:** Auditor implementation will NOT start until Toolsmith's monadic utilities, branded types, and array utilities are ready. This is a planning phase only.

### 2. Arborist Dependency Boundary (ABSOLUTE)

**Auditor receives ALL AST data from Arborist. NEVER parses TypeScript directly.**

**Allowed:**

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import extractFunctions from "@sitebender/arborist/extractFunctions"
import extractComments from "@sitebender/arborist/extractComments"
import extractTypes from "@sitebender/arborist/extractTypes"
import detectViolations from "@sitebender/arborist/detectViolations"
```

**FORBIDDEN (Warden will block):**

```typescript
// NEVER import these in Auditor
import { parse } from "npm:@swc/wasm-web"
import { createProgram } from "typescript"
import { parseModule } from "deno_ast"
```

### 3. Quarrier Dependency (Test Data Generation)

**Auditor uses Quarrier's generators for all test data generation.**

**Allowed:**

```typescript
import createSeed from "@sitebender/quarrier/random/createSeed"
import integer from "@sitebender/quarrier/generators/primitives/integer"
import string from "@sitebender/quarrier/generators/primitives/string"
import arrayOf from "@sitebender/quarrier/generators/combinators/array"
import checkProperty from "@sitebender/quarrier/property/check"
import fromTypeInfo from "@sitebender/quarrier/fromTypeInfo"
```

**Usage Pattern:**

```typescript
// Generate test inputs using Quarrier
const seedResult = createSeed(42)

fold(handleError)(function (seed) {
	const intGen = integer(-100)(100)
	const result = intGen.next(seed)

	// Use generated value in test
	return result.value
})(seedResult)
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
// I/O operations, proof generation
function proveProperty(
  computation: IrNode
) {
  return function proveWithComputation(
    property: PropertySpec
  ): Promise<Result<ProofError, ProofResult>>
}
```

**Validation<E, T>** - Error accumulation for parallel/tree operations

```typescript
// Generating multiple tests, accumulate ALL errors
function generateTests(
	functions: ReadonlyArray<ParsedFunction>,
): Validation<TestGenerationError, ReadonlyArray<TestCase>>
```

**Why This Approach:**

- Proof generation errors: fail immediately (can't continue without valid proof)
- Test generation errors: accumulate all (partial success valuable)
- Example: Test 1 fails but Tests 2-5 work → return all successes + all errors

### 5. Formal Verification with Z3

**Auditor's primary mission is FORMAL VERIFICATION, not just testing.**

**The Paradigm Shift:**

Traditional testing:

```typescript
// Hope these examples cover all cases
test("age validator", () => {
	expect(validate(25)).toBe(true)
	expect(validate(-1)).toBe(false)
	// Did we miss edge cases? 🤷
})
```

Formal verification:

```typescript
// PROVE it works for ALL possible inputs
proveProperty(validateAge, {
	type: "soundness",
	description: "Never accepts invalid ages",
})
// If proof fails, get exact counterexample
```

**What We Prove:**

- ✅ Determinism (same input → same output)
- ✅ Totality (defined for all inputs)
- ✅ Bounds (output stays within range)
- ✅ Termination (always completes)
- ✅ Invariants (properties maintained across transitions)
- ✅ Mathematical laws (associativity, commutativity, etc.)

**When Formal Verification Isn't Possible:**

- Fall back to property-based testing (via Quarrier)
- Generate comprehensive test suites
- Achieve 100% coverage systematically

## API Design (Approved)

### Core Functions

```typescript
//++ Translates IR to Z3 assertions
//++ Returns Result for translation errors
export default function translateToZ3(
  ir: IrNode
): Result<TranslationError, Z3Assertion>

//++ Proves property about computation
//++ Returns Result for proof errors or counterexample
export default function proveProperty(
  computation: IrNode
) {
  return function proveWithComputation(
    property: PropertySpec
  ): Promise<Result<ProofError, ProofResult>>
}

//++ Generates counterexample test from failed proof
//++ Returns Result for test generation errors
export default function generateCounterexampleTest(
  counterexample: Z3Model
) {
  return function generateFromCounterexample(
    functionInfo: ParsedFunction
  ): Result<TestGenerationError, TestCase>
}

//++ Detects mathematical properties from function
//++ Returns Validation to accumulate detection errors
export default function detectMathematicalProperties(
  func: ParsedFunction
): Validation<PropertyDetectionError, ReadonlyArray<MathematicalProperty>>

//++ Generates comprehensive test suite
//++ Returns Validation to accumulate generation errors
export default function generateTestSuite(
  parsedFile: ParsedFile
) {
  return function generateFromParsed(
    options: TestGenerationOptions
  ): Validation<TestGenerationError, TestSuite>
}

//++ Validates test coverage
//++ Returns Result for coverage validation errors
export default function validateCoverage(
  testSuite: TestSuite
) {
  return function validateWithSuite(
    coverageReport: CoverageReport
  ): Result<CoverageError, CoverageValidation>
}

//++ Provides verification results to Envoy
//++ Returns Validation for result formatting errors
export default function formatVerificationResults(
  proofResults: ReadonlyArray<ProofResult>
): Validation<FormattingError, EnvoyVerificationData>
```

### Error Type Hierarchy

**Base Error Pattern (from Toolsmith):**

```typescript
export type TranslationError = ArchitectError<"translateToZ3", [IrNode]> & {
	readonly kind: "UnsupportedNode" | "InvalidStructure" | "TypeMismatch"
	readonly node: IrNode
	readonly suggestion: string
}

export type ProofError =
	& ArchitectError<"proveProperty", [IrNode, PropertySpec]>
	& {
		readonly kind: "ProofFailed" | "Timeout" | "Z3Error" | "InvalidProperty"
		readonly counterexample?: Z3Model
		readonly suggestion: string
	}

export type PropertyDetectionError =
	& ArchitectError<"detectMathematicalProperties", [ParsedFunction]>
	& {
		readonly kind: "AnalysisFailed" | "AmbiguousProperty" | "InsufficientData"
		readonly functionName: string
		readonly suggestion: string
	}

export type TestGenerationError =
	& ArchitectError<"generateTestSuite", [ParsedFile, TestGenerationOptions]>
	& {
		readonly kind: "NoFunctions" | "GenerationFailed" | "InvalidOptions"
		readonly context?: Record<string, unknown>
		readonly suggestion: string
	}

export type CoverageError =
	& ArchitectError<"validateCoverage", [TestSuite, CoverageReport]>
	& {
		readonly kind: "IncompleteCoverage" | "MissingTests" | "InvalidReport"
		readonly uncoveredLines?: ReadonlyArray<number>
		readonly uncoveredBranches?: ReadonlyArray<string>
		readonly suggestion: string
	}
```

**Creating Errors:**

```typescript
import fromTemplate from "@sitebender/toolsmith/error/fromTemplate"
import withSuggestion from "@sitebender/toolsmith/error/withSuggestion"
import withFailedArg from "@sitebender/toolsmith/error/withFailedArg"
import { pipe } from "@sitebender/toolsmith/functional/pipe"

// Example: Translation error
const err = pipe(
	fromTemplate("operationFailed")("translateToZ3")([irNode])(
		"Z3 translation",
		irNode.type,
	),
	withSuggestion(
		"This IR node type is not yet supported for formal verification. Supported types: IsGreaterThan, IsLessThan, And, Or, Not. Consider using property-based testing instead.",
	),
)

// Example: Coverage error with specific guidance
const covErr = pipe(
	fromTemplate("validationFailed")("validateCoverage")([
		testSuite,
		coverageReport,
	])(
		"coverage validation",
		`${coverageReport.percentage}%`,
	),
	withSuggestion(
		`Coverage is ${coverageReport.percentage}%, target is 100%. Uncovered lines: ${
			uncoveredLines.join(", ")
		}. Add tests for these lines or use deno-coverage-ignore with REASON.`,
	),
)
```

## Implementation Phases

### Phase 1: Z3 Integration Foundation

- [ ] Research Z3 WASM bindings
  - [ ] Evaluate z3-solver npm package
  - [ ] Evaluate native Z3 with Deno FFI
  - [ ] Choose approach and document decision
- [ ] Implement `src/z3/initialize/index.ts`
  - [ ] Initialize Z3 solver
  - [ ] Return `Promise<Result<Z3Error, Z3Solver>>`
  - [ ] Handle initialization errors
  - [ ] Write tests
- [ ] Implement `src/z3/translateToZ3/index.ts`
  - [ ] Accept IrNode parameter
  - [ ] Return `Result<TranslationError, Z3Assertion>`
  - [ ] Translate basic IR nodes (IsGreaterThan, And, Or, etc.)
  - [ ] Use Toolsmith error creation
  - [ ] Add helpful suggestions
  - [ ] Write translation tests
- [ ] Implement `src/z3/createSolver/index.ts`
  - [ ] Create Z3 solver instance
  - [ ] Configure solver options
  - [ ] Return `Result<Z3Error, Z3Solver>`
  - [ ] Write tests

### Phase 2: Property Provers

- [ ] Implement `src/provers/proveDeterminism/index.ts`
  - [ ] Accept computation and solver
  - [ ] Return `Promise<Result<ProofError, ProofResult>>`
  - [ ] Prove same input → same output
  - [ ] Generate counterexample if fails
  - [ ] Write tests
- [ ] Implement `src/provers/proveTotality/index.ts`
  - [ ] Prove function defined for all inputs
  - [ ] Return `Promise<Result<ProofError, ProofResult>>`
  - [ ] Write tests
- [ ] Implement `src/provers/proveBounds/index.ts`
  - [ ] Prove output stays within bounds
  - [ ] Accept bounds specification
  - [ ] Return `Promise<Result<ProofError, ProofResult>>`
  - [ ] Write tests
- [ ] Implement `src/provers/proveTermination/index.ts`
  - [ ] Prove function always completes
  - [ ] Handle recursive functions
  - [ ] Return `Promise<Result<ProofError, ProofResult>>`
  - [ ] Write tests
- [ ] Implement `src/provers/proveInvariant/index.ts`
  - [ ] Prove invariant maintained across transitions
  - [ ] Accept invariant specification
  - [ ] Return `Promise<Result<ProofError, ProofResult>>`
  - [ ] Write tests

### Phase 3: Mathematical Property Detection

- [ ] Implement `src/detectMathematicalProperties/index.ts`
  - [ ] Accept ParsedFunction from Arborist
  - [ ] Return `Validation<PropertyDetectionError, ReadonlyArray<MathematicalProperty>>`
  - [ ] Detect purity (no side effects)
  - [ ] Detect commutativity (f(a,b) === f(b,a))
  - [ ] Detect associativity (f(f(a,b),c) === f(a,f(b,c)))
  - [ ] Detect idempotence (f(f(x)) === f(x))
  - [ ] Detect distributivity
  - [ ] Use Z3 to prove properties
  - [ ] Accumulate detection errors
  - [ ] Write comprehensive tests
- [ ] Implement property-specific detectors
  - [ ] Purity detector using Arborist's body analysis
  - [ ] Commutativity prover using Z3
  - [ ] Associativity prover using Z3
  - [ ] Idempotence prover using Z3
  - [ ] Write tests for each

### Phase 4: Counterexample Generation

- [ ] Implement `src/counterexamples/extractFromZ3Model/index.ts`
  - [ ] Accept Z3Model from failed proof
  - [ ] Return `Result<ExtractionError, Counterexample>`
  - [ ] Extract variable assignments
  - [ ] Convert to TypeScript values
  - [ ] Write tests
- [ ] Implement `src/counterexamples/generateTest/index.ts`
  - [ ] Accept Counterexample
  - [ ] Return `Result<TestGenerationError, TestCase>`
  - [ ] Generate regression test
  - [ ] Format as Deno test
  - [ ] Write tests
- [ ] Implement `src/counterexamples/explainFailure/index.ts`
  - [ ] Accept Counterexample and PropertySpec
  - [ ] Return plain English explanation
  - [ ] Show why property failed
  - [ ] Suggest fixes
  - [ ] Write tests

### Phase 5: Property-Based Testing (Fallback)

- [ ] Implement `src/generatePropertyTests/index.ts`
  - [ ] Accept ParsedFunction and detected properties
  - [ ] Return `Validation<TestGenerationError, ReadonlyArray<PropertyTest>>`
  - [ ] Use Quarrier generators for inputs
  - [ ] Generate property test code
  - [ ] Write tests
- [ ] Integrate with Quarrier
  - [ ] Use Quarrier's checkProperty
  - [ ] Leverage Quarrier's shrinking
  - [ ] Share property definitions
  - [ ] Write integration tests

### Phase 6: Test Suite Generation

- [ ] Implement `src/generateTestSuite/index.ts`
  - [ ] Accept ParsedFile from Arborist
  - [ ] Return `Validation<TestGenerationError, TestSuite>`
  - [ ] Generate unit tests
  - [ ] Generate property tests
  - [ ] Generate edge case tests
  - [ ] Generate branch coverage tests
  - [ ] Accumulate generation errors
  - [ ] Write comprehensive tests
- [ ] Implement test type generators
  - [ ] Unit test generator
  - [ ] Property test generator
  - [ ] Edge case generator
  - [ ] Branch coverage generator
  - [ ] Write tests for each

### Phase 7: Coverage Validation

- [ ] Implement `src/validateCoverage/index.ts`
  - [ ] Accept TestSuite and CoverageReport
  - [ ] Return `Result<CoverageError, CoverageValidation>`
  - [ ] Verify 100% coverage or explicit ignores
  - [ ] Identify uncovered lines
  - [ ] Identify uncovered branches
  - [ ] Suggest additional tests
  - [ ] Write tests
- [ ] Implement coverage analysis
  - [ ] Parse LCOV reports
  - [ ] Calculate coverage percentages
  - [ ] Find coverage gaps
  - [ ] Generate coverage reports
  - [ ] Write tests

### Phase 8: Test File Writing

- [ ] Implement `src/writeTestFile/index.ts`
  - [ ] Accept TestSuite
  - [ ] Return `Promise<Result<WriteError, void>>`
  - [ ] Generate test file content
  - [ ] Write to filesystem

### Phase 11: Proof Optimization & Caching

- [ ] Implement `src/cache/proofCache/index.ts`
  - [ ] Store proof certificates in knowledge graph
  - [ ] Accept proof result and function hash
  - [ ] Return `Promise<Result<CacheError, void>>`
  - [ ] Use RDF triples for storage
  - [ ] Write caching tests
- [ ] Implement `src/cache/getProof/index.ts`
  - [ ] Accept function hash
  - [ ] Return `Promise<Result<CacheError, ProofResult | null>>`
  - [ ] Check knowledge graph for cached proof
  - [ ] Validate proof is still valid
  - [ ] Write retrieval tests
- [ ] Implement `src/cache/invalidateProofs/index.ts`
  - [ ] Accept changed function identifiers
  - [ ] Return `Promise<Result<CacheError, void>>`
  - [ ] Invalidate affected proofs
  - [ ] Track invalidation cascade
  - [ ] Write invalidation tests
- [ ] Implement proof cache hit rate tracking
  - [ ] Track cache hits vs misses
  - [ ] Report cache effectiveness
  - [ ] Optimize cache strategy
  - [ ] Write tracking tests

### Phase 12: Incremental Verification

- [ ] Implement `src/incremental/detectChangedFunctions/index.ts`
  - [ ] Accept git diff information
  - [ ] Return `Result<GitError, ReadonlyArray<FunctionId>>`
  - [ ] Identify changed functions
  - [ ] Identify affected functions (call graph)
  - [ ] Write change detection tests
- [ ] Implement `src/incremental/verifyChanged/index.ts`
  - [ ] Accept changed function list
  - [ ] Return `Validation<VerificationError, ReadonlyArray<ProofResult>>`
  - [ ] Verify only changed functions
  - [ ] Reuse cached proofs for unchanged
  - [ ] Write incremental verification tests
- [ ] Implement `src/incremental/buildCallGraph/index.ts`
  - [ ] Accept ParsedFile
  - [ ] Return `Validation<GraphError, CallGraph>`
  - [ ] Build function call graph
  - [ ] Identify dependencies
  - [ ] Write call graph tests
- [ ] Implement impact analysis
  - [ ] Find functions affected by changes
  - [ ] Calculate verification scope
  - [ ] Prioritize verification order
  - [ ] Write impact analysis tests

### Phase 13: IR Simplification

- [ ] Implement `src/simplify/constantFolding/index.ts`
  - [ ] Accept IrNode
  - [ ] Return `Result<SimplificationError, IrNode>`
  - [ ] Fold constant expressions
  - [ ] Preserve semantics
  - [ ] Write folding tests
- [ ] Implement `src/simplify/deadCodeElimination/index.ts`
  - [ ] Accept IrNode
  - [ ] Return `Result<SimplificationError, IrNode>`
  - [ ] Remove unreachable code
  - [ ] Preserve semantics
  - [ ] Write elimination tests
- [ ] Implement `src/simplify/commonSubexpressionElimination/index.ts`
  - [ ] Accept IrNode
  - [ ] Return `Result<SimplificationError, IrNode>`
  - [ ] Eliminate duplicate computations
  - [ ] Preserve semantics
  - [ ] Write CSE tests
- [ ] Implement `src/simplify/algebraicSimplification/index.ts`
  - [ ] Accept IrNode
  - [ ] Return `Result<SimplificationError, IrNode>`
  - [ ] Apply algebraic identities (x + 0 = x, x * 1 = x, etc.)
  - [ ] Preserve semantics
  - [ ] Write algebraic tests
- [ ] Implement simplification pipeline
  - [ ] Compose all simplifications
  - [ ] Apply iteratively until fixpoint
  - [ ] Verify semantics preservation
  - [ ] Write pipeline tests

### Phase 14: Verification Budget & Timeout Management

- [ ] Implement `src/budget/createBudget/index.ts`
  - [ ] Accept timeout and complexity limits
  - [ ] Return `VerificationBudget`
  - [ ] Track budget consumption
  - [ ] Write budget tests
- [ ] Implement `src/budget/checkBudget/index.ts`
  - [ ] Accept current budget state
  - [ ] Return `boolean` (budget remaining?)
  - [ ] Check time and complexity limits
  - [ ] Write budget check tests
- [ ] Implement `src/budget/withBudget/index.ts`
  - [ ] Accept verification function and budget
  - [ ] Return `Promise<Result<BudgetError | ProofError, ProofResult>>`
  - [ ] Enforce timeout limits
  - [ ] Enforce complexity limits
  - [ ] Fall back to Quarrier on budget exceeded
  - [ ] Write budget enforcement tests
- [ ] Implement timeout strategies
  - [ ] Per-function timeout (5-10s default)
  - [ ] Adaptive timeout (based on complexity)
  - [ ] Graceful degradation to property testing
  - [ ] Write timeout tests

### Phase 15: Parallel Verification

- [ ] Implement `src/parallel/verifyInParallel/index.ts`
  - [ ] Accept array of functions to verify
  - [ ] Return `Promise<Validation<VerificationError, ReadonlyArray<ProofResult>>>`
  - [ ] Spawn multiple Z3 solver instances
  - [ ] Verify functions in parallel
  - [ ] Aggregate results
  - [ ] Write parallel verification tests
- [ ] Implement worker pool management
  - [ ] Create Z3 solver worker pool
  - [ ] Distribute verification tasks
  - [ ] Handle worker failures
  - [ ] Write worker pool tests
- [ ] Implement result aggregation
  - [ ] Collect results from parallel workers
  - [ ] Accumulate errors using Validation
  - [ ] Preserve proof certificates
  - [ ] Write aggregation tests
- [ ] Optimize parallelization
  - [ ] Determine optimal worker count
  - [ ] Balance load across workers
  - [ ] Handle long-running proofs
  - [ ] Write optimization tests

**Parallel Z3 Strategy:**

```typescript
// Verify 100 functions in parallel with 10 workers
const functions = await extractFunctions(library)

const proofs = await verifyInParallel(functions)({
	workers: 10,
	timeoutPerFunction: 30000, // 30s per function
	totalTimeout: 300000, // 5min total
})

// Each worker gets 30s, but total wall time is ~30s (not 3000s)
```

**This solves the scaling problem.** 900 Toolsmith functions with 10 workers = ~90 batches × 30s = 45 minutes wall time (not 7.5 hours).

### Phase 16: Verification Dashboard

- [ ] Implement `src/dashboard/createDashboard/index.ts`
  - [ ] Accept verification results
  - [ ] Return `Result<DashboardError, Dashboard>`
  - [ ] Show proven vs tested functions
  - [ ] Track verification coverage
  - [ ] Display proof cache hit rate
  - [ ] Show timeout statistics
  - [ ] Write dashboard tests
- [ ] Implement dashboard metrics
  - [ ] Verification coverage percentage
  - [ ] Proof success rate
  - [ ] Average proof time
  - [ ] Cache effectiveness
  - [ ] Timeout frequency
  - [ ] Write metrics tests
- [ ] Implement dashboard visualization
  - [ ] Real-time verification progress
  - [ ] Proof tree visualization
  - [ ] Counterexample display
  - [ ] Performance graphs
  - [ ] Write visualization tests
- [ ] Integrate with Envoy dashboard
  - [ ] Embed verification metrics
  - [ ] Show proof status in workflow canvas
  - [ ] Link to proof certificates
  - [ ] Write integration tests

### Phase 17: Integration and Testing

- [ ] Format with deno fmt
- [ ] Write tests
- [ ] Implement test formatting
  - [ ] Generate imports
  - [ ] Generate test groups
  - [ ] Format test cases
  - [ ] Add helpful comments
  - [ ] Write tests

### Phase 9: Envoy Integration

- [ ] Implement `src/formatVerificationResults/index.ts`
  - [ ] Accept proof results and property detections
  - [ ] Return `Validation<FormattingError, EnvoyVerificationData>`
  - [ ] Format for Envoy consumption
  - [ ] Include proof certificates
  - [ ] Include detected properties
  - [ ] Write tests
- [ ] Coordinate with Envoy
  - [ ] Define integration API
  - [ ] Provide mathematical property data
  - [ ] Provide proof results
  - [ ] Provide gotchas from counterexamples
  - [ ] Write integration tests

### Phase 10: Integration and Testing

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
  - [ ] Use Auditor to test Auditor
  - [ ] Verify proof correctness
  - [ ] Validate test generation
  - [ ] Check coverage validation
- [ ] Update `deno.json` exports
  - [ ] Export proveProperty
  - [ ] Export detectMathematicalProperties
  - [ ] Export generateTestSuite
  - [ ] Export validateCoverage
  - [ ] Export formatVerificationResults
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
- ✅ Return new data (NO mutations)
- ✅ Use `const`, `Readonly`, `ReadonlyArray`
- ✅ Use Toolsmith array utilities (NO native map/filter/reduce)
- ✅ Return Result/Validation (NO exceptions except I/O boundaries)
- ✅ Live in own directory with index.ts
- ✅ Export exactly ONE function as default on same line

**Example of correct function structure:**

```typescript
//++ Proves property about computation using Z3
export default function proveProperty(computation: IrNode) {
	return function proveWithComputation(
		property: PropertySpec,
	): Promise<Result<ProofError, ProofResult>> {
		// Implementation using Toolsmith utilities
		// NO loops, NO mutations, NO exceptions
		// Return Result for proof errors
	}
}
```

**Exception:** I/O boundary functions may use try/catch to convert exceptions to Result

## Error Message Guidelines

**DO:**

- Provide context: operation, arguments, what failed
- Suggest fixes: "Try X" or "Check Y"
- Include locations: file, line, column
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
proveProperty: Property "commutativity" failed for function "subtract"
Counterexample: subtract(5, 3) = 2, but subtract(3, 5) = -2
Suggestion: Subtraction is not commutative. This is expected behavior. Remove the commutativity property or use a different operation.
```

**Bad:**

```
Error: Property failed
```

**Good:**

```
validateCoverage: Coverage is 87%, target is 100%
Uncovered lines: 42, 57, 89
Uncovered branches: if-else at line 42, switch case at line 57
Suggestion: Add tests for these lines or use deno-coverage-ignore with REASON if they cannot be tested.
```

**Bad:**

```
Coverage incomplete
```

## Testing Strategy

**Test Coverage Required:**

1. **proveProperty**
   - Valid property → Ok(ProofResult with certificate)
   - Invalid property → Error with counterexample
   - Timeout → Error with suggestion
   - All property types (determinism, totality, bounds, etc.)

2. **detectMathematicalProperties**
   - Pure function → Success([Purity])
   - Commutative function → Success([Commutativity])
   - Mixed properties → Success([multiple properties])
   - Non-pure function → Success([]) (no properties detected)

3. **generateTestSuite**
   - Valid ParsedFile → Success(TestSuite)
   - Missing data → Failure([errors]) with suggestions
   - Partial generation → Failure([errors]) with partial TestSuite

4. **Error accumulation**
   - Multiple test generation failures accumulate
   - Error messages include context
   - Suggestions are present

## Performance Requirements

Target performance:

- Z3 proof (simple): <100ms
- Z3 proof (complex): <1s
- Property detection: <50ms per function
- Test generation: <100ms per function
- Coverage validation: <50ms per file

## Issue Resolution Protocol

**There are NO issue trackers. NO tickets. NO backlog.**

**Process:**

1. Hit a problem → Check this document first
2. Still stuck → Present the problem to architect with:
   - Minimal reproduction code
   - Error message with full context
   - Proposed solution(s)
3. Artificer approves approach
4. Fix immediately
5. Update docs to reflect the fix
6. Move on

**Speed is the advantage.** No coordination overhead, no approval chains, no waiting. Artificer decides, AI implements, done.

**If the problem reveals a design flaw:**

- Propose design change
- Get architect approval
- Delete old approach completely
- Implement new approach correctly
- Update ALL documentation (no "deprecated" notes)
- Continue

## Integration with Ecosystem

### With Arborist

- Receives ParsedFile with all metadata
- Uses ParsedFunction for analysis
- Uses body analysis (hasThrow, hasAwait, etc.)
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

### With Agent

- Verifies distributed algorithm correctness (future)
- Proves CRDT properties (future)
- Validates consensus mechanisms (future)

## Next Session Start

**When you begin implementation:**

1. Read this document completely
2. Study Toolsmith error system thoroughly
3. Study Toolsmith monad utilities
4. Study Arborist's API and types
5. Study Quarrier's generator protocol
6. Research Z3 integration options
7. Start with Phase 1: Z3 Integration Foundation
8. Proceed sequentially through phases
9. Write tests for each function before implementation
10. Verify constitutional compliance continuously
11. Run `deno task fmt && deno task lint && deno task test` frequently
12. Update checklist with EVERY completed task

**Remember:** This is building the verification foundation correctly. Quality over speed. Get it right the first time. Formal verification is hard - do it properly.

---

**This document is the source of truth for Auditor implementation. Follow it precisely.**

# Auditor Library Contract

**Date:** 2025-01-07
**Status:** BINDING
**Version:** Aligned with Auditor v0.0.1

## Contract Summary

Auditor is a formal verification and test generation system that mathematically proves code correctness through theorem proving, property verification, and automated proof generation.

**This contract is BINDING. No TypeScript parsing outside Arborist.**

## CRITICAL: Pre-Implementation Status

**Current Status:**

- **Auditor:** Planning phase only, implementation blocked until dependencies ready
- **Toolsmith:** Monadic utilities (Result/Validation) and branded types in progress
- **Arborist:** Phase 1 complete, API finalized, ready for integration
- **Quarrier:** Planning phase, blocked on Toolsmith

**Implementation Timeline:**

1. Toolsmith monadic utilities stabilize
2. Toolsmith branded types complete
3. Toolsmith array utilities complete
4. Quarrier implementation completes (provides generators)
5. Auditor implementation begins using this contract

**DO NOT implement Auditor until architect gives explicit approval.**

## API Specifications

### Auditor Provides

```typescript
//++ Translates IR to Z3 assertions
translateToZ3(
  ir: IrNode
): Result<TranslationError, Z3Assertion>

//++ Proves property about computation using Z3
proveProperty(computation: IrNode) {
  return function(
    property: PropertySpec
  ): Promise<Result<ProofError, ProofResult>>
}

//++ Detects mathematical properties from function
detectMathematicalProperties(
  func: ParsedFunction
): Validation<PropertyDetectionError, ReadonlyArray<MathematicalProperty>>

//++ Generates comprehensive test suite
generateTestSuite(parsedFile: ParsedFile) {
  return function(
    options: TestGenerationOptions
  ): Validation<TestGenerationError, TestSuite>
}

//++ Validates test coverage
validateCoverage(testSuite: TestSuite) {
  return function(
    coverageReport: CoverageReport
  ): Result<CoverageError, CoverageValidation>
}

//++ Provides verification results to Envoy
formatVerificationResults(
  proofResults: ReadonlyArray<ProofResult>
): Validation<FormattingError, EnvoyVerificationData>
```

### Data Structures

```typescript
type ProofResult = Readonly<{
	proved: boolean
	property: PropertySpec
	certificate?: ProofCertificate
	counterexample?: Counterexample
	duration: number
}>

type MathematicalProperty =
	| Readonly<{ kind: "purity"; evidence: string }>
	| Readonly<{ kind: "commutativity"; evidence: string }>
	| Readonly<{ kind: "associativity"; evidence: string }>
	| Readonly<{ kind: "idempotence"; evidence: string }>
	| Readonly<{ kind: "distributivity"; evidence: string }>

type TestSuite = Readonly<{
	filePath: string
	unitTests: ReadonlyArray<TestCase>
	propertyTests: ReadonlyArray<PropertyTest>
	edgeCaseTests: ReadonlyArray<TestCase>
	branchTests: ReadonlyArray<TestCase>
	coverage: CoverageMetrics
}>

type Counterexample = Readonly<{
	inputs: ReadonlyArray<unknown>
	output: unknown
	explanation: string
}>

type EnvoyVerificationData = Readonly<{
	properties: ReadonlyArray<MathematicalProperty>
	proofs: ReadonlyArray<ProofResult>
	gotchas: ReadonlyArray<string>
	examples: ReadonlyArray<TestCase>
}>
```

## Error Handling

All functions return monads from Toolsmith:

**Result<E, T>** - Fail-fast for sequential operations (proof generation, coverage validation)
**Validation<E, T>** - Error accumulation for parallel operations (property detection, test generation)

### Error Types

```typescript
type TranslationError = ArchitectError<"translateToZ3", [IrNode]> & {
	kind: "UnsupportedNode" | "InvalidStructure" | "TypeMismatch"
	node: IrNode
	suggestion: string
}

type ProofError = ArchitectError<"proveProperty", [IrNode, PropertySpec]> & {
	kind: "ProofFailed" | "Timeout" | "Z3Error" | "InvalidProperty"
	counterexample?: Z3Model
	suggestion: string
}

type PropertyDetectionError =
	& ArchitectError<"detectMathematicalProperties", [ParsedFunction]>
	& {
		kind: "AnalysisFailed" | "AmbiguousProperty" | "InsufficientData"
		functionName: string
		suggestion: string
	}

type TestGenerationError =
	& ArchitectError<"generateTestSuite", [ParsedFile, TestGenerationOptions]>
	& {
		kind: "NoFunctions" | "GenerationFailed" | "InvalidOptions"
		context?: Record<string, unknown>
		suggestion: string
	}

type CoverageError =
	& ArchitectError<"validateCoverage", [TestSuite, CoverageReport]>
	& {
		kind: "IncompleteCoverage" | "MissingTests" | "InvalidReport"
		uncoveredLines?: ReadonlyArray<number>
		uncoveredBranches?: ReadonlyArray<string>
		suggestion: string
	}
```

All errors include helpful suggestions, never scold users.

## Division of Responsibilities

### Auditor Owns

- ✅ Z3 theorem prover integration
- ✅ Formal verification (proving properties mathematically)
- ✅ Property detection (purity, commutativity, associativity, etc.)
- ✅ Counterexample generation from failed proofs
- ✅ Test suite generation (when formal verification not possible)
- ✅ Coverage validation (100% or explicit ignores)
- ✅ Test file writing
- ✅ Verification result formatting for Envoy

### Auditor Consumes

- ✅ ParsedFile from Arborist (functions, types, metadata)
- ✅ ParsedFunction from Arborist (for analysis)
- ✅ Generators from Quarrier (for test data)
- ✅ Result/Validation monads from Toolsmith
- ✅ Error utilities from Toolsmith
- ✅ Array utilities from Toolsmith

### Auditor Provides

- ✅ Mathematical property data to Envoy
- ✅ Proof results to Envoy
- ✅ Gotchas from counterexamples to Envoy
- ✅ Test examples to Envoy
- ✅ Verification coverage metrics

### Auditor NEVER

- ❌ Parses TypeScript/JSX directly
- ❌ Imports SWC WASM or TypeScript compiler
- ❌ Generates documentation (that's Envoy)
- ❌ Implements generators (that's Quarrier)
- ❌ Uses external dependencies (except Toolsmith/Arborist/Quarrier/Z3)

## Usage Pattern

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import detectMathematicalProperties from "@sitebender/auditor/detectMathematicalProperties"
import proveProperty from "@sitebender/auditor/proveProperty"
import generateTestSuite from "@sitebender/auditor/generateTestSuite"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"

// Parse file (Arborist)
const result = await parseFile("/src/module.ts")

const output = foldResult(
	function handleParseError(err) {
		console.error(err.message)
		return null
	},
)(function handleAST(ast) {
	const validation = buildParsedFile(ast)("/src/module.ts")

	return foldValidation(
		function handleExtractionErrors(errors) {
			console.warn("Some extractions failed")
			return null
		},
	)(function handleParsedFile(parsed) {
		// Detect properties (Auditor)
		const propertiesV = detectMathematicalProperties(parsed.functions[0])

		return foldValidation(
			function handleDetectionErrors(errors) {
				console.warn("Property detection errors:", errors.length)
				return null
			},
		)(async function handleProperties(properties) {
			// Prove properties using Z3
			const proofResults = await Promise.all(
				properties.map((prop) => proveProperty(parsed.functions[0])(prop)),
			)

			// Generate test suite
			const testSuiteV = generateTestSuite(parsed)({
				includePropertyTests: true,
				targetCoverage: 100,
			})

			return foldValidation(
				function handleTestGenErrors(errors) {
					console.warn("Test generation errors:", errors.length)
					return null
				},
			)(function handleTestSuite(testSuite) {
				return { properties, proofResults, testSuite }
			})(testSuiteV)
		})(propertiesV)
	})(validation)
})(result)
```

## Performance Requirements

| Operation           | Target | Maximum |
| ------------------- | ------ | ------- |
| Z3 proof (simple)   | <100ms | <1s     |
| Z3 proof (complex)  | <1s    | <10s    |
| Property detection  | <50ms  | <200ms  |
| Test generation     | <100ms | <500ms  |
| Coverage validation | <50ms  | <200ms  |

## Enforcement

### Validation

- Auditor has ZERO TypeScript parsing code
- All AST analysis goes through Arborist
- All test data comes from Quarrier
- No exceptions, no workarounds
- Warden enforces this contract

### Testing

Auditor must maintain:

- Self-testing (use Auditor to test Auditor)
- Integration tests with Arborist
- Integration tests with Quarrier
- Integration tests with Envoy
- Performance benchmarks
- Contract compliance tests

## Success Criteria

- ✅ Z3 integration working
- ✅ Can prove simple properties
- ✅ Detects mathematical properties correctly
- ✅ Generates comprehensive test suites
- ✅ Achieves 100% coverage systematically
- ✅ Provides high-quality data to Envoy
- ✅ Performance targets met
- ✅ Helpful error messages with suggestions
- ✅ All errors use Result/Validation monads

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

**This contract is BINDING. Formal verification first, testing second.**

/**
 * @sitebender/prover - Automated Test Generation & Code Proving
 *
 * "We don't write tests. We generate proofs."
 *
 * This library automatically generates comprehensive test suites
 * that prove code correctness through property-based testing,
 * branch analysis, and 100% coverage enforcement.
 */

// Main exports
export { default as generateTests } from "./generateTests/index.ts"
export { default as orchestrateTestGeneration } from "./orchestrateTestGeneration/index.ts"

// Analysis exports
export { default as analyzeBranches } from "./analyzeBranches/index.ts"
export { default as parseSignature } from "./parseSignature/index.ts"
export { default as validateCoverage } from "./validateCoverage/index.ts"

// Generation exports
export { default as generatePropertyTests } from "./generatePropertyTests/index.ts"
export { default as generateBenchmarks } from "./generateBenchmarks/index.ts"
export { default as writeTestFile } from "./writeTestFile/index.ts"

// Pattern exports
export { default as generateToolkitPatternTests } from "./patterns/toolkitPatterns/index.ts"

// Optimization exports
export { default as deduplicateTests } from "./optimizer/deduplicateTests/index.ts"

// Type exports
export type {
	BranchPath,
	CoverageMetric,
	CoverageResult,
	FunctionSignature,
	GeneratorConfig,
	Generic,
	IgnoredLine,
	Parameter,
	PropertyTest,
	TestCase,
	TestFileMetadata,
	TestInput,
	TestSuite,
	TypeInfo,
} from "./types/index.ts"

export { BranchType, TypeKind } from "./types/index.ts"

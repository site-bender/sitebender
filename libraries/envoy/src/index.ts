//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

// Main function export - Envoy takes Arborist output and generates docs
export { default as generateDocs } from "./generateDocs/index.ts"

// Type exports
export type {
	ArboristContext,
	ASTNode,
	ComplexityClass,
	Documentation,
	Example,
	FunctionMetadata,
	FunctionSignature,
	GenerateOptions,
	Generic,
	Law,
	NullStrategy,
	OutputFormat,
	Parameter,
	ParseError,
	Properties,
	Result,
} from "./types/index.ts"

// Arborist functionality now comes from @sitebender/arborist
// Envoy should NOT have its own parser implementation

// Extractor exports
export { extractDescription, extractSignature } from "./extractors/index.ts"

// Detector exports
export {
	detectComplexity,
	detectCurrying,
	detectProperties,
	detectPurity,
	isAssociative,
	isCommutative,
	isDistributive,
	isIdempotent,
} from "./detectors/index.ts"
export { default as detectPurityFromAST } from "./detectors/detectPurityFromAST/index.ts"
export { default as detectCurryingFromAST } from "./detectors/detectCurryingFromAST/index.ts"
export { default as detectComplexityFromAST } from "./detectors/detectComplexityFromAST/index.ts"

// Generator exports
export { formatProperties, generateMarkdown } from "./generators/index.ts"

// Constants exports
export {
	DEFAULT_OPTIONS,
	LAW_NAMES,
	MUTATION_INDICATORS,
	NODE_KINDS,
	PROPERTY_BADGES,
	PURE_INDICATORS,
	SIDE_EFFECT_INDICATORS,
	TEMPLATES,
} from "./constants/index.ts"

/**
 * @module @sitebender/scribe
 *
 * Automatic documentation generator for TypeScript code.
 * Extracts comprehensive documentation from type signatures and code analysis,
 * requiring only single-line descriptions from developers.
 */

// Main function export
export { default as generateDocs } from "./generateDocs/index.ts"

// Type exports
export type {
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
	ParserContext,
	Properties,
	Result,
} from "./types/index.ts"

// Parser exports
export { parseFile, parseFunction } from "./parser/index.ts"

// Extractor exports
export { extractDescription, extractSignature } from "./extractors/index.ts"

// Detector exports
export {
	detectComplexity,
	detectCurrying,
	detectProperties,
	detectPurity,
} from "./detectors/index.ts"

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

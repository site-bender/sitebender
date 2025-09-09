import type {
	Documentation,
	GenerateOptions,
	ParseError,
	Result,
} from "../types/index.ts"

import doEither from "../../../toolkit/src/monads/doEither/index.ts"
import { Left } from "../../../toolkit/src/monads/doEither/index.ts"
import { DEFAULT_OPTIONS } from "../constants/index.ts"
// Direct heuristic math property detectors (no barrel)
import isAssociative from "../detectors/detectMathProperties/isAssociative/index.ts"
import isCommutative from "../detectors/detectMathProperties/isCommutative/index.ts"
import isDistributive from "../detectors/detectMathProperties/isDistributive/index.ts"
import isIdempotent from "../detectors/detectMathProperties/isIdempotent/index.ts"
import extractDescription from "../extractors/extractDescription/index.ts"
import calculateCyclomaticComplexity from "../detectors/detectComplexityFromAST/calculateCyclomaticComplexity/index.ts"
import { generateMarkdown } from "../generators/index.ts"

// Parser API types
type Comment = {
	kind: "line" | "block"
	text: string
	fullText: string
	type: "description" | "example" | "gotcha" | "pro" | "law"
	position: "before" | "after"
}

type TypeInfo = {
	raw: string
	kind: "primitive" | "object" | "array" | "function" | "union" | "generic"
}

type Parameter = {
	name: string
	type: string
	optional: boolean
	defaultValue?: string
}

type Generic = {
	name: string
	constraint: string | undefined
	default: string | undefined
}

type FunctionSignature = {
	name: string
	parameters: Array<Parameter>
	returnType: string
	generics?: Array<Generic>
	isAsync: boolean
	isGenerator: boolean
	isExported: boolean
	isDefault: boolean
}

type ParserMetadata = {
	hasThrowStatements: boolean
	hasAwaitExpressions: boolean
	hasGlobalAccess: boolean
	cyclomaticComplexity: number
	hasReturnStatements: boolean
}

type ParsedFunction = {
	node: unknown // TypeScript AST node
	signature: FunctionSignature
	metadata: ParserMetadata
}

type ParserOutput = {
	functions: Array<ParsedFunction>
	comments: Array<Comment>
}

//++ Generate documentation from pre-parsed function and comment data
export default function generateDocsWithCompiler(
	parserOutput: ParserOutput,
	options: GenerateOptions = {},
): Promise<Result<Documentation, ParseError>> {
	// Merge options with defaults
	const opts = { ...DEFAULT_OPTIONS, ...options }

	// Convert Either back to Result type for API compatibility
	const eitherToResult = <T>(
		either: ReturnType<typeof doEither<ParseError, T>>,
	): Result<T, ParseError> => {
		if (either.tag === "Left") {
			return { ok: false, error: either.value }
		}
		return { ok: true, value: either.value }
	}

	const computation = doEither<ParseError, Documentation>(function* () {
		const { functions, comments } = parserOutput

		// Check if we found any functions
		if (functions.length === 0) {
			yield Left({
				message: "No functions found in file",
				file: "parser_output",
			})
			return undefined as never
		}

		// Use the first function for now (Phase 2 will handle multiple functions)
		const firstFunction = functions[0]
		const { signature, metadata } = firstFunction

		// Extract description using Parser API comments
		const description = extractDescription(comments)

		// Build properties object using pre-calculated metadata and heuristic detectors
		// Note: We still use heuristic detectors for mathematical properties 
		// since they're not yet implemented in the Parser
		const functionSource = signature.name // Use function name for heuristic matching
		const properties = {
			isPure: false, // TODO: Parser needs to provide purity info
			isCurried: false, // TODO: Parser needs to provide currying info  
			curryLevels: undefined,
			isIdempotent: isIdempotent(functionSource),
			isCommutative: isCommutative(functionSource),
			isAssociative: isAssociative(functionSource),
			isDistributive: isDistributive(functionSource),
			complexity: `O(${calculateCyclomaticComplexity(metadata)})` as "O(1)" | "O(log n)" | "O(n)" | "O(n log n)" | "O(n²)" | "O(2^n)" | "O(n!)",
			nullHandling: "unknown" as const, // TODO(@scribe): Implement in Phase 2
			deterministic: false, // TODO: Derive from purity when implemented
		}

		// Extract examples and laws from comments
		const examples = comments
			.filter(comment => comment.type === "example")
			.map(comment => ({
				code: comment.text,
				source: "comment"
			}))

		const laws = comments
			.filter(comment => comment.type === "law")
			.map(comment => ({
				name: comment.text.split(':')[0] || "Unnamed Law",
				description: comment.text
			}))

		// Create metadata
		const docMetadata = {
			signature,
			description,
			properties,
			examples,
			laws,
			relatedFunctions: [], // TODO(@scribe): Find in Phase 2
		}

		// Generate documentation based on format (expression form)
		const output = ((format) => {
			switch (format) {
				case "markdown":
					return generateMarkdown(docMetadata)
				case "html":
					// TODO(@scribe): Implement HTML generation in Phase 2
					return generateMarkdown(docMetadata)
				case "json":
					return JSON.stringify(docMetadata, null, 2)
				default:
					return generateMarkdown(docMetadata)
			}
		})(opts.format)

		return {
			name: signature.name,
			content: output,
			format: opts.format || "markdown",
			metadata: docMetadata,
		}
	})

	// Return as promise to match the original signature
	return Promise.resolve(eitherToResult(computation))
}

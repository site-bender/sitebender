import type { 
	Documentation, 
	GenerateOptions, 
	ParseError, 
	Result
} from "../types/index.ts"
import { DEFAULT_OPTIONS } from "../constants/index.ts"
import parseFileWithCompiler from "../parser/parseFileWithCompiler/index.ts"
import detectPurityFromAST from "../detectors/detectPurityFromAST/index.ts"
import detectCurryingFromAST from "../detectors/detectCurryingFromAST/index.ts"
import detectComplexityFromAST from "../detectors/detectComplexityFromAST/index.ts"
import { isIdempotent, isCommutative, isAssociative, isDistributive } from "../detectors/index.ts"
import { extractDescription } from "../extractors/index.ts"
import { generateMarkdown } from "../generators/index.ts"

/**
 * Generates documentation for a TypeScript file using the TypeScript compiler API
 * @param filePath - Path to the TypeScript file to document
 * @param options - Documentation generation options
 * @returns Result containing the generated documentation or an error
 */
export default async function generateDocsWithCompiler(
	filePath: string,
	options: GenerateOptions = {}
): Promise<Result<Documentation, ParseError>> {
	try {
		// Merge options with defaults
		const opts = { ...DEFAULT_OPTIONS, ...options }
		
		// Read file content
		const content = await readFile(filePath)
		if (!content.ok) {
			return content
		}
		
		// Parse file using TypeScript compiler
		const parseResult = parseFileWithCompiler(content.value, filePath)
		if (!parseResult.ok) {
			return parseResult
		}
		
		const { sourceFile, functions } = parseResult.value
		
		// Check if we found any functions
		if (functions.length === 0) {
			return {
				ok: false,
				error: {
					message: "No functions found in file",
					file: filePath
				}
			}
		}
		
		// Use the first function for now (Phase 2 will handle multiple functions)
		const firstFunction = functions[0]
		const { node, signature } = firstFunction
		
		// Extract description from source
		const description = extractDescription(content.value, node.pos)
		
		// Detect properties using AST-based detectors
		const isPure = detectPurityFromAST(node)
		const curryInfo = detectCurryingFromAST(node)
		const complexity = detectComplexityFromAST(node, sourceFile)
		
		// Get source text for mathematical property detection
		const functionSource = content.value.substring(node.pos, node.end)
		
		// Build properties object
		const properties = {
			isPure,
			isCurried: curryInfo.isCurried,
			curryLevels: curryInfo.isCurried ? curryInfo.levels : undefined,
			isIdempotent: isIdempotent(functionSource),
			isCommutative: isCommutative(functionSource),
			isAssociative: isAssociative(functionSource),
			isDistributive: isDistributive(functionSource),
			complexity,
			nullHandling: "unknown" as const, // TODO(@scribe): Implement in Phase 2
			deterministic: isPure // For now, pure functions are considered deterministic
		}
		
		// Create metadata
		const metadata = {
			signature,
			description,
			properties,
			examples: [], // TODO(@scribe): Extract from tests in Phase 2
			laws: [], // TODO(@scribe): Detect in Phase 2
			relatedFunctions: [] // TODO(@scribe): Find in Phase 2
		}
		
		// Generate documentation based on format
		let output: string
		switch (opts.format) {
			case "markdown":
				output = generateMarkdown(metadata)
				break
			case "html":
				// TODO(@scribe): Implement HTML generation in Phase 2
				output = generateMarkdown(metadata) // Fallback to markdown for now
				break
			case "json":
				output = JSON.stringify(metadata, null, 2)
				break
			default:
				output = generateMarkdown(metadata)
		}
		
		return {
			ok: true,
			value: {
				name: signature.name,
				content: output,
				format: opts.format || "markdown",
				metadata
			}
		}
	} catch (error) {
		return {
			ok: false,
			error: {
				message: error instanceof Error ? error.message : "Failed to generate documentation",
				file: filePath
			}
		}
	}
}

/**
 * Reads a file from the filesystem
 */
async function readFile(filePath: string): Promise<Result<string, ParseError>> {
	try {
		const content = await Deno.readTextFile(filePath)
		return { ok: true, value: content }
	} catch (error) {
		return {
			ok: false,
			error: {
				message: `Failed to read file: ${error instanceof Error ? error.message : "Unknown error"}`,
				file: filePath
			}
		}
	}
}
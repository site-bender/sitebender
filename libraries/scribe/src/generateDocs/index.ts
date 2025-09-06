import type {
	Documentation,
	GenerateOptions,
	ParseError,
	Result,
} from "../types/index.ts"
import { DEFAULT_OPTIONS } from "../constants/index.ts"
import { parseFile, parseFunction } from "../parser/index.ts"
import { extractDescription } from "../extractors/index.ts"
import { detectProperties } from "../detectors/index.ts"
import { generateMarkdown } from "../generators/index.ts"

/**
 * Generates documentation for a TypeScript file
 */
export default async function generateDocs(
	filePath: string,
	options: GenerateOptions = {},
): Promise<Result<Documentation, ParseError>> {
	try {
		// Merge options with defaults
		const opts = { ...DEFAULT_OPTIONS, ...options }

		// Read file content
		const content = await readFile(filePath)
		if (!content.ok) {
			return content
		}

		// Parse file to AST
		const ast = parseFile(content.value, filePath)
		if (!ast.ok) {
			return ast
		}

		// Find first function in the file
		const functionNode = findFirstFunction(ast.value)
		if (!functionNode) {
			return {
				ok: false,
				error: {
					message: "No function found in file",
					file: filePath,
				},
			}
		}

		// Parse function signature
		const signature = parseFunction(functionNode, content.value)
		if (!signature.ok) {
			return signature
		}

		// Extract description
		const description = extractDescription(content.value, functionNode.pos)

		// Detect properties
		const properties = detectProperties(content.value)

		// Create metadata
		const metadata = {
			signature: signature.value,
			description,
			properties,
			examples: [], // TODO: Extract from tests in Phase 2
			laws: [], // TODO: Detect in Phase 2
			relatedFunctions: [], // TODO: Find in Phase 2
		}

		// Generate documentation based on format
		let output: string
		switch (opts.format) {
			case "markdown":
				output = generateMarkdown(metadata)
				break
			case "html":
				// TODO: Implement HTML generation in Phase 2
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
				name: signature.value.name,
				content: output,
				format: opts.format || "markdown",
				metadata,
			},
		}
	} catch (error) {
		return {
			ok: false,
			error: {
				message: error instanceof Error
					? error.message
					: "Failed to generate documentation",
				file: filePath,
			},
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
				message: `Failed to read file: ${
					error instanceof Error ? error.message : "Unknown error"
				}`,
				file: filePath,
			},
		}
	}
}

/**
 * Finds the first function in an AST
 */
function findFirstFunction(ast: any): any {
	// Look for function statements
	if (ast.statements && Array.isArray(ast.statements)) {
		for (const statement of ast.statements) {
			if (
				statement.kind === "FunctionDeclaration" ||
				statement.kind === "ArrowFunction"
			) {
				return statement
			}
		}
	}

	// If no statements, check if the AST itself is a function
	if (ast.kind === "FunctionDeclaration" || ast.kind === "ArrowFunction") {
		return ast
	}

	return null
}

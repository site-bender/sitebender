import type { ASTNode, ParseError, Result } from "../../types/index.ts"

/**
 * Parses a TypeScript source file into an AST
 */
export default function parseFile(
	content: string,
	fileName: string = "source.ts",
): Result<ASTNode, ParseError> {
	try {
		// Use Deno's built-in TypeScript compiler API
		// For now, we'll use a simplified approach with regex patterns
		// In production, we'd use the actual TypeScript compiler API

		// Basic validation
		if (!content || typeof content !== "string") {
			return {
				ok: false,
				error: {
					message: "Invalid source content",
					file: fileName,
				},
			}
		}

		// Create a simple AST representation
		// This is a placeholder - real implementation would use ts.createSourceFile
		const ast: ASTNode = {
			kind: "SourceFile",
			pos: 0,
			end: content.length,
			fileName,
			text: content,
			statements: extractStatements(content),
		}

		return {
			ok: true,
			value: ast,
		}
	} catch (error) {
		return {
			ok: false,
			error: {
				message: error instanceof Error
					? error.message
					: "Failed to parse file",
				file: fileName,
			},
		}
	}
}

/**
 * Extracts statements from source content
 */
function extractStatements(content: string): Array<ASTNode> {
	const statements: Array<ASTNode> = []

	// Find function declarations
	const functionPattern = /(?:export\s+)?(?:default\s+)?function\s+(\w+)/g
	const functionMatches = Array.from(content.matchAll(functionPattern))
	functionMatches.forEach((match) => {
		statements.push({
			kind: "FunctionDeclaration",
			pos: match.index!,
			end: match.index! + match[0].length,
			name: match[1],
			isExported: match[0].includes("export"),
			isDefault: match[0].includes("default"),
		})
	})

	// Find arrow functions
	const arrowPattern =
		/(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)|[^=])\s*=>/g
	const arrowMatches = Array.from(content.matchAll(arrowPattern))
	arrowMatches.forEach((match) => {
		statements.push({
			kind: "ArrowFunction",
			pos: match.index!,
			end: match.index! + match[0].length,
			name: match[1],
			isExported: match[0].includes("export"),
		})
	})

	return statements
}

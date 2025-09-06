import * as ts from "npm:typescript@5.7.2"
import type { Result, ParseError } from "../../types/index.ts"

/**
 * Parses TypeScript source code using the TypeScript compiler API to create a real AST
 * @param source - The TypeScript source code to parse
 * @returns Result containing the AST SourceFile or a ParseError
 * @example
 * ```typescript
 * const result = parseWithCompiler("function add(a: number, b: number): number { return a + b }")
 * if (result.ok) {
 *   console.log(result.value) // ts.SourceFile AST node
 * }
 * ```
 */
export default function parseWithCompiler(source: string): Result<ts.SourceFile, ParseError> {
	try {
		const sourceFile = ts.createSourceFile(
			"temp.ts",
			source,
			ts.ScriptTarget.Latest,
			true, // setParentNodes
			ts.ScriptKind.TS
		)

		if (!sourceFile) {
			return {
				ok: false,
				error: {
					message: "Failed to create source file from TypeScript source",
					line: 0,
					column: 0
				}
			}
		}

		// For now, skip syntax error checking to avoid the host issues
		// In a real implementation, we'd properly configure the TypeScript host
		// TODO(@scribe): Add proper syntax error checking with configured host

		return {
			ok: true,
			value: sourceFile
		}
	} catch (error) {
		return {
			ok: false,
			error: {
				message: error instanceof Error ? error.message : "Unknown parsing error",
				line: 0,
				column: 0
			}
		}
	}
}
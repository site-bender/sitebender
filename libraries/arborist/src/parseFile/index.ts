// @sitebender/arborist/src/parseFile
// Parses a TypeScript file and returns SWC AST with metadata

import { parse } from "npm:@swc/wasm-web@1.13.20"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import createError from "@sitebender/architect/errors/createError/index.ts"
import withSuggestion from "@sitebender/architect/errors/withSuggestion/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ParsedAst, ParseError } from "../types/index.ts"

import _ensureSwcInitialized from "./_ensureSwcInitialized/index.ts"

//++ Parse a TypeScript file and return SWC AST with metadata
//++ This is the ONLY function that performs I/O (file reading)
//++ Returns Result for fail-fast error handling at the I/O boundary
export default async function parseFile(
	filePath: string,
): Promise<Result<ParseError, ParsedAst>> {
	try {
		// Ensure SWC is initialized
		await _ensureSwcInitialized()

		// Read file (only I/O operation - acceptable use of try-catch at boundary)
		const source = await Deno.readTextFile(filePath)

		// Parse with SWC
		const module = await parse(source, {
			syntax: "typescript",
			tsx: filePath.endsWith(".tsx"),
			decorators: false,
			dynamicImport: true,
		})

		// Return ParsedAst wrapper
		const ast: ParsedAst = {
			module,
			sourceText: source,
			filePath,
		}

		return ok(ast)
	} catch (err) {
		// I/O and parse errors - acceptable try-catch at boundary per constitutional rules
		const message = err instanceof Error ? err.message : String(err)

		// Determine error kind based on error message/type
		if (or(message.includes("No such file"))(message.includes("NotFound")) as boolean) {
			const baseError = createError("parseFile")([filePath] as [string])(
				`parseFile: File not found in ${filePath}`,
			)("NOT_FOUND")

			const enrichedError = withSuggestion(
				`Check that the file exists at "${filePath}". Verify the path is correct and the file has not been moved or deleted.`,
			)(baseError)

			const parseError: ParseError = {
				...enrichedError,
				kind: "FileNotFound" as const,
				file: filePath,
			}

			return error(parseError)
		}

		if (
			or(message.includes("permission"))(message.includes("PermissionDenied")) as boolean
		) {
			const baseError = createError("parseFile")([filePath] as [string])(
				`parseFile failed: Permission denied reading file "${filePath}"`,
			)("OPERATION_FAILED")

			const enrichedError = withSuggestion(
				`Ensure you have read permissions for "${filePath}". Run \`deno run --allow-read="${filePath}"\` or check file permissions with \`ls -la "${filePath}"\`.`,
			)(baseError)

			const parseError: ParseError = {
				...enrichedError,
				kind: "ReadPermission" as const,
				file: filePath,
			}

			return error(parseError)
		}

		if (or(message.includes("Unexpected"))(message.includes("Expected")) as boolean) {
			// Parse syntax error - try to extract line/column if available
			const lineMatch = message.match(/line (\d+)/)
			const colMatch = message.match(/column (\d+)/)

			const baseError = createError("parseFile")([filePath] as [string])(
				`parseFile: Could not parse TypeScript source from "${filePath}"`,
			)("PARSE_ERROR")

			const enrichedError = withSuggestion(
				`Check that the file contains valid TypeScript syntax. Run \`deno check "${filePath}"\` to see detailed syntax errors.`,
			)(baseError)

			const parseError: ParseError = {
				...enrichedError,
				kind: "InvalidSyntax" as const,
				file: filePath,
				line: lineMatch ? parseInt(lineMatch[1], 10) : undefined,
				column: colMatch ? parseInt(colMatch[1], 10) : undefined,
			}

			return error(parseError)
		}

		// Generic fallback - likely SWC initialization or unknown error
		const baseError = createError("parseFile")([filePath] as [string])(
			`parseFile failed: ${message}`,
		)("OPERATION_FAILED")

		const enrichedError = withSuggestion(
			`SWC WASM parser failed to initialize or encountered an unknown error. Ensure Deno version is 1.37+ and @swc/wasm-web is properly installed.`,
		)(baseError)

		const parseError: ParseError = {
			...enrichedError,
			kind: "SwcInitializationFailed" as const,
			file: filePath,
		}

		return error(parseError)
	}
}

// @sitebender/arborist/src/parseFile
// Parses a TypeScript file and returns structured data

import { parse } from "npm:@swc/wasm-web@1.13.20"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ParsedFile, ParseError } from "../types/index.ts"

import buildParsedFile from "../buildParsedFile/index.ts"
import ensureSwcInitialized from "../_helpers/ensureSwcInitialized/index.ts"

//++ Parse a TypeScript file and return structured data
//++ This is the only function that performs I/O (file reading)
//++ All other functions are pure transformations
export default async function parseFile(
	filePath: string,
): Promise<Result<ParseError, ParsedFile>> {
	try {
		// Ensure SWC is initialized
		await ensureSwcInitialized()

		// Read file (only I/O operation - acceptable use of try-catch at boundary)
		const source = await Deno.readTextFile(filePath)

		// Parse with SWC
		const ast = await parse(source, {
			syntax: "typescript",
			tsx: false,
			decorators: false,
			dynamicImport: true,
		})

		// Build ParsedFile from AST
		const parsedFile = buildParsedFile(ast)(filePath)

		return ok(parsedFile)
	} catch (err) {
		// Only for file I/O errors and parse errors
		// This is acceptable at the I/O boundary per error-boundaries.md
		const message = err instanceof Error ? err.message : String(err)

		return error({
			_tag: "ParseError" as const,
			message,
			file: filePath,
		})
	}
}

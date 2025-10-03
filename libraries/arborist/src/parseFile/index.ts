// @sitebender/arborist/src/parseFile
// Parses a TypeScript file and returns structured data

//-- [TODO] Replace with deno_ast/SWC once package is available
//-- For Day 1, using minimal implementation to unblock testing

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ParsedFile, ParseError } from "../types/index.ts"

import buildParsedFile from "../buildParsedFile/index.ts"

//++ Parse a TypeScript file and return structured data
//++ This is the only function that performs I/O (file reading)
//++ All other functions are pure transformations
//-- [TODO] Day 2: Integrate deno_ast for real AST parsing
export default async function parseFile(
	filePath: string,
): Promise<Result<ParseError, ParsedFile>> {
	try {
		// Read file (only I/O operation - acceptable use of try-catch at boundary)
		const source = await Deno.readTextFile(filePath)

		// TODO(@guy): Parse with deno_ast/SWC
		// For now, pass minimal data to buildParsedFile
		const parsedFile = buildParsedFile(source)(filePath)

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

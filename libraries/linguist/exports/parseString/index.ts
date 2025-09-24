import type { Either } from "../../internal/either"
import type { ParseError } from "../../internal/types"
//++ Parses a TypeScript/JavaScript string and returns contract-compliant output

import type { ParsedFile, LinguistContractOutput } from "../types"

import createContractOutput from "../../../warden/src/utils/createContractOutput/index.ts"
import parseSourceFile from "../../internal/parseSourceFile"

export default function parseString(
	source: string,
	fileName: string = "anonymous.ts",
): LinguistContractOutput<ParsedFile> {
	try {
		// Use internal source parser
		const result = parseSourceFile(source, fileName) as Either<
			ParseError,
			ParsedFile
		>

		// Handle Either monad result
		if ("left" in result && result.left) {
			// Create error result wrapped in contract
			const errorFile: ParsedFile = {
				filePath: fileName,
				functions: [],
				types: [],
				constants: [],
				components: [],
				comments: [],
				imports: [],
				exports: [],
			}

			return createContractOutput(
				errorFile,
				"parser",
				"1.0.0",
			)
		}

		// Extract successful parse result
		const parsedFile = "right" in result ? result.right : result

		// Ensure all fields are present and immutable
		const compliantFile: ParsedFile = {
			filePath: parsedFile.filePath || fileName,
			functions: Object.freeze(parsedFile.functions || []),
			types: Object.freeze(parsedFile.types || []),
			constants: Object.freeze(parsedFile.constants || []),
			components: Object.freeze(parsedFile.components || []),
			comments: Object.freeze(parsedFile.comments || []),
			imports: Object.freeze(parsedFile.imports || []),
			exports: Object.freeze(parsedFile.exports || []),
		}

		// Wrap in contract output with validation
		return createContractOutput(
			compliantFile,
			"parser",
			"1.0.0",
		)
	} catch (error) {
		// Handle any unexpected errors
		const errorFile: ParsedFile = {
			filePath: fileName,
			functions: [],
			types: [],
			constants: [],
			components: [],
			comments: [],
			imports: [],
			exports: [],
		}

		console.error(`Linguist error for string:`, error)

		return createContractOutput(
			errorFile,
			"parser",
			"1.0.0",
		)
	}
}

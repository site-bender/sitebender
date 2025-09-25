import type { Either } from "../../internal/either"
import type { ParseError } from "../../internal/types"
//++ Parses a TypeScript/JavaScript file and returns contract-compliant output

import type { ArboristContractOutput, ParsedFile } from "../types"

import createContractOutput from "../../../warden/src/utils/createContractOutput/index.ts"
import parseFileWithCompiler from "../../internal/parseFileWithCompiler"

export default function parseFile(
	filePath: string,
): ArboristContractOutput<ParsedFile> {
	try {
		// Use internal compiler-based parser
		const result = parseFileWithCompiler(filePath) as Either<
			ParseError,
			ParsedFile
		>

		// Handle Either monad result
		if ("left" in result && result.left) {
			// Create error result wrapped in contract
			const errorFile: ParsedFile = {
				filePath,
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
				"arborist",
				"1.0.0",
			)
		}

		// Extract successful parse result
		const parsedFile = "right" in result ? result.right : result

		// Ensure all fields are present and immutable
		const compliantFile: ParsedFile = {
			filePath: parsedFile.filePath || filePath,
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
			"arborist",
			"1.0.0",
		)
	} catch (error) {
		// Handle any unexpected errors
		const errorFile: ParsedFile = {
			filePath,
			functions: [],
			types: [],
			constants: [],
			components: [],
			comments: [],
			imports: [],
			exports: [],
		}

		console.error(`Arborist error for ${filePath}:`, error)

		return createContractOutput(
			errorFile,
			"arborist",
			"1.0.0",
		)
	}
}

//++ Parses imports from a TypeScript file using Arborist
//++ Returns array of ImportInfo with source file, specifier, resolved path, line, and column
//++ This is an IO function that reads and parses a file

import parseFile from "@sitebender/arborist/parseFile/index.ts"
import extractImports from "@sitebender/arborist/extractImports/index.ts"
import foldResult from "@sitebender/toolsmith/monads/result/fold/index.ts"
import foldValidation from "@sitebender/toolsmith/monads/validation/fold/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import type { ImportInfo } from "../../types/index.ts"
import type { ParseError } from "@sitebender/arborist/types/errors/index.ts"
import type {
	ParsedAst,
	ParsedImport,
} from "@sitebender/arborist/types/index.ts"
import type { ImportExtractionError } from "@sitebender/arborist/types/errors/index.ts"

//++ Parse imports from a TypeScript file
//++ Takes a file path and returns a Promise of ImportInfo array
//++ Uses Arborist to parse the file and extract import statements
export default function parseImports(
	filePath: string,
): Promise<ReadonlyArray<ImportInfo>> {
	return parseFile(filePath).then(function handleParseResult(result) {
		return Promise.resolve(
			foldResult(function handleError(_error: ParseError) {
				// If parsing fails, return empty array (file doesn't exist or has syntax errors)
				return [] as ReadonlyArray<ImportInfo>
			})(function handleSuccess(ast: ParsedAst) {
				const validation = extractImports(ast)

				return foldValidation(function handleExtractionSuccess(
					imports: ReadonlyArray<ParsedImport>,
				) {
					// Convert Arborist's ParsedImport to Warden's ImportInfo
					const convertedResult = map(function convertImport(
						parsedImport: ParsedImport,
					) {
						return {
							source: filePath,
							specifier: parsedImport.specifier,
							resolved: "", // Will be resolved by resolveModulePath
							line: parsedImport.position.line,
							column: parsedImport.position.column,
						} as ImportInfo
					})(imports)

					return getOrElse([] as ReadonlyArray<ImportInfo>)(convertedResult)
				})(function handleExtractionError(
					_errors: ReadonlyArray<ImportExtractionError>,
				) {
					// If extraction fails, return empty array
					return [] as ReadonlyArray<ImportInfo>
				})(validation)
			})(result),
		)
	})
}

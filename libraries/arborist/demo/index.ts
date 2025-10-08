// [IO] This file performs side effects - file I/O and console output
//++ Arborist demo runner - parses example files and displays structured output
//++ Run with: deno task demo:arborist

import parseFile from "@sitebender/arborist/parseFile/index.ts"
import buildParsedFile from "@sitebender/arborist/buildParsedFile/index.ts"
import foldResult from "@sitebender/toolsmith/monads/result/fold/index.ts"
import foldValidation from "@sitebender/toolsmith/monads/validation/fold/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

const EXAMPLES_DIR = new URL("./examples/", import.meta.url).pathname

const exampleFiles = [
	`${EXAMPLES_DIR}add/index.ts`,
	`${EXAMPLES_DIR}multiply/index.ts`,
	`${EXAMPLES_DIR}filter/index.ts`,
	`${EXAMPLES_DIR}UserCard/index.tsx`,
	`${EXAMPLES_DIR}Button/index.tsx`,
	`${EXAMPLES_DIR}types/index.ts`,
	`${EXAMPLES_DIR}fetchUser/index.ts`,
]

console.log("═".repeat(80))
console.log("ARBORIST DEMO - TypeScript/JSX Parser")
console.log("═".repeat(80))
console.log()

//++ Process a single file and display results
function _processFile(filePath: string) {
	return async function _processFileWithPath(): Promise<void> {
		console.log("─".repeat(80))
		console.log(`FILE: ${filePath}`)
		console.log("─".repeat(80))
		console.log()

		const result = await parseFile(filePath)

		foldResult(
			function handleParseError(parseError) {
				console.log("❌ PARSE ERROR")
				console.log(`Kind: ${parseError.kind}`)
				console.log(`Message: ${parseError.message}`)

				if (parseError.suggestion) {
					console.log(`Suggestion: ${parseError.suggestion}`)
				}

				return null
			},
		)(function handleParsedAst(ast) {
			const validation = buildParsedFile(ast)(filePath)

			return foldValidation(
				function handleParsedFile(parsed) {
				console.log("✓ FUNCTIONS")

				if (parsed.functions.length === 0) {
					console.log("  (none)")
				} else {
					const printFunctionsResult = reduce(
						function printFunction(_accumulator: null) {
							return function printFunctionWithAccumulator(
								func: {
									name: string
									position: { line: number }
									parameters: ReadonlyArray<unknown>
									returnType: string
									modifiers: { isAsync: boolean; isExported: boolean }
								},
							): null {
								console.log(`  - ${func.name} (line ${func.position.line})`)
								console.log(`    Parameters: ${func.parameters.length}`)
								console.log(`    Return type: ${func.returnType}`)
								console.log(`    Async: ${func.modifiers.isAsync}`)
								console.log(`    Exported: ${func.modifiers.isExported}`)
								return null
							}
						},
					)(null)(parsed.functions)

					getOrElse(null)(printFunctionsResult)
				}

				console.log()
				console.log("✓ COMMENTS")

				if (parsed.comments.length === 0) {
					console.log("  (none)")
				} else {
					const printCommentsResult = reduce(
						function printComment(_accumulator: null) {
							return function printCommentWithAccumulator(
								comment: {
									position: { line: number }
									text: string
									envoyMarker?: { marker: string }
								},
							): null {
								const marker = comment.envoyMarker
									? ` [${comment.envoyMarker.marker}]`
									: ""
								console.log(
									`  - Line ${comment.position.line}: ${
										comment.text.substring(0, 60)
									}${marker}`,
								)
								return null
							}
						},
					)(null)(parsed.comments)

					getOrElse(null)(printCommentsResult)
				}

				console.log()
				console.log("✓ IMPORTS")

				if (parsed.imports.length === 0) {
					console.log("  (none)")
				} else {
					const printImportsResult = reduce(
						function printImport(_accumulator: null) {
							return function printImportWithAccumulator(
								imp: { kind: string; specifier: string },
							): null {
								console.log(`  - ${imp.kind}: ${imp.specifier}`)
								return null
							}
						},
					)(null)(parsed.imports)

					getOrElse(null)(printImportsResult)
				}

				console.log()
				console.log("✓ EXPORTS")

				if (parsed.exports.length === 0) {
					console.log("  (none)")
				} else {
					const printExportsResult = reduce(
						function printExport(_accumulator: null) {
							return function printExportWithAccumulator(
								exp: { kind: string; name: string },
							): null {
								console.log(`  - ${exp.kind}: ${exp.name}`)
								return null
							}
						},
					)(null)(parsed.exports)

					getOrElse(null)(printExportsResult)
				}

				console.log()
				console.log("✓ TYPES")

				if (parsed.types.length === 0) {
					console.log("  (none)")
				} else {
					const printTypesResult = reduce(
						function printType(_accumulator: null) {
							return function printTypeWithAccumulator(
								type: { name: string; isExported: boolean },
							): null {
								console.log(`  - ${type.name} (exported: ${type.isExported})`)
								return null
							}
						},
					)(null)(parsed.types)

					getOrElse(null)(printTypesResult)
				}

				console.log()
				console.log("✓ VIOLATIONS")

				const violations = parsed.violations

				if (
					!violations.hasArrowFunctions && !violations.hasClasses &&
					!violations.hasThrowStatements && !violations.hasTryCatch &&
					!violations.hasLoops && !violations.hasMutations
				) {
					console.log("  ✓ No constitutional violations detected")
				} else {
					if (violations.hasArrowFunctions) {
						console.log(
							`  ❌ Arrow functions: ${violations.arrowFunctions.length}`,
						)
					}
					if (violations.hasClasses) {
						console.log(`  ❌ Classes: ${violations.classes.length}`)
					}
					if (violations.hasThrowStatements) {
						console.log(
							`  ❌ Throw statements: ${violations.throwStatements.length}`,
						)
					}
					if (violations.hasTryCatch) {
						console.log(
							`  ❌ Try-catch blocks: ${violations.tryCatchBlocks.length}`,
						)
					}
					if (violations.hasLoops) {
						console.log(`  ❌ Loops: ${violations.loops.length}`)
					}
					if (violations.hasMutations) {
						console.log(`  ❌ Mutations: ${violations.mutations.length}`)
					}
				}

				return parsed
			},
		)(function handleExtractionErrors(errors) {
			console.log("⚠️  EXTRACTION ERRORS")

			const errorsArray = errors as ReadonlyArray<{
				message?: string
				code?: string
			}>

			const printErrorsResult = reduce(
				function printError(_accumulator: null) {
					return function printErrorWithAccumulator(
						err: { message?: string; code?: string },
					): null {
						console.log(
							`  - ${err.message || "Unknown error"} (${err.code || "NO_CODE"})`,
						)
						return null
					}
				},
			)(null)(errorsArray)

			getOrElse(null)(printErrorsResult)

			return null
		})(validation)
		})(result)

		console.log()
	}
}

//++ Process all files sequentially
async function _processAllFiles(
	files: ReadonlyArray<string>,
): Promise<void> {
	const processResult = reduce(
		function processFiles(previousPromise: Promise<void>) {
			return function processFilesWithPrevious(
				filePath: string,
			): Promise<void> {
				return previousPromise.then(function afterPrevious() {
					return _processFile(filePath)()
				})
			}
		},
	)(Promise.resolve())(files)

	await getOrElse(Promise.resolve())(processResult)
}

await _processAllFiles(exampleFiles)

console.log("═".repeat(80))
console.log("DEMO COMPLETE")
console.log("═".repeat(80))

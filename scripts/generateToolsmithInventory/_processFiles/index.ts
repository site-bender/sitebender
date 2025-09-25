import at from "@sitebender/toolsmith/vanilla/array/at/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import slice from "@sitebender/toolsmith/vanilla/array/slice/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"

import type { FunctionInfo, ProcessResult } from "../types/index.ts"

import _extractFunctionInfo from "../_extractFunctionInfo/index.ts"
import _getCategoryFromPath from "../_getCategoryFromPath/index.ts"
import _isAliasedFunction from "../_isAliasedFunction/index.ts"
import _isTypeOrConstantFile from "../_isTypeOrConstantFile/index.ts"

const BATCH_SIZE = 20

type FileResult = {
	type: "function" | "alias" | "typeConstant" | "failed"
	category?: string
	functionName?: string
	functionInfo?: FunctionInfo
	filePath: string
	error?: string
}

/**
 * Process a single file and return its result
 */
async function processSingleFile(filePath: string): Promise<FileResult> {
	// Check if it's a type or constant file first
	if (_isTypeOrConstantFile(filePath)) {
		return {
			type: "typeConstant",
			filePath,
		}
	}

	try {
		const content = await Deno.readTextFile(filePath)

		// Check if it's an aliased function
		if (_isAliasedFunction(content)) {
			return {
				type: "alias",
				filePath,
			}
		}

		const functionInfo = _extractFunctionInfo(content)(filePath)

		if (functionInfo) {
			const category = _getCategoryFromPath(filePath)
			const parts = split("/")(filePath)
			const functionName = at(-2)(parts) || ""

			return {
				type: "function",
				category,
				functionName,
				functionInfo,
				filePath,
			}
		}

		return {
			type: "failed",
			filePath,
		}
	} catch (error) {
		console.error(
			`❌ Error processing ${filePath}:`,
			error instanceof Error ? error.message : String(error),
		)
		return {
			type: "failed",
			filePath,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}

/**
 * Merge file results into the accumulator
 */
function mergeResults(
	acc: ProcessResult,
	results: FileResult[],
): ProcessResult {
	return reduce((current: ProcessResult, result: FileResult) => {
		switch (result.type) {
			case "function":
				if (result.category && result.functionName && result.functionInfo) {
					const updatedCategory = {
						...current.inventory[result.category],
						[result.functionName]: result.functionInfo,
					}
					return {
						...current,
						inventory: {
							...current.inventory,
							[result.category]: updatedCategory,
						},
						processedCount: current.processedCount + 1,
					}
				}
				return current

			case "alias":
				return {
					...current,
					aliasedFiles: [...current.aliasedFiles, result.filePath],
				}

			case "typeConstant":
				return {
					...current,
					typeOrConstantFiles: [
						...current.typeOrConstantFiles,
						result.filePath,
					],
				}

			case "failed":
				return {
					...current,
					failedFiles: [...current.failedFiles, result.filePath],
				}

			default:
				return current
		}
	})(acc)(results)
}

/**
 * Process a batch of files in parallel
 */
async function processBatch(
	batch: string[],
): Promise<FileResult[]> {
	return Promise.all(batch.map(processSingleFile))
}

/**
 * Process all files in batches for better performance
 */
export default async function _processFiles(
	files: string[],
): Promise<ProcessResult> {
	const initialResult: ProcessResult = {
		inventory: {},
		processedCount: 0,
		failedFiles: [],
		aliasedFiles: [],
		typeOrConstantFiles: [],
	}

	async function processNextBatch(
		remaining: string[],
		acc: ProcessResult,
	): Promise<ProcessResult> {
		if (length(remaining) === 0) {
			return acc
		}

		const batch = slice(0)(BATCH_SIZE)(remaining)
		const rest = slice(BATCH_SIZE)(length(remaining))(remaining)

		const batchResults = await processBatch(batch)
		const updated = mergeResults(acc, batchResults)

		return processNextBatch(rest, updated)
	}

	return processNextBatch(files, initialResult)
}

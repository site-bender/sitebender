import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

import type { Logger } from "../../types/index.ts"

import copyStylesRecursive from "./copyStylesRecursive/index.ts"

export const MSG_CSS_NO_SRC_COMPONENTS_DIR = "No src/components directory found"
export const MSG_CSS_START = "💅 Copying component CSS files..."
export const MSG_CSS_SUCCESS = "✅ Component styles copied"
export const MSG_CSS_NO_FILES_TO_COPY = "No CSS files found to copy"
export const MSG_CSS_UNEXPECTED_SRC_CHECK_ERROR =
	"Unexpected error checking src/components directory"
export const MSG_CSS_COPY_SUCCESS_PREFIX = "Successfully copied "
export const MSG_CSS_COPY_SUCCESS_SUFFIX = " CSS file(s)"
export const MSG_CSS_SRC_NOT_DIRECTORY =
	"src/components exists but is not a directory"
export const MSG_CSS_COPY_OPERATION_ERROR = "Error during CSS copy operation"

const defaultLogger: Logger = {
	log: console.log,
	warn: console.warn,
	error: console.error,
}

export default async function copyComponentStyles(
	logger: Logger = defaultLogger,
): Promise<string> {
	const srcComponentsDir = join(Deno.cwd(), "src", "components")
	const distComponentsDir = join(Deno.cwd(), "dist", "styles", "components")

	// Check if src/components exists and handle errors
	try {
		const srcStat = await Deno.stat(srcComponentsDir)
		if (!srcStat.isDirectory) {
			logger.warn(MSG_CSS_SRC_NOT_DIRECTORY)
			return MSG_CSS_SRC_NOT_DIRECTORY
		}
	} catch (error: unknown) {
		if (error instanceof Deno.errors.NotFound) {
			logger.log(MSG_CSS_NO_SRC_COMPONENTS_DIR)
			return MSG_CSS_NO_SRC_COMPONENTS_DIR
		}
		const errorMsg = `${MSG_CSS_UNEXPECTED_SRC_CHECK_ERROR}: ${
			(error as Error).message
		}`
		logger.error(errorMsg)
		return errorMsg
	}

	try {
		const filesFound = await copyStylesRecursive(
			srcComponentsDir,
			distComponentsDir,
			"",
			logger,
		)

		if (filesFound === 0) {
			logger.log(MSG_CSS_NO_FILES_TO_COPY)
			return MSG_CSS_NO_FILES_TO_COPY
		}

		const successMessage =
			`${MSG_CSS_COPY_SUCCESS_PREFIX}${filesFound}${MSG_CSS_COPY_SUCCESS_SUFFIX}`
		logger.log(successMessage)
		return successMessage
	} catch (error: unknown) {
		const errorMessage = (error as Error).message ||
			`${MSG_CSS_COPY_OPERATION_ERROR}: ${error}`
		return errorMessage
	}
}

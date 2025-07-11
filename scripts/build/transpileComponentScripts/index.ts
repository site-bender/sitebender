import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

import transpileScriptsRecursive from "./transpileScriptsRecursive/index.ts"

export const MSG_SCRIPTS_NO_SRC_COMPONENTS_DIR =
	"No src/components directory found"
export const MSG_SCRIPTS_START = "💻 Transpiling component TypeScript files..."
export const MSG_SCRIPTS_SUCCESS = "✅ Component scripts transpiled"
export const MSG_SCRIPTS_NO_FILES_TO_COPY =
	"No TypeScript files found to transpile"
export const MSG_SCRIPTS_UNEXPECTED_SRC_CHECK_ERROR =
	"Unexpected error checking src/components directory"
export const MSG_SCRIPTS_COPY_SUCCESS_PREFIX = "Successfully transpiled "
export const MSG_SCRIPTS_COPY_SUCCESS_SUFFIX = " script file(s)"
export const MSG_SCRIPTS_SRC_NOT_DIRECTORY =
	"src/components exists but is not a directory"
export const MSG_SCRIPTS_COPY_OPERATION_ERROR =
	"Error during script transpile operation"

export type Logger = {
	log: (...args: unknown[]) => void
	warn: (...args: unknown[]) => void
	error: (...args: unknown[]) => void
}

const defaultLogger: Logger = {
	log: console.log,
	warn: console.warn,
	error: console.error,
}

export default async function transpileComponentScripts(
	logger: Logger = defaultLogger,
): Promise<string> {
	const srcComponentsDir = join(Deno.cwd(), "src", "components")
	const distComponentsDir = join(Deno.cwd(), "dist", "scripts", "components")

	// Check if src/components exists and handle errors
	try {
		const srcStat = await Deno.stat(srcComponentsDir)
		if (!srcStat.isDirectory) {
			logger.warn(MSG_SCRIPTS_SRC_NOT_DIRECTORY)
			return MSG_SCRIPTS_SRC_NOT_DIRECTORY
		}
	} catch (error: unknown) {
		if (error instanceof Deno.errors.NotFound) {
			logger.log(MSG_SCRIPTS_NO_SRC_COMPONENTS_DIR)
			return MSG_SCRIPTS_NO_SRC_COMPONENTS_DIR
		}
		const errorMsg = `${MSG_SCRIPTS_UNEXPECTED_SRC_CHECK_ERROR}: ${
			(error as Error).message
		}`
		logger.error(errorMsg)
		return errorMsg
	}

	try {
		const filesFound = await transpileScriptsRecursive(
			srcComponentsDir,
			distComponentsDir,
			logger,
			"",
		)

		if (filesFound === 0) {
			logger.log(MSG_SCRIPTS_NO_FILES_TO_COPY)
			return MSG_SCRIPTS_NO_FILES_TO_COPY
		}

		const successMessage =
			`${MSG_SCRIPTS_COPY_SUCCESS_PREFIX}${filesFound}${MSG_SCRIPTS_COPY_SUCCESS_SUFFIX}`
		logger.log(successMessage)
		return successMessage
	} catch (error: unknown) {
		const errorMessage = (error as Error).message ||
			`Error during script transpile operation: ${error}`
		return errorMessage
	}
}

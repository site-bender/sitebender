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
	// Also support transpiling any scripts under src/hydrate to dist/scripts/hydrate
	const srcHydrateDir = join(Deno.cwd(), "src", "hydrate")
	const distHydrateDir = join(Deno.cwd(), "dist", "scripts", "hydrate")

	// Transpile src/components if present
	let componentsTranspiled = 0
	try {
		const srcStat = await Deno.stat(srcComponentsDir)
		if (!srcStat.isDirectory) {
			logger.warn(MSG_SCRIPTS_SRC_NOT_DIRECTORY)
		} else {
			const filesFound = await transpileScriptsRecursive(
				srcComponentsDir,
				distComponentsDir,
				logger,
				"",
			)
			componentsTranspiled = filesFound
			if (filesFound === 0) {
				logger.log(MSG_SCRIPTS_NO_FILES_TO_COPY)
			} else {
				logger.log(`${MSG_SCRIPTS_COPY_SUCCESS_PREFIX}${filesFound}${MSG_SCRIPTS_COPY_SUCCESS_SUFFIX}`)
			}
		}
	} catch (error: unknown) {
		if (error instanceof Deno.errors.NotFound) {
			logger.log(MSG_SCRIPTS_NO_SRC_COMPONENTS_DIR)
		} else {
			const errorMsg = `${MSG_SCRIPTS_UNEXPECTED_SRC_CHECK_ERROR}: ${(error as Error).message}`
			logger.error(errorMsg)
		}
	}

	// Transpile src/hydrate if present
	let hydrateTranspiled = 0
	try {
		const hydrateStat = await Deno.stat(srcHydrateDir)
		if (hydrateStat.isDirectory) {
			const filesFound = await transpileScriptsRecursive(
				srcHydrateDir,
				distHydrateDir,
				logger,
				"",
			)
			hydrateTranspiled = filesFound
			if (filesFound === 0) {
				logger.log("No TypeScript files found to transpile in src/hydrate")
			} else {
				logger.log(`${MSG_SCRIPTS_COPY_SUCCESS_PREFIX}${filesFound}${MSG_SCRIPTS_COPY_SUCCESS_SUFFIX}`)
			}
		}
	} catch (_error: unknown) {
		// ignore if hydrate folder missing
	}

	const total = componentsTranspiled + hydrateTranspiled
	if (total === 0) {
		return MSG_SCRIPTS_NO_FILES_TO_COPY
	}
	return `${MSG_SCRIPTS_COPY_SUCCESS_PREFIX}${total}${MSG_SCRIPTS_COPY_SUCCESS_SUFFIX}`
}

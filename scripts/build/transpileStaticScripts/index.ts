import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

import type { Logger } from "../../types/index.ts"

import toKebabCase from "../../utilities/toKebabCase/index.ts"
import transpileTypeScript from "../transpileComponentScripts/transpileScriptsRecursive/transpileTypeScript/index.ts"

const defaultLogger: Logger = {
	log: console.log,
	warn: console.warn,
	error: console.error,
}

export default async function transpileStaticScripts(
	logger: Logger = defaultLogger,
): Promise<string> {
	const staticScriptsDir = join(Deno.cwd(), "assets", "scripts")
	const distScriptsDir = join(Deno.cwd(), "dist", "scripts")

	try {
		const staticStat = await Deno.stat(staticScriptsDir)
		if (!staticStat.isDirectory) {
			logger.warn("static/scripts exists but is not a directory")
			return "static/scripts exists but is not a directory"
		}
	} catch (error: unknown) {
		if (error instanceof Deno.errors.NotFound) {
			logger.log("No static/scripts directory found")
			return "No static/scripts directory found"
		}
		const errorMsg = `Unexpected error checking static/scripts directory: ${
			(error as Error).message
		}`
		logger.error(errorMsg)
		return errorMsg
	}

	try {
		const filesFound = await transpileScriptsRecursive(
			staticScriptsDir,
			distScriptsDir,
			logger,
		)

		if (filesFound === 0) {
			logger.log("No TypeScript files found in static/scripts")
			return "No TypeScript files found in static/scripts"
		}

		const successMessage =
			`Successfully transpiled ${filesFound} static script file(s)`
		logger.log(successMessage)
		return successMessage
	} catch (error: unknown) {
		const errorMessage = (error as Error).message ||
			`Error during static script transpile operation: ${error}`
		return errorMessage
	}
}

async function transpileScriptsRecursive(
	sourceDir: string,
	destDir: string,
	logger: Logger,
): Promise<number> {
	let filesFound = 0

	try {
		for await (const entry of Deno.readDir(sourceDir)) {
			if (entry.isDirectory) {
				const entryPath = join(sourceDir, entry.name)
				const kebabDirName = toKebabCase(entry.name)
				const destSubDir = join(destDir, kebabDirName)

				const subFilesFound = await transpileScriptsRecursive(
					entryPath,
					destSubDir,
					logger,
				)
				filesFound += subFilesFound
			} else if (
				entry.isFile &&
				entry.name.endsWith(".ts") &&
				!entry.name.endsWith(".test.ts")
			) {
				const srcFile = join(sourceDir, entry.name)
				await Deno.mkdir(destDir, { recursive: true })

				const jsFileName = entry.name.replace(/\.ts$/, ".js")
				const destFile = join(destDir, jsFileName)

				const tsContent = await Deno.readTextFile(srcFile)
				const jsContent = transpileTypeScript(tsContent, srcFile)

				await Deno.writeTextFile(destFile, jsContent)
				filesFound++
			}
		}
	} catch (error: unknown) {
		const errorMsg = `Error during static script transpile operation: ${
			(error as Error).message
		}`
		logger.error(errorMsg)
		throw new Error(errorMsg)
	}

	return filesFound
}

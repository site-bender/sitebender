import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

import type { Logger } from "../../../types/index.ts"

import toKebabCase from "../../../utilities/toKebabCase/index.ts"
import transpileTypeScript from "./transpileTypeScript/index.ts"

export const MSG_SCRIPTS_COPY_OPERATION_ERROR =
	"Error during script transpile operation"

/**
 * Pure function to get directory entries
 */
const getDirectoryEntries = async (
	sourceDir: string,
): Promise<Deno.DirEntry[]> => {
	try {
		const entriesArray: Deno.DirEntry[] = []
		const iterator = Deno.readDir(sourceDir)
		for await (const entry of iterator) {
			entriesArray.push(entry)
		}
		return entriesArray
	} catch (error: unknown) {
		if (error instanceof Deno.errors.NotFound) {
			return []
		}
		throw error
	}
}

/**
 * Pure function to check if TypeScript file should be transpiled
 */
const shouldTranspileFile = (entry: Deno.DirEntry): boolean =>
	entry.isFile &&
	entry.name.endsWith(".ts") &&
	!entry.name.endsWith(".test.ts") &&
	!entry.name.endsWith(".tsx")

/**
 * Pure function to check if directory should be processed
 */
const shouldProcessDirectory = (entry: Deno.DirEntry): boolean =>
	entry.isDirectory &&
	entry.name !== "helpers" &&
	entry.name !== "types"

/**
 * Pure function to transpile a single TypeScript file
 */
const transpileFile = async (
	entry: Deno.DirEntry,
	entryPath: string,
	destDir: string,
): Promise<void> => {
	const srcFile = join(entryPath, entry.name)
	await Deno.mkdir(destDir, { recursive: true })

	const jsFileName = entry.name.replace(/\.ts$/, ".js")
	const destFile = join(destDir, jsFileName)

	const tsContent = await Deno.readTextFile(srcFile)
	const jsContent = transpileTypeScript(tsContent, srcFile)

	await Deno.writeTextFile(destFile, jsContent)
}

/**
 * Pure function to process TypeScript files in a directory
 */
const processTypeScriptFiles = async (
	entryPath: string,
	destDir: string,
): Promise<number> => {
	try {
		const entries = await getDirectoryEntries(entryPath)
		const tsFiles = entries.filter(shouldTranspileFile)

		await Promise.all(
			tsFiles.map((entry) => transpileFile(entry, entryPath, destDir)),
		)

		return tsFiles.length
	} catch (error: unknown) {
		if (error instanceof Deno.errors.NotFound) {
			return 0
		}
		throw error
	}
}

export default async function transpileScriptsRecursive(
	sourceDir: string,
	distComponentsDir: string,
	logger: Logger,
	relativePath: string = "",
): Promise<number> {
	try {
	const entries = await getDirectoryEntries(sourceDir)

		// Get valid subdirectories (excluding helpers and types)
		const validSubdirectories = entries.filter(shouldProcessDirectory)

		// First, process TypeScript files in the current directory (root of sourceDir)
		const currentDirFiles = await processTypeScriptFiles(
			sourceDir,
			join(distComponentsDir, relativePath),
		)

		// Then process TypeScript files in each valid subdirectory
		const fileResults = await Promise.all(
			validSubdirectories.map((entry) => {
				const entryPath = join(sourceDir, entry.name)
				const kebabCaseName = toKebabCase(entry.name)
				const destDir = join(distComponentsDir, relativePath, kebabCaseName)

				return processTypeScriptFiles(entryPath, destDir)
			}),
		)

		// Recursively process subdirectories
		const recursiveResults = await Promise.all(
			validSubdirectories.map((entry) => {
				const entryPath = join(sourceDir, entry.name)
				const kebabCaseName = toKebabCase(entry.name)
				const newRelativePath = join(relativePath, kebabCaseName)

				return transpileScriptsRecursive(
					entryPath,
					distComponentsDir,
					logger,
					newRelativePath,
				)
			}),
		)

		const totalFileCount = fileResults.reduce(
			(total, count) => total + count,
			currentDirFiles,
		)
		const totalRecursiveCount = recursiveResults.reduce(
			(total, count) => total + count,
			0,
		)

		return totalFileCount + totalRecursiveCount
	} catch (error: unknown) {
		const errorMsg = `${MSG_SCRIPTS_COPY_OPERATION_ERROR}: ${
			(error as Error).message
		}`
		logger.error(errorMsg)
		throw new Error(errorMsg)
	}
}

import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

import type { Logger } from "../../../types/index.ts"

import toKebabCase from "../../../utilities/toKebabCase/index.ts"

/**
 * Pure function to copy a single CSS file
 */
const copyCssFile = async (
	srcFile: string,
	destDir: string,
	fileName: string,
): Promise<void> => {
	await Deno.mkdir(destDir, { recursive: true })
	const destFile = join(destDir, fileName)
	await Deno.copyFile(srcFile, destFile)
}

/**
 * Pure function to get directory entries without mutation
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
 * Pure function to process CSS files in current directory
 */
const processCssFiles = async (
	entries: Deno.DirEntry[],
	sourceDir: string,
	distComponentsDir: string,
	relativePath: string,
): Promise<number> => {
	const cssFiles = entries.filter((entry) =>
		entry.isFile && entry.name.endsWith(".css")
	)

	await Promise.all(
		cssFiles.map((entry) => {
			const srcFile = join(sourceDir, entry.name)
			const destDir = join(distComponentsDir, relativePath)
			return copyCssFile(srcFile, destDir, entry.name)
		}),
	)

	return cssFiles.length
}

/**
 * Pure function to process subdirectories recursively
 */
const processSubdirectories = async (
	entries: Deno.DirEntry[],
	sourceDir: string,
	distComponentsDir: string,
	relativePath: string,
	logger: Logger,
): Promise<number> => {
	const subdirectories = entries.filter((entry) => entry.isDirectory)

	const subResults = await Promise.all(
		subdirectories.map((entry) => {
			const entryPath = join(sourceDir, entry.name)
			const kebabCaseName = toKebabCase(entry.name)
			const newRelativePath = join(relativePath, kebabCaseName)

			return copyStylesRecursive(
				entryPath,
				distComponentsDir,
				newRelativePath,
				logger,
			)
		}),
	)

	return subResults.reduce((total, count) => total + count, 0)
}

export default async function copyStylesRecursive(
	sourceDir: string,
	distComponentsDir: string,
	relativePath: string = "",
	logger: Logger,
): Promise<number> {
	try {
		const entries = await getDirectoryEntries(sourceDir)

		const [cssFileCount, subdirectoryCount] = await Promise.all([
			processCssFiles(entries, sourceDir, distComponentsDir, relativePath),
			processSubdirectories(
				entries,
				sourceDir,
				distComponentsDir,
				relativePath,
				logger,
			),
		])

		return cssFileCount + subdirectoryCount
	} catch (error: unknown) {
		const errorMsg = `Error during CSS copy operation: ${
			(error as Error).message
		}`
		logger.error(errorMsg)
		throw new Error(errorMsg)
	}
}

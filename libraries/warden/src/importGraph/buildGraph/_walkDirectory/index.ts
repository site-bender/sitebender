//++ Recursively walks a directory tree and returns all TypeScript/TSX files
//++ Returns array of absolute file paths
//++ Skips node_modules, .git, and other common ignore patterns

import { join } from "jsr:@std/path@1"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

//++ Walk directory recursively and collect all TypeScript files
//++ This is an IO function that reads the filesystem
export default function walkDirectory(
	rootPath: string,
): Promise<ReadonlyArray<string>> {
	return walkDirectoryRecursive(rootPath)
}

//++ Recursive helper for walking directories
async function walkDirectoryRecursive(
	dirPath: string,
): Promise<ReadonlyArray<string>> {
	try {
		// Convert async iterator to array
		const entriesArray: Array<Deno.DirEntry> = []

		for await (const entry of Deno.readDir(dirPath)) {
			entriesArray.push(entry)
		}

		return await processEntriesArray(dirPath, entriesArray)
	} catch {
		// If directory read fails, return empty array
		return [] as ReadonlyArray<string>
	}
}

//++ Process array of directory entries
function processEntriesArray(
	dirPath: string,
	entries: ReadonlyArray<Deno.DirEntry>,
): Promise<ReadonlyArray<string>> {
	// Use reduce to accumulate file paths
	const processPromises = reduce(function accumulateFiles(
		acc: Promise<ReadonlyArray<string>>,
	) {
		return function processEntry(
			entry: Deno.DirEntry,
		): Promise<ReadonlyArray<string>> {
			const fullPath = join(dirPath, entry.name)

			// Skip common ignore patterns
			if (
				entry.name === "node_modules" ||
				entry.name === ".git" ||
				entry.name === "dist" ||
				entry.name === "coverage" ||
				entry.name.startsWith(".")
			) {
				return acc
			}

			if (entry.isDirectory) {
				// Recursively walk subdirectory
				return acc.then(function appendSubdirectoryFiles(files) {
					return walkDirectoryRecursive(fullPath).then(
						function combineFiles(subFiles) {
							return [...files, ...subFiles] as ReadonlyArray<string>
						},
					)
				})
			}

			if (entry.isFile && isTypeScriptFile(entry.name)) {
				// Add TypeScript file to accumulator
				return acc.then(function appendFile(files) {
					return [...files, fullPath] as ReadonlyArray<string>
				})
			}

			return acc
		}
	})(Promise.resolve([] as ReadonlyArray<string>))(entries)

	return getOrElse(Promise.resolve([] as ReadonlyArray<string>))(
		processPromises,
	)
}

//++ Check if filename is a TypeScript file
function isTypeScriptFile(filename: string): boolean {
	return filename.endsWith(".ts") || filename.endsWith(".tsx")
}

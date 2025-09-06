/**
 * Gets relative import path from test file to source file
 * @param functionPath Absolute path to the function file
 * @returns Relative import path string
 */
export default function getRelativeImportPath(functionPath: string): string {
	const pathParts = functionPath.split("/")
	const libraryIndex = pathParts.indexOf("libraries")
	const srcIndex = pathParts.indexOf("src")
	
	if (srcIndex === -1 || libraryIndex === -1) {
		throw new Error("Invalid function path")
	}
	
	// Calculate from test file location to source file
	// test is at: tests/libraries/{library}/path/to/function/index.test.ts
	// source is at: libraries/{library}/src/path/to/function/index.ts
	
	const functionDepth = pathParts.slice(srcIndex + 1, -1).length
	// Go up from test file location
	const upFromTest = functionDepth + 3 // +3 for tests/libraries/{library}
	const upDirs = Array(upFromTest).fill("..").join("/")
	
	// Build path to source from root (keep .ts extension for Deno)
	const sourcePath = pathParts.slice(libraryIndex).join("/")
	
	return `${upDirs}/${sourcePath}`
}
//++ Resolves a module import specifier to an absolute file path
//++ Takes the importing file's path and the import specifier
//++ Returns the absolute path to the imported module
//++ Handles relative paths (../, ./), index.ts resolution, and skips external modules

import { dirname, isAbsolute, join, resolve } from "jsr:@std/path@1"

//++ Resolve module path from import specifier
//++ Higher-order function: takes fromFile, returns function that takes importSpecifier
//++ Curried for composition
export default function resolveModulePath(
	fromFile: string,
) {
	return function resolveFromFile(
		importSpecifier: string,
	): string {
		// Skip external modules (no ./ or ../ prefix, not absolute)
		if (
			!importSpecifier.startsWith("./") &&
			!importSpecifier.startsWith("../") &&
			!isAbsolute(importSpecifier)
		) {
			// External module - return as-is (e.g., "@sitebender/toolsmith/...")
			return importSpecifier
		}

		// Get the directory of the importing file
		const fromDir = dirname(fromFile)

		// Resolve the import specifier relative to the importing file's directory
		let resolvedPath = resolve(fromDir, importSpecifier)

		// Handle index.ts resolution
		// If the path doesn't have an extension, try adding .ts or /index.ts
		if (!resolvedPath.endsWith(".ts") && !resolvedPath.endsWith(".tsx")) {
			// Try direct .ts extension first
			const withTs = `${resolvedPath}.ts`

			try {
				// Check if file exists with .ts extension
				const stat = Deno.statSync(withTs)
				if (stat.isFile) {
					resolvedPath = withTs
				}
			} catch {
				// File doesn't exist with .ts, try index.ts
				resolvedPath = join(resolvedPath, "index.ts")
			}
		}

		return resolvedPath
	}
}

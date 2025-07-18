import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

class TypeImportFixer {
	constructor(private basePath: string) {}

	async fixAllTypeImports(): Promise<void> {
		console.log(
			"🔍 Converting ALL imports to type imports in ENTIRE lib/types...",
		)

		// Scan ALL directories in lib/types, not just Thing
		const typesPath = join(this.basePath, "lib/types")
		await this.scanAndFix(typesPath)

		console.log("✅ All imports converted to type imports!")
	}

	private async scanAndFix(dirPath: string): Promise<void> {
		try {
			for await (const entry of Deno.readDir(dirPath)) {
				const fullPath = `${dirPath}/${entry.name}`

				if (entry.isDirectory) {
					await this.scanAndFix(fullPath)
				} else if (entry.name.endsWith(".ts")) { // Check ALL .ts files, not just index.ts
					await this.fixFileImports(fullPath)
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async fixFileImports(filePath: string): Promise<void> {
		try {
			const content = await Deno.readTextFile(filePath)

			if (!content.includes("import ") || !content.includes("from ")) {
				return
			}

			let newContent = content
			let hasChanges = false

			// First, fix malformed paths with double slashes
			const malformedPathRegex = /from\s+"([^"]*\/\/[^"]*)"/g
			newContent = newContent.replace(
				malformedPathRegex,
				(match, importPath) => {
					const fixedPath = importPath.replace(/\/+/g, "/")
					console.log(
						`🔧 Fixing malformed path: ${importPath} -> ${fixedPath} in ${filePath}`,
					)
					hasChanges = true
					return `from "${fixedPath}"`
				},
			)

			// Convert ALL imports to type imports - no exceptions!
			const importRegex = /^import\s+(\{[^}]+\}|\w+)\s+from\s+"([^"]+)"/gm

			newContent = newContent.replace(
				importRegex,
				(match, importName, importPath) => {
					// Convert everything to type import
					if (!match.includes("import type ")) {
						console.log(
							`🔧 Converting to type import: ${importName} in ${filePath}`,
						)
						hasChanges = true
						return `import type ${importName} from "${importPath}"`
					}

					return match
				},
			)

			if (hasChanges) {
				await Deno.writeTextFile(filePath, newContent)
			}
		} catch (error) {
			console.error(`❌ Error processing ${filePath}: ${error.message}`)
		}
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new TypeImportFixer(workspacePath)

	try {
		await fixer.fixAllTypeImports()
	} catch (error) {
		console.error("Failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

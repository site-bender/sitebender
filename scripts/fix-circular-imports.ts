import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

class CircularImportFixer {
	constructor(private basePath: string) {}

	async fixAllCircularImports(): Promise<void> {
		console.log("🔍 Finding and fixing circular imports...")

		const thingPath = join(this.basePath, "lib/types/Thing")
		await this.scanAndFix(thingPath)

		console.log("✅ All circular imports fixed!")
	}

	private async scanAndFix(dirPath: string): Promise<void> {
		try {
			for await (const entry of Deno.readDir(dirPath)) {
				const fullPath = `${dirPath}/${entry.name}`

				if (entry.isDirectory) {
					await this.scanAndFix(fullPath)
				} else if (entry.name === "index.ts") {
					await this.fixFileImports(fullPath)
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async fixFileImports(filePath: string): Promise<void> {
		const content = await Deno.readTextFile(filePath)

		// Skip if no imports
		if (!content.includes("import ") || !content.includes("from ")) {
			return
		}

		// Convert problematic imports to type imports
		let newContent = content
		let hasChanges = false

		// Fix imports that could be circular
		const importRegex = /^import\s+(\w+)\s+from\s+"([^"]+)"/gm

		newContent = newContent.replace(
			importRegex,
			(match, importName, importPath) => {
				// Convert to type import if it's importing from a sibling/parent that might import back
				if (this.isLikelyCircular(filePath, importPath, importName)) {
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
	}

	private isLikelyCircular(
		filePath: string,
		importPath: string,
		importName: string,
	): boolean {
		// Convert relative paths and file paths to check for circular patterns

		// Don't touch DataType imports
		if (importPath.includes("DataType")) return false

		// Check if importing from parent directory (../)
		// and the import name suggests it might import back
		if (importPath.startsWith("../")) {
			// These are the common circular patterns we found:

			// MedicalGuideline imports MedicalEntity (parent) - CIRCULAR
			if (
				importName === "MedicalEntity" && filePath.includes("MedicalGuideline")
			) {
				return true
			}

			// MedicalGuideline imports MedicalEvidenceLevel - CIRCULAR
			if (
				importName === "MedicalEvidenceLevel" &&
				filePath.includes("MedicalGuideline")
			) {
				return true
			}

			// Any import from Intangible hierarchy that goes back to MedicalEntity
			if (
				importPath.includes("Intangible") && filePath.includes("MedicalEntity")
			) {
				return true
			}

			// MedicalEvidenceLevel imports MedicalEnumeration - potentially circular
			if (importName === "MedicalEnumeration") {
				return true
			}

			// Any interface importing its own parent type
			if (importPath.includes("../index.ts")) {
				return true
			}
		}

		return false
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new CircularImportFixer(workspacePath)

	try {
		await fixer.fixAllCircularImports()
	} catch (error) {
		console.error("Failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

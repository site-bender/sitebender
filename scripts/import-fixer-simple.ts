import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

class SimpleImportFixer {
	constructor(private basePath: string, private dryRun = false) {}

	async fixAllImports(): Promise<void> {
		console.log(
			`🔍 Finding ALL files with type intersections... (DRY RUN: ${this.dryRun})`,
		)

		const thingPath = join(this.basePath, "lib/types/Thing")
		await this.scanAndFix(thingPath, "")

		if (this.dryRun) {
			console.log("\n🛡️  DRY RUN - No files were modified!")
			console.log("Run with --fix to actually make changes")
		} else {
			console.log("✅ All imports fixed!")
		}
	}

	private async scanAndFix(
		dirPath: string,
		relativePath: string,
	): Promise<void> {
		try {
			for await (const entry of Deno.readDir(dirPath)) {
				const fullPath = join(dirPath, entry.name)

				if (entry.isDirectory) {
					const newRelativePath = relativePath
						? `${relativePath}/${entry.name}`
						: entry.name
					await this.scanAndFix(fullPath, newRelativePath)
				} else if (entry.name === "index.ts") {
					await this.fixFileIfNeeded(fullPath, relativePath)
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async fixFileIfNeeded(
		filePath: string,
		relativePath: string,
	): Promise<void> {
		const content = await Deno.readTextFile(filePath)

		// Look for ANY type intersection pattern
		const typeMatch = content.match(/type\s+(\w+)\s*=\s*([^=\n]+)/)
		if (!typeMatch) return

		const typeName = typeMatch[1]
		const intersection = typeMatch[2].trim()

		console.log(`🔧 Checking ${typeName}...`)

		// Extract ALL types from intersection
		const allTypes = intersection
			.split("&")
			.map((t) => t.trim())
			.filter((t) => t && t !== typeName && t !== `${typeName}Props`)

		const neededImports: string[] = []

		// Check for Thing import
		if (allTypes.includes("Thing") && !content.includes("import Thing from")) {
			const depth = relativePath.split("/").length
			const upPath = "../".repeat(depth)
			neededImports.push(`import Thing from "${upPath}index.ts"`)
		}

		// Check for Props imports
		for (const type of allTypes) {
			if (type.endsWith("Props") && !content.includes(`import { ${type} }`)) {
				const baseType = type.replace("Props", "")
				const importPath = this.getImportPath(baseType, relativePath)
				if (importPath) {
					neededImports.push(`import { ${type} } from "${importPath}"`)
				}
			}
		}

		if (neededImports.length > 0) {
			console.log(`  ➕ Would add ${neededImports.length} imports:`)
			neededImports.forEach((imp) => console.log(`    ${imp}`))

			if (!this.dryRun) {
				const newContent = this.insertImports(content, neededImports)
				await Deno.writeTextFile(filePath, newContent)
				console.log(`    ✅ Added to file`)
			}
		} else {
			console.log(`  ✅ No imports needed`)
		}
	}

	private insertImports(content: string, newImports: string[]): string {
		const lines = content.split("\n")

		// Find where to insert imports
		let insertIndex = 0
		let hasExistingImports = false

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim()

			if (line.startsWith("import ")) {
				hasExistingImports = true
				insertIndex = i + 1 // After this import
			} else if (hasExistingImports && line === "") {
				// Empty line after imports - insert before this
				insertIndex = i
				break
			} else if (
				hasExistingImports && !line.startsWith("import ") && line !== ""
			) {
				// Non-import, non-empty line after imports
				insertIndex = i
				break
			} else if (!hasExistingImports && line !== "" && !line.startsWith("//")) {
				// First non-comment line, no existing imports
				insertIndex = i
				break
			}
		}

		// Insert the new imports
		const result = [
			...lines.slice(0, insertIndex),
			...newImports,
			...(hasExistingImports ? [] : [""]), // Add empty line if no existing imports
			...lines.slice(insertIndex),
		]

		return result.join("\n")
	}

	private getImportPath(baseType: string, fromPath: string): string | null {
		// Updated mappings with missing types
		const locations: Record<string, string> = {
			"Organization": "Organization",
			"CivicStructure": "Place/CivicStructure",
			"MedicalOrganization": "Organization/MedicalOrganization",
			"MedicalBusiness": "Organization/LocalBusiness/MedicalBusiness",
			"LocalBusiness": "Organization/LocalBusiness",
			"EmergencyService": "Organization/LocalBusiness/EmergencyService",
			"Place": "Place",
			"Product": "Product",
			"Substance": "MedicalEntity/Substance",
			"MedicalEntity": "MedicalEntity", // ✅ Added
			"Intangible": "Intangible", // ✅ Added
			"Service": "Intangible/Service", // ✅ Added
			"PaymentMethod": "Intangible/PaymentMethod",
			"FinancialProduct": "Intangible/Service/FinancialProduct",
		}

		const targetPath = locations[baseType]
		if (!targetPath) {
			console.warn(`⚠️  Unknown location for ${baseType}`)
			return null
		}

		// Calculate relative path
		const fromParts = fromPath.split("/").filter((p) => p !== "") // ✅ Filter empty parts
		const toParts = targetPath.split("/").filter((p) => p !== "") // ✅ Filter empty parts

		// Go up to common ancestor
		let common = 0
		while (
			common < Math.min(fromParts.length, toParts.length) &&
			fromParts[common] === toParts[common]
		) {
			common++
		}

		const upLevels = fromParts.length - common
		const downPath = toParts.slice(common).join("/")

		// ✅ Fix double slash issue
		const relativePath = "../".repeat(upLevels) +
			(downPath ? downPath + "/" : "") + "index.ts"
		return relativePath.replace("//", "/") // Safety check for double slashes
	}
}

async function main() {
	const args = Deno.args
	const dryRun = !args.includes("--fix")

	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new SimpleImportFixer(workspacePath, dryRun)

	try {
		await fixer.fixAllImports()
	} catch (error) {
		console.error("Import fixing failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

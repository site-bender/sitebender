import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

class DeadSimpleImportFixer {
	constructor(private basePath: string) {}

	async fixAllImports(): Promise<void> {
		console.log("🔍 Finding files with type intersections...")

		const thingPath = join(this.basePath, "lib/types/Thing")
		await this.scanAndFix(thingPath, "")

		console.log("✅ Done!")
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
					await this.fixFile(fullPath, relativePath)
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async fixFile(filePath: string, relativePath: string): Promise<void> {
		const content = await Deno.readTextFile(filePath)

		// Only process files with type intersections
		if (
			!content.includes("type ") || !content.includes(" = ") ||
			!content.includes(" & ")
		) {
			return
		}

		// Already has imports? Skip it
		if (
			content.includes("import Thing from") ||
			content.includes("import {") && content.includes("Props")
		) {
			return
		}

		const typeMatch = content.match(/type\s+(\w+)\s*=\s*([^=\n]+)/)
		if (!typeMatch) return

		const typeName = typeMatch[1]
		const intersection = typeMatch[2].trim()

		console.log(`🔧 Adding imports to ${typeName}...`)

		const allTypes = intersection.split("&").map((t) => t.trim())
		const imports: string[] = []

		// Add Thing import
		if (allTypes.some((t) => t === "Thing")) {
			const depth = relativePath.split("/").length
			imports.push(`import Thing from "${"../".repeat(depth)}index.ts"`)
		}

		// Add Props imports
		for (const type of allTypes) {
			if (type.endsWith("Props") && type !== `${typeName}Props`) {
				const baseType = type.replace("Props", "")
				const importPath = this.getImportPath(baseType, relativePath)
				if (importPath) {
					imports.push(`import { ${type} } from "${importPath}"`)
				}
			}
		}

		if (imports.length > 0) {
			// JUST PREPEND - NO FANCY LOGIC
			const newContent = imports.join("\n") + "\n\n" + content
			await Deno.writeTextFile(filePath, newContent)
			console.log(`  ✅ Added ${imports.length} imports`)
		}
	}

	private getImportPath(baseType: string, fromPath: string): string | null {
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
			"MedicalEntity": "MedicalEntity",
			"Intangible": "Intangible",
			"Service": "Intangible/Service",
			"PaymentMethod": "Intangible/PaymentMethod",
			"FinancialProduct": "Intangible/Service/FinancialProduct",
		}

		const targetPath = locations[baseType]
		if (!targetPath) return null

		const fromParts = fromPath.split("/").filter((p) => p !== "")
		const toParts = targetPath.split("/").filter((p) => p !== "")

		let common = 0
		while (
			common < Math.min(fromParts.length, toParts.length) &&
			fromParts[common] === toParts[common]
		) {
			common++
		}

		const upLevels = fromParts.length - common
		const downPath = toParts.slice(common).join("/")

		return "../".repeat(upLevels) + (downPath ? downPath + "/" : "") +
			"index.ts"
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new DeadSimpleImportFixer(workspacePath)

	try {
		await fixer.fixAllImports()
	} catch (error) {
		console.error("Failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

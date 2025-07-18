import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

interface ImportInfo {
	typeName: string
	relativePath: string
	filePath: string
	missingImports: string[]
}

class ImportFixer {
	private basePath: string

	constructor(basePath: string) {
		this.basePath = basePath
	}

	async fixImports(): Promise<void> {
		console.log("🔍 Finding files with missing imports...")

		const filesToFix = await this.findFilesWithMissingImports()

		if (filesToFix.length === 0) {
			console.log("✅ No files need import fixes!")
			return
		}

		console.log(`🔧 Fixing imports in ${filesToFix.length} files...`)

		for (const fileInfo of filesToFix) {
			await this.fixFileImports(fileInfo)
		}

		console.log("✅ All imports fixed!")
	}

	private async findFilesWithMissingImports(): Promise<ImportInfo[]> {
		const filesToFix: ImportInfo[] = []
		const thingPath = join(this.basePath, "lib/types/Thing")

		await this.scanDirectory(thingPath, "", filesToFix)
		return filesToFix
	}

	private async scanDirectory(
		dirPath: string,
		relativePath: string,
		filesToFix: ImportInfo[],
	): Promise<void> {
		try {
			for await (const entry of Deno.readDir(dirPath)) {
				const fullPath = join(dirPath, entry.name)

				if (entry.isDirectory) {
					const newRelativePath = relativePath
						? `${relativePath}/${entry.name}`
						: entry.name
					await this.scanDirectory(fullPath, newRelativePath, filesToFix)
				} else if (entry.name === "index.ts") {
					const typeName = relativePath.split("/").pop()
					if (typeName) {
						await this.checkFileForMissingImports(
							typeName,
							relativePath,
							fullPath,
							filesToFix,
						)
					}
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async checkFileForMissingImports(
		typeName: string,
		relativePath: string,
		filePath: string,
		filesToFix: ImportInfo[],
	): Promise<void> {
		try {
			const content = await Deno.readTextFile(filePath)

			// Look for intersection type pattern
			const intersectionMatch = content.match(/type\s+\w+\s*=\s*([^=\n]+)/)
			if (!intersectionMatch) return

			const intersectionType = intersectionMatch[1].trim()

			// Extract all the types used in intersection
			const usedTypes = intersectionType
				.split("&")
				.map((t) => t.trim())
				.filter((t) =>
					t !== "Thing" && t.endsWith("Props") === false &&
					t !== `${typeName}Props`
				)

			// Add Props types
			const propsTypes = intersectionType
				.split("&")
				.map((t) => t.trim())
				.filter((t) => t.endsWith("Props") && t !== `${typeName}Props`)

			const allTypesNeeded = [...usedTypes, ...propsTypes]
			const missingImports: string[] = []

			// Check which imports are missing
			for (const neededType of allTypesNeeded) {
				if (neededType === "Thing") {
					if (!content.includes("import Thing from")) {
						missingImports.push(this.generateThingImport(relativePath))
					}
				} else if (neededType.endsWith("Props")) {
					const baseType = neededType.replace("Props", "")
					if (!content.includes(`import { ${neededType} }`)) {
						const importPath = this.generatePropsImport(baseType, relativePath)
						if (importPath) {
							missingImports.push(
								`import { ${neededType} } from "${importPath}"`,
							)
						}
					}
				}
			}

			if (missingImports.length > 0) {
				filesToFix.push({
					typeName,
					relativePath,
					filePath,
					missingImports,
				})
				console.log(`📝 ${typeName}: ${missingImports.length} missing imports`)
			}
		} catch (error) {
			console.warn(`⚠️  Could not check ${typeName}: ${error.message}`)
		}
	}

	private generateThingImport(relativePath: string): string {
		const depth = relativePath.split("/").length
		const upLevels = "../".repeat(depth)
		return `import Thing from "${upLevels}index.ts"`
	}

	private generatePropsImport(
		baseType: string,
		relativePath: string,
	): string | null {
		// Known type mappings based on the hierarchy
		const typeLocations: Record<string, string> = {
			"Organization": "Organization",
			"CivicStructure": "Place/CivicStructure",
			"MedicalOrganization": "Organization/MedicalOrganization",
			"MedicalBusiness": "Organization/LocalBusiness/MedicalBusiness",
			"LocalBusiness": "Organization/LocalBusiness",
			"EmergencyService": "Organization/LocalBusiness/EmergencyService",
			"Place": "Place",
			"Product": "Product",
			"Substance": "MedicalEntity/Substance",
			"PaymentMethod": "Intangible/PaymentMethod",
			"FinancialProduct": "Intangible/Service/FinancialProduct",
		}

		const targetPath = typeLocations[baseType]
		if (!targetPath) {
			console.warn(`⚠️  Unknown type location for ${baseType}`)
			return null
		}

		// Calculate relative path from current location to target
		const currentParts = relativePath.split("/")
		const targetParts = targetPath.split("/")

		// Find common ancestor
		let commonLength = 0
		while (
			commonLength < Math.min(currentParts.length, targetParts.length) &&
			currentParts[commonLength] === targetParts[commonLength]
		) {
			commonLength++
		}

		// Go up from current location
		const upLevels = currentParts.length - commonLength
		const upPath = "../".repeat(upLevels)

		// Go down to target
		const downPath = targetParts.slice(commonLength).join("/")

		return `${upPath}${downPath}/index.ts`
	}

	private async fixFileImports(fileInfo: ImportInfo): Promise<void> {
		console.log(`🔧 Fixing imports in ${fileInfo.typeName}...`)

		const content = await Deno.readTextFile(fileInfo.filePath)
		const lines = content.split("\n")

		// Find where to insert imports (after existing imports)
		let insertIndex = 0
		for (let i = 0; i < lines.length; i++) {
			if (lines[i].trim().startsWith("import ")) {
				insertIndex = i + 1
			} else if (lines[i].trim() === "" && insertIndex > 0) {
				// Found empty line after imports
				break
			} else if (!lines[i].trim().startsWith("import ") && insertIndex > 0) {
				// Found non-import line after imports
				break
			}
		}

		// Insert missing imports
		const newLines = [
			...lines.slice(0, insertIndex),
			...fileInfo.missingImports,
			...lines.slice(insertIndex),
		]

		const newContent = newLines.join("\n")
		await Deno.writeTextFile(fileInfo.filePath, newContent)
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new ImportFixer(workspacePath)

	try {
		await fixer.fixImports()
	} catch (error) {
		console.error("Import fixing failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

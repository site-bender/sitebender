import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

interface TypeLocation {
	name: string
	fullPath: string
	relativePath: string
	depth: number
	hasInterface: boolean
	content: string
}

class DuplicateTypeFixer {
	private typeLocations: Map<string, TypeLocation[]> = new Map()

	constructor(private basePath: string, private dryRun = true) {}

	async fixDuplicateTypes(): Promise<void> {
		console.log(
			`🔍 Scanning for duplicate type definitions... (DRY RUN: ${this.dryRun})`,
		)
		await this.scanTypes()

		console.log("🔧 Finding duplicates and determining primary locations...")
		await this.analyzeDuplicates()
	}

	private async scanTypes(): Promise<void> {
		const thingPath = join(this.basePath, "lib/types/Thing")
		await this.scanDirectory(thingPath, "")
	}

	private async scanDirectory(
		dirPath: string,
		relativePath: string,
	): Promise<void> {
		try {
			for await (const entry of Deno.readDir(dirPath)) {
				const fullPath = join(dirPath, entry.name)

				if (entry.isDirectory) {
					const newRelativePath = relativePath
						? join(relativePath, entry.name)
						: entry.name
					await this.scanDirectory(fullPath, newRelativePath)
				} else if (entry.name === "index.ts") {
					const typeName = relativePath.split("/").pop() || ""
					if (typeName) {
						await this.analyzeTypeLocation(typeName, relativePath, fullPath)
					}
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async analyzeTypeLocation(
		typeName: string,
		relativePath: string,
		fullPath: string,
	): Promise<void> {
		try {
			const content = await Deno.readTextFile(fullPath)
			const depth = relativePath.split("/").length
			const hasInterface = content.includes(`interface ${typeName}`)

			const location: TypeLocation = {
				name: typeName,
				fullPath,
				relativePath,
				depth,
				hasInterface,
				content,
			}

			if (!this.typeLocations.has(typeName)) {
				this.typeLocations.set(typeName, [])
			}
			this.typeLocations.get(typeName)!.push(location)
		} catch (error) {
			console.warn(
				`⚠️  Could not analyze ${typeName} at ${relativePath}: ${error.message}`,
			)
		}
	}

	private async analyzeDuplicates(): Promise<void> {
		const duplicates = new Map<string, TypeLocation[]>()

		// Find types with multiple locations
		for (const [typeName, locations] of this.typeLocations) {
			if (locations.length > 1) {
				duplicates.set(typeName, locations)
			}
		}

		console.log(`\nFound ${duplicates.size} types with multiple definitions`)

		for (const [typeName, locations] of duplicates) {
			console.log(`\n🔍 Analyzing ${typeName} (${locations.length} locations):`)

			// Sort by depth (shallowest first = closest to Thing = primary)
			locations.sort((a, b) => a.depth - b.depth)

			const interfaceLocations = locations.filter((loc) => loc.hasInterface)
			const reExportLocations = locations.filter((loc) => !loc.hasInterface)

			console.log(`   📁 Interface definitions (${interfaceLocations.length}):`)
			for (const loc of interfaceLocations) {
				console.log(`      Depth ${loc.depth}: ${loc.relativePath}`)
			}

			console.log(`   🔗 Re-exports (${reExportLocations.length}):`)
			for (const loc of reExportLocations) {
				console.log(`      Depth ${loc.depth}: ${loc.relativePath}`)
			}

			if (interfaceLocations.length > 1) {
				const primary = interfaceLocations[0] // Shallowest = primary
				const duplicateInterfaces = interfaceLocations.slice(1)

				console.log(`   ✅ Primary (keep): ${primary.relativePath}`)
				console.log(`   ❌ Duplicates (convert to re-exports):`)

				for (const duplicate of duplicateInterfaces) {
					console.log(`      ${duplicate.relativePath}`)

					if (!this.dryRun) {
						await this.convertToReExport(duplicate, primary)
					} else {
						console.log(
							`      Would convert to: export { default } from "${
								this.getRelativeImportPath(duplicate, primary)
							}"`,
						)
					}
				}
			}
		}

		if (this.dryRun) {
			console.log(`\n🛡️  DRY RUN - No files were modified!`)
			console.log(`Run without --dry-run to actually fix duplicates`)
		}
	}

	private async convertToReExport(
		duplicate: TypeLocation,
		primary: TypeLocation,
	): Promise<void> {
		const relativePath = this.getRelativeImportPath(duplicate, primary)
		const newContent = `export { default } from "${relativePath}"\n`

		try {
			await Deno.writeTextFile(duplicate.fullPath, newContent)
			console.log(`      ✅ Converted ${duplicate.relativePath} to re-export`)
		} catch (error) {
			console.error(
				`      ❌ Failed to convert ${duplicate.relativePath}: ${error.message}`,
			)
		}
	}

	private getRelativeImportPath(from: TypeLocation, to: TypeLocation): string {
		const fromParts = from.relativePath.split("/")
		const toParts = to.relativePath.split("/")

		// Remove the type name from both (last part)
		fromParts.pop()
		toParts.pop()

		// Calculate relative path
		const upLevels = fromParts.length
		const upPath = "../".repeat(upLevels)
		const downPath = toParts.join("/")

		return `${upPath}${downPath}/index.ts`
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const isDryRun = !Deno.args.includes("--fix")

	const fixer = new DuplicateTypeFixer(workspacePath, isDryRun)

	try {
		await fixer.fixDuplicateTypes()
	} catch (error) {
		console.error("Fix failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

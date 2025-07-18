import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

interface TypeInfo {
	name: string
	relativePath: string
	extends: string[]
	properties: string[]
	filePath: string
}

class DiamondInheritanceFixer {
	private types: Map<string, TypeInfo> = new Map()
	private inheritance: Map<string, string[]> = new Map()
	private diamondTypes: Set<string> = new Set()

	constructor(private basePath: string, private dryRun = true) {}

	async fixDiamondInheritance(): Promise<void> {
		console.log(`🔍 Scanning types... (DRY RUN: ${this.dryRun})`)
		await this.scanTypes()

		console.log("💎 Finding diamond inheritance...")
		this.findDiamondInheritance()

		if (this.diamondTypes.size === 0) {
			console.log("✅ No diamond inheritance found!")
			return
		}

		console.log("🔧 Showing what WOULD be converted...")
		await this.showConversions()

		if (this.dryRun) {
			console.log("\n🛡️  DRY RUN - No files were modified!")
			console.log("Run with --allow-write to actually make changes")
		}
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
						await this.analyzeType(typeName, relativePath)
					}
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async analyzeType(
		typeName: string,
		relativePath: string,
	): Promise<void> {
		try {
			const filePath = join(
				this.basePath,
				"lib/types/Thing",
				relativePath,
				"index.ts",
			)
			const content = await Deno.readTextFile(filePath)

			// Skip if this type already exists (favor primary definition)
			if (this.types.has(typeName)) {
				const existing = this.types.get(typeName)!
				console.log(`⚠️  SKIPPING DUPLICATE: ${typeName}`)
				console.log(`   Keeping: ${existing.filePath}`)
				console.log(`   Skipping: ${filePath}`)
				return // ✅ SKIP instead of overwrite
			}

			const typeInfo = this.parseTypeFile(
				content,
				typeName,
				relativePath,
				filePath,
			)
			this.types.set(typeName, typeInfo)
			this.inheritance.set(typeName, typeInfo.extends)
		} catch (error) {
			console.warn(`⚠️  Could not analyze ${typeName}: ${error.message}`)
		}
	}

	private parseTypeFile(
		content: string,
		typeName: string,
		relativePath: string,
		filePath: string,
	): TypeInfo {
		const lines = content.split("\n")
		const extendsTypes: string[] = []
		const properties: string[] = []

		for (const line of lines) {
			const trimmed = line.trim()

			// Find interface declaration
			const interfaceMatch = trimmed.match(
				/export\s+default\s+interface\s+(\w+)\s*(?:extends\s+([^{]+))?\s*{/,
			)
			if (interfaceMatch && interfaceMatch[1] === typeName) {
				if (interfaceMatch[2]) {
					const extendsClause = interfaceMatch[2].trim()
					extendsTypes.push(...extendsClause.split(",").map((t) => t.trim()))
				}
				break
			}
		}

		return {
			name: typeName,
			relativePath,
			extends: extendsTypes,
			properties,
			filePath,
		}
	}

	private findDiamondInheritance(): void {
		// Find all types with multiple inheritance
		const multipleInheritanceTypes = new Map<string, string[]>()

		for (const [typeName, extendsTypes] of this.inheritance) {
			if (extendsTypes.length > 1) {
				multipleInheritanceTypes.set(typeName, extendsTypes)

				// Check if any parent paths eventually reach Thing
				let hasMultiplePathsToThing = false
				const thingPaths: string[] = []

				for (const parent of extendsTypes) {
					if (this.eventuallyExtendsType(parent, "Thing")) {
						thingPaths.push(parent)
					}
				}

				if (thingPaths.length > 1) {
					hasMultiplePathsToThing = true
				}

				if (hasMultiplePathsToThing) {
					this.diamondTypes.add(typeName)
					console.log(
						`💎 Diamond: ${typeName} extends ${
							extendsTypes.join(", ")
						} (paths to Thing: ${thingPaths.join(", ")})`,
					)
				}
			}
		}

		console.log(
			`\nFound ${multipleInheritanceTypes.size} types with multiple inheritance`,
		)
		console.log(
			`Found ${this.diamondTypes.size} types with diamond inheritance (multiple paths to Thing)`,
		)
	}

	private eventuallyExtendsType(typeName: string, target: string): boolean {
		if (typeName === target) return true

		const visited = new Set<string>()
		const stack = [typeName]

		while (stack.length > 0) {
			const current = stack.pop()!
			if (visited.has(current)) continue
			visited.add(current)

			if (current === target) return true

			const parents = this.inheritance.get(current) || []
			for (const parent of parents) {
				if (!visited.has(parent)) {
					stack.push(parent)
				}
			}
		}

		return false
	}

	private async showConversions(): Promise<void> {
		console.log(
			`\n🔧 CONVERSION PLAN for ${this.diamondTypes.size} diamond types:`,
		)

		for (const typeName of this.diamondTypes) {
			const typeInfo = this.types.get(typeName)
			if (!typeInfo) continue

			console.log(`\n📁 ${typeInfo.filePath}`)
			console.log(
				`   Current: interface ${typeName} extends ${
					typeInfo.extends.join(", ")
				}`,
			)
			console.log(`   Would become:`)
			console.log(
				`     export interface ${typeName}Props { /* current properties */ }`,
			)

			const intersectionParts = [
				"Thing",
				...typeInfo.extends.map((t) => `${t}Props`),
				`${typeName}Props`,
			]
			console.log(`     type ${typeName} = ${intersectionParts.join(" & ")}`)
			console.log(`     export default ${typeName}`)
		}

		console.log(`\n📋 Summary of types that would need Props interfaces:`)
		const propsNeeded = new Set<string>()
		for (const typeName of this.diamondTypes) {
			const extendsTypes = this.inheritance.get(typeName) || []
			for (const parent of extendsTypes) {
				if (parent !== "Thing") {
					propsNeeded.add(parent)
				}
			}
		}

		for (const propsType of propsNeeded) {
			const typeInfo = this.types.get(propsType)
			console.log(
				`   ${propsType} -> ${propsType}Props (${
					typeInfo?.filePath || "unknown"
				})`,
			)
		}
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new DiamondInheritanceFixer(workspacePath, true) // DRY RUN

	try {
		await fixer.fixDiamondInheritance()
	} catch (error) {
		console.error("Analysis failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

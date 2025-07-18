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

	constructor(private basePath: string) {}

	async fixDiamondInheritance(): Promise<void> {
		console.log("🔍 Scanning types...")
		await this.scanTypes()

		console.log("💎 Finding diamond inheritance...")
		this.findDiamondInheritance()

		if (this.diamondTypes.size === 0) {
			console.log("✅ No diamond inheritance found!")
			return
		}

		console.log("🔧 Converting diamond types to intersection types...")
		await this.convertDiamondTypes()

		console.log("✅ All diamond inheritance fixed!")
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
				// 🔧 SAFE: Use string concatenation instead of join()
				const fullPath = `${dirPath}/${entry.name}`

				if (entry.isDirectory) {
					const newRelativePath = relativePath
						? `${relativePath}/${entry.name}`
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
			// 🔧 SAFE: Use string concatenation
			const filePath =
				`${this.basePath}/lib/types/Thing/${relativePath}/index.ts`
			const content = await Deno.readTextFile(filePath)

			if (this.types.has(typeName)) {
				return // Skip duplicates
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

		let inInterface = false

		for (const line of lines) {
			const trimmed = line.trim()

			// Find interface declaration
			const interfaceMatch = trimmed.match(
				/export\s+default\s+interface\s+(\w+)\s*(?:extends\s+([^{]+))?\s*{/,
			)
			if (interfaceMatch && interfaceMatch[1] === typeName) {
				inInterface = true
				if (interfaceMatch[2]) {
					const extendsClause = interfaceMatch[2].trim()
					extendsTypes.push(...extendsClause.split(",").map((t) => t.trim()))
				}
				continue
			}

			// Collect properties inside interface
			if (inInterface) {
				if (trimmed === "}") {
					inInterface = false
					break
				}

				// Skip comments and empty lines
				if (trimmed && !trimmed.startsWith("//") && !trimmed.startsWith("/*")) {
					properties.push(trimmed)
				}
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
		for (const [typeName, extendsTypes] of this.inheritance) {
			if (extendsTypes.length > 1) {
				// Check if any parent paths eventually reach Thing
				const thingPaths: string[] = []

				for (const parent of extendsTypes) {
					if (this.eventuallyExtendsType(parent, "Thing")) {
						thingPaths.push(parent)
					}
				}

				if (thingPaths.length > 1) {
					this.diamondTypes.add(typeName)
					console.log(
						`💎 Found diamond: ${typeName} extends ${extendsTypes.join(", ")}`,
					)
				}
			}
		}

		console.log(
			`Found ${this.diamondTypes.size} types with diamond inheritance`,
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

	private async convertDiamondTypes(): Promise<void> {
		// First, ensure all parent types have Props interfaces
		await this.ensurePropsInterfaces()

		// Then convert the diamond types
		for (const typeName of this.diamondTypes) {
			await this.convertType(typeName)
		}
	}

	private async ensurePropsInterfaces(): Promise<void> {
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
			await this.ensurePropsInterface(propsType)
		}
	}

	private async ensurePropsInterface(typeName: string): Promise<void> {
		const typeInfo = this.types.get(typeName)
		if (!typeInfo) {
			console.warn(`⚠️  Cannot find type info for ${typeName}`)
			return
		}

		const content = await Deno.readTextFile(typeInfo.filePath)

		// Check if already has Props interface
		if (content.includes(`interface ${typeName}Props`)) {
			console.log(`✅ ${typeName}Props already exists`)
			return
		}

		console.log(`🔧 Creating ${typeName}Props interface...`)

		// Convert interface to Props interface + intersection type
		const newContent = this.convertToPropsInterface(content, typeInfo)

		if (!this.dryRun) {
			await Deno.writeTextFile(typeInfo.filePath, newContent)
		}
	}

	private async convertType(typeName: string): Promise<void> {
		const typeInfo = this.types.get(typeName)
		if (!typeInfo) return

		console.log(`🔧 Converting ${typeName} to intersection type...`)

		const content = await Deno.readTextFile(typeInfo.filePath)
		const newContent = this.convertToIntersectionType(content, typeInfo)

		if (!this.dryRun) {
			await Deno.writeTextFile(typeInfo.filePath, newContent)
		}
	}

	private convertToPropsInterface(content: string, typeInfo: TypeInfo): string {
		const lines = content.split("\n")
		const result: string[] = []
		let inInterface = false
		let interfaceProcessed = false

		for (const line of lines) {
			const trimmed = line.trim()

			// Find the main interface declaration
			const interfaceMatch = trimmed.match(
				/export\s+default\s+interface\s+(\w+)\s*(?:extends\s+([^{]+))?\s*{/,
			)

			if (
				interfaceMatch && interfaceMatch[1] === typeInfo.name &&
				!interfaceProcessed
			) {
				inInterface = true
				interfaceProcessed = true

				// Add Props interface
				result.push(`export interface ${typeInfo.name}Props {`)
				continue
			}

			if (inInterface) {
				if (trimmed === "}") {
					inInterface = false
					result.push("}")
					result.push("")

					// Add intersection type
					const intersectionParts = ["Thing"]
					for (const parent of typeInfo.extends) {
						if (parent !== "Thing") {
							intersectionParts.push(`${parent}Props`)
						}
					}
					intersectionParts.push(`${typeInfo.name}Props`)

					result.push(
						`type ${typeInfo.name} = ${intersectionParts.join(" & ")}`,
					)
					result.push("")
					result.push(`export default ${typeInfo.name}`)
					continue
				}

				// Keep property lines
				result.push(line)
			} else {
				// Keep non-interface lines (imports, etc.)
				if (!trimmed.startsWith("export default interface")) {
					result.push(line)
				}
			}
		}

		return result.join("\n")
	}

	private convertToIntersectionType(
		content: string,
		typeInfo: TypeInfo,
	): string {
		const lines = content.split("\n")
		const result: string[] = []
		let inInterface = false
		let interfaceProcessed = false

		for (const line of lines) {
			const trimmed = line.trim()

			// Find the main interface declaration
			const interfaceMatch = trimmed.match(
				/export\s+default\s+interface\s+(\w+)\s*(?:extends\s+([^{]+))?\s*{/,
			)

			if (
				interfaceMatch && interfaceMatch[1] === typeInfo.name &&
				!interfaceProcessed
			) {
				inInterface = true
				interfaceProcessed = true

				// Start Props interface
				result.push(`export interface ${typeInfo.name}Props {`)
				continue
			}

			if (inInterface) {
				if (trimmed === "}") {
					inInterface = false
					result.push("}")
					result.push("")

					// Add intersection type
					const intersectionParts = ["Thing"]
					for (const parent of typeInfo.extends) {
						intersectionParts.push(`${parent}Props`)
					}
					intersectionParts.push(`${typeInfo.name}Props`)

					result.push(
						`type ${typeInfo.name} = ${intersectionParts.join(" & ")}`,
					)
					result.push("")
					result.push(`export default ${typeInfo.name}`)
					continue
				}

				// Keep property lines
				result.push(line)
			} else {
				// Keep non-interface lines (imports, etc.)
				if (!trimmed.startsWith("export default interface")) {
					result.push(line)
				}
			}
		}

		return result.join("\n")
	}
}

async function main() {
	const args = Deno.args
	const dryRun = !args.includes("--fix")

	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const fixer = new DiamondInheritanceFixer(workspacePath, dryRun)

	try {
		await fixer.fixDiamondInheritance()

		if (dryRun) {
			console.log("\n🛡️  DRY RUN - No files were modified!")
			console.log("Run with --fix to actually make changes")
		}
	} catch (error) {
		console.error("Conversion failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

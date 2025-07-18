import { join } from "https://deno.land/std@0.224.0/path/mod.ts"

interface DiamondInheritance {
	type: string
	parents: string[]
	pathsToThing: string[][]
}

class InheritanceCycleDetector {
	private inheritance: Map<string, string[]> = new Map()
	private typeFiles: Map<string, string> = new Map()
	private diamondInheritances: DiamondInheritance[] = []

	constructor(private basePath: string) {}

	async analyzeInheritanceCycles(): Promise<void> {
		console.log("🔍 Scanning for TypeScript interface files...")
		await this.scanTypeFiles()

		console.log(`📊 Found ${this.typeFiles.size} type files`)
		console.log("🔗 Analyzing interface inheritance...")
		await this.analyzeInheritance()

		console.log("💎 Detecting diamond inheritance patterns...")
		this.detectDiamondInheritance()

		this.reportResults()
	}

	private async scanTypeFiles(): Promise<void> {
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
						this.typeFiles.set(typeName, relativePath)
					}
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async analyzeInheritance(): Promise<void> {
		for (const [typeName, relativePath] of this.typeFiles) {
			await this.analyzeFileInheritance(typeName, relativePath)
		}
	}

	private async analyzeFileInheritance(
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

			const extendsTypes = this.extractExtendsClause(content, typeName)
			this.inheritance.set(typeName, extendsTypes)
		} catch (error) {
			console.warn(
				`⚠️  Could not analyze ${typeName} at ${relativePath}: ${error.message}`,
			)
		}
	}

	private extractExtendsClause(
		content: string,
		expectedTypeName: string,
	): string[] {
		const lines = content.split("\n")

		for (const line of lines) {
			const trimmed = line.trim()

			const match = trimmed.match(
				/export\s+default\s+interface\s+(\w+)\s+extends\s+([^{]+)\s*{/,
			)
			if (match) {
				const interfaceName = match[1]
				const extendsClause = match[2]

				if (interfaceName === expectedTypeName) {
					return extendsClause.split(",").map((t) => t.trim()).filter((t) =>
						t.length > 0
					)
				}
			}
		}

		return []
	}

	private detectDiamondInheritance(): void {
		this.diamondInheritances = []

		// Check each type for diamond inheritance
		for (const [typeName, directParents] of this.inheritance) {
			if (directParents.length > 1) {
				// Type has multiple inheritance, check if paths lead to same ancestor
				const pathsToThing = this.findAllPathsToThing(typeName)

				if (pathsToThing.length > 1) {
					// Multiple paths to Thing = diamond inheritance
					this.diamondInheritances.push({
						type: typeName,
						parents: directParents,
						pathsToThing,
					})
				}
			}
		}
	}

	private findAllPathsToThing(typeName: string): string[][] {
		const paths: string[][] = []

		const dfs = (current: string, path: string[]): void => {
			if (current === "Thing") {
				paths.push([...path, current])
				return
			}

			const parents = this.inheritance.get(current) || []
			for (const parent of parents) {
				if (this.inheritance.has(parent) || parent === "Thing") {
					dfs(parent, [...path, current])
				}
			}
		}

		dfs(typeName, [])
		return paths
	}

	private reportResults(): void {
		console.log(`\n🎯 DIAMOND INHERITANCE ANALYSIS COMPLETE`)
		console.log(`📊 Analyzed ${this.inheritance.size} interface types`)
		console.log(
			`💎 Found ${this.diamondInheritances.length} diamond inheritance patterns`,
		)

		if (this.diamondInheritances.length === 0) {
			console.log(`✅ No diamond inheritance patterns found!`)

			// Show multiple inheritance that's OK
			console.log(`\n📋 Types with multiple inheritance (no diamonds):`)
			let count = 0
			for (const [typeName, parents] of this.inheritance) {
				if (parents.length > 1 && count < 10) {
					console.log(`   ${typeName} extends ${parents.join(", ")}`)
					count++
				}
			}
			return
		}

		// Sort by number of paths to Thing (more paths = worse)
		this.diamondInheritances.sort((a, b) =>
			b.pathsToThing.length - a.pathsToThing.length
		)

		console.log(`\n💎 DIAMOND INHERITANCE PATTERNS DETECTED:`)

		this.diamondInheritances.forEach((diamond, index) => {
			console.log(
				`\n${index + 1}. ${diamond.type} extends ${diamond.parents.join(", ")}`,
			)
			console.log(
				`   📍 File: ${this.typeFiles.get(diamond.type) || "unknown"}`,
			)
			console.log(
				`   🔗 Multiple paths to Thing (${diamond.pathsToThing.length} paths):`,
			)

			diamond.pathsToThing.forEach((path, pathIndex) => {
				const pathStr = path.join(" → ")
				console.log(`      Path ${pathIndex + 1}: ${pathStr}`)
			})

			console.log(
				`   ⚠️  This creates diamond inheritance and causes TypeScript's infinite recursion!`,
			)
		})

		console.log(`\n🚨 MOST PROBLEMATIC TYPES (most paths to Thing):`)
		this.diamondInheritances.slice(0, 10).forEach((diamond, index) => {
			console.log(
				`${
					index + 1
				}. ${diamond.type} (${diamond.pathsToThing.length} paths to Thing)`,
			)
		})

		console.log(`\n💡 SUGGESTED FIXES:`)
		console.log(`1. 🔄 Use composition instead of multiple inheritance`)
		console.log(`2. 🎯 Create mixin interfaces that don't extend Thing`)
		console.log(`3. 🏗️  Use intersection types (&) instead of extends`)
		console.log(
			`4. 🔀 Break one inheritance path by removing an extends clause`,
		)
		console.log(`\nExample fix for Drug:`)
		console.log(`   ❌ interface Drug extends Product, Substance`)
		console.log(`   ✅ interface Drug extends Product {`)
		console.log(`        // Include Substance properties directly`)
		console.log(`        activeIngredient?: Text`)
		console.log(`        maximumIntake?: MaximumDoseSchedule`)
		console.log(`      }`)
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const detector = new InheritanceCycleDetector(workspacePath)

	try {
		await detector.analyzeInheritanceCycles()
	} catch (error) {
		console.error("Analysis failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

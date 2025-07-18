import { join, relative } from "https://deno.land/std@0.224.0/path/mod.ts"

interface ImportInfo {
	from: string
	to: string
	importPath: string
}

interface CircularPath {
	cycle: string[]
	length: number
}

class CircularDependencyDetector {
	private imports: Map<string, Set<string>> = new Map()
	private typeFiles: Set<string> = new Set()
	private visited: Set<string> = new Set()
	private recursionStack: Set<string> = new Set()
	private cycles: CircularPath[] = []

	constructor(private basePath: string) {}

	async analyzeCircularDependencies(): Promise<void> {
		console.log("🔍 Scanning for TypeScript files...")
		await this.scanTypeFiles()

		console.log(`📊 Found ${this.typeFiles.size} type files`)
		console.log("🔗 Analyzing imports...")
		await this.analyzeImports()

		console.log("🌀 Detecting circular dependencies...")
		this.detectCycles()

		this.reportResults()
	}

	private async scanTypeFiles(): Promise<void> {
		const thingPath = join(this.basePath, "lib/types/Thing")
		await this.scanDirectory(thingPath, "Thing")
	}

	private async scanDirectory(
		dirPath: string,
		relativePath: string,
	): Promise<void> {
		try {
			for await (const entry of Deno.readDir(dirPath)) {
				const fullPath = join(dirPath, entry.name)
				const newRelativePath = join(relativePath, entry.name)

				if (entry.isDirectory) {
					await this.scanDirectory(fullPath, newRelativePath)
				} else if (entry.name === "index.ts") {
					this.typeFiles.add(relativePath.replace("/index.ts", ""))
				}
			}
		} catch (error) {
			console.warn(`⚠️  Could not scan ${dirPath}: ${error.message}`)
		}
	}

	private async analyzeImports(): Promise<void> {
		for (const typeFile of this.typeFiles) {
			await this.analyzeFileImports(typeFile)
		}
	}

	private async analyzeFileImports(typeFile: string): Promise<void> {
		try {
			const filePath = join(this.basePath, "lib/types", typeFile, "index.ts")
			const content = await Deno.readTextFile(filePath)

			const imports = this.extractImports(content, typeFile)
			this.imports.set(typeFile, new Set(imports))
		} catch (error) {
			console.warn(`⚠️  Could not analyze ${typeFile}: ${error.message}`)
		}
	}

	private extractImports(content: string, fromFile: string): string[] {
		const imports: string[] = []
		const lines = content.split("\n")

		for (const line of lines) {
			const trimmed = line.trim()
			if (trimmed.startsWith("import ") && trimmed.includes(' from "')) {
				const match = trimmed.match(/from\s+"([^"]+)"/)
				if (match) {
					const importPath = match[1]
					const resolvedPath = this.resolveImportPath(importPath, fromFile)
					if (resolvedPath && this.typeFiles.has(resolvedPath)) {
						imports.push(resolvedPath)
					}
				}
			}
		}

		return imports
	}

	private resolveImportPath(
		importPath: string,
		fromFile: string,
	): string | null {
		if (!importPath.startsWith(".")) {
			return null // External import
		}

		// Remove /index.ts from the end if present
		const cleanPath = importPath.replace(/\/index\.ts$/, "")

		// Split the file path into parts
		const fromParts = fromFile.split("/")
		const importParts = cleanPath.split("/")

		// Start from the directory containing the current file
		const resultParts = [...fromParts.slice(0, -1)]

		// Process each part of the import path
		for (const part of importParts) {
			if (part === ".") {
				// Current directory, do nothing
			} else if (part === "..") {
				// Parent directory
				resultParts.pop()
			} else {
				// Regular directory
				resultParts.push(part)
			}
		}

		return resultParts.join("/")
	}

	private detectCycles(): void {
		for (const typeFile of this.typeFiles) {
			if (!this.visited.has(typeFile)) {
				this.dfsDetectCycle(typeFile, [])
			}
		}
	}

	private dfsDetectCycle(node: string, path: string[]): void {
		if (this.recursionStack.has(node)) {
			// Found a cycle
			const cycleStart = path.indexOf(node)
			const cycle = [...path.slice(cycleStart), node]
			this.cycles.push({
				cycle,
				length: cycle.length - 1,
			})
			return
		}

		if (this.visited.has(node)) {
			return
		}

		this.visited.add(node)
		this.recursionStack.add(node)
		path.push(node)

		const dependencies = this.imports.get(node) || new Set()
		for (const dep of dependencies) {
			this.dfsDetectCycle(dep, [...path])
		}

		this.recursionStack.delete(node)
	}

	private reportResults(): void {
		console.log(`\n🎯 CIRCULAR DEPENDENCY ANALYSIS COMPLETE`)
		console.log(`📊 Analyzed ${this.typeFiles.size} type files`)
		console.log(`🌀 Found ${this.cycles.length} circular dependencies`)

		if (this.cycles.length === 0) {
			console.log(`✅ No circular dependencies found!`)
			return
		}

		// Sort by cycle length (shorter cycles are usually more problematic)
		this.cycles.sort((a, b) => a.length - b.length)

		console.log(`\n🚨 CIRCULAR DEPENDENCIES DETECTED:`)

		this.cycles.forEach((cycle, index) => {
			console.log(`\n${index + 1}. Cycle of length ${cycle.length}:`)
			cycle.cycle.forEach((node, i) => {
				if (i === cycle.cycle.length - 1) {
					console.log(`   ${node} ⤴️`)
				} else {
					console.log(`   ${node} ↓`)
				}
			})

			// Show the imports that create this cycle
			console.log(`   📋 Import chain:`)
			for (let i = 0; i < cycle.cycle.length - 1; i++) {
				const from = cycle.cycle[i]
				const to = cycle.cycle[i + 1]
				console.log(`      ${from} imports ${to}`)
			}
		})

		// Suggest fixes
		console.log(`\n💡 SUGGESTED FIXES:`)
		console.log(`1. Move shared types to a common parent`)
		console.log(`2. Use type-only imports where possible`)
		console.log(`3. Break cycles by removing unnecessary imports`)
		console.log(`4. Consider using interfaces instead of extends`)
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const detector = new CircularDependencyDetector(workspacePath)

	try {
		await detector.analyzeCircularDependencies()
	} catch (error) {
		console.error("Analysis failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

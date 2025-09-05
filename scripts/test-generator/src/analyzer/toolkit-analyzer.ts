/**
 * Analyzes @sitebender/toolkit functions and prepares them for test generation
 */

import type { FunctionSignature } from "../types/index.ts"

export interface ToolkitFunction {
	name: string
	category: string // array, math, string, validation, etc.
	path: string
	hasTests: boolean
	hasJSDoc: boolean
	complexity: "simple" | "moderate" | "complex"
	dependencies: Array<string>
}

export interface ToolkitAnalysis {
	totalFunctions: number
	testedFunctions: number
	coverage: number
	byCategory: Record<string, CategoryAnalysis>
	untested: Array<ToolkitFunction>
	priority: Array<ToolkitFunction> // High-priority functions to test
}

export interface CategoryAnalysis {
	name: string
	total: number
	tested: number
	coverage: number
	functions: Array<ToolkitFunction>
}

/**
 * Analyzes the toolkit codebase
 */
export class ToolkitAnalyzer {
	private basePath = "libraries/toolkit/src/simple"
	private categories = [
		"array",
		"math",
		"string", 
		"validation",
		"object",
		"function",
		"async",
		"date",
		"dom",
		"error",
		"monads",
		"statistics",
		"crypto",
		"color",
		"json",
		"random",
		"url",
		"xml"
	]

	/**
	 * Analyze the entire toolkit
	 */
	async analyzeToolkit(): Promise<ToolkitAnalysis> {
		const functions: Array<ToolkitFunction> = []
		
		for (const category of this.categories) {
			const categoryFunctions = await this.analyzeCategory(category)
			functions.push(...categoryFunctions)
		}

		const testedFunctions = functions.filter(f => f.hasTests)
		const untestedFunctions = functions.filter(f => !f.hasTests)
		
		// Prioritize functions based on complexity and usage
		const priority = this.prioritizeFunctions(untestedFunctions)

		const byCategory = this.groupByCategory(functions)

		return {
			totalFunctions: functions.length,
			testedFunctions: testedFunctions.length,
			coverage: (testedFunctions.length / functions.length) * 100,
			byCategory,
			untested: untestedFunctions,
			priority: priority.slice(0, 50) // Top 50 priority functions
		}
	}

	/**
	 * Analyze a specific category
	 */
	private async analyzeCategory(category: string): Promise<Array<ToolkitFunction>> {
		const categoryPath = `${this.basePath}/${category}`
		const functions: Array<ToolkitFunction> = []

		try {
			// Get all function directories in the category
			const entries = await this.readDirectory(categoryPath)
			
			for (const entry of entries) {
				if (await this.isFunction(entry)) {
					const func = await this.analyzeFunction(category, entry)
					if (func) functions.push(func)
				}
			}
		} catch {
			// Category doesn't exist
		}

		return functions
	}

	/**
	 * Analyze a single function
	 */
	private async analyzeFunction(
		category: string, 
		name: string
	): Promise<ToolkitFunction | null> {
		const funcPath = `${this.basePath}/${category}/${name}`
		const indexPath = `${funcPath}/index.ts`

		try {
			const content = await this.readFile(indexPath)
			const hasJSDoc = this.hasJSDoc(content)
			const hasTests = await this.hasTestFile(category, name)
			const complexity = this.analyzeComplexity(content)
			const dependencies = this.extractDependencies(content)

			return {
				name,
				category,
				path: indexPath,
				hasTests,
				hasJSDoc,
				complexity,
				dependencies
			}
		} catch {
			return null
		}
	}

	/**
	 * Extract function signature from TypeScript file
	 */
	extractSignature(content: string, name: string): FunctionSignature | null {
		// Look for export default function
		const funcMatch = content.match(
			/export\s+default\s+function\s+\w+(<[^>]+>)?\s*\(([^)]*)\)(?:\s*:\s*([^{]+))?\s*{/
		)

		if (!funcMatch) {
			// Try arrow function
			const arrowMatch = content.match(
				/export\s+default\s+(?:const\s+)?(\w+)\s*=\s*(<[^>]+>)?\s*\(([^)]*)\)\s*(?::\s*([^=]+))?\s*=>/
			)
			if (!arrowMatch) return null
		}

		// Parse parameters
		const parameters = this.parseParameters(funcMatch?.[2] ?? "")
		const returnType = this.parseReturnType(funcMatch?.[3] ?? "any")
		const generics = this.parseGenerics(funcMatch?.[1] ?? "")

		// Detect if curried
		const isCurried = content.includes("return function") || 
			content.includes("=> (") ||
			content.includes("return (")

		// Detect purity
		const purity = this.detectPurity(content)

		return {
			name,
			parameters,
			returnType,
			generics,
			isCurried,
			purity
		}
	}

	/**
	 * Parse function parameters
	 */
	private parseParameters(paramString: string): Array<Parameter> {
		if (!paramString.trim()) return []

		const params: Array<Parameter> = []
		const paramParts = this.splitParameters(paramString)

		for (const param of paramParts) {
			const match = param.match(/(\w+)(\?)?:\s*(.+?)(?:\s*=\s*(.+))?$/)
			if (match) {
				params.push({
					name: match[1],
					type: match[3].trim(),
					optional: !!match[2],
					defaultValue: match[4]?.trim()
				})
			}
		}

		return params
	}

	/**
	 * Split parameters handling nested types
	 */
	private splitParameters(paramString: string): Array<string> {
		const params: Array<string> = []
		let current = "
		let depth = 0

		for (const char of paramString) {
			if (char === "<" || char === "(" || char === "{") depth++
			else if (char === ">" || char === ")" || char === "}") depth--
			else if (char === "," && depth === 0) {
				params.push(current.trim())
				current = "
				continue
			}
			current += char
		}

		if (current.trim()) params.push(current.trim())
		return params
	}

	/**
	 * Parse return type
	 */
	private parseReturnType(returnString: string): string {
		const cleaned = returnString.trim()
		if (!cleaned || cleaned === "{") return "any"
		
		// Handle function returns
		if (cleaned.includes("=>")) {
			// It's returning another function
			const match = cleaned.match(/\(([^)]*)\)\s*=>\s*(.+)/)
			if (match) {
				return `(${match[1]}) => ${match[2]}`
			}
		}

		return cleaned.replace(/\s*{$/, "").trim()
	}

	/**
	 * Parse generic type parameters
	 */
	private parseGenerics(genericString: string): Array<string> {
		if (!genericString) return []
		const cleaned = genericString.replace(/^<|>$/g, "")
		return cleaned.split(",").map(g => g.trim())
	}

	/**
	 * Detect function purity
	 */
	private detectPurity(content: string): PurityLevel {
		// Check for side effects
		if (
			content.includes("console.") ||
			content.includes("document.") ||
			content.includes("window.") ||
			content.includes("globalThis.") ||
			content.includes("Date.now") ||
			content.includes("Math.random") ||
			content.includes("crypto.") ||
			content.includes("fetch(") ||
			content.includes("XMLHttpRequest") ||
			content.includes("localStorage") ||
			content.includes("sessionStorage")
		) {
			return "side-effect"
		}

		// Check for IO operations
		if (
			content.includes("readFile") ||
			content.includes("writeFile") ||
			content.includes("Deno.") ||
			content.includes("process.") ||
			content.includes("fs.")
		) {
			return "io"
		}

		return "pure"
	}

	/**
	 * Check if content has JSDoc
	 */
	private hasJSDoc(content: string): boolean {
		return content.includes("/**") && content.includes("*/")
	}

	/**
	 * Check if function has test file
	 */
	private async hasTestFile(category: string, name: string): Promise<boolean> {
		const testPaths = [
			`libraries/toolkit/tests/behaviors/${category}/${name}/index.test.ts`,
			`libraries/toolkit/tests/behaviors/transformations/${category}/${name}/index.test.ts`,
			`tests/libraries/toolkit/${category}/${name}.test.ts`
		]

		for (const path of testPaths) {
			try {
				await this.readFile(path)
				return true
			} catch {
				// Test doesn't exist at this path
			}
		}

		return false
	}

	/**
	 * Analyze code complexity
	 */
	private analyzeComplexity(content: string): "simple" | "moderate" | "complex" {
		const lines = content.split("\n").length
		const conditions = (content.match(/if\s*\(|switch\s*\(|\?\s*:/g) ?? []).length
		const loops = (content.match(/for\s*\(|while\s*\(|\.map\(|\.filter\(|\.reduce\(/g) ?? []).length
		const functions = (content.match(/function|=>/g) ?? []).length

		const score = lines * 0.1 + conditions * 3 + loops * 2 + functions * 1.5

		if (score < 10) return "simple"
		if (score < 25) return "moderate"
		return "complex"
	}

	/**
	 * Extract dependencies
	 */
	private extractDependencies(content: string): Array<string> {
		const deps: Array<string> = []
		const importMatches = content.matchAll(/import\s+(?:\w+|\{[^}]+\})\s+from\s+"([^"]+)"/g)
		
		for (const match of importMatches) {
			const importPath = match[1]
			if (importPath.includes("../")) {
				// Internal dependency
				const parts = importPath.split("/")
				const funcName = parts[parts.length - 1] === "index.ts" 
					? parts[parts.length - 2] 
					: parts[parts.length - 1].replace(".ts", "")
				deps.push(funcName)
			}
		}

		return deps
	}

	/**
	 * Prioritize functions for testing
	 */
	private prioritizeFunctions(functions: Array<ToolkitFunction>): Array<ToolkitFunction> {
		return functions.sort((a, b) => {
			// Priority scoring
			let scoreA = 0
			let scoreB = 0

			// Core categories get higher priority
			const coreCats = ["array", "math", "string", "validation", "object"]
			if (coreCats.includes(a.category)) scoreA += 10
			if (coreCats.includes(b.category)) scoreB += 10

			// Functions with JSDoc get priority (easier to test)
			if (a.hasJSDoc) scoreA += 5
			if (b.hasJSDoc) scoreB += 5

			// Simple functions get priority (quick wins)
			if (a.complexity === "simple") scoreA += 8
			if (a.complexity === "moderate") scoreA += 4
			if (b.complexity === "simple") scoreB += 8
			if (b.complexity === "moderate") scoreB += 4

			// Functions with fewer dependencies get priority
			scoreA -= a.dependencies.length
			scoreB -= b.dependencies.length

			return scoreB - scoreA
		})
	}

	/**
	 * Group functions by category
	 */
	private groupByCategory(functions: Array<ToolkitFunction>): Record<string, CategoryAnalysis> {
		const grouped: Record<string, CategoryAnalysis> = {}

		for (const func of functions) {
			if (!grouped[func.category]) {
				grouped[func.category] = {
					name: func.category,
					total: 0,
					tested: 0,
					coverage: 0,
					functions: []
				}
			}

			grouped[func.category].functions.push(func)
			grouped[func.category].total++
			if (func.hasTests) grouped[func.category].tested++
		}

		// Calculate coverage
		for (const category of Object.values(grouped)) {
			category.coverage = category.total > 0 
				? (category.tested / category.total) * 100 
				: 0
		}

		return grouped
	}

	// Stub implementations for file system operations
	// These would be replaced with actual Deno file system calls
	private async readDirectory(path: string): Promise<Array<string>> {
		// Would use Deno.readDir in real implementation
		return []
	}

	private async readFile(path: string): Promise<string> {
		// Would use Deno.readTextFile in real implementation
		return "
	}

	private async isFunction(entry: string): Promise<boolean> {
		// Check if directory contains index.ts
		return true
	}
}

// Export a ready-to-use analyzer instance
export const toolkitAnalyzer = new ToolkitAnalyzer()

import type { Parameter, PurityLevel } from "../types/index.ts"
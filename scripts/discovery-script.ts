import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts"
import { join, relative } from "https://deno.land/std@0.224.0/path/mod.ts"

interface TypeLocation {
	path: string
	isAlias: boolean
	exportsFrom?: string
	extendsFrom: string[]
	depth: number
}

interface AnalysisPlan {
	typeName: string
	primaryLocation: TypeLocation
	aliasLocations: TypeLocation[]
	allInheritancePaths: string[][]
	directParentsNeeded: string[]
	consolidationAction:
		| "multiple_inheritance"
		| "already_correct"
		| "single_inheritance"
}

class InheritanceDiscovery {
	private thingPath: string
	private typeMap = new Map<string, TypeLocation[]>()
	private analysisPlans: AnalysisPlan[] = []
	private aliasPattern = /export\s*{\s*default\s*}\s*from\s*["']([^"']+)["']/
	private interfacePattern =
		/export\s+default\s+interface\s+(\w+)(?:\s+extends\s+([\w\s,]+))?\s*{/

	constructor(workspacePath: string) {
		this.thingPath = join(workspacePath, "lib/types/Thing")
	}

	async discover(): Promise<void> {
		console.log("🔍 Starting inheritance discovery...\n")

		await this.scanDirectory()
		await this.analyzeInheritance()
		this.reportFindings()
	}

	private async scanDirectory(): Promise<void> {
		for await (
			const entry of walk(this.thingPath, {
				exts: [".ts"],
				match: [/index\.ts$/],
				includeDirs: false,
			})
		) {
			await this.analyzeTypeFile(entry.path)
		}
	}

	private async analyzeTypeFile(filePath: string): Promise<void> {
		const content = await Deno.readTextFile(filePath)
		const relativePath = relative(this.thingPath, filePath)
		const typeName = this.extractTypeNameFromPath(relativePath)

		if (!typeName) return

		const depth = relativePath.split("/").length - 1

		const location: TypeLocation = {
			path: relativePath,
			isAlias: false,
			extendsFrom: [],
			depth,
		}

		// Check if this is an alias (re-export)
		const aliasMatch = content.match(this.aliasPattern)
		if (aliasMatch) {
			location.isAlias = true
			location.exportsFrom = aliasMatch[1]
		} else {
			// Parse interface definition
			const interfaceMatch = content.match(this.interfacePattern)
			if (interfaceMatch && interfaceMatch[2]) {
				location.extendsFrom = interfaceMatch[2]
					.split(",")
					.map((s) => s.trim())
					.filter((s) => s.length > 0)
			}
		}

		if (!this.typeMap.has(typeName)) {
			this.typeMap.set(typeName, [])
		}
		this.typeMap.get(typeName)!.push(location)
	}

	private extractTypeNameFromPath(relativePath: string): string | null {
		const parts = relativePath.split("/")
		if (parts[parts.length - 1] === "index.ts") {
			return parts[parts.length - 2] || null
		}
		return null
	}

	private async analyzeInheritance(): Promise<void> {
		console.log("📊 Analyzing inheritance patterns...\n")

		for (const [typeName, locations] of this.typeMap) {
			if (locations.length > 1) {
				const plan = this.createAnalysisPlan(typeName, locations)
				this.analysisPlans.push(plan)
				this.reportPlan(plan)
			}
		}
	}

	private createAnalysisPlan(
		typeName: string,
		locations: TypeLocation[],
	): AnalysisPlan {
		const primaryCandidates = locations.filter((loc) => !loc.isAlias)
		const aliasLocations = locations.filter((loc) => loc.isAlias)

		// Choose primary location (prefer deeper paths for more specific types)
		let primaryLocation: TypeLocation
		if (primaryCandidates.length === 1) {
			primaryLocation = primaryCandidates[0]
		} else {
			primaryLocation = primaryCandidates.reduce((best, current) => {
				if (current.depth > best.depth) return current
				if (
					current.depth === best.depth &&
					current.extendsFrom.length > best.extendsFrom.length
				) return current
				return best
			})
		}

		// Get all inheritance paths
		const allInheritancePaths = locations.map((loc) =>
			this.buildInheritancePath(loc.path)
		)

		// Determine what direct parents this type needs
		// For multiple inheritance, we need the immediate parent of each non-alias location
		const directParentsNeeded = new Set<string>()

		for (const location of locations) {
			if (!location.isAlias) {
				const path = this.buildInheritancePath(location.path)
				if (path.length > 1) {
					// The immediate parent is the one this type should extend
					directParentsNeeded.add(path[path.length - 2])
				}
			}
		}

		const directParentsArray = Array.from(directParentsNeeded)

		// Determine what action is needed
		let consolidationAction: AnalysisPlan["consolidationAction"]

		if (directParentsArray.length <= 1) {
			consolidationAction = "single_inheritance"
		} else {
			// Check if already has correct multiple inheritance
			const currentExtends = new Set(primaryLocation.extendsFrom)
			const hasAllParents = directParentsArray.every((parent) =>
				currentExtends.has(parent)
			)
			const hasCorrectCount = currentExtends.size === directParentsArray.length

			if (hasAllParents && hasCorrectCount) {
				consolidationAction = "already_correct"
			} else {
				consolidationAction = "multiple_inheritance"
			}
		}

		return {
			typeName,
			primaryLocation,
			aliasLocations,
			allInheritancePaths,
			directParentsNeeded: directParentsArray,
			consolidationAction,
		}
	}

	private buildInheritancePath(typePath: string): string[] {
		const parts = typePath.replace("/index.ts", "").split("/")
		return parts.filter((part) => part.length > 0)
	}

	private reportPlan(plan: AnalysisPlan): void {
		console.log(`🔄 Multiple inheritance analysis: ${plan.typeName}`)
		console.log(`   Primary: ${plan.primaryLocation.path}`)
		console.log(
			`   Current extends: ${
				plan.primaryLocation.extendsFrom.join(", ") || "none"
			}`,
		)
		console.log(`   All inheritance paths:`)

		plan.allInheritancePaths.forEach((path, index) => {
			const location =
				plan.primaryLocation.path === plan.allInheritancePaths[index]
					? plan.primaryLocation
					: plan.aliasLocations.find((a) =>
						this.buildInheritancePath(a.path).join("/") === path.join("/")
					)
			const status = location?.isAlias ? "(alias)" : "(definition)"
			console.log(`     ${path.join(" → ")} ${status}`)
		})

		console.log(
			`   Direct parents needed: ${plan.directParentsNeeded.join(", ")}`,
		)
		console.log(`   Action: ${plan.consolidationAction}`)

		if (plan.consolidationAction === "multiple_inheritance") {
			console.log(`   🔧 Should extend: ${plan.directParentsNeeded.join(", ")}`)
			console.log(`   ✅ Ready for consolidation`)
		} else if (plan.consolidationAction === "already_correct") {
			console.log(`   ✅ Already correctly configured`)
		} else {
			console.log(`   ✅ Single inheritance - no action needed`)
		}
		console.log()
	}

	private reportFindings(): void {
		console.log("\n📋 DISCOVERY SUMMARY")
		console.log("=".repeat(50))

		const totalTypes = this.typeMap.size
		const multipleInheritanceTypes = this.analysisPlans.length

		console.log(`Total types found: ${totalTypes}`)
		console.log(`Types with multiple paths: ${multipleInheritanceTypes}`)

		const needsConsolidation = this.analysisPlans.filter((p) =>
			p.consolidationAction === "multiple_inheritance"
		)
		const alreadyCorrect = this.analysisPlans.filter((p) =>
			p.consolidationAction === "already_correct"
		)
		const singleInheritance = this.analysisPlans.filter((p) =>
			p.consolidationAction === "single_inheritance"
		)

		console.log(`\n📊 ANALYSIS BREAKDOWN:`)
		console.log(`🔧 Need multiple inheritance: ${needsConsolidation.length}`)
		console.log(`✅ Already correct: ${alreadyCorrect.length}`)
		console.log(
			`📝 Single inheritance (aliases only): ${singleInheritance.length}`,
		)

		if (needsConsolidation.length > 0) {
			console.log(`\n🎯 TYPES NEEDING CONSOLIDATION:`)
			needsConsolidation.forEach((plan) => {
				console.log(
					`  • ${plan.typeName}: extend ${plan.directParentsNeeded.join(", ")}`,
				)
			})
		}
	}
}

async function main() {
	const workspacePath = "/Users/guy/Workspace/@sitebender/metadata-components"
	const discovery = new InheritanceDiscovery(workspacePath)

	try {
		await discovery.discover()
	} catch (error) {
		console.error("Discovery failed:", error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	await main()
}

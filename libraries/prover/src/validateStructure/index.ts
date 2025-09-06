#!/usr/bin/env -S deno run --allow-read

import { walk } from "https://deno.land/std@0.212.0/fs/walk.ts"
import type { ValidationResult } from "./types/index.ts"

/**
 * Validates the structure of the test generator codebase
 * @param basePath Base path to validate
 * @returns Validation result with violations and statistics
 */
export default async function validateStructure(basePath: string = "."): Promise<ValidationResult> {
	const result: ValidationResult = {
		valid: true,
		violations: [],
		stats: {
			totalFiles: 0,
			functionsFound: 0,
			classesFound: 0,
			correctStructure: 0
		}
	}
	
	console.log("🔍 Validating test generator structure...")
	console.log("=" .repeat(60))
	
	const entries = []
	for await (const entry of walk(basePath, {
		includeDirs: false,
		match: [/\.ts$/],
		skip: [/\.test\.ts$/]
	})) {
		entries.push(entry)
	}
	
	await Promise.all(entries.map(async entry => {
		result.stats.totalFiles++
		
		await validateNoClasses(entry.path, result)
		await validateOneFunctionPerFile(entry.path, result)
		await validateFolderStructure(entry.path, result)
	}))
	
	result.valid = result.violations.length === 0
	return result
}

async function validateNoClasses(path: string, result: ValidationResult): Promise<void> {
	const content = await Deno.readTextFile(path)
	
	const classMatches = content.match(/^\s*(export\s+)?(default\s+)?class\s+/gm)
	if (classMatches) {
		result.violations.push(`HERESY! Found ${classMatches.length} class(es) in ${path}`)
		result.stats.classesFound++
	}
}

async function validateOneFunctionPerFile(path: string, result: ValidationResult): Promise<void> {
	const content = await Deno.readTextFile(path)
	
	// Skip validation for types files - they export types/interfaces, not functions
	if (path.includes("/types/") || path.endsWith("types/index.ts")) {
		result.stats.functionsFound++
		return
	}
	
	const defaultFunctionMatches = content.match(/^export\s+default\s+(async\s+)?function\s+/gm) || []
	const namedFunctionMatches = content.match(/^export\s+(?!default)(async\s+)?function\s+/gm) || []
	const arrowMatches = content.match(/^export\s+(const|let)\s+\w+\s*=\s*(\([^)]*\)|[^=])\s*=>/gm) || []
	
	const reExports = content.match(/^export\s+{[^}]*}/gm) || []
	const exportAll = content.match(/^export\s+\*\s+(as\s+\w+\s+)?from\s+/gm) || []
	
	const totalExports = defaultFunctionMatches.length + namedFunctionMatches.length + arrowMatches.length
	
	if (totalExports > 1) {
		result.violations.push(`Multiple functions in ${path}: found ${totalExports} exports`)
	}
	
	const isReExportOnly = reExports.length > 0 || exportAll.length > 0
	
	if (totalExports === 0 && !isReExportOnly) {
		result.violations.push(`No function export found in ${path}`)
	}
	
	if (totalExports === 1 || isReExportOnly) {
		result.stats.functionsFound++
	}
}

/**
 * Validates folder structure follows CLAUDE.md conventions
 * @param path File path to validate
 * @param result Validation result object to update
 */
function validateFolderStructure(path: string, result: ValidationResult): void {
	if (!path.endsWith("/index.ts") && !path.endsWith("/types/index.ts")) {
		result.violations.push(`File not named index.ts: ${path}`)
		return
	}
	
	const parts = path.split("/")
	const folderName = parts[parts.length - 2]
	
	if (!/^[a-z][a-zA-Z0-9]*$/.test(folderName) && 
	    folderName !== "types" && 
	    folderName !== "constants" &&
	    folderName !== "testGenerator") {
		result.violations.push(`Folder name not camelCase: ${folderName} in ${path}`)
		return
	}
	
	result.stats.correctStructure++
}

if (import.meta.main) {
	const result = await validateStructure()
	
	console.log("\n📊 VALIDATION RESULTS")
	console.log("=" .repeat(60))
	
	console.log(`\n📈 Statistics:`)
	console.log(`   Total files scanned: ${result.stats.totalFiles}`)
	console.log(`   Functions following rules: ${result.stats.functionsFound}`)
	console.log(`   Files with correct structure: ${result.stats.correctStructure}`)
	console.log(`   Classes found: ${result.stats.classesFound}`)
	
	if (result.violations.length > 0) {
		console.log(`\n❌ VIOLATIONS FOUND (${result.violations.length}):`)
		result.violations.forEach(violation => {
			console.log(`   • ${violation}`)
		})
		console.log(`\n🔥 HERESY DETECTED! Fix these violations!`)
		Deno.exit(1)
	} else {
		console.log(`\n✅ ALL VALIDATIONS PASSED!`)
		console.log(`   • NO classes found`)
		console.log(`   • One function per file`)
		console.log(`   • Proper folder/index.ts structure`)
		console.log(`   • Full CLAUDE.md compliance`)
		console.log(`\n🎉 The code is RIGHTEOUS!`)
	}
}
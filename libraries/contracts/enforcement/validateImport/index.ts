//++ Validates that an import is allowed according to the boundaries contract

import type { ValidationResult } from "../types"

export default function validateImport(
	fromLibrary: string,
	toLibrary: string,
	importPath: string,
): ValidationResult {
	const errors: Array<string> = []
	const warnings: Array<string> = []
	
	// Load boundaries (in real implementation, this would be cached)
	const boundaries = loadBoundaries()
	
	const fromConfig = boundaries.dependencies[fromLibrary]
	if (!fromConfig) {
		warnings.push(`Library ${fromLibrary} not found in boundaries contract`)
		return { valid: true, errors, warnings }
	}
	
	// Check if this is a forbidden import
	if (fromConfig.forbiddenImports) {
		for (const forbidden of fromConfig.forbiddenImports) {
			if (forbidden === "*" && toLibrary.startsWith("@sitebender/")) {
				errors.push(
					`${fromLibrary} cannot import any @sitebender libraries (tried to import ${toLibrary})`
				)
			} else if (importPath.includes(forbidden)) {
				errors.push(
					`${fromLibrary} cannot import ${forbidden} (found in ${importPath})`
				)
			}
		}
	}
	
	// Special check for Envoy's forbidden TypeScript imports
	if (fromLibrary === "envoy") {
		const typescriptPatterns = [
			"typescript",
			"@typescript",
			/\.tsx?['"`]/,
			/\.jsx['"`]/,
		]
		
		for (const pattern of typescriptPatterns) {
			if (typeof pattern === "string" && importPath.includes(pattern)) {
				errors.push(
					`Envoy CANNOT import TypeScript compiler directly! Use Parser instead. Violation: ${importPath}`
				)
			} else if (pattern instanceof RegExp && pattern.test(importPath)) {
				errors.push(
					`Envoy CANNOT access source files directly! Use Parser instead. Violation: ${importPath}`
				)
			}
		}
	}
	
	// Check if this import is explicitly allowed
	if (fromConfig.canImport && !fromConfig.canImport.includes(toLibrary)) {
		// Check if it's a general category like "toolkit" that's always allowed
		const alwaysAllowed = ["toolkit", "foundry"]
		if (!alwaysAllowed.includes(toLibrary)) {
			errors.push(
				`${fromLibrary} cannot import ${toLibrary}. Allowed: ${fromConfig.canImport.join(", ")}`
			)
		}
	}
	
	return {
		valid: errors.length === 0,
		errors,
		warnings,
	}
}

function loadBoundaries(): any {
	// In production, this would load and cache the boundaries.json file
	// For now, returning a minimal structure
	return {
		dependencies: {
			envoy: {
				canImport: ["parser", "toolkit", "foundry"],
				forbiddenImports: [
					"typescript",
					"@typescript/compiler",
					"prover",
					"components",
					"engine",
					"maths",
					"mesh",
				],
			},
			parser: {
				canImport: ["toolkit", "foundry"],
				forbiddenImports: ["envoy", "prover", "components", "engine", "maths", "mesh"],
			},
			prover: {
				canImport: ["parser", "toolkit", "foundry"],
				forbiddenImports: [
					"typescript",
					"@typescript/compiler",
					"envoy",
					"components",
					"engine",
					"maths",
					"mesh",
				],
			},
			toolkit: {
				canImport: [],
				forbiddenImports: ["*"],
			},
			foundry: {
				canImport: [],
				forbiddenImports: ["*"],
			},
		},
	}
}
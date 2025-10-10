//++ Validates that an import is allowed according to the boundaries contract

import type { ValidationResult } from "../../types/enforcement.ts"

import filter from "../../../../toolsmith/src/vanilla/array/filter/index.ts"
import flatMap from "../../../../toolsmith/src/vanilla/array/flatMap/index.ts"
import map from "../../../../toolsmith/src/vanilla/array/map/index.ts"
import loadBoundaries from "./loadBoundaries/index.ts"

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
		const forbiddenHits = filter((forbidden: string) => {
			if (forbidden === "*") {
				// Any import path referencing @sitebender namespace is forbidden for wildcard entries
				return /@sitebender\//.test(importPath)
			}
			return importPath.includes(forbidden)
		})([...fromConfig.forbiddenImports] as Array<string>)
		errors.push(
			...map((forbidden: string) =>
				forbidden === "*"
					? `${fromLibrary} cannot import any @sitebender libraries (tried to import ${toLibrary})`
					: `${fromLibrary} cannot import ${forbidden} (found in ${importPath})`
			)(forbiddenHits),
		)
	}

	// Special check for Envoy's forbidden TypeScript imports
	if (fromLibrary === "envoy") {
		const typescriptPatterns = [
			"typescript",
			"@typescript",
			/\.tsx(\b|$)/,
			/\.jsx(\b|$)/,
		] as const

		const tsErrors = flatMap<string | RegExp, string>((pattern) => {
			if (typeof pattern === "string" && importPath.includes(pattern)) {
				return [
					`Envoy CANNOT import TypeScript compiler directly! Use Arborist instead. Violation: ${importPath}`,
				]
			}
			if (pattern instanceof RegExp && pattern.test(importPath)) {
				return [
					`Envoy CANNOT access source files directly! Use Arborist instead. Violation: ${importPath}`,
				]
			}
			return []
		})([...typescriptPatterns] as Array<string | RegExp>)
		errors.push(...tsErrors)
	}

	// Check if this import is explicitly allowed
	if (fromConfig.canImport && !fromConfig.canImport.includes(toLibrary)) {
		// Check if it's a general category like "toolsmith" that's always allowed
		const alwaysAllowed = ["toolsmith", "quarrier"]
		if (!alwaysAllowed.includes(toLibrary)) {
			errors.push(
				`${fromLibrary} cannot import ${toLibrary}. Allowed: ${
					fromConfig.canImport.join(", ")
				}`,
			)
		}
	}

	return {
		valid: errors.length === 0,
		errors,
		warnings,
	}
}

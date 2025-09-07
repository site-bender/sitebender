import type { ImportInfo } from "../extractImports/index.ts"

/**
 * Finds types that need to be imported based on function signature
 *
 * @example
 * ```typescript
 * const required = findRequiredImports(signature, availableImports)
 * // Returns imports needed for Result<T, E> and other custom types
 * ```
 */
export default function findRequiredImports(
	signature: {
		parameters: Array<{ type: { raw: string } }>
		returnType: { raw: string }
	},
	availableImports: Array<ImportInfo>,
): Array<ImportInfo> {
	const required: Array<ImportInfo> = []
	const usedTypes = new Set<string>()

	// Extract type names from parameters
	signature.parameters.forEach((param) => {
		extractTypeNames(param.type.raw, usedTypes)
	})

	// Extract type names from return type
	extractTypeNames(signature.returnType.raw, usedTypes)

	// Find matching imports
	availableImports.forEach((imp) => {
		if (usedTypes.has(imp.name)) {
			required.push(imp)
		}
	})

	return required
}

/**
 * Extracts type names from a type string
 */
function extractTypeNames(typeStr: string, types: Set<string>) {
	// Match custom type names (capitalized identifiers)
	const typeNamePattern = /\b([A-Z][a-zA-Z0-9]*)/g
	const matches = Array.from(typeStr.matchAll(typeNamePattern))

	matches.forEach((match) => {
		const typeName = match[1]
		// Skip built-in types
		if (!isBuiltInType(typeName)) {
			types.add(typeName)
		}
	})
}

/**
 * Checks if a type name is a built-in TypeScript type
 */
function isBuiltInType(typeName: string): boolean {
	const builtIns = new Set([
		"Array",
		"Object",
		"String",
		"Number",
		"Boolean",
		"Date",
		"RegExp",
		"Error",
		"Promise",
		"Map",
		"Set",
		"WeakMap",
		"WeakSet",
		"Symbol",
		"BigInt",
		"Function",
		"Uint8Array",
		"Uint16Array",
		"Uint32Array",
		"Int8Array",
		"Int16Array",
		"Int32Array",
		"Float32Array",
		"Float64Array",
		"ArrayBuffer",
		"DataView",
		"JSON",
		"Math",
		"Infinity",
		"NaN",
	])
	return builtIns.has(typeName)
}

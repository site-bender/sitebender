/**
 * Maps TypeScript types to fast-check arbitraries
 */

export interface ArbitraryMapping {
	type: string
	generator: string
	imports?: Array<string>
	edgeCases?: Array<string>
}

/**
 * Get the fast-check arbitrary for a given TypeScript type
 */
export function getArbitraryForType(typeStr: string): ArbitraryMapping {
	// Handle generic types
	const genericMatch = typeStr.match(/^(Array|ReadonlyArray)<(.+)>$/)
	if (genericMatch) {
		const innerType = genericMatch[2]
		const innerArb = getArbitraryForType(innerType)
		return {
			type: typeStr,
			generator: `fc.array(${innerArb.generator})`,
			imports: innerArb.imports,
			edgeCases: ["[]", `[${innerArb.edgeCases?.[0] ?? "undefined"}]`]
		}
	}

	// Handle Promise types
	if (typeStr.startsWith("Promise<")) {
		const innerMatch = typeStr.match(/^Promise<(.+)>$/)
		if (innerMatch) {
			const innerType = innerMatch[1]
			const innerArb = getArbitraryForType(innerType)
			return {
				type: typeStr,
				generator: `fc.constant(Promise.resolve(${innerArb.generator}))`,
				imports: innerArb.imports
			}
		}
	}

	// Handle tuple types
	const tupleMatch = typeStr.match(/^\[(.+)\]$/)
	if (tupleMatch) {
		const types = splitTypeList(tupleMatch[1])
		const generators = types.map(t => getArbitraryForType(t.trim()))
		return {
			type: typeStr,
			generator: `fc.tuple(${generators.map(g => g.generator).join(", ")})`,
			imports: generators.flatMap(g => g.imports ?? [])
		}
	}

	// Handle union types
	if (typeStr.includes("|")) {
		const types = typeStr.split("|").map(t => t.trim())
		const generators = types.map(t => getArbitraryForType(t))
		return {
			type: typeStr,
			generator: `fc.oneof(${generators.map(g => g.generator).join(", ")})`,
			imports: generators.flatMap(g => g.imports ?? [])
		}
	}

	// Handle function types
	if (typeStr.includes("=>") || typeStr.startsWith("(")) {
		return {
			type: typeStr,
			generator: "fc.func(fc.anything())",
			edgeCases: ["() => undefined", "() => null", "() => 0"]
		}
	}

	// Handle object/record types
	if (typeStr.startsWith("{") || typeStr.includes("Record<")) {
		return {
			type: typeStr,
			generator: "fc.object()",
			edgeCases: ["{}", "null"]
		}
	}

	// Map basic types
	return getBasicTypeMapping(typeStr)
}

/**
 * Get mapping for basic/primitive types
 */
function getBasicTypeMapping(type: string): ArbitraryMapping {
	const mappings: Record<string, ArbitraryMapping> = {
		"number": {
			type: "number",
			generator: "fc.float({ noNaN: false, noDefaultInfinity: false })",
			edgeCases: ["0", "-0", "1", "-1", "NaN", "Infinity", "-Infinity"]
		},
		"string": {
			type: "string",
			generator: "fc.string()",
			edgeCases: ['""', '" "', '"\\n"', '"\\t"', '"\\0"']
		},
		"boolean": {
			type: "boolean",
			generator: "fc.boolean()",
			edgeCases: ["true", "false"]
		},
		"null": {
			type: "null",
			generator: "fc.constant(null)",
			edgeCases: ["null"]
		},
		"undefined": {
			type: "undefined",
			generator: "fc.constant(undefined)",
			edgeCases: ["undefined"]
		},
		"void": {
			type: "void",
			generator: "fc.constant(undefined)",
			edgeCases: ["undefined"]
		},
		"any": {
			type: "any",
			generator: "fc.anything()",
			edgeCases: ["undefined", "null", "0", '""', "[]", "{}"]
		},
		"unknown": {
			type: "unknown",
			generator: "fc.anything()",
			edgeCases: ["undefined", "null", "0", '""', "[]", "{}"]
		},
		"never": {
			type: "never",
			generator: "fc.constant(undefined as never)",
			edgeCases: []
		},
		"bigint": {
			type: "bigint",
			generator: "fc.bigInt()",
			edgeCases: ["0n", "1n", "-1n"]
		},
		"symbol": {
			type: "symbol",
			generator: "fc.constant(Symbol())",
			edgeCases: ["Symbol()", 'Symbol("test")']
		},
		"Date": {
			type: "Date",
			generator: "fc.date()",
			edgeCases: ["new Date(0)", "new Date()"]
		},
		"RegExp": {
			type: "RegExp",
			generator: "fc.constant(/.*/))",
			edgeCases: ["/^$/", "/.*/", "/\\w+/"]
		},
		"Error": {
			type: "Error",
			generator: 'fc.constant(new Error("test"))',
			edgeCases: ['new Error("")', 'new Error("test")']
		},
		"Map": {
			type: "Map",
			generator: "fc.constant(new Map())",
			edgeCases: ["new Map()"]
		},
		"Set": {
			type: "Set",
			generator: "fc.constant(new Set())",
			edgeCases: ["new Set()"]
		},
		"WeakMap": {
			type: "WeakMap",
			generator: "fc.constant(new WeakMap())",
			edgeCases: ["new WeakMap()"]
		},
		"WeakSet": {
			type: "WeakSet",
			generator: "fc.constant(new WeakSet())",
			edgeCases: ["new WeakSet()"]
		}
	}

	return mappings[type] ?? {
		type,
		generator: "fc.anything()",
		edgeCases: ["undefined", "null"]
	}
}

/**
 * Generate specialized arbitraries for common patterns
 */
export function getSpecializedArbitrary(type: string, context?: string): string {
	// Integer types
	if (type === "number" && context?.includes("index")) {
		return "fc.nat()"
	}
	
	if (type === "number" && context?.includes("positive")) {
		return "fc.integer({ min: 1 })"
	}
	
	if (type === "number" && context?.includes("negative")) {
		return "fc.integer({ max: -1 })"
	}

	// String types
	if (type === "string" && context?.includes("email")) {
		return "fc.emailAddress()"
	}
	
	if (type === "string" && context?.includes("uuid")) {
		return "fc.uuid()"
	}
	
	if (type === "string" && context?.includes("url")) {
		return "fc.webUrl()"
	}
	
	if (type === "string" && context?.includes("ascii")) {
		return "fc.asciiString()"
	}
	
	if (type === "string" && context?.includes("alphanumeric")) {
		return "fc.stringMatching(/^[a-zA-Z0-9]+$/)"
	}

	// Array types
	if (type.includes("Array") && context?.includes("nonempty")) {
		const innerType = type.match(/<(.+)>/)?.[1] ?? "any"
		const innerArb = getArbitraryForType(innerType)
		return `fc.array(${innerArb.generator}, { minLength: 1 })`
	}

	// Default to standard mapping
	return getArbitraryForType(type).generator
}

/**
 * Split a comma-separated type list, handling nested generics
 */
function splitTypeList(typeList: string): Array<string> {
	const result: Array<string> = []
	let current = ""
	let depth = 0

	for (const char of typeList) {
		if (char === "<" || char === "[" || char === "(") {
			depth++
		} else if (char === ">" || char === "]" || char === ")") {
			depth--
		} else if (char === "," && depth === 0) {
			result.push(current.trim())
			current = ""
			continue
		}
		current += char
	}

	if (current) {
		result.push(current.trim())
	}

	return result
}

/**
 * Generate a composite arbitrary for complex types
 */
export function generateCompositeArbitrary(
	parameters: Array<{ name: string; type: string }>,
): string {
	if (parameters.length === 0) {
		return "fc.constant(undefined)"
	}

	if (parameters.length === 1) {
		return getArbitraryForType(parameters[0].type).generator
	}

	const generators = parameters.map(p => getArbitraryForType(p.type).generator)
	return `fc.tuple(${generators.join(", ")})`
}

/**
 * Get all edge cases for a type
 */
export function getEdgeCasesForType(type: string): Array<string> {
	const mapping = getArbitraryForType(type)
	return mapping.edgeCases ?? []
}

/**
 * Check if a type needs special handling
 */
export function needsSpecialHandling(type: string): boolean {
	return type.includes("Promise") ||
		type.includes("Observable") ||
		type.includes("Stream") ||
		type.includes("EventEmitter") ||
		type.includes("Generator") ||
		type.includes("AsyncGenerator")
}
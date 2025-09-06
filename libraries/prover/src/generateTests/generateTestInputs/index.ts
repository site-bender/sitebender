import type { TypeInfo } from "../../types/index.ts"
import { TypeKind } from "../../types/index.ts"

/**
 * Generates appropriate test inputs based on type information
 * 
 * @example
 * ```typescript
 * const input = generateTestInput({ raw: "string", kind: TypeKind.Primitive })
 * // Returns: "test string"
 * 
 * const input = generateTestInput({ raw: "number", kind: TypeKind.Primitive })
 * // Returns: 42
 * ```
 */
export default function generateTestInput(type: TypeInfo): unknown {
	// Handle primitive types properly
	if (type.kind === TypeKind.Primitive) {
		switch (type.raw) {
			case "string":
				return "test string"
			case "number":
				return 42
			case "boolean":
				return true
			case "undefined":
				return undefined
			case "null":
				return null
			case "symbol":
				return Symbol("test")
			case "bigint":
				return BigInt(9007199254740991)
			default:
				return undefined
		}
	}
	
	// Handle arrays with proper element types
	if (type.kind === TypeKind.Array) {
		const elementType = type.elementType
		if (!elementType) return []
		
		// Generate array with 3 sample elements
		const element = generateTestInput(elementType)
		return [element, element, element]
	}
	
	// Handle objects/interfaces
	if (type.kind === TypeKind.Object || type.kind === TypeKind.Interface) {
		// For Result type, generate success case
		if (type.raw.startsWith("Result<")) {
			return { ok: true, value: "test value" }
		}
		
		// For generic objects
		return { key: "value", test: true }
	}
	
	// Handle functions
	if (type.kind === TypeKind.Function) {
		// Return a simple identity function
		return (x: unknown) => x
	}
	
	// Handle tuples
	if (type.kind === TypeKind.Tuple) {
		const elements = type.elements || []
		return elements.map(el => generateTestInput(el))
	}
	
	// Handle unions - pick first type
	if (type.kind === TypeKind.Union) {
		const types = type.types || []
		if (types.length > 0) {
			return generateTestInput(types[0])
		}
	}
	
	// Handle generic types
	if (type.kind === TypeKind.Generic) {
		// For now, treat generics as any and return a string
		return "generic value"
	}
	
	// Default fallback
	return undefined
}
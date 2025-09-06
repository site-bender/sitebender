import * as ts from "npm:typescript@5.7.2"
import type { TypeInfo } from "../../../../../types/index.ts"
import { TypeKind } from "../../../../../types/index.ts"

/**
 * Converts a TypeScript Type object to TypeInfo structure
 * @param type TypeScript Type object
 * @param checker TypeScript type checker
 * @returns TypeInfo representation of the type
 */
export default function typeToTypeInfo(
	type: ts.Type,
	checker: ts.TypeChecker
): TypeInfo {
	const raw = checker.typeToString(type)
	
	if (type.flags & ts.TypeFlags.String) {
		return { raw, kind: TypeKind.Primitive }
	}
	if (type.flags & ts.TypeFlags.Number) {
		return { raw, kind: TypeKind.Primitive }
	}
	if (type.flags & ts.TypeFlags.Boolean) {
		return { raw, kind: TypeKind.Primitive }
	}
	if (type.flags & ts.TypeFlags.Void) {
		return { raw, kind: TypeKind.Primitive }
	}
	if (type.flags & ts.TypeFlags.Null) {
		return { raw, kind: TypeKind.Primitive }
	}
	if (type.flags & ts.TypeFlags.Undefined) {
		return { raw, kind: TypeKind.Primitive }
	}
	
	const symbol = type.getSymbol()
	if (symbol?.name === "Array") {
		const typeArgs = (type as ts.TypeReference).typeArguments
		if (typeArgs && typeArgs.length > 0) {
			return {
				raw,
				kind: TypeKind.Array,
				elementType: typeToTypeInfo(typeArgs[0], checker),
			}
		}
	}
	
	if (type.isUnion()) {
		return {
			raw,
			kind: TypeKind.Union,
			unionTypes: (type as ts.UnionType).types.map((t) => typeToTypeInfo(t, checker)),
		}
	}
	
	if (type.isIntersection()) {
		return {
			raw,
			kind: TypeKind.Intersection,
			unionTypes: (type as ts.IntersectionType).types.map((t) => typeToTypeInfo(t, checker)),
		}
	}
	
	// Handle generic types like Result<T, E>, Option<T>, etc.
	if (symbol && symbol.name && raw.includes("<")) {
		const typeArgs = (type as ts.TypeReference).typeArguments
		if (typeArgs && typeArgs.length > 0) {
			return {
				raw,
				kind: TypeKind.Generic,
				typeName: symbol.name,
				typeArguments: typeArgs.map(t => typeToTypeInfo(t, checker))
			}
		}
		return { raw, kind: TypeKind.Generic, typeName: symbol.name }
	}
	
	// Handle interfaces and type aliases
	if (symbol && (symbol.flags & ts.SymbolFlags.Interface || symbol.flags & ts.SymbolFlags.TypeAlias)) {
		return { raw, kind: TypeKind.Interface, typeName: symbol.name }
	}
	
	// Handle objects
	if (type.flags & ts.TypeFlags.Object) {
		return { raw, kind: TypeKind.Object }
	}
	
	return { raw, kind: TypeKind.Unknown }
}
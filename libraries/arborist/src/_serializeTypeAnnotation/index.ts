//++ Serialize a TypeScript type annotation to string
//++ Handles primitive types, object types, union types, generics, etc.
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"
import _filterNonEmpty from "./_filterNonEmpty/index.ts"

export default function _serializeTypeAnnotation(node: unknown): string {
	if (!node) {
		return "unknown"
	}

	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	switch (nodeType) {
		// Keyword types (string, number, boolean, etc.)
		case "TsKeywordType": {
			const kind = nodeObj.kind as string
			return kind
		}

		// Type references (e.g., Array<T>, MyType)
		case "TsTypeReference": {
			const typeName = nodeObj.typeName as Record<string, unknown>
			const name = typeName.value as string
			const typeParams = nodeObj.typeParams as
				| Record<string, unknown>
				| undefined
			if (typeParams) {
				const params = typeParams.params as Array<unknown>
				const serializedParamsResult = map(_serializeTypeAnnotation)(params as ReadonlyArray<Serializable>)
				const serializedParams = getOrElse([] as ReadonlyArray<string>)(serializedParamsResult)
				return `${name}<${serializedParams.join(", ")}>`
			}
			return name
		}

		// Union types (A | B | C)
		case "TsUnionType": {
			const types = nodeObj.types as Array<unknown>
			const serializedResult = map(_serializeTypeAnnotation)(types as ReadonlyArray<Serializable>)
			const serialized = getOrElse([] as ReadonlyArray<string>)(serializedResult)
			return serialized.join(" | ")
		}

		// Intersection types (A & B & C)
		case "TsIntersectionType": {
			const types = nodeObj.types as Array<unknown>
			const serializedResult = map(_serializeTypeAnnotation)(types as ReadonlyArray<Serializable>)
			const serialized = getOrElse([] as ReadonlyArray<string>)(serializedResult)
			return serialized.join(" & ")
		}

		// Array types (T[])
		case "TsArrayType": {
			const elemType = _serializeTypeAnnotation(nodeObj.elemType)
			return `${elemType}[]`
		}

		// Tuple types ([string, number])
		case "TsTupleType": {
			const elemTypes = nodeObj.elemTypes as Array<Record<string, unknown>>
			const serializedResult = map(
				function serializeElemType(elem: Serializable): string {
					const elemObj = elem as Record<string, unknown>
					return _serializeTypeAnnotation(elemObj.ty)
				}
			)(elemTypes as ReadonlyArray<Serializable>)
			const serialized = getOrElse([] as ReadonlyArray<string>)(serializedResult)
			return `[${serialized.join(", ")}]`
		}

		// Object types ({ key: value })
		case "TsTypeLiteral": {
			const members = nodeObj.members as Array<Record<string, unknown>>
			const serializedResult = map(
				function serializeMember(member: Serializable): string {
					const memberObj = member as Record<string, unknown>
					const memberType = memberObj.type as string
					if (isEqual(memberType)("TsPropertySignature")) {
						const key = memberObj.key as Record<string, unknown>
						const keyName = key.value as string
						const typeAnn = memberObj.typeAnnotation as
							| Record<string, unknown>
							| undefined
						if (typeAnn) {
							const type = _serializeTypeAnnotation(
								typeAnn.typeAnnotation,
							)
							const optional = memberObj.optional as boolean
							return `${keyName}${optional ? "?" : ""}: ${type}`
						}
						return keyName
					}
					return ""
				}
			)(members as ReadonlyArray<Serializable>)
			const serializedArray = getOrElse([] as ReadonlyArray<string>)(serializedResult)
			const filteredResult = filter(_filterNonEmpty)(serializedArray)
			const filtered = getOrElse([] as ReadonlyArray<string>)(filteredResult)
			return `{ ${filtered.join("; ")} }`
		}

		// Function types ((arg: T) => R)
		case "TsFunctionType": {
			const params = nodeObj.params as Array<Record<string, unknown>>
			const serializedParamsResult = map(
				function serializeParam(param: Serializable): string {
					const paramObj = param as Record<string, unknown>
					const pat = paramObj.pat as Record<string, unknown>
					const name = pat.value as string
					const typeAnn = paramObj.typeAnnotation as
						| Record<string, unknown>
						| undefined
					if (typeAnn) {
						const type = _serializeTypeAnnotation(typeAnn.typeAnnotation)
						return `${name}: ${type}`
					}
					return name
				}
			)(params as ReadonlyArray<Serializable>)
			const serializedParams = getOrElse([] as ReadonlyArray<string>)(serializedParamsResult)
			const returnType = _serializeTypeAnnotation(
				nodeObj.typeAnnotation,
			)
			return `(${serializedParams.join(", ")}) => ${returnType}`
		}

		// Literal types ("literal", 42, true)
		case "TsLiteralType": {
			const literal = nodeObj.literal as Record<string, unknown>
			const litType = literal.type as string
			if (isEqual(litType)("StringLiteral")) {
				return `"${literal.value}"`
			}
			if (isEqual(litType)("NumericLiteral")) {
				return String(literal.value)
			}
			if (isEqual(litType)("BooleanLiteral")) {
				return String(literal.value)
			}
			return "unknown"
		}

		// Conditional types (T extends U ? X : Y)
		case "TsConditionalType": {
			const checkType = _serializeTypeAnnotation(nodeObj.checkType)
			const extendsType = _serializeTypeAnnotation(nodeObj.extendsType)
			const trueType = _serializeTypeAnnotation(nodeObj.trueType)
			const falseType = _serializeTypeAnnotation(nodeObj.falseType)
			return `${checkType} extends ${extendsType} ? ${trueType} : ${falseType}`
		}

		// Mapped types ({ [K in keyof T]: U })
		case "TsMappedType": {
			const typeParam = nodeObj.typeParam as Record<string, unknown>
			const name = (typeParam.name as Record<string, unknown>).value as string
			const constraint = typeParam.constraint
				? _serializeTypeAnnotation(typeParam.constraint)
				: "unknown"
			const typeAnn = nodeObj.typeAnnotation
				? _serializeTypeAnnotation(nodeObj.typeAnnotation)
				: "unknown"
			return `{ [${name} in ${constraint}]: ${typeAnn} }`
		}

		// Indexed access types (T[K])
		case "TsIndexedAccessType": {
			const objType = _serializeTypeAnnotation(nodeObj.objectType)
			const indexType = _serializeTypeAnnotation(nodeObj.indexType)
			return `${objType}[${indexType}]`
		}

		// Type queries (typeof x)
		case "TsTypeQuery": {
			const exprName = nodeObj.exprName as Record<string, unknown>
			const name = exprName.value as string
			return `typeof ${name}`
		}

		// Parenthesized types ((T))
		case "TsParenthesizedType": {
			const typeAnn = _serializeTypeAnnotation(nodeObj.typeAnnotation)
			return `(${typeAnn})`
		}

		// Optional types (T?)
		case "TsOptionalType": {
			const typeAnn = _serializeTypeAnnotation(nodeObj.typeAnnotation)
			return `${typeAnn}?`
		}

		// Rest types (...T[])
		case "TsRestType": {
			const typeAnn = _serializeTypeAnnotation(nodeObj.typeAnnotation)
			return `...${typeAnn}`
		}

		default:
			return "unknown"
	}
}

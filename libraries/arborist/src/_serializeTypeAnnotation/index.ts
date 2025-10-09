//++ Serialize a TypeScript type annotation to string
//++ Handles primitive types, object types, union types, generics, etc.
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
				const serializedParams = params.map(_serializeTypeAnnotation).join(
					", ",
				)
				return `${name}<${serializedParams}>`
			}
			return name
		}

		// Union types (A | B | C)
		case "TsUnionType": {
			const types = nodeObj.types as Array<unknown>
			const serialized = types.map(_serializeTypeAnnotation).join(" | ")
			return serialized
		}

		// Intersection types (A & B & C)
		case "TsIntersectionType": {
			const types = nodeObj.types as Array<unknown>
			const serialized = types.map(_serializeTypeAnnotation).join(" & ")
			return serialized
		}

		// Array types (T[])
		case "TsArrayType": {
			const elemType = _serializeTypeAnnotation(nodeObj.elemType)
			return `${elemType}[]`
		}

		// Tuple types ([string, number])
		case "TsTupleType": {
			const elemTypes = nodeObj.elemTypes as Array<Record<string, unknown>>
			const serialized = elemTypes.map((elem) =>
				_serializeTypeAnnotation(elem.ty)
			).join(", ")
			return `[${serialized}]`
		}

		// Object types ({ key: value })
		case "TsTypeLiteral": {
			const members = nodeObj.members as Array<Record<string, unknown>>
			const serialized = members.map((member) => {
				const memberType = member.type as string
				if (memberType === "TsPropertySignature") {
					const key = member.key as Record<string, unknown>
					const keyName = key.value as string
					const typeAnn = member.typeAnnotation as
						| Record<string, unknown>
						| undefined
					if (typeAnn) {
						const type = _serializeTypeAnnotation(
							typeAnn.typeAnnotation,
						)
						const optional = member.optional as boolean
						return `${keyName}${optional ? "?" : ""}: ${type}`
					}
					return keyName
				}
				return ""
			}).filter(Boolean).join("; ")
			return `{ ${serialized} }`
		}

		// Function types ((arg: T) => R)
		case "TsFunctionType": {
			const params = nodeObj.params as Array<Record<string, unknown>>
			const serializedParams = params.map((param) => {
				const pat = param.pat as Record<string, unknown>
				const name = pat.value as string
				const typeAnn = param.typeAnnotation as
					| Record<string, unknown>
					| undefined
				if (typeAnn) {
					const type = _serializeTypeAnnotation(typeAnn.typeAnnotation)
					return `${name}: ${type}`
				}
				return name
			}).join(", ")
			const returnType = _serializeTypeAnnotation(
				nodeObj.typeAnnotation,
			)
			return `(${serializedParams}) => ${returnType}`
		}

		// Literal types ("literal", 42, true)
		case "TsLiteralType": {
			const literal = nodeObj.literal as Record<string, unknown>
			const litType = literal.type as string
			if (litType === "StringLiteral") {
				return `"${literal.value}"`
			}
			if (litType === "NumericLiteral") {
				return String(literal.value)
			}
			if (litType === "BooleanLiteral") {
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

//++ Serialize a TypeScript type annotation to string
//++ Handles primitive types, object types, union types, generics, etc.
//++ Returns Result with serialized type or error for unsupported nodes
//++
//++ @param node - Type annotation node
//++ @returns Result<TypeExtractionError, string>
//++
//++ Error kinds:
//++ - UnsupportedTypeNode: unrecognized or unsupported type node
//++ - MalformedTypeMember: missing required fields in type structure
import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../types/errors/index.ts"

import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import _filterNonEmpty from "./_filterNonEmpty/index.ts"

export default function _serializeTypeAnnotation(
	node: unknown,
): Result<TypeExtractionError, string> {
	if (!node) {
		return ok("unknown")
	}

	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string | undefined

	// Helper to create TypeExtractionError
	function makeTypeError(
		kind: TypeExtractionError["kind"],
		message: string,
		nodeTypeValue?: string,
	): Result<TypeExtractionError, string> {
		const baseError = createError("extractTypes")([])(message)(
			"INVALID_ARGUMENT",
		)

		// Spread base error but exclude context (incompatible types)
		const { context: _unused, ...baseErrorFields } = baseError

		const typeError: TypeExtractionError = {
			...baseErrorFields,
			kind,
			...(nodeTypeValue && { nodeType: nodeTypeValue }),
		}

		return error(typeError)
	}

	if (!nodeType) {
		return makeTypeError(
			"UnsupportedTypeNode",
			"Type node has no type property",
		)
	}

	// Helper to accumulate array of types with error propagation
	function accumulateTypes(
		accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
		typeNode: unknown,
	): Result<TypeExtractionError, ReadonlyArray<string>> {
		if (accResult._tag === "Error") {
			return accResult
		}

		const typeResult = _serializeTypeAnnotation(typeNode)

		if (typeResult._tag === "Error") {
			return typeResult
		}

		return ok([...accResult.value, typeResult.value])
	}

	// Pattern matching via serializer map
	const serializers: Record<
		string,
		(n: Record<string, unknown>) => Result<TypeExtractionError, string>
	> = {
		TsKeywordType: function serializeKeyword(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const kind = n.kind as string | undefined

			if (!kind) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsKeywordType node has no kind",
				)
			}

			return ok(kind)
		},

		TsTypeReference: function serializeTypeReference(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const typeName = n.typeName as Record<string, unknown> | undefined

			if (!typeName) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsTypeReference node has no typeName",
				)
			}

			const name = typeName.value as string | undefined

			if (!name) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsTypeReference typeName has no value",
				)
			}

			const typeParams = n.typeParams as Record<string, unknown> | undefined

			if (!typeParams) {
				return ok(name)
			}

			const params = (typeParams.params as ReadonlyArray<unknown>) ?? []
			const paramsResult = reduce(accumulateTypes)(
				ok([] as ReadonlyArray<string>),
			)(params)

			if (paramsResult._tag === "Error") {
				return paramsResult
			}

			return ok(`${name}<${paramsResult.value.join(", ")}>`)
		},

		TsArrayType: function serializeArrayType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const elemTypeResult = _serializeTypeAnnotation(n.elemType)

			if (elemTypeResult._tag === "Error") {
				return elemTypeResult
			}

			return ok(`${elemTypeResult.value}[]`)
		},

		TsTupleType: function serializeTupleType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const elemTypes = (n.elemTypes as ReadonlyArray<
				Record<string, unknown>
			>) ?? []

			const elemTypesResult = reduce<
				Record<string, unknown>,
				Result<TypeExtractionError, ReadonlyArray<string>>
			>(
				function accumulateTupleElements(
					accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
					elem: Record<string, unknown>,
				): Result<TypeExtractionError, ReadonlyArray<string>> {
					if (accResult._tag === "Error") {
						return accResult
					}

					const elemResult = _serializeTypeAnnotation(elem.ty)

					if (elemResult._tag === "Error") {
						return elemResult
					}

					return ok([...accResult.value, elemResult.value])
				},
			)(ok([] as ReadonlyArray<string>))(elemTypes)

			if (elemTypesResult._tag === "Error") {
				return elemTypesResult
			}

			return ok(`[${elemTypesResult.value.join(", ")}]`)
		},

		TsUnionType: function serializeUnionType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const types = (n.types as ReadonlyArray<unknown>) ?? []
			const typesResult = reduce(accumulateTypes)(
				ok([] as ReadonlyArray<string>),
			)(types)

			if (typesResult._tag === "Error") {
				return typesResult
			}

			return ok(typesResult.value.join(" | "))
		},

		TsIntersectionType: function serializeIntersectionType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const types = (n.types as ReadonlyArray<unknown>) ?? []
			const typesResult = reduce(accumulateTypes)(
				ok([] as ReadonlyArray<string>),
			)(types)

			if (typesResult._tag === "Error") {
				return typesResult
			}

			return ok(typesResult.value.join(" & "))
		},

		TsTypeLiteral: function serializeTypeLiteral(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const members = (n.members as ReadonlyArray<
				Record<string, unknown>
			>) ?? []

			const membersResult = reduce<
				Record<string, unknown>,
				Result<TypeExtractionError, ReadonlyArray<string>>
			>(
				function accumulateMembers(
					accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
					member: Record<string, unknown>,
				): Result<TypeExtractionError, ReadonlyArray<string>> {
					if (accResult._tag === "Error") {
						return accResult
					}

					const memberType = member.type as string | undefined

					if (isEqual(memberType)("TsPropertySignature")) {
						const key = member.key as Record<string, unknown> | undefined

						if (!key) {
							return accResult // Skip members without keys
						}

						const keyName = key.value as string | undefined

						if (!keyName) {
							return accResult // Skip members without key names
						}

						const typeAnn = member.typeAnnotation as
							| Record<string, unknown>
							| undefined

						if (!typeAnn) {
							return ok([...accResult.value, keyName])
						}

						const typeResult = _serializeTypeAnnotation(
							typeAnn.typeAnnotation,
						)

						if (typeResult._tag === "Error") {
							return typeResult
						}

						const optional = member.optional as boolean | undefined
						const memberStr = `${keyName}${
							optional ? "?" : ""
						}: ${typeResult.value}`

						return ok([...accResult.value, memberStr])
					}

					return accResult // Skip non-property members
				},
			)(ok([] as ReadonlyArray<string>))(members)

			if (membersResult._tag === "Error") {
				return membersResult
			}

			const filtered = membersResult.value.filter(_filterNonEmpty)

			return ok(`{ ${filtered.join("; ")} }`)
		},

		TsFunctionType: function serializeFunctionType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const params = (n.params as ReadonlyArray<
				Record<string, unknown>
			>) ?? []

			const paramsResult = reduce<
				Record<string, unknown>,
				Result<TypeExtractionError, ReadonlyArray<string>>
			>(
				function accumulateParams(
					accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
					param: Record<string, unknown>,
				): Result<TypeExtractionError, ReadonlyArray<string>> {
					if (accResult._tag === "Error") {
						return accResult
					}

					const pat = param.pat as Record<string, unknown> | undefined

					if (!pat) {
						return accResult // Skip params without pattern
					}

					const name = pat.value as string | undefined

					if (!name) {
						return accResult // Skip params without name
					}

					const typeAnn = param.typeAnnotation as
						| Record<string, unknown>
						| undefined

					if (!typeAnn) {
						return ok([...accResult.value, name])
					}

					const typeResult = _serializeTypeAnnotation(typeAnn.typeAnnotation)

					if (typeResult._tag === "Error") {
						return typeResult
					}

					return ok([...accResult.value, `${name}: ${typeResult.value}`])
				},
			)(ok([] as ReadonlyArray<string>))(params)

			if (paramsResult._tag === "Error") {
				return paramsResult
			}

			const returnTypeResult = _serializeTypeAnnotation(n.typeAnnotation)

			if (returnTypeResult._tag === "Error") {
				return returnTypeResult
			}

			return ok(
				`(${paramsResult.value.join(", ")}) => ${returnTypeResult.value}`,
			)
		},

		TsLiteralType: function serializeLiteralType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const literal = n.literal as Record<string, unknown> | undefined

			if (!literal) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsLiteralType node has no literal",
				)
			}

			const litType = literal.type as string | undefined

			if (isEqual(litType)("StringLiteral")) {
				return ok(`"${literal.value}"`)
			}

			if (isEqual(litType)("NumericLiteral")) {
				return ok(String(literal.value))
			}

			if (isEqual(litType)("BooleanLiteral")) {
				return ok(String(literal.value))
			}

			return ok("unknown")
		},

		TsConditionalType: function serializeConditionalType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const checkTypeResult = _serializeTypeAnnotation(n.checkType)

			if (checkTypeResult._tag === "Error") {
				return checkTypeResult
			}

			const extendsTypeResult = _serializeTypeAnnotation(n.extendsType)

			if (extendsTypeResult._tag === "Error") {
				return extendsTypeResult
			}

			const trueTypeResult = _serializeTypeAnnotation(n.trueType)

			if (trueTypeResult._tag === "Error") {
				return trueTypeResult
			}

			const falseTypeResult = _serializeTypeAnnotation(n.falseType)

			if (falseTypeResult._tag === "Error") {
				return falseTypeResult
			}

			return ok(
				`${checkTypeResult.value} extends ${extendsTypeResult.value} ? ${trueTypeResult.value} : ${falseTypeResult.value}`,
			)
		},

		TsMappedType: function serializeMappedType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const typeParam = n.typeParam as Record<string, unknown> | undefined

			if (!typeParam) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsMappedType node has no typeParam",
				)
			}

			const nameObj = typeParam.name as Record<string, unknown> | undefined

			if (!nameObj) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsMappedType typeParam has no name",
				)
			}

			const name = nameObj.value as string | undefined

			if (!name) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsMappedType typeParam name has no value",
				)
			}

			const constraintResult = typeParam.constraint
				? _serializeTypeAnnotation(typeParam.constraint)
				: ok("unknown")

			if (constraintResult._tag === "Error") {
				return constraintResult
			}

			const typeAnnResult = n.typeAnnotation
				? _serializeTypeAnnotation(n.typeAnnotation)
				: ok("unknown")

			if (typeAnnResult._tag === "Error") {
				return typeAnnResult
			}

			return ok(
				`{ [${name} in ${constraintResult.value}]: ${typeAnnResult.value} }`,
			)
		},

		TsIndexedAccessType: function serializeIndexedAccessType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const objTypeResult = _serializeTypeAnnotation(n.objectType)

			if (objTypeResult._tag === "Error") {
				return objTypeResult
			}

			const indexTypeResult = _serializeTypeAnnotation(n.indexType)

			if (indexTypeResult._tag === "Error") {
				return indexTypeResult
			}

			return ok(`${objTypeResult.value}[${indexTypeResult.value}]`)
		},

		TsTypeQuery: function serializeTypeQuery(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const exprName = n.exprName as Record<string, unknown> | undefined

			if (!exprName) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsTypeQuery node has no exprName",
				)
			}

			const name = exprName.value as string | undefined

			if (!name) {
				return makeTypeError(
					"MalformedTypeMember",
					"TsTypeQuery exprName has no value",
				)
			}

			return ok(`typeof ${name}`)
		},

		TsParenthesizedType: function serializeParenthesizedType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const typeAnnResult = _serializeTypeAnnotation(n.typeAnnotation)

			if (typeAnnResult._tag === "Error") {
				return typeAnnResult
			}

			return ok(`(${typeAnnResult.value})`)
		},

		TsOptionalType: function serializeOptionalType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const typeAnnResult = _serializeTypeAnnotation(n.typeAnnotation)

			if (typeAnnResult._tag === "Error") {
				return typeAnnResult
			}

			return ok(`${typeAnnResult.value}?`)
		},

		TsRestType: function serializeRestType(
			n: Record<string, unknown>,
		): Result<TypeExtractionError, string> {
			const typeAnnResult = _serializeTypeAnnotation(n.typeAnnotation)

			if (typeAnnResult._tag === "Error") {
				return typeAnnResult
			}

			return ok(`...${typeAnnResult.value}`)
		},
	}

	const serializer = serializers[nodeType]

	if (!serializer) {
		return makeTypeError(
			"UnsupportedTypeNode",
			`Unsupported type node: ${nodeType}`,
			nodeType,
		)
	}

	return serializer(nodeObj)
}

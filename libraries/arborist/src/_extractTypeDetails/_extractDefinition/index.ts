import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../../types/errors/index.ts"
import type {
	TsInterfaceDeclaration,
	TsTypeAliasDeclaration,
	TsTypeDeclaration,
	TsTypeElement,
} from "../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import _serializeTypeAnnotation from "../../_serializeTypeAnnotation/index.ts"
import serializeTypeParameters from "../../_serializeTypeParameters/index.ts"
import serializeExtendsClause from "../../_serializeExtendsClause/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _serializeMembers from "./_serializeMembers/index.ts"

//++ Extract type definition by serializing the AST node
//++ Handles both type aliases and interfaces with proper Result composition
//++ Returns curried function: node → isExported → Result
//++
//++ @param node - Type declaration node
//++ @returns Function that takes isExported and returns Result<TypeExtractionError, string>
export default function extractDefinition(node: TsTypeDeclaration) {
	return function extractDefinitionWithExportStatus(
		isExported: boolean,
	): Result<TypeExtractionError, string> {
		// Helper to create TypeExtractionError
		function makeTypeError(
			kind: TypeExtractionError["kind"],
			message: string,
		): Result<TypeExtractionError, string> {
			const baseError = createError("extractTypes")([])(message)(
				"INVALID_ARGUMENT",
			)

			const { context: _unused, ...baseErrorFields } = baseError

			const typeError: TypeExtractionError = {
				...baseErrorFields,
				kind,
			}

			return error(typeError)
		}

		const nodeType = node.type
		const name = node.id.value

		// Build the definition string based on node type
		if (isEqual(nodeType)("TsTypeAliasDeclaration")) {
			// Type narrowing: now TypeScript knows node is TsTypeAliasDeclaration
			const aliasNode = node as TsTypeAliasDeclaration
			const typeAnnotation = aliasNode.typeAnnotation
			const exportPrefix = isExported ? "export " : ""

			// Compose Results for type annotation and type parameters
			const serializedTypeResult = _serializeTypeAnnotation(typeAnnotation)

			if (serializedTypeResult._tag === "Error") {
				return serializedTypeResult
			}

			const typeParamsResult = serializeTypeParameters(aliasNode.typeParams)

			if (typeParamsResult._tag === "Error") {
				return typeParamsResult
			}

			return ok(
				`${exportPrefix}type ${name}${typeParamsResult.value} = ${serializedTypeResult.value}`,
			)
		}

		if (isEqual(nodeType)("TsInterfaceDeclaration")) {
			// Type narrowing: now TypeScript knows node is TsInterfaceDeclaration
			const interfaceNode = node as TsInterfaceDeclaration
			const body = interfaceNode.body
			const members = body.body
			const exportPrefix = isExported ? "export " : ""

			// Compose Results for members, type parameters, and extends clause
			const serializedMembersResult = reduce(_serializeMembers)(ok([]))(
				members as ReadonlyArray<TsTypeElement>,
			)

			if (serializedMembersResult._tag === "Error") {
				return serializedMembersResult
			}

			const serializedMembers = serializedMembersResult.value.join("; ")

			const typeParamsResult = serializeTypeParameters(interfaceNode.typeParams)

			if (typeParamsResult._tag === "Error") {
				return typeParamsResult
			}

			const extendsClauseResult = serializeExtendsClause(interfaceNode.extends)

			if (extendsClauseResult._tag === "Error") {
				return extendsClauseResult
			}

			return ok(
				`${exportPrefix}interface ${name}${typeParamsResult.value}${extendsClauseResult.value} { ${serializedMembers} }`,
			)
		}

		return makeTypeError(
			"UnknownTypeKind",
			`Unknown type node kind: ${nodeType}`,
		)
	}
}

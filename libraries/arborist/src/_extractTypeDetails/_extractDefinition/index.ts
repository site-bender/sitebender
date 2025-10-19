import type { TsTypeDeclaration, TsTypeAliasDeclaration, TsInterfaceDeclaration, TsTypeElement } from "../../types/index.ts"
import _serializeTypeAnnotation from "../../_serializeTypeAnnotation/index.ts"
import serializeTypeParameters from "../../_serializeTypeParameters/index.ts"
import serializeExtendsClause from "../../_serializeExtendsClause/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import _serializeMembers from "./_serializeMembers/index.ts"

//++ Extract type definition by serializing the AST node
//++ This avoids the SWC WASM span offset accumulation bug
export default function extractDefinition(
	node: TsTypeDeclaration,
	isExported: boolean,
): string {
	const nodeType = node.type
	const name = node.id.value

	// Build the definition string based on node type
	if (isEqual(nodeType)("TsTypeAliasDeclaration")) {
		// Type narrowing: now TypeScript knows node is TsTypeAliasDeclaration
		const aliasNode = node as TsTypeAliasDeclaration
		const typeAnnotation = aliasNode.typeAnnotation
		const serializedType = _serializeTypeAnnotation(typeAnnotation)
		const typeParams = serializeTypeParameters(aliasNode.typeParams)
		const exportPrefix = isExported ? "export " : ""

		return `${exportPrefix}type ${name}${typeParams} = ${serializedType}`
	}

	if (isEqual(nodeType)("TsInterfaceDeclaration")) {
		// Type narrowing: now TypeScript knows node is TsInterfaceDeclaration
		const interfaceNode = node as TsInterfaceDeclaration
		const body = interfaceNode.body
		const members = body.body

		const serializedMembersResult = reduce(_serializeMembers)([] as ReadonlyArray<string>)(members as ReadonlyArray<TsTypeElement>)
		const serializedMembersList = getOrElse([] as ReadonlyArray<string>)(serializedMembersResult)
		const serializedMembers = serializedMembersList.join("; ")

		const typeParams = serializeTypeParameters(interfaceNode.typeParams)
		const extendsClause = serializeExtendsClause(interfaceNode.extends)
		const exportPrefix = isExported ? "export " : ""

		return `${exportPrefix}interface ${name}${typeParams}${extendsClause} { ${serializedMembers} }`
	}

	return "unknown"
}

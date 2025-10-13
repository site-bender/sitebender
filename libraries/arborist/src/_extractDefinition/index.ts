import _serializeTypeAnnotation from "../_serializeTypeAnnotation/index.ts"
import serializeTypeParameters from "../_serializeTypeParameters/index.ts"
import serializeExtendsClause from "../_serializeExtendsClause/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import _serializeMember from "./_serializeMember/index.ts"

//++ Extract type definition by serializing the AST node
//++ This avoids the SWC WASM span offset accumulation bug
export default function extractDefinition(
	node: Record<string, unknown>,
	isExported: boolean,
): string {
	const nodeType = node.type as string
	const name = (node.id as Record<string, unknown>).value as string

	// Build the definition string based on node type
	if (isEqual(nodeType)("TsTypeAliasDeclaration")) {
		// Type alias: type Name = Definition
		const typeAnnotation = node.typeAnnotation
		const serializedType = _serializeTypeAnnotation(typeAnnotation)
		const typeParams = serializeTypeParameters(node.typeParams)
		const exportPrefix = isExported ? "export " : ""
		return `${exportPrefix}type ${name}${typeParams} = ${serializedType}`
	}

	if (isEqual(nodeType)("TsInterfaceDeclaration")) {
		// Interface: interface Name { ... }
		const body = node.body as Record<string, unknown>
		const members = body.body as Array<Record<string, unknown>>
		const serializedMembersResult = map(_serializeMember)(members)
		const serializedMembersArray = getOrElse([] as ReadonlyArray<string>)(serializedMembersResult)
		const serializedMembers = serializedMembersArray.filter(Boolean).join("; ")

		const typeParams = serializeTypeParameters(node.typeParams)
		const extendsClause = serializeExtendsClause(node.extends)
		const exportPrefix = isExported ? "export " : ""
		return `${exportPrefix}interface ${name}${typeParams}${extendsClause} { ${serializedMembers} }`
	}

	return "unknown"
}

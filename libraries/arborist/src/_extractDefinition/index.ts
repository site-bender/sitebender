import _serializeTypeAnnotation from "../_serializeTypeAnnotation/index.ts"
import serializeTypeParameters from "../_serializeTypeParameters/index.ts"
import serializeExtendsClause from "../_serializeExtendsClause/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

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
		const serializedMembers = members.map((member) => {
			const memberType = member.type as string
			if (isEqual(memberType)("TsPropertySignature")) {
				const key = member.key as Record<string, unknown>
				const keyName = key.value as string
				const typeAnn = member.typeAnnotation as
					| Record<string, unknown>
					| undefined
				if (typeAnn) {
					const type = _serializeTypeAnnotation(typeAnn.typeAnnotation)
					const optional = member.optional as boolean
					const readonly = member.readonly as boolean
					const readonlyPrefix = readonly ? "readonly " : ""
					return `${readonlyPrefix}${keyName}${optional ? "?" : ""}: ${type}`
				}
				return keyName
			}
			if (isEqual(memberType)("TsMethodSignature")) {
				const key = member.key as Record<string, unknown>
				const keyName = key.value as string
				const params = member.params as Array<Record<string, unknown>>
				const serializedParams = params.map((param) => {
					const pat = param.pat as Record<string, unknown>
					const paramName = pat.value as string
					const typeAnn = param.typeAnnotation as
						| Record<string, unknown>
						| undefined
					if (typeAnn) {
						const type = _serializeTypeAnnotation(typeAnn.typeAnnotation)
						return `${paramName}: ${type}`
					}
					return paramName
				}).join(", ")
				const returnType = member.typeAnnotation
					? _serializeTypeAnnotation(
						(member.typeAnnotation as Record<string, unknown>)
							.typeAnnotation,
					)
					: "void"
				return `${keyName}(${serializedParams}): ${returnType}`
			}
			return ""
		}).filter(Boolean).join("; ")

		const typeParams = serializeTypeParameters(node.typeParams)
		const extendsClause = serializeExtendsClause(node.extends)
		const exportPrefix = isExported ? "export " : ""
		return `${exportPrefix}interface ${name}${typeParams}${extendsClause} { ${serializedMembers} }`
	}

	return "unknown"
}

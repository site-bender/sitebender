import type { ParsedClass, ParsedAst, ClassExtractionError, ClassMember } from "../../types/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"

import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"

import _extractPosition from "../../_extractPosition/index.ts"
import _extractSpan from "../../_extractSpan/index.ts"
import _extractClassMember from "../_extractClassMember/index.ts"

//++ Extracts class details from a class node
//++ Returns Validation to handle extraction errors gracefully
//++ Follows curried function pattern for functional programming
export default function _extractClassDetails(
	ast: ParsedAst,
) {
	return function extractFromNode(
		classNode: Serializable,  // SWC ClassDeclaration
	): Validation<ClassExtractionError, ParsedClass> {
		const nodeObj = classNode as Record<string, Serializable>

		// Check if this is an export wrapper
		const isExportWrapper = isEqual(nodeObj.type)("ExportDeclaration")
		const isDefaultExportWrapper = isEqual(nodeObj.type)("ExportDefaultDeclaration")

		// If wrapped, extract the actual class node
		const actualNode = or(isExportWrapper)(isDefaultExportWrapper)
			? or(nodeObj.declaration)(nodeObj.decl) as Record<string, Serializable>
			: nodeObj

		// Validate node type
		const nodeType = actualNode.type as string
		if (!isEqual(nodeType)("ClassDeclaration") && !isEqual(nodeType)("ClassExpression")) {
			return failure([{
				operation: "extractClasses",
				kind: "UnknownNodeType",
				nodeType,
				span: _extractSpan(actualNode),
			} as ClassExtractionError])
		}

		// Extract class name
		const identifier = actualNode.identifier as
			| Record<string, Serializable>
			| undefined
		const name = or(identifier?.value as string)("anonymous") as string

		// Validate class has a name
		if (isEqual(name)("anonymous")) {
			return failure([{
				operation: "extractClasses",
				kind: "MissingClassName",
				span: _extractSpan(actualNode),
			} as ClassExtractionError])
		}

		// Extract position and span
		const span = _extractSpan(actualNode)
		const position = _extractPosition(span)

		// Detect modifiers
		const isAbstract = or(actualNode.isAbstract as boolean)(false) as boolean

		// Export detection based on wrapper type
		const isExported = or(isExportWrapper)(isDefaultExportWrapper) as boolean
		const isDefault = isDefaultExportWrapper

		// Extract extends clause (parent class)
		const superClass = actualNode.superClass as
			| Record<string, Serializable>
			| undefined
		const extendsName = superClass?.value as string | undefined

		// Extract implements clause (interfaces)
		const implementsClause = actualNode.implements as
			| ReadonlyArray<Record<string, Serializable>>
			| undefined
		const implementsNames = implementsClause
			? implementsClause.map(impl => {
				const expression = impl.expression as Record<string, Serializable>
				return expression?.value as string
			})
			: []

		// Extract all members
		const classBody = actualNode.body as
			| ReadonlyArray<Record<string, Serializable>>
			| undefined
		const memberValidations = classBody
			? classBody.map(_extractClassMember(ast.sourceText))
			: []

		// For now, filter out failures and extract successes
		// This is a temporary solution until proper Validation accumulation is implemented
		const members = memberValidations
			.filter((validation: any) => validation._tag === "Success")
			.map((validation: any) => validation.value) as ReadonlyArray<ClassMember>

		return success({
			name,
			position,
			span,
			isExported,
			isDefault,
			isAbstract,
			extends: extendsName,
			implements: implementsNames,
			members,
		})
	}
}

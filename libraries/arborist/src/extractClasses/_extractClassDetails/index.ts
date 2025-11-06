import type {
	ClassExtractionError,
	ClassMember,
	ParsedAst,
	ParsedClass,
} from "../../types/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"

import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"

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
		classNode: Serializable, // SWC ClassDeclaration
	): Validation<ClassExtractionError, ParsedClass> {
		const nodeObj = classNode as Record<string, Serializable>

		// Check if this is an export wrapper
		const isExportWrapper = isEqual(nodeObj.type)("ExportDeclaration")
		const isDefaultExportWrapper = isEqual(nodeObj.type)(
			"ExportDefaultDeclaration",
		)

		// If wrapped, extract the actual class node
		// ExportDeclaration uses 'declaration', ExportDefaultDeclaration uses 'decl'
		const actualNode = (
			isExportWrapper
				? nodeObj.declaration as Record<string, Serializable>
				: isDefaultExportWrapper
				? nodeObj.decl as Record<string, Serializable>
				: nodeObj
		) as Record<string, Serializable>

		// Validate node type
		const nodeType = actualNode.type as string
		if (
			!isEqual(nodeType)("ClassDeclaration") &&
			!isEqual(nodeType)("ClassExpression")
		) {
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
		const name = (identifier?.value as string | undefined) ?? "anonymous"

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
		const isAbstract = (actualNode.isAbstract as boolean | undefined) ?? false

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
			? map(function extractImplementsName(impl: Serializable): string {
				const implObj = impl as Record<string, Serializable>
				const expression = implObj.expression as Record<string, Serializable>
				return (expression?.value as string | undefined) ?? "unknown"
			})(implementsClause as ReadonlyArray<Serializable>) as ReadonlyArray<
				string
			>
			: [] as ReadonlyArray<string>

		// Extract all members
		const classBody = actualNode.body as
			| ReadonlyArray<Record<string, Serializable>>
			| undefined
		const memberValidations = classBody
			? map(_extractClassMember(ast.sourceText))(
				classBody as ReadonlyArray<Serializable>,
			) as ReadonlyArray<Validation<ClassExtractionError, ClassMember>>
			: [] as ReadonlyArray<Validation<ClassExtractionError, ClassMember>>

		// Filter successful member extractions
		const successfulValidationsResult = filter(isSuccess)(
			memberValidations as ReadonlyArray<Serializable>,
		)
		const successfulValidations = getOrElse(
			[] as ReadonlyArray<Validation<ClassExtractionError, ClassMember>>,
		)(
			successfulValidationsResult,
		) as ReadonlyArray<Validation<ClassExtractionError, ClassMember>>

		// Extract values from successful validations
		const members = map(function extractValue(v: Serializable): ClassMember {
			return (v as Validation<ClassExtractionError, ClassMember>).value
		})(successfulValidations as ReadonlyArray<Serializable>) as ReadonlyArray<
			ClassMember
		>

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

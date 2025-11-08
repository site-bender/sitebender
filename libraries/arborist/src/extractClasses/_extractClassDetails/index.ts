import type {
	ClassExtractionError,
	ClassMember,
	ParsedAst,
	ParsedClass,
} from "../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/result/index.ts"

import createError from "@sitebender/artificer/errors/createError/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

import _extractPosition from "../../_extractPosition/index.ts"
import _extractSpan from "../../_extractSpan/index.ts"
import _extractClassMember from "../_extractClassMember/index.ts"

//++ Extracts class details from a class node
//++ Returns Result for fail-fast error handling
//++ Uses Result from _extractSpan, _extractPosition, and _extractClassMember
//++ Processes members with reduce for fail-fast error propagation
//++ Follows curried function pattern for functional programming
export default function _extractClassDetails(
	ast: ParsedAst,
) {
	return function extractFromNode(
		classNode: unknown,
	): Result<ClassExtractionError, ParsedClass> {
		// Helper to create ClassExtractionError
		function makeClassError(
			kind: ClassExtractionError["kind"],
			message: string,
			nodeType?: string,
		): Result<ClassExtractionError, ParsedClass> {
			const baseError = createError("extractClasses")([])(message)(
				"INVALID_ARGUMENT",
			)
			const { context: _unused, ...baseErrorFields } = baseError
			const classError: ClassExtractionError = {
				...baseErrorFields,
				kind,
				...(nodeType && { nodeType }),
			}
			return error(classError)
		}

		const nodeObj = classNode as Record<string, unknown>

		// Check if this is an export wrapper
		const isExportWrapper = isEqual(nodeObj.type)("ExportDeclaration")
		const isDefaultExportWrapper = isEqual(nodeObj.type)(
			"ExportDefaultDeclaration",
		)

		// If wrapped, extract the actual class node
		// ExportDeclaration uses 'declaration', ExportDefaultDeclaration uses 'decl'
		const actualNode = (
			isExportWrapper
				? nodeObj.declaration as Record<string, unknown>
				: isDefaultExportWrapper
				? nodeObj.decl as Record<string, unknown>
				: nodeObj
		) as Record<string, unknown>

		// Validate node type
		const nodeType = actualNode.type as string
		if (
			!isEqual(nodeType)("ClassDeclaration") &&
			!isEqual(nodeType)("ClassExpression")
		) {
			return makeClassError(
				"UnknownNodeType",
				`Expected ClassDeclaration or ClassExpression, got ${nodeType}`,
				nodeType,
			)
		}

		// Extract class name
		const identifier = actualNode.identifier as
			| Record<string, unknown>
			| undefined
		const name = (identifier?.value as string | undefined) ?? "anonymous"

		// Validate class has a name
		if (isEqual(name)("anonymous")) {
			return makeClassError(
				"MissingClassName",
				"Class declaration must have a name",
			)
		}

		// Extract span with fail-fast error checking
		const spanResult = _extractSpan(actualNode)

		if (spanResult._tag === "Error") {
			return spanResult
		}

		const span = spanResult.value

		// Extract position with fail-fast error checking
		const positionResult = _extractPosition(span)

		if (positionResult._tag === "Error") {
			return positionResult
		}

		const position = positionResult.value

		// Detect modifiers
		const isAbstract = (actualNode.isAbstract as boolean | undefined) ?? false

		// Export detection based on wrapper type
		const isExported = or(isExportWrapper)(isDefaultExportWrapper) as boolean
		const isDefault = isDefaultExportWrapper

		// Extract extends clause (parent class)
		const superClass = actualNode.superClass as
			| Record<string, unknown>
			| undefined
		const extendsName = superClass?.value as string | undefined

		// Extract implements clause (interfaces)
		const implementsClause = actualNode.implements as
			| ReadonlyArray<Record<string, unknown>>
			| undefined
		const implementsNames = implementsClause
			? map(function extractImplementsName(impl: unknown): string {
				const implObj = impl as Record<string, unknown>
				const expression = implObj.expression as Record<string, unknown>
				return (expression?.value as string | undefined) ?? "unknown"
			})(implementsClause as ReadonlyArray<unknown>) as ReadonlyArray<
				string
			>
			: [] as ReadonlyArray<string>

		// Extract all members using reduce with fail-fast error propagation
		const classBody = actualNode.body as
			| ReadonlyArray<unknown>
			| undefined

		if (!classBody) {
			// Empty class body is valid
			return ok({
				name,
				position,
				span,
				isExported,
				isDefault,
				isAbstract,
				extends: extendsName,
				implements: implementsNames,
				members: [],
			})
		}

		// Reducer function for processing members with fail-fast error handling
		function reduceMembers(
			accResult: Result<ClassExtractionError, ReadonlyArray<ClassMember>>,
			memberNode: unknown,
		): Result<ClassExtractionError, ReadonlyArray<ClassMember>> {
			if (accResult._tag === "Error") {
				return accResult
			}

			const memberResult = _extractClassMember(ast.sourceText)(memberNode)

			if (memberResult._tag === "Error") {
				return memberResult
			}

			return ok([...accResult.value, memberResult.value])
		}

		const membersResult = reduce(reduceMembers)(ok([]))(classBody)

		if (membersResult._tag === "Error") {
			return membersResult
		}

		return ok({
			name,
			position,
			span,
			isExported,
			isDefault,
			isAbstract,
			extends: extendsName,
			implements: implementsNames,
			members: membersResult.value,
		})
	}
}

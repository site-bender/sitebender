import type {
	ClassExtractionError,
	ClassMember,
	Parameter,
	Position,
	Span,
} from "../../types/index.ts"
import type { Result } from "@sitebender/toolsmith/types/result/index.ts"

import createError from "@sitebender/artificer/errors/createError/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

import _extractPosition from "../../_extractPosition/index.ts"
import _extractSpan from "../../_extractSpan/index.ts"
import _serializeTypeAnnotation from "../../_serializeTypeAnnotation/index.ts"

//++ Extracts a single class member from a member node
//++ Returns Result for fail-fast error handling on single member
//++ Uses Result from _extractSpan, _extractPosition, _serializeTypeAnnotation
//++ Handles ClassMethod (method/getter/setter), ClassProperty, and Constructor nodes
//++ Follows curried function pattern for functional programming
export default function _extractClassMember(
	_sourceText: string,
) {
	return function extractFromNode(
		memberNode: unknown,
	): Result<ClassExtractionError, ClassMember> {
		function makeClassError(
			kind: ClassExtractionError["kind"],
			message: string,
			nodeType?: string,
			span?: Span,
		): Result<ClassExtractionError, ClassMember> {
			const baseError = createError("extractClasses")([])(message)(
				"INVALID_ARGUMENT",
			)
			const { context: _unused, ...baseErrorFields } = baseError
			const classError: ClassExtractionError = {
				...baseErrorFields,
				kind,
				...(nodeType && { nodeType }),
				...(span && { span }),
			}
			return error(classError)
		}

		const nodeObj = memberNode as Record<string, unknown>

		// Extract span with fail-fast error checking
		const spanResult = _extractSpan(nodeObj)

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

		// Determine node type and delegate to appropriate handler
		const nodeType = nodeObj.type as string

		if (isEqual(nodeType)("ClassMethod")) {
			return extractMethodMember(nodeObj, position, span)
		}

		if (isEqual(nodeType)("ClassProperty")) {
			return extractPropertyMember(nodeObj, position, span)
		}

		if (isEqual(nodeType)("Constructor")) {
			return extractConstructorMember(nodeObj, position, span)
		}

		// Unknown member type - return error
		return makeClassError(
			"InvalidMemberStructure",
			`Unknown member type: ${nodeType}`,
			nodeType,
		)

		//++ Extract ClassMethod member (method/getter/setter)
		function extractMethodMember(
			node: Record<string, unknown>,
			pos: Position,
			sp: Span,
		): Result<ClassExtractionError, ClassMember> {
			const kind = node.kind as string
			const memberType: ClassMember["type"] = isEqual(kind)("getter")
				? "getter"
				: isEqual(kind)("setter")
				? "setter"
				: "method"

			const key = node.key as Record<string, unknown> | undefined

			if (!key) {
				return makeClassError(
					"InvalidMemberStructure",
					"Method has no key",
					nodeType,
				)
			}

			const memberName = key.value as string | undefined

			if (!memberName) {
				return makeClassError(
					"InvalidMemberStructure",
					"Method key has no value",
					nodeType,
				)
			}

			const isStatic = (node.isStatic as boolean | undefined) ?? false
			const isPrivate = node.accessibility === "private"
			const isProtected = node.accessibility === "protected"
			const isAsync = ((node.function as Record<string, unknown>)?.async as
				| boolean
				| undefined) ?? false

			// Extract parameters for setters
			const parameters: ReadonlyArray<Parameter> = isEqual(kind)("setter")
				? extractParameters(node)
				: []

			// Extract return type for methods
			const returnTypeResult = extractReturnType(node)

			if (returnTypeResult._tag === "Error") {
				return returnTypeResult
			}

			return ok({
				type: memberType,
				name: memberName,
				position: pos,
				span: sp,
				isStatic,
				isPrivate,
				isProtected,
				isAsync,
				parameters,
				returnType: returnTypeResult.value,
			})
		}

		//++ Extract ClassProperty member
		function extractPropertyMember(
			node: Record<string, unknown>,
			pos: Position,
			sp: Span,
		): Result<ClassExtractionError, ClassMember> {
			const key = node.key as Record<string, unknown> | undefined

			if (!key) {
				return makeClassError(
					"InvalidMemberStructure",
					"Property has no key",
					nodeType,
				)
			}

			const memberName = key.value as string | undefined

			if (!memberName) {
				return makeClassError(
					"InvalidMemberStructure",
					"Property key has no value",
					nodeType,
				)
			}

			const isStatic = (node.isStatic as boolean | undefined) ?? false
			const isPrivate = node.accessibility === "private"
			const isProtected = node.accessibility === "protected"

			return ok({
				type: "property",
				name: memberName,
				position: pos,
				span: sp,
				isStatic,
				isPrivate,
				isProtected,
				isAsync: false,
				parameters: [],
				returnType: undefined,
			})
		}

		//++ Extract Constructor member
		function extractConstructorMember(
			node: Record<string, unknown>,
			pos: Position,
			sp: Span,
		): Result<ClassExtractionError, ClassMember> {
			const isPrivate = node.accessibility === "private"
			const isProtected = node.accessibility === "protected"

			const parameters = extractParameters(node)

			return ok({
				type: "constructor",
				name: "constructor",
				position: pos,
				span: sp,
				isStatic: false,
				isPrivate,
				isProtected,
				isAsync: false,
				parameters,
				returnType: undefined,
			})
		}

		//++ Extract parameters from method or constructor node
		//++ Uses plain array extraction since parameters are simple
		function extractParameters(
			node: Record<string, unknown>,
		): ReadonlyArray<Parameter> {
			const params = (node.params as ReadonlyArray<unknown> | undefined) ?? []

			function reduceParam(
				acc: ReadonlyArray<Parameter>,
				param: unknown,
			): ReadonlyArray<Parameter> {
				const paramObj = param as Record<string, unknown>
				const pat = paramObj.pat as Record<string, unknown> | undefined
				const paramName = (pat?.value as string | undefined) ?? "unknown"
				const isOptional = (pat?.optional as boolean | undefined) ?? false

				return [
					...acc,
					{
						name: paramName,
						type: "unknown",
						optional: isOptional,
					},
				]
			}

			return reduce(reduceParam)([])(params)
		}

		//++ Extract return type annotation using _serializeTypeAnnotation
		function extractReturnType(
			node: Record<string, unknown>,
		): Result<ClassExtractionError, string | undefined> {
			const returnTypeAnn = node.returnType as
				| Record<string, unknown>
				| undefined

			if (!returnTypeAnn) {
				return ok(undefined)
			}

			const returnTypeAnnotation = returnTypeAnn.typeAnnotation as
				| unknown
				| undefined

			if (!returnTypeAnnotation) {
				return ok(undefined)
			}

			const serializedResult = _serializeTypeAnnotation(returnTypeAnnotation)

			if (serializedResult._tag === "Error") {
				// Convert TypeExtractionError to ClassExtractionError
				const typeError = serializedResult.error
				return makeClassError(
					"InvalidMemberStructure",
					`Invalid return type: ${typeError.message}`,
					nodeType,
					typeError.span,
				)
			}

			return ok(serializedResult.value)
		}
	}
}

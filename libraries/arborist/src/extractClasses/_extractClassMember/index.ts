import type { ClassMember, Parameter, ClassExtractionError } from "../../types/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"

import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"

import _extractPosition from "../../_extractPosition/index.ts"
import _extractSpan from "../../_extractSpan/index.ts"

//++ Extracts a single class member from a member node
//++ Returns Validation to handle extraction errors gracefully
//++ Follows curried function pattern for functional programming
export default function _extractClassMember(
	_sourceText: string,
) {
	return function extractFromNode(
		memberNode: Serializable,  // SWC ClassMember
	): Validation<ClassExtractionError, ClassMember> {
		const nodeObj = memberNode as Record<string, Serializable>

		// Extract position and span
		const span = _extractSpan(nodeObj)
		const position = _extractPosition(span)

		// Determine member type
		const nodeType = nodeObj.type as string
		let memberType: ClassMember["type"]
		let memberName: string
		let isStatic = false
		let isPrivate = false
		let isProtected = false
		let isAsync = false
		let parameters: ReadonlyArray<Parameter> = []
		let returnType: string | undefined

		if (isEqual(nodeType)("ClassMethod")) {
			const kind = nodeObj.kind as string
			if (isEqual(kind)("getter")) {
				memberType = "getter"
			} else if (isEqual(kind)("setter")) {
				memberType = "setter"
			} else {
				memberType = "method"
			}
			const key = nodeObj.key as Record<string, Serializable>
			memberName = or(key?.value as string)("unknown") as string
			isStatic = or(nodeObj.isStatic as boolean)(false) as boolean
			isPrivate = or(nodeObj.accessibility === "private")(false) as boolean
			isProtected = or(nodeObj.accessibility === "protected")(false) as boolean
			isAsync = or((nodeObj.function as Record<string, Serializable>)?.async as boolean)(false) as boolean

			// Extract parameters for setters
			if (isEqual(kind)("setter")) {
				const params = or(nodeObj.params as Array<Serializable>)([])
				const parametersResult = map(
					function mapParameter(param: Serializable): Parameter {
						const paramObj = param as Record<string, Serializable>
						const pat = paramObj.pat as Record<string, Serializable>
						const paramName = or(pat?.value as string)("unknown") as string
						const isOptional = or(pat?.optional as boolean)(false) as boolean
						return {
							name: paramName,
							type: "unknown",
							optional: isOptional,
						}
					},
				)(params as ReadonlyArray<Serializable>)
				parameters = getOrElse([] as ReadonlyArray<Parameter>)(parametersResult)
			}

			// Extract return type
			const returnTypeAnn = nodeObj.returnType as
				| Record<string, Serializable>
				| undefined
			const returnTypeAnnotation = returnTypeAnn?.typeAnnotation as
				| Record<string, Serializable>
				| undefined
			returnType = or(returnTypeAnnotation?.kind as string)(
				returnTypeAnnotation?.type as string
			) as string | undefined

		} else if (isEqual(nodeType)("ClassProperty")) {
			memberType = "property"
			const key = nodeObj.key as Record<string, Serializable>
			memberName = or(key?.value as string)("unknown") as string
			isStatic = or(nodeObj.isStatic as boolean)(false) as boolean
			isPrivate = or(nodeObj.accessibility === "private")(false) as boolean
			isProtected = or(nodeObj.accessibility === "protected")(false) as boolean

		} else if (isEqual(nodeType)("Constructor")) {
			memberType = "constructor"
			memberName = "constructor"
			isPrivate = or(nodeObj.accessibility === "private")(false) as boolean
			isProtected = or(nodeObj.accessibility === "protected")(false) as boolean

			// Extract parameters
			const params = or(nodeObj.params as Array<Serializable>)([])
			const parametersResult = map(
				function mapParameter(param: Serializable): Parameter {
					const paramObj = param as Record<string, Serializable>
					const pat = paramObj.pat as Record<string, Serializable>
					const paramName = or(pat?.value as string)("unknown") as string
					const isOptional = or(pat?.optional as boolean)(false) as boolean
					return {
						name: paramName,
						type: "unknown",
						optional: isOptional,
					}
				},
			)(params as ReadonlyArray<Serializable>)
			parameters = getOrElse([] as ReadonlyArray<Parameter>)(parametersResult)

		} else {
			// Unknown member type - return failure
			return failure([{
				operation: "extractClasses",
				kind: "InvalidMemberStructure",
				nodeType,
				span,
			} as ClassExtractionError])
		}

		return success({
			type: memberType,
			name: memberName,
			position,
			span,
			isStatic,
			isPrivate,
			isProtected,
			isAsync,
			parameters,
			returnType,
		})
	}
}

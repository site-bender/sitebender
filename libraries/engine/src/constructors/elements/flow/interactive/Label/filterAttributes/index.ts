import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import type { LabelElementAttributes } from "../index.ts"

export default function filterAttributes(attributes: LabelElementAttributes) {

	const { id, for: forAttr, form, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("for")(forAttr),
		...filterAttribute(isString)("form")(form),
	}

}

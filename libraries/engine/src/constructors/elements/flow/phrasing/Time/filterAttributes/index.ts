import type { TimeAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { TimeAttributes } from "../index.ts"

export default function filterAttributes(attributes: TimeAttributes) {

	const { id, dateTime, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("dateTime")(dateTime),
	}

}

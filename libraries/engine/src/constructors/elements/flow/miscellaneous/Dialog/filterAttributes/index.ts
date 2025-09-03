import type { DialogAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"

import type {
import type { DialogAttributes } from "../index.ts"

export default function filterAttributes(attributes: DialogAttributes) {

	const { id, open, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("open")(open),
	}

}

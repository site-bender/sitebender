import type { TableColumnAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import type { TableColumnAttributes } from "../index.ts"

export default function filterAttributes(attributes: TableColumnAttributes) {

	const { id, span, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}

}

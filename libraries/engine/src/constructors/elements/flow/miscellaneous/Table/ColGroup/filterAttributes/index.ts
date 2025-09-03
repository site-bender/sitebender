import type { TableColumnGroupAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { TableColumnGroupAttributes } from "../index.ts"

export default function filterAttributes(attributes: TableColumnGroupAttributes) {

	const { id, span, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}

}

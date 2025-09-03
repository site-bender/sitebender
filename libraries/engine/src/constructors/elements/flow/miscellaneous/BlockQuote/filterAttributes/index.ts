import type { BlockQuotationAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { BlockQuotationAttributes } from "../index.ts"

export default function filterAttributes(attributes: BlockQuotationAttributes) {

	const { id, cite, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("cite")(cite),
	}

}

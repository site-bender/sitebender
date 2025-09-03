import type { ImageMapAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { ImageMapAttributes } from "../index.ts"

export default function filterAttributes(attributes: ImageMapAttributes) {

	const { id, name, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("name")(name),
	}

}

import type { TemplateAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { TemplateAttributes } from "../index.ts"

export default function filterAttributes(attributes: TemplateAttributes) {

	const { id, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
	}

}

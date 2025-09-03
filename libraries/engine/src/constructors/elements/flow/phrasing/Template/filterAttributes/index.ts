import type { TemplateAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: TemplateAttributes) {

	const { id, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
	}

}

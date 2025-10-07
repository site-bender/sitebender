import type { TemplateAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: TemplateAttributes) {
	const { id, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
	}
}

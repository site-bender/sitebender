import type { TemplateAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: TemplateAttributes) {
	const { id, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
	}
}

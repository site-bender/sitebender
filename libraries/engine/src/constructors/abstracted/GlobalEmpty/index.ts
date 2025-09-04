import type { Value } from "@sitebender/engine-types/index.ts"
import type {
	ElementAttributes,
	ElementConfig,
} from "@sitebender/engine/constructors/elements/types/index.ts"

import getAriaAttributes from "@sitebender/engine/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined.ts"

const GlobalEmpty = <T extends Record<string, unknown>>(tag = "Hr") =>
(
	attributes: ElementAttributes<T> = {} as ElementAttributes<T>,
): ElementConfig<T> => {
	const {
		aria,
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
		...attrs
	} = attributes
	const { id, ...attribs } = pickGlobalAttributes(attrs)

	return {
		attributes: {
			...getId(id as Value),
			...getAriaAttributes(aria),
			...attribs,
		} as T,
		children: [], // Empty for void elements
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset)
			? { dataset: dataset as Record<string, Value> }
			: {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag,
	}
}

export default GlobalEmpty

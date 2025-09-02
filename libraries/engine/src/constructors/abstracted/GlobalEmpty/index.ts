import type {
	ElementAttributes,
	ElementConfig,
} from "@engineSrc/constructors/elements/types/index.ts"
import type { Value } from "@engineTypes/index.ts"

import getAriaAttributes from "@engineSrc/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined.ts"

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

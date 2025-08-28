import type { ElementAttributes, ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type { Value } from "@adaptiveTypes/index.ts"

import isDefined from "@toolkit/simple/validation/isDefined/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getAriaAttributes from "@adaptiveSrc/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"

const FilteredAllowText =
	<T extends Record<string, unknown>>(tag = "Img") =>
	(filterAttributes: (attrs: T) => T) =>
	(attributes: ElementAttributes<T> = {} as ElementAttributes<T>) =>
	(children: unknown = []): ElementConfig<T> => {
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
		const { id, ...attribs } = filterAttributes(attrs as T)
		const kids = isString(children as Value)
			? [TextNode(children)]
			: Array.isArray(children)
			? children
			: [children]

		return {
			attributes: {
				...getId(id as Value),
				...getAriaAttributes(aria),
				...attribs,
			} as T,
			children: kids,
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset: dataset as Record<string, Value> } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag,
		}
	}

export default FilteredAllowText

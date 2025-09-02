import type {
	ElementAttributes,
	ElementConfig,
} from "@engineSrc/constructors/elements/types/index.ts"
import type { Value } from "@engineTypes/index.ts"

import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getAriaAttributes from "@engineSrc/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

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

export default FilteredAllowText

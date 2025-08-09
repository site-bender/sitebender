import type {
	ElementAttributes,
	ElementConfig,
} from "../../../constructors/elements/types/index.ts"

import isDefined from "../../../../utilities/isDefined/index.ts"
import TextNode from "../../../constructors/elements/TextNode/index.ts"
import getAriaAttributes from "../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../constructors/helpers/getId/index.ts"
import isString from "../../../guards/isString/index.ts"

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
		const kids = isString(children)
			? [TextNode(children)]
			: Array.isArray(children)
			? children
			: [children]

		return {
			attributes: {
				...getId(id),
				...getAriaAttributes(aria),
				...attribs,
			} as T,
			children: kids,
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag,
		}
	}

export default FilteredAllowText

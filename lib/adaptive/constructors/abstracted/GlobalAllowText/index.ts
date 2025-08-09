import type {
	ChildFilter,
	ElementAttributes,
	ElementConfig,
} from "../../../constructors/elements/types/index.ts"

import isDefined from "../../../../utilities/isDefined/index.ts"
import TextNode from "../../../constructors/elements/TextNode/index.ts"
import getAriaAttributes from "../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../constructors/helpers/getId/index.ts"
import isString from "../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../guards/pickGlobalAttributes/index.ts"

const GlobalAllowText =
	<T extends Record<string, unknown>>(tag = "Span") =>
	(filterChildren: ChildFilter = () => true) =>
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
		const { id, ...attribs } = pickGlobalAttributes(attrs)
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
			children: kids.filter(filterChildren),
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

export default GlobalAllowText

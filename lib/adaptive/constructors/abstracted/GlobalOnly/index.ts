import type {
	ChildFilter,
	ElementAttributes,
	ElementConfig,
} from "../../../constructors/elements/types/index.ts"

import filter from "../../../../utilities/array/filter/index.ts"
import isDefined from "../../../../utilities/isDefined/index.ts"
import getAriaAttributes from "../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "../../../guards/pickGlobalAttributes/index.ts"

/**
 * Creates an element constructor that only accepts global attributes
 *
 * @param tag - HTML tag name (defaults to "Span")
 * @returns Curried function: (filterChildren) => (attributes) => (children) => ElementConfig
 */
export const GlobalOnly =
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
		const kids = Array.isArray(children) ? children : [children]

		return {
			tag,
			attributes: {
				...getId(id),
				...attribs,
				...getAriaAttributes(aria),
			} as T,
			children: filter(filterChildren)(kids),
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
		}
	}

export default GlobalOnly

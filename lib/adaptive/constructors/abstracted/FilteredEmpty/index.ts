import type {
	ElementAttributes,
	ElementConfig,
} from "../../../constructors/elements/types/index.ts"

import isDefined from "../../../../utilities/isDefined/index.ts"
import getAriaAttributes from "../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../constructors/helpers/getId/index.ts"

const FilteredEmpty =
	<T extends Record<string, unknown>>(tag = "Img") =>
	(filterAttributes: (attrs: T) => T) =>
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
		const { id, ...attribs } = filterAttributes(attrs as T)

		return {
			attributes: {
				...getId(id),
				...getAriaAttributes(aria),
				...attribs,
			} as T,
			children: [], // Empty for void elements
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

export default FilteredEmpty

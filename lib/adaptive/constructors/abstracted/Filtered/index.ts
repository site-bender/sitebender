import type {
	ElementAttributes,
	ElementConfig,
} from "../../../constructors/elements/types/index.ts"

import isDefined from "../../../../utilities/isDefined/index.ts"
import getAriaAttributes from "../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../constructors/helpers/getId/index.ts"

const Filtered =
	<T extends Record<string, unknown>>(tag = "A") =>
	(filterAttributes: (attrs: T) => T) =>
	(attributes: ElementAttributes<T> = {} as ElementAttributes<T>) =>
	(children: Array<unknown> = []): ElementConfig<T> => {
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
		const kids = Array.isArray(children) ? children : [children]

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

export default Filtered

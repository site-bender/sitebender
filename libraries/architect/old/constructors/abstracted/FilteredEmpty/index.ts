import type { Value } from "@sitebender/architect-types/index.ts"
import type {
	ElementAttributes,
	ElementConfig,
} from "@sitebender/architect/constructors/elements/types/index.ts"

import getAriaAttributes from "@sitebender/architect/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined.ts"

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

export default FilteredEmpty

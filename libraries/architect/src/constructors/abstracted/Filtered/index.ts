import type { Value } from "@sitebender/architect-types/index.ts"
import type {
	ElementAttributes,
	ElementConfig,
} from "@sitebender/architect/constructors/elements/types/index.ts"

import { isValue } from "@sitebender/architect-types/index.ts"
import getAriaAttributes from "@sitebender/architect/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import isDefined from "@sitebender/toolsmith/vanilla/validation/isDefined/index.ts"

const Filtered =
	<T extends Record<string, unknown>>(tag = "A") =>
	(filterAttributes: (attrs: T) => Record<string, unknown>) =>
	(attributes: ElementAttributes<T> = {} as ElementAttributes<T>) =>
	(children: Array<ElementConfig> = []): ElementConfig<T> => {
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

		const datasetOut = typeof dataset === "object" && dataset !== null
			? (Object.fromEntries(
				Object.entries(dataset as Record<string, unknown>).filter((
					[, v],
				) => isValue(v)),
			) as Record<string, Value>)
			: undefined

		return {
			attributes: {
				...getId(id as Value),
				...getAriaAttributes(aria),
				...attribs,
			} as T,
			children: kids,
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(datasetOut) ? { dataset: datasetOut } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag,
		}
	}

export default Filtered

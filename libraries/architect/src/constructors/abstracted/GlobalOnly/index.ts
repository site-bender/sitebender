import type { Value } from "@sitebender/architect-types/index.ts"
import type {
	ChildFilter,
	ElementAttributes,
	ElementConfig,
} from "@sitebender/architect/constructors/elements/types/index.ts"

import { isValue } from "@sitebender/architect-types/index.ts"
import getAriaAttributes from "@sitebender/architect/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"
import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import isDefined from "@sitebender/toolsmith/vanilla/validation/isDefined/index.ts"

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

		const datasetOut = typeof dataset === "object" && dataset !== null
			? (Object.fromEntries(
				Object.entries(dataset as Record<string, unknown>).filter((
					[, v],
				) => isValue(v)),
			) as Record<string, Value>)
			: undefined

		const idAttrs = isValue(id) ? getId(id) : {}

		return {
			tag,
			attributes: {
				...idAttrs,
				...attribs,
				...getAriaAttributes(aria),
			} as T,
			children: filter(filterChildren)(kids),
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(datasetOut) ? { dataset: datasetOut } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
		}
	}

export default GlobalOnly

import type { Value } from "@sitebender/engine-types/index.ts"
import type {
	ChildFilter,
	ElementAttributes,
	ElementConfig,
} from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import getAriaAttributes from "@sitebender/engine/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined.ts"

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
			children: kids.filter(filterChildren),
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

export default GlobalAllowText

import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { NoAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import TextNode from "@sitebender/architect/constructors/elements/TextNode/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type FragmentElementAttributes = NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const Fragment = (attributes: FragmentElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
		// Fragment doesn't have real HTML attributes - it's just a container
		"aria-hidden": _ariaHidden, // Fragment can't be hidden since it doesn't render
	} = attributes

	// Convert string children to TextNode
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children
		: [children]

	return {
		attributes: {}, // Fragment has no HTML attributes since it doesn't render
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Fragment",
	}
}

export default Fragment

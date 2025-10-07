import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { OptionAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import TextNode from "@sitebender/architect/constructors/elements/TextNode/index.ts"
import getId from "@sitebender/architect/constructors/helpers/getId/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type OptionElementAttributes = OptionAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const Option = (attributes: Record<string, Value> = {}) => (label?: string) => {
	const { dataset, display, id, ...attrs } = attributes
	const { ...attribs } = filterAttributes(attrs)

	// Convert string label to TextNode children
	const kids = isString(label) ? [TextNode(label)] : undefined

	return {
		attributes: {
			...getId(id),
			...attribs,
		},
		children: kids,
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		tag: "option",
	}
}

export default Option

// default-only exports

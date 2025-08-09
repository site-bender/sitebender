import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { TextNode } from "../text-node"

export interface OptionElement {
	attributes?: Override<Partial<HTMLOptionElement>, GlobalAttributeOverrides>
	children?: Array<TextNode>
	dataset?: Dataset
	readonly tagName: "OPTION"
}

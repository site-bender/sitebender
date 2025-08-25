import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { TextNode } from "../../text-node/index.ts"

export interface OptionElement {
	attributes?: Override<Partial<HTMLOptionElement>, GlobalAttributeOverrides>
	children?: Array<TextNode>
	dataset?: Dataset
	readonly tagName: "OPTION"
}

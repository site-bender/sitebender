import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { TextNode } from "../text-node"

export interface TitleElement {
	attributes?: Override<Partial<HTMLTitleElement>, GlobalAttributeOverrides>
	children?: Array<TextNode>
	dataset?: Dataset
	readonly tagName: "TITLE"
}

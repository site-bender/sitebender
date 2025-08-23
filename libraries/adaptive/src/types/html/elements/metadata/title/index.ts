import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { TextNode } from "../../text-node/index.ts"

export interface TitleElement {
	attributes?: Override<Partial<HTMLTitleElement>, GlobalAttributeOverrides>
	children?: Array<TextNode>
	dataset?: Dataset
	readonly tagName: "TITLE"
}

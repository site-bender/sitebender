import type {
	Dataset,
	GlobalAttributeOverrides,
	HttpEquiv,
	Override,
} from "../../shared"
import type { TextNode } from "../text-node"

export interface StyleElement {
	attributes?: Override<
		Omit<Partial<HTMLStyleElement>, "type">,
		GlobalAttributeOverrides & {
			charset?: "utf-8"
			httpEquiv?: HttpEquiv
		}
	>
	children?: Array<TextNode>
	dataset?: Dataset
	readonly tagName: "STYLE"
}

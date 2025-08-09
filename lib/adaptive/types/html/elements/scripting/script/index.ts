import type {
	CrossOrigin,
	Dataset,
	FetchPriority,
	GlobalAttributeOverrides,
	Override,
	ReferrerPolicy,
} from "../../shared"
import type { TextNode } from "../text-node"

export interface ScriptElement {
	attributes?: Override<
		Omit<Partial<HTMLScriptElement>, "charset" | "event" | "htmlFor">,
		GlobalAttributeOverrides & {
			crossOrigin?: CrossOrigin
			fetchPriority?: FetchPriority
			referrerPolicy?: ReferrerPolicy
		}
	>
	children?: TextNode
	dataset?: Dataset
	readonly tagName: "SCRIPT"
}

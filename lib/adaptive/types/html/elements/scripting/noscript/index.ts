import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface NoScriptElement {
	attributes?: Override<Partial<HTMLElement>, GlobalAttributeOverrides>
	// TODO: narrow children
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "NOSCRIPT"
}

import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface NoScriptElement {
	attributes?: Override<Partial<HTMLElement>, GlobalAttributeOverrides>
	// TODO(@chasm): narrow children
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "NOSCRIPT"
}

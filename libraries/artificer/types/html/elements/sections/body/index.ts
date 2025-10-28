import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface BodyElement {
	attributes?: Override<
		Omit<
			Partial<HTMLBodyElement>,
			// deprecated
			| "alink"
			| "background"
			| "bgcolor"
			| "bottommargin"
			| "leftmargin"
			| "link"
			| "rightmargin"
			| "text"
			| "topmargin"
			| "vlink"
		>,
		GlobalAttributeOverrides
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "BODY"
}

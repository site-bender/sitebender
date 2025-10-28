import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface TableCaptionElement {
	attributes?: Override<
		Omit<Partial<HTMLTableCaptionElement>, "align">,
		GlobalAttributeOverrides
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "CAPTION"
}

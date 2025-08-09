import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface TableCaptionElement {
	attributes?: Override<
		Omit<Partial<HTMLTableCaptionElement>, "align">,
		GlobalAttributeOverrides
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "CAPTION"
}

import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

export interface BringAttentionElement {
	attributes?: Override<Partial<HTMLElement>, GlobalAttributeOverrides>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "B"
}

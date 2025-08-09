import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"
import type { OptionElement } from "./option"

export interface DataListElement {
	attributes?: Override<
		Partial<HTMLDataListElement>,
		GlobalAttributeOverrides
	>
	children?: Array<PhrasingContent> | Array<OptionElement>
	dataset?: Dataset
	readonly tagName: "DATALIST"
}

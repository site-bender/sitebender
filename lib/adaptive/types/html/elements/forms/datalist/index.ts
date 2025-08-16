import type { PhrasingContent } from "../../categories/phrasing/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { OptionElement } from "../option/index.ts"

export interface DataListElement {
	attributes?: Override<
		Partial<HTMLDataListElement>,
		GlobalAttributeOverrides
	>
	children?: Array<PhrasingContent> | Array<OptionElement>
	dataset?: Dataset
	readonly tagName: "DATALIST"
}

import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface TableDataCellElement {
	attributes?: Override<
		Omit<
			Partial<HTMLTableCellElement>,
			| "abbr"
			| "align"
			| "axis"
			| "bgColor"
			| "ch"
			| "chOff"
			| "height"
			| "scope"
			| "noWrap"
			| "vAlign"
			| "width"
		>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "TD"
}

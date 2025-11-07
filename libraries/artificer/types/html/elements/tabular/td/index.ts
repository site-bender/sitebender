import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

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

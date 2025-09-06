import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { TableRowElement } from "../tr/index.ts"

export interface TableBodyElement {
	attributes?: Override<
		Omit<
			Partial<HTMLTableSectionElement>,
			"align" | "ch" | "chOff" | "vAlign"
		>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<TableRowElement>
	dataset?: Dataset
	readonly tagName: "TBODY"
}

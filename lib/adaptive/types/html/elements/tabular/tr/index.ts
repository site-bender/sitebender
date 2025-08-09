import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { ScriptElement } from "../scripting/script"
import type { TemplateElement } from "../scripting/template"
import type { TableDataCellElement } from "./td"
import type { TableHeaderCellElement } from "./th"

export interface TableRowElement {
	attributes?: Override<
		Omit<
			Partial<HTMLTableRowElement>,
			"align" | "bgColor" | "ch" | "chOff" | "vAlign"
		>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<
		| TableDataCellElement
		| TableHeaderCellElement
		| TemplateElement
		| ScriptElement
	>
	dataset?: Dataset
	readonly tagName: "TR"
}

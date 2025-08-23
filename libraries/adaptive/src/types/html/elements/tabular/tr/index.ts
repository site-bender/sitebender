import type { ScriptElement } from "../../scripting/script/index.ts"
import type { TemplateElement } from "../../scripting/template/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { TableDataCellElement } from "../td/index.ts"
import type { TableHeaderCellElement } from "../th/index.ts"

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

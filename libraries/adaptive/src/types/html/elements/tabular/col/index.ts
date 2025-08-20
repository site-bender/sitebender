import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface TableColumnElement {
	attributes?: Override<
		Omit<
			Partial<HTMLTableColElement>,
			"align" | "ch" | "chOff" | "vAlign" | "width"
		>,
		GlobalAttributeOverrides
	>
	dataset?: Dataset
	readonly tagName: "COL"
}

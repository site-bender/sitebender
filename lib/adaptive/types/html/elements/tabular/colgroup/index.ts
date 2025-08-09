import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { TableColumnElement } from "./col"

export interface TableColumnGroupElementWithSpan {
	attributes?: Override<
		Omit<
			Partial<HTMLTableColElement>,
			"align" | "ch" | "chOff" | "vAlign" | "width"
		>,
		GlobalAttributeOverrides & {
			span: number
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "COLGROUP"
}

export interface TableColumnGroupElementWithoutSpan {
	attributes?: Override<
		Omit<
			Partial<HTMLTableColElement>,
			"align" | "ch" | "chOff" | "span" | "vAlign" | "width"
		>,
		GlobalAttributeOverrides
	>
	children?: Array<TableColumnElement>
	dataset?: Dataset
	readonly tagName: "COLGROUP"
}

export type TableColumnGroupElement =
	| TableColumnGroupElementWithSpan
	| TableColumnGroupElementWithoutSpan

import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { TableCaptionElement } from "../caption/index.ts"
import type { TableColumnGroupElement } from "../colgroup/index.ts"
import type { TableBodyElement } from "../tbody/index.ts"
import type { TableFooterElement } from "../tfoot/index.ts"
import type { TableHeaderElement } from "../thead/index.ts"
import type { TableRowElement } from "../tr/index.ts"

export interface TableElement {
	attributes?: Override<
		Omit<
			Partial<HTMLTableElement>,
			| "align"
			| "bgColor"
			| "border"
			| "cellPadding"
			| "cellSpacing"
			| "frame"
			| "rules"
			| "summary"
			| "width"
		>,
		GlobalAttributeOverrides
	>
	children?:
		| [
			TableCaptionElement,
			...Array<TableColumnGroupElement>,
			TableHeaderElement,
			...(Array<TableBodyElement> | Array<TableRowElement>),
			TableFooterElement,
		]
		| [
			TableCaptionElement,
			...Array<TableColumnGroupElement>,
			TableHeaderElement,
			...(Array<TableBodyElement> | Array<TableRowElement>),
		]
		| [
			TableCaptionElement,
			...Array<TableColumnGroupElement>,
			...(Array<TableBodyElement> | Array<TableRowElement>),
			TableFooterElement,
		]
		| [
			...Array<TableColumnGroupElement>,
			TableHeaderElement,
			...(Array<TableBodyElement> | Array<TableRowElement>),
			TableFooterElement,
		]
		| [
			TableCaptionElement,
			...Array<TableColumnGroupElement>,
			...(Array<TableBodyElement> | Array<TableRowElement>),
		]
		| [
			...Array<TableColumnGroupElement>,
			TableHeaderElement,
			...(Array<TableBodyElement> | Array<TableRowElement>),
		]
		| [
			...Array<TableColumnGroupElement>,
			...(Array<TableBodyElement> | Array<TableRowElement>),
			TableFooterElement,
		]
	dataset?: Dataset
	readonly tagName: "TABLE"
}

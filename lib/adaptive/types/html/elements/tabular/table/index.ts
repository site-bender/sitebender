import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { TableCaptionElement } from "./caption"
import type { TableColumnGroupElement } from "./colgroup"
import type { TableBodyElement } from "./tbody"
import type { TableFooterElement } from "./tfoot"
import type { TableHeaderElement } from "./thead"
import type { TableRowElement } from "./tr"

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

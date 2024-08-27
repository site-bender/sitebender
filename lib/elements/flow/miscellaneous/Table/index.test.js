// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Table from "."
import Caption from "./Caption"
import Col from "./Col"
import ColGroup from "./ColGroup"
import TBody from "./TBody"
import Td from "./Td"
import Th from "./Th"
import THead from "./THead"
import Tr from "./Tr"

test("[Table] (constructors::flow::miscellaneous) returns a blank <table> element with id", () => {
	renderTo(document.body)(Table()())()

	const table = document.body.querySelector("table")

	expect(table?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Table] (constructors::flow::miscellaneous) returns <table> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Table({
			grizmo: "gribbet",
			id: "id",
		})([
			Caption({ id: "caption-id" })([TextNode("Caption")]),
			ColGroup({ id: "colgroup-id" })([
				Col({ id: "col1-id", span: 2 }),
				Col({ id: "col2-id", span: 3 }),
				Col({ id: "col3-id" }),
			]),
			THead({ id: "thead-id" })([
				Tr({ id: "tr1-id" })([Th({ id: "th-id" })([TextNode("Header cell")])]),
			]),
			TBody({ id: "tbody-id" })([
				Tr({ id: "tr2-id" })([Td({ id: "td-id" })([TextNode("Data cell")])]),
			]),
		]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<table id="id">` +
			`<caption id="caption-id">Caption</caption>` +
			`<colgroup id="colgroup-id">` +
			`<col id="col1-id" span="2">` +
			`<col id="col2-id" span="3">` +
			`<col id="col3-id">` +
			`</colgroup>` +
			`<thead id="thead-id">` +
			`<tr id="tr1-id">` +
			`<th id="th-id">Header cell</th>` +
			`</tr>` +
			`</thead>` +
			`<tbody id="tbody-id">` +
			`<tr id="tr2-id">` +
			`<td id="td-id">Data cell</td>` +
			`</tr>` +
			`</tbody>` +
			`</table>`,
	)

	document.body.innerHTML = ""
})

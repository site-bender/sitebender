// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Dl from "."
import Dd from "./Dd"
import Dt from "./Dt"

test("[Dl] (constructors::flow::miscellaneous) returns a blank <dl> element with id", () => {
	renderTo(document.body)(Dl()())()

	const dl = document.body.querySelector("dl")

	expect(dl?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Dl] (constructors::flow::miscellaneous) returns <dl> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Dl({
			grizmo: "gribbet",
			id: "id",
		})([
			Dt({ id: "dt-id" })([TextNode("Description term")]),
			Dd({ id: "dd-id" })([TextNode("Description data")]),
		]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<dl id="id"><dt id="dt-id">Description term</dt><dd id="dd-id">Description data</dd></dl>`,
	)

	document.body.innerHTML = ""
})

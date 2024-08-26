// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Meter from "./"

test("[Meter] (elements::flow::forms) returns a <meter> element", () => {
	render(document.body)(Meter()())()

	const h1 = document.body.querySelector("meter")

	expect(h1?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Meter] (elements::flow::forms) returns a <meter> with supplied children", () => {
	render(document.body)(
		Meter({
			form: "formId",
			grizmo: "gribbet",
			high: 90,
			id: "id",
			low: 10,
			max: 100,
			min: 0,
			optimum: 50,
			value: 75,
		})([TextNode("This is the meter!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<meter id="id" form="formId" high="90" low="10" max="100" min="0" optimum="50" value="75">This is the meter!</meter>',
	)

	document.body.innerHTML = ""
})

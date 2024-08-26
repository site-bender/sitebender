// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Meter from "./"

test("[Meter] (elements::flow::forms) returns a <progress> element", () => {
	render(document.body)(Meter()())()

	const h1 = document.body.querySelector("progress")

	expect(h1?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Meter] (elements::flow::forms) returns a <progress> with supplied children", () => {
	render(document.body)(
		Meter({
			grizmo: "gribbet",
			id: "id",
			max: 100,
			value: 75,
		})([TextNode("This is the progress!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<progress id="id" max="100" value="75">This is the progress!</progress>`,
	)

	document.body.innerHTML = ""
})

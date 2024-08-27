// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Time from "."

test("[Time] (constructors::flow::miscellaneous) returns a blank <time> element with id", () => {
	renderTo(document.body)(Time()())()

	const time = document.body.querySelector("time")

	expect(time?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Time] (constructors::flow::miscellaneous) returns <time> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Time({
			dataset: {
				name: "Bob",
			},
			datetime: "1999-09-09T17:00:00",
			grizmo: "gribbet",
			id: "id",
		})([TextNode("5 o'clock today")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<time id="id" datetime="1999-09-09T17:00:00" data-name="Bob">5 o'clock today</time>`,
	)

	document.body.innerHTML = ""
})

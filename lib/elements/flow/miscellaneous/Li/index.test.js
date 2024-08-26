// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Li from "."

test("[Li] (constructors::flow::heading) returns a blank <li> element", () => {
	render(document.body)(Li()())()

	const li = document.body.querySelector("li")

	expect(li?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Li] (constructors::flow::heading) returns <li> element with supplied attributes and children", () => {
	const content = "List item!"

	render(document.body)(
		Li({
			grizmo: "gribbet",
			id: "id",
			value: 1,
		})([TextNode(content)]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<li id="id" value="1">List item!</li>`,
	)

	document.body.innerHTML = ""
})

// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Details from "."
import Summary from "./Summary"

test("[Details] (constructors::flow::interactive) returns <details> with text content", () => {
	const content = "Checking the content!"

	renderTo(document.body)(Details()(TextNode(content)))()

	const details = document.body.querySelector("details")

	expect(details?.id).toBeDefined()
	expect(details?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[Details] (constructors::flow::interactive) returns <details> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Details({
			grizmo: "gribbet",
			id: "id",
			name: "name",
			open: true,
		})(Summary({ id: "summary" })([TextNode("Bob")])),
	)()

	expect(document.body.innerHTML).toEqual(
		`<details id="id" name="name" open=""><summary id="summary">Bob</summary></details>`,
	)

	document.body.innerHTML = ""
})

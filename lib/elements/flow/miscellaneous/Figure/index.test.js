// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Figure from "."
import FigCaption from "./FigCaption"

test("[Figure] (constructors::flow::miscellaneous) returns a blank <figure> element with id", () => {
	renderTo(document.body)(Figure()())()

	const figure = document.body.querySelector("figure")

	expect(figure?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Figure] (constructors::flow::miscellaneous) returns <figure> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Figure({
			grizmo: "gribbet",
			id: "id",
		})([FigCaption({ id: "figcaption-id" })([TextNode("Figure caption")])]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<figure id="id"><figcaption id="figcaption-id">Figure caption</figcaption></figure>`,
	)

	document.body.innerHTML = ""
})

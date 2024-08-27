// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import NoScript from "."

test("[NoScript] (constructors::flow::metadata) returns <noscript> without attributes or content", () => {
	renderTo(document.body)(NoScript()())()

	const noscript = document.body.querySelector("noscript")

	expect(noscript?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[NoScript] (constructors::flow::metadata) returns <noscript> element with attributes and content", () => {
	renderTo(document.body)(
		NoScript({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Content")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<noscript id="id">Content</noscript>`,
	)

	document.body.innerHTML = ""
})

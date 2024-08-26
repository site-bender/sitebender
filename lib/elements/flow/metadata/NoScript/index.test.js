// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import NoScript from "."

test("[NoScript] (constructors::flow::metadata) returns <noscript> without attributes or content", () => {
	render(document.body)(NoScript()())()

	const noscript = document.body.querySelector("noscript")

	expect(noscript?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[NoScript] (constructors::flow::metadata) returns <noscript> element with attributes and content", () => {
	render(document.body)(
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

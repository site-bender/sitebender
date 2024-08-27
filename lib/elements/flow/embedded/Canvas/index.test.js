// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Canvas from "."

test("[Canvas] (constructors::flow::heading) returns <canvas> when supplied a string", () => {
	const content = "Checking the content!"

	renderTo(document.body)(Canvas()([TextNode(content)]))()

	const canvas = document.body.querySelector("canvas")

	expect(canvas?.id).toBeDefined()
	expect(canvas?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[Canvas] (constructors::flow::heading) returns <canvas> element with supplied attributes and children", () => {
	const content = "Checking the content!"

	renderTo(document.body)(
		Canvas({
			height: 50,
			id: "id",
			width: 100,
		})([TextNode(content)]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<canvas id="id" height="50" width="100">Checking the content!</canvas>`,
	)

	document.body.innerHTML = ""
})

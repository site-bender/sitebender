// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../rendering"
import { BLOCKING } from "../../../rendering/constants"
import TextNode from "../../TextNode"
import Style from "."

test("[Style] (constructors::flow::miscellaneous) returns a blank <style> element with id", () => {
	render(document.body)(Style()())()

	const style = document.body.querySelector("style")

	expect(style?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Style] (constructors::flow::miscellaneous) returns <style> element with supplied attributes and children", () => {
	render(document.body)(
		Style({
			blocking: BLOCKING.render,
			dataset: { name: "Bob" },
			grizmo: "gribbet",
			id: "id",
			media: "all",
			scoped: true,
			title: "title",
		})([TextNode("Some CSS here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<style id="id" blocking="render" media="all" scoped="" ` +
			`title="title" data-name="Bob">Some CSS here</style>`,
	)

	document.body.innerHTML = ""
})
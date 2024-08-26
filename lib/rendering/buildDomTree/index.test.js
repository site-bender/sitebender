// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import Div from "../../elements/flow/miscellaneous/Div"
import Fragment from "../../elements/Fragment"
import TextNode from "../../elements/TextNode"
import AsMonetaryAmount from "../../format/constructors/AsMonetaryAmount"
import Constant from "../../injectors/constructors/Constant"
import FromElement from "../../injectors/constructors/FromElement"
import Add from "../../operations/operators/constructors/Add"
import buildDomTree from "./"

const dom = new JSDOM(`<!DOCTYPE html>`)

globalThis.document = dom.window.document

test("[buildDomTree] (rendering) builds the DOM tree and appends to the parent element", () => {
	const config = Div({ id: "div" })([
		Fragment()([
			TextNode("Hey, there!"),
			TextNode("Hi, there!"),
			TextNode("Ho, there!"),
		]),
	])

	buildDomTree(document.body)(config)()

	expect(document.body.innerHTML.trim()).toEqual(
		`<div id="div">Hey, there!Hi, there!Ho, there!</div>`,
	)

	document.body.innerHTML = ""
})

test("[buildDomTree] (rendering) builds the DOM tree and appends to the parent element", () => {
	const config = Div({
		calculation: Add()([Constant()(0.01), FromElement()({ id: "div" })]),
		format: AsMonetaryAmount("en-US")()(FromElement()({ id: "div" })),
		id: "div",
	})([TextNode("9999999.99")])

	buildDomTree(document.body)(config)()

	const div = document.querySelector("#div")

	expect(div.dataset.calculation).toBeDefined()
	expect(div.dataset.format).toBeDefined()

	document.body.innerHTML = ""
})

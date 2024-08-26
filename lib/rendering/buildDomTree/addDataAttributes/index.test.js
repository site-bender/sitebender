// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import addDataAttributes from "./"

const dom = new JSDOM(`<!DOCTYPE html>
<div id="test"></div>`)

globalThis.document = dom.window.document

test("[addDataAttributes] (rendering::buildDomTree) adds data- attributes to element", () => {
	const elem = document.querySelector("#test")

	addDataAttributes(elem)({
		name: "Bob",
		age: 42,
		isGuru: true,
	})

	expect(document.body.innerHTML).toEqual(
		`<div id="test" data-name="Bob" data-age="42" data-isguru=""></div>`,
	)

	document.body.innerHTML = `<div id="test"></div>`
})

test("[addDataAttributes] (rendering::buildDomTree) leaves element unchanged on no dataset", () => {
	const elem = document.querySelector("#test")

	addDataAttributes(elem)()

	expect(document.body.innerHTML).toEqual(`<div id="test"></div>`)

	document.body.innerHTML = `<div id="test"></div>`
})

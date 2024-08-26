// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test, vi } from "vitest"

import runFormatters from "./"

const dom = new JSDOM(`<!DOCTYPE html>
<div id="test"></div>
<div id="one"></div>
<div id="two"></div>
<div id="three"></div>`)

globalThis.document = dom.window.document

test("[runFormatters] (rendering) runs all formatters", async () => {
	const one = document.querySelector("#one")
	const two = document.querySelector("#two")
	const three = document.querySelector("#three")

	one.__sbFormat = vi.fn()
	two.__sbFormat = vi.fn()
	three.__sbFormat = vi.fn()

	document.__sbFormatted = { "#test": ["one", "two", "three"] }

	await runFormatters()

	expect(one.__sbFormat).toHaveBeenCalled()
	expect(two.__sbFormat).toHaveBeenCalled()
	expect(three.__sbFormat).toHaveBeenCalled()
})

test("[runFormatters] (rendering) ignores lack of formatters", async () => {
	document.__sbFormatted = undefined

	await runFormatters() // Does not crash
})

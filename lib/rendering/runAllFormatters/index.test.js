// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test, vi } from "vitest"

import runAllFormatters from "./"

const dom = new JSDOM(`<!DOCTYPE html>
<div id="one"></div>
<div id="two"></div>
<div id="three"></div>`)

globalThis.document = dom.window.document

test("[runAllFormatters] (rendering) calls all the formatters", async () => {
	const one = document.querySelector("#one")
	const two = document.querySelector("#two")
	const three = document.querySelector("#three")

	one.__sbFormat = vi.fn()
	two.__sbFormat = vi.fn()
	three.__sbFormat = vi.fn()

	document.__sbFormatters = ["one", "two", "three"]

	await runAllFormatters()

	expect(one.__sbFormat).toHaveBeenCalled()
	expect(two.__sbFormat).toHaveBeenCalled()
	expect(three.__sbFormat).toHaveBeenCalled()
})

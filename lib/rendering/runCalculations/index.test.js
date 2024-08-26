// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test, vi } from "vitest"

import runCalculations from "./"

const dom = new JSDOM(`<!DOCTYPE html>
<div id="test"></div>
<div id="one"></div>
<div id="two"></div>
<div id="three"></div>`)

globalThis.document = dom.window.document

test("[runCalculations] (rendering) runs all calculations", async () => {
	const one = document.querySelector("#one")
	const two = document.querySelector("#two")
	const three = document.querySelector("#three")

	one.__sbCalculate = vi.fn()
	two.__sbCalculate = vi.fn()
	three.__sbCalculate = vi.fn()

	document.__sbCalculations = { "#test": ["one", "two", "three"] }

	await runCalculations()

	expect(one.__sbCalculate).toHaveBeenCalled()
	expect(two.__sbCalculate).toHaveBeenCalled()
	expect(three.__sbCalculate).toHaveBeenCalled()
})

test("[runCalculations] (rendering) ignores lack of calculations", async () => {
	document.__sbCalculations = undefined

	await runCalculations() // Does not crash
})

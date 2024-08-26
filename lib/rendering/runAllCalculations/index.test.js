// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test, vi } from "vitest"

import runAllCalculations from "./"

const dom = new JSDOM(`<!DOCTYPE html>
	<div id="div1"></div>
	<div id="div2"></div>
	<div id="div3"></div>
`)

const f1 = vi.fn()
const f2 = vi.fn()
const f3 = vi.fn()

globalThis.document = dom.window.document

document.querySelector("#div1").__sbCalculate = f1
document.querySelector("#div2").__sbCalculate = f2
document.querySelector("#div3").__sbCalculate = f3

document.__sbCalculators = new Set()
document.__sbCalculators.add("div1")
document.__sbCalculators.add("div2")
document.__sbCalculators.add("div3")

test("[runAllCalculations] (rendering) works", () => {
	runAllCalculations()

	expect(f1).toHaveBeenCalled()
	expect(f2).toHaveBeenCalled()
	expect(f3).toHaveBeenCalled()
})

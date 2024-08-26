import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getFromInnerHtml from "./"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<div id="test">42</div>
	<span id="rest">Bob</span>
	<p id="nada"></p>`,
)

const document = dom.window.document

test("[getFromInnerHtml] (utilities::getValue) returns the value from the checkbox if checked or undefined if unchecked", () => {
	const test = document.querySelector("#test")
	const rest = document.querySelector("#rest")
	const nada = document.querySelector("#nada")

	expect(getFromInnerHtml(test)).toEqual("42")
	expect(getFromInnerHtml(rest)).toEqual("Bob")
	expect(getFromInnerHtml(nada)).toEqual("")
	expect(getFromInnerHtml()).toBeUndefined()
})

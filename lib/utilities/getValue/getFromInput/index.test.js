import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getFromInput from "."

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="text" type="text" value="text">
	<input name="number" type="text" value="number">
	<input name="tel" type="text" value="tel">
	<input name="empty" type="text">
`,
)

globalThis.document = dom.window.document

test(`returns the value from the input or "" no value`, () => {
	const text = document.querySelector("[name=text]")
	const number = document.querySelector("[name=number]")
	const tel = document.querySelector("[name=tel]")
	const empty = document.querySelector("[name=empty]")

	expect(getFromInput(text)).toStrictEqual("text")
	expect(getFromInput(number)).toStrictEqual("number")
	expect(getFromInput(tel)).toStrictEqual("tel")
	expect(getFromInput(empty)).toStrictEqual("")
})

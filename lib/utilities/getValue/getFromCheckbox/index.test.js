import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getFromCheckbox from "./"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input checked name="checkbox" type="checkbox" value="checked">
	<input name="uncheckbox" type="checkbox" value="unchecked">
`,
)

globalThis.document = dom.window.document

test("returns the value from the checkbox if checked or undefined if unchecked", () => {
	const checkbox = document.querySelector("[name=checkbox]")
	const uncheckbox = document.querySelector("[name=uncheckbox]")

	expect(getFromCheckbox(checkbox)).toStrictEqual("checked")
	expect(getFromCheckbox(uncheckbox)).toBe(false)
})

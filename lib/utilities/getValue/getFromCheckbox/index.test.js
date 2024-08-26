import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getFromCheckbox from "./"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input checked name="true" type="checkbox" value="true">
	<input checked name="yes" type="checkbox" value="yes">
	<input checked name="checkbox" type="checkbox" value="checked">
	<input name="uncheckbox" type="checkbox" value="unchecked">
`,
)

const document = dom.window.document

test("[getFromCheckbox] (utilities::getValue) returns the value from the checkbox if checked or undefined if unchecked", () => {
	const truebox = document.querySelector("[name=true]")
	const yesbox = document.querySelector("[name=yes]")
	const checkbox = document.querySelector("[name=checkbox]")
	const uncheckbox = document.querySelector("[name=uncheckbox]")

	expect(getFromCheckbox(truebox)).toBe(true)
	expect(getFromCheckbox(yesbox)).toBe(true)
	expect(getFromCheckbox(checkbox)).toStrictEqual("checked")
	expect(getFromCheckbox(uncheckbox)).toBe(false)
})

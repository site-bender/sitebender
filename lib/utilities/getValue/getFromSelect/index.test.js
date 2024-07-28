import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getFromSelect from "./"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<select name="unselected">
		<option></option>
		<option>height</option>
		<option>width</option>
		<option>depth</option>
	</select>
	<select name="select">
		<option>1</option>
		<option selected>2</option>
		<option>3</option>
	</select>
	<select name="multiselect" multiple="multiple">
		<option>cyan</option>
		<option>magenta</option>
		<option selected>yellow</option>
		<option selected>black</option>
	</select>
`,
)

globalThis.document = dom.window.document

test(`returns the selected value from the select or "" if nothing selected`, () => {
	const unselected = document.querySelector("[name=unselected]")
	const select = document.querySelector("[name=select]")
	const multiselect = document.querySelector("[name=multiselect]")

	expect(getFromSelect(unselected)()).toStrictEqual("")
	expect(getFromSelect(select)()).toStrictEqual("2")
	expect(getFromSelect(multiselect)()).toStrictEqual("yellow")
})

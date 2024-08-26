import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getFromDataset from "./"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<div id="test" data-value="42"></div>
	<div id="blah"></div>`,
)

const document = dom.window.document

test("[getFromDataset] (utilities::getValue) returns the value from the checkbox if checked or undefined if unchecked", () => {
	const test = document.querySelector("#test")
	const blah = document.querySelector("#blah")

	expect(getFromDataset(test)).toEqual("42")
	expect(getFromDataset(blah)).toBeUndefined()
	expect(getFromDataset()).toBeUndefined()
})

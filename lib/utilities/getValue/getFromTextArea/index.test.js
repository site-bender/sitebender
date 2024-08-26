import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getFromTextArea from "./"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<textarea name="textarea">textarea</textarea>
	<textarea name="zero">0</textarea>
	<textarea name="empty"></textarea>
`,
)

const document = dom.window.document

test(`[getFromTextArea] (utilities::getValue) returns the value from the textarea or "" if empty`, () => {
	const textarea = document.querySelector("[name=textarea]")
	const zero = document.querySelector("[name=zero]")
	const empty = document.querySelector("[name=empty]")

	expect(getFromTextArea(textarea)).toStrictEqual("textarea")
	expect(getFromTextArea(zero)).toStrictEqual("0")
	expect(getFromTextArea(empty)).toStrictEqual("")
})

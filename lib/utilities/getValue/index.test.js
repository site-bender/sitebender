import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getValue from "./"

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="text" type="text" value="value">
	<input name="nope" type="text" value="">
	<input checked name="checkbox" type="checkbox" value="checked">
	<input name="uncheckbox" type="checkbox" value="unchecked">
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
	<textarea name="textarea">textarea</textarea>
	<textarea name="zero">0</textarea>
	<textarea name="empty"></textarea>
	<button name="button">Hi!</button>
`,
)

globalThis.document = dom.window.document

test("gets the value from form inputs", () => {
	expect(
		getValue({
			source: { name: "text", tagName: "input" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "value",
	})

	expect(
		getValue({
			source: { name: "nope", tagName: "input" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "",
	})

	expect(getValue({ name: "bob", tag: "FromElement" })).toMatchObject({
		left: [
			{
				message: "Must provide a selector by which to select element.",
				operation: {
					name: "bob",
					tag: "FromElement",
				},
				tag: "Error",
				type: "FromElement",
			},
		],
	})
})

test("gets the value from checkboxes", () => {
	expect(
		getValue({
			source: { name: "checkbox", tagName: "input" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "checked",
	})

	expect(
		getValue({
			source: { name: "uncheckbox", tagName: "input" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: false,
	})
})

test("gets the value from selects", () => {
	expect(
		getValue({
			source: { name: "unselected", tagName: "select" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "",
	})

	expect(
		getValue({
			source: { name: "select", tagName: "select" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "2",
	})

	expect(
		getValue({
			source: { name: "multiselect", tagName: "select" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "yellow",
	})
})

test("gets the value from textareas", () => {
	expect(
		getValue({
			source: { name: "textarea", tagName: "textarea" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "textarea",
	})

	expect(
		getValue({
			source: { name: "zero", tagName: "textarea" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "0",
	})

	expect(
		getValue({
			source: { name: "empty", tagName: "textarea" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		right: "",
	})
})

test("returns a Left<Array<Errors>> on bad selector", () => {
	expect(
		getValue({
			source: { name: "button", tagName: "OUTPUT" },
			tag: "FromElement",
		}),
	).toStrictEqual({
		left: [
			{
				message: "Element at `OUTPUT[name=button]` not found.",
				operation: {
					source: {
						name: "button",
						tagName: "OUTPUT",
					},
					tag: "FromElement",
				},
				tag: "Error",
				type: "FromElement",
			},
		],
	})
})

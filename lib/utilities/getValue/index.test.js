import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import getValue from "./"

const table = [
	[0, 0, 0],
	[50000, 350, 175],
	[100000, 350, 175],
	[250000, 350, 250],
	[300000, 350, 250],
	[500000, 500, 350],
	[750000, 500, 450],
	[1000000, 750, 600],
]

const dom = new JSDOM(
	`<!DOCTYPE html>
	<input name="text" type="text" value="value">
	<input name="nope" type="text" value="">
	<input checked name="checkbox" type="checkbox" value="checked">
	<input name="uncheckbox" type="checkbox" value="unchecked">
	<input name="inputName" value="31">
	<data data-type="String" id="dataId" value="Yo"></data>
	<mark data-type="String" data-value="Ho" id="markId">Hi</mark>
	<input type="hidden"
		class="lookup-table"
		id="lookupTableId"
		name="lookupTableName"
		value="${JSON.stringify(table)}"
		data-type="Json"
	>
	<table type="hidden"
		class="lookup-table"
		id="tableId"
		data-value="${JSON.stringify(table)}"
		data-type="Json"
	></table>
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

test("[getValue] (utilities) returns Right(value) from form inputs", () => {
	expect(
		getValue({
			source: { name: "text", tag: "input" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "value",
	})

	expect(
		getValue({
			source: { name: "nope", tag: "input" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "",
	})

	expect(getValue({ name: "bob", tag: "FromElement" })()).toMatchObject({
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

test("[getValue] (utilities) returns Right(value) from checkboxes", () => {
	expect(
		getValue({
			source: { name: "checkbox", tag: "input" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "checked",
	})

	expect(
		getValue({
			source: { name: "uncheckbox", tag: "input" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: false,
	})
})

test("[getValue] (utilities) returns Right(value) from data element", () => {
	expect(
		getValue({
			source: { id: "dataId", tag: "data" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "Yo",
	})
})

test("[getValue] (utilities) returns Right(value) from dataset", () => {
	expect(
		getValue({
			source: { id: "markId", tag: "mark" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "Ho",
	})
})

test("[getValue] (utilities) returns Right(value) from lookup", () => {
	expect(
		getValue({
			source: { name: "lookupTableName", tag: "input" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right:
			"[[0,0,0],[50000,350,175],[100000,350,175],[250000,350,250],[300000,350,250],[500000,500,350],[750000,500,450],[1000000,750,600]]",
	})
})

test("[getValue] (utilities) returns Right(value) from lookup table", () => {
	expect(
		getValue({
			source: { id: "tableId", tag: "table" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right:
			"[[0,0,0],[50000,350,175],[100000,350,175],[250000,350,250],[300000,350,250],[500000,500,350],[750000,500,450],[1000000,750,600]]",
	})
})

test("[getValue] (utilities) returns Right(value) from selects", () => {
	expect(
		getValue({
			source: { name: "unselected", tag: "select" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "",
	})

	expect(
		getValue({
			source: { name: "select", tag: "select" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "2",
	})

	expect(
		getValue({
			source: { name: "multiselect", tag: "select" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "yellow",
	})
})

test("[getValue] (utilities) returns Right(value) from textareas", () => {
	expect(
		getValue({
			source: { name: "textarea", tag: "textarea" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "textarea",
	})

	expect(
		getValue({
			source: { name: "zero", tag: "textarea" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "0",
	})

	expect(
		getValue({
			source: { name: "empty", tag: "textarea" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		right: "",
	})
})

test("[getValue] (utilities) returns a Left(Array(Errors)) on bad selector", () => {
	expect(
		getValue({
			source: { name: "button", tag: "OUTPUT" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		left: [
			{
				message: "Element at `output[name=button]` not found.",
				operation: {
					source: {
						name: "button",
						tag: "OUTPUT",
					},
					tag: "FromElement",
				},
				tag: "Error",
				type: "FromElement",
			},
		],
	})
})

test("[getValue] (utilities) returns a Left(Array(Errors)) when element not found", () => {
	const doc = globalThis.document
	globalThis.document = null

	expect(
		getValue({
			source: { name: "grizmo", tag: "wbr" },
			tag: "FromElement",
		})(),
	).toStrictEqual({
		left: [
			{
				tag: "Error",
				message: "Cannot find window.document.",
				operation: {
					source: {
						name: "grizmo",
						tag: "wbr",
					},
					tag: "FromElement",
				},
				type: "FromElement",
			},
		],
	})

	globalThis.document = doc
})

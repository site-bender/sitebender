// @vitest-environment jsdom
import { expect, test } from "vitest"

import render from "../../../rendering"
import StringField from "."

const stringField = StringField({
	label: "Name",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "String" },
	name: "name",
	tabIndex: -1,
})

test("[StringField] (components::FormField) returns correct config object", () => {
	expect(stringField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "form-field string-field",
		},
		children: [
			{
				attributes: {
					id: "id-label",
					for: "id",
				},
				children: [
					{
						content: "Name",
						tag: "TextNode",
					},
				],
				tag: "Label",
			},
			{
				attributes: {
					id: "id",
					name: "name",
					tabIndex: -1,
					type: "text",
				},
				dataset: {
					type: "String",
				},
				tag: "Input",
			},
			{
				attributes: {
					id: "id-help",
					class: "help-box",
				},
				children: [
					{
						content: "Help!",
						tag: "TextNode",
					},
				],
				tag: "Output",
			},
		],
		tag: "Div",
	})
})

test("[StringField] (components::FormField) renders properly", () => {
	render(document.body)(stringField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<div id="id-wrapper" class="form-field string-field">` +
			`<label id="id-label" for="id">Name</label>` +
			`<input id="id" tabindex="-1" name="name" type="text" data-type="String">` +
			`<output id="id-help" class="help-box">Help!</output>` +
			`</div>`,
	)
})

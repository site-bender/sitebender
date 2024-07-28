// @vitest-environment jsdom
import { expect, test } from "vitest"

import render from "../../../rendering"
import TextField from "."

const textField = TextField({
	label: "Bio",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "String" },
	name: "bio",
	tabIndex: -1,
})

test("[TextField] (components:FormField) returns correct config object", () => {
	expect(textField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "form-field text-field",
		},
		children: [
			{
				attributes: {
					id: "id-label",
					for: "id",
				},
				children: [
					{
						content: "Bio",
						tag: "TextNode",
					},
				],
				tag: "Label",
			},
			{
				attributes: {
					id: "id",
					name: "bio",
					tabIndex: -1,
				},
				dataset: {
					type: "String",
				},
				tag: "TextArea",
			},
			// {
			// 	attributes: {
			// 		id: "id-help",
			// 		class: "help-box",
			// 	},
			// 	children: [
			// 		{
			// 			content: "Help!",
			// 			tag: "TextNode",
			// 		},
			// 	],
			// 	tag: "Output",
			// },
		],
		tag: "Div",
	})
})

test("[TextField] (components:FormField) renders properly", () => {
	render(document.body)(textField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<div id="id-wrapper" class="form-field text-field">` +
			`<label id="id-label" for="id">Bio</label>` +
			`<textarea id="id" tabindex="-1" name="bio" data-type="String"></textarea>` +
			`</div>`,
	)
})

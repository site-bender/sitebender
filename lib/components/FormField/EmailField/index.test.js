// @vitest-environment jsdom
import { expect, test } from "vitest"

import renderTo from "../../../rendering/renderTo"
import EmailField from "."

const emailField = EmailField({
	label: "Email",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "String" },
	name: "email",
	tabIndex: -1,
})

test("[EmailField] (components::FormField) returns correct config object", () => {
	expect(emailField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "form-field email-field",
		},
		children: [
			{
				attributes: {
					id: "id-label",
					for: "id",
				},
				children: [
					{
						content: "Email",
						tag: "TextNode",
					},
				],
				tag: "Label",
			},
			{
				attributes: {
					id: "id",
					name: "email",
					tabIndex: -1,
					type: "email",
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

test("[EmailField] (components::FormField) renders properly", () => {
	renderTo(document.body)(emailField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<div id="id-wrapper" class="form-field email-field">` +
			`<label id="id-label" for="id">Email</label>` +
			`<input id="id" tabindex="-1" name="email" inputmode="email" type="email" data-type="String">` +
			`<output id="id-help" class="help-box">Help!</output>` +
			`</div>`,
	)
})

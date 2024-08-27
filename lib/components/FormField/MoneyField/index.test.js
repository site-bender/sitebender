// @vitest-environment jsdom
import { expect, test } from "vitest"

import renderTo from "../../../rendering/renderTo"
import MoneyField from "."

const moneyField = MoneyField({
	label: "Money",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "String" },
	name: "money",
	tabIndex: -1,
})

test("[MoneyField] (components::FormField) returns correct config object", () => {
	expect(moneyField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "form-field money-field",
		},
		children: [
			{
				attributes: {
					id: "id-label",
					for: "id",
				},
				children: [
					{
						content: "Money",
						tag: "TextNode",
					},
				],
				tag: "Label",
			},
			{
				attributes: {
					id: "id",
					name: "money",
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

test("[MoneyField] (components::FormField) renders properly", () => {
	renderTo(document.body)(moneyField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<div id="id-wrapper" class="form-field money-field">` +
			`<label id="id-label" for="id">Money</label>` +
			`<input id="id" tabindex="-1" name="money" type="text" data-type="String">` +
			`<output id="id-help" class="help-box">Help!</output>` +
			`</div>`,
	)
})

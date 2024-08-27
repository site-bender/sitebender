// @vitest-environment jsdom
import { expect, test } from "vitest"

import renderTo from "../../../rendering/renderTo"
import TabularNumberField from "."

const tabularNumberField = TabularNumberField({
	label: "Is it true?",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "Number" },
	name: "isItTrue",
	tabIndex: -1,
	value: 3.1415,
})

test("[TabularNumberField] (components::TabularFormField) returns correct config object", () => {
	expect(tabularNumberField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "tabular-form-field number-field",
		},
		children: [
			{
				attributes: {
					id: "id-label-cell",
				},
				children: [
					{
						attributes: {
							id: "id-label",
							for: "id",
						},
						children: [
							{
								content: "Is it true?",
								tag: "TextNode",
							},
						],
						dataset: {
							help: "Help!",
						},
						tag: "Label",
					},
				],
				tag: "Th",
			},
			{
				attributes: {
					id: "id-data-cell",
				},
				children: [
					{
						attributes: {
							id: "id",
							tabIndex: -1,
							name: "isItTrue",
							value: 3.1415,
							type: "number",
						},
						dataset: {
							type: "Number",
						},
						tag: "Input",
					},
				],
				tag: "Td",
			},
		],
		tag: "Tr",
	})
})

test("[TabularNumberField] (components::FormField) renders properly", () => {
	renderTo(document.body)(tabularNumberField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<tr id="id-wrapper" class="tabular-form-field number-field">` +
			`<th id="id-label-cell">` +
			`<label id="id-label" for="id" data-help="Help!">Is it true?</label>` +
			`</th>` +
			`<td id="id-data-cell">` +
			`<input id="id" tabindex="-1" name="isItTrue" step="any" value="3.1415" ` +
			`inputmode="decimal" type="number" data-type="Number">` +
			`</td>` +
			`</tr>`,
	)
})

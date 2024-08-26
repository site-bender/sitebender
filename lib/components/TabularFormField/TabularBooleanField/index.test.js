// @vitest-environment jsdom
import { expect, test } from "vitest"

import render from "../../../rendering"
import TabularBooleanField from "."

const tabularBooleanField = TabularBooleanField({
	label: "Is it true?",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "Boolean" },
	name: "isItTrue",
	tabIndex: -1,
	value: "yes",
})

test("[TabularBooleanField] (components::TabularFormField) returns correct config object", () => {
	expect(tabularBooleanField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "tabular-form-field boolean-field",
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
							value: "true",
							type: "checkbox",
						},
						dataset: {
							type: "Boolean",
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

test("[TabularBooleanField] (components::FormField) renders properly", () => {
	render(document.body)(tabularBooleanField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<tr id="id-wrapper" class="tabular-form-field boolean-field">` +
			`<th id="id-label-cell">` +
			`<label id="id-label" for="id" data-help="Help!">Is it true?</label>` +
			`</th>` +
			`<td id="id-data-cell">` +
			`<input id="id" tabindex="-1" name="isItTrue" value="true" type="checkbox" data-type="Boolean">` +
			`</td>` +
			`</tr>`,
	)
})

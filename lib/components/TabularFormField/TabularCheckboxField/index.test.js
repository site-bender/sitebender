// @vitest-environment jsdom
import { expect, test } from "vitest"

import renderTo from "../../../rendering/renderTo"
import TabularCheckboxField from "."

const tabularCheckboxField = TabularCheckboxField({
	label: "Is it true?",
})({
	id: "id",
	dataset: { type: "Boolean" },
	name: "isItTrue",
	tabIndex: -1,
	value: "yes",
})

test("[TabularCheckboxField] (components::TabularFormField) returns correct config object", () => {
	expect(tabularCheckboxField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "tabular-form-field checkbox-field",
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
						dataset: {},
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
							value: "yes",
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

test("[TabularCheckboxField] (components::FormField) renders properly", () => {
	renderTo(document.body)(tabularCheckboxField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<tr id="id-wrapper" class="tabular-form-field checkbox-field">` +
			`<th id="id-label-cell">` +
			`<label id="id-label" for="id">Is it true?</label>` +
			`</th>` +
			`<td id="id-data-cell">` +
			`<input id="id" tabindex="-1" name="isItTrue" value="yes" type="checkbox" data-type="Boolean">` +
			`</td>` +
			`</tr>`,
	)
})

// @vitest-environment jsdom
import { expect, test } from "vitest"

import render from "../../../rendering"
import SelectField from "."

const selectField = SelectField({
	label: "Bio",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "String" },
	name: "bio",
	options: [
		["red", "Red"],
		["blue", "Blue"],
		["green", "Green"],
		["violet", "Violet"],
	],
	selected: "green",
	tabIndex: -1,
})

test("[SelectField] (components:FormField) returns correct config object", () => {
	expect(selectField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "form-field select-field",
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
					tabIndex: -1,
					name: "bio",
				},
				children: [
					{
						attributes: {
							selected: false,
							value: "red",
						},
						children: [
							{
								content: "Red",
								tag: "TextNode",
							},
						],
						tag: "Option",
					},
					{
						attributes: {
							selected: false,
							value: "blue",
						},
						children: [
							{
								content: "Blue",
								tag: "TextNode",
							},
						],
						tag: "Option",
					},
					{
						attributes: {
							selected: true,
							value: "green",
						},
						children: [
							{
								content: "Green",
								tag: "TextNode",
							},
						],
						tag: "Option",
					},
					{
						attributes: {
							selected: false,
							value: "violet",
						},
						children: [
							{
								content: "Violet",
								tag: "TextNode",
							},
						],
						tag: "Option",
					},
				],
				dataset: {
					type: "String",
				},
				tag: "Select",
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

test("[SelectField] (components:FormField) renders properly", () => {
	render(document.body)(selectField)()

	expect(document.body.innerHTML).toEqual(
		`<div id="id-wrapper" class="form-field select-field">` +
			`<label id="id-label" for="id">Bio</label>` +
			`<select id="id" tabindex="-1" name="bio" data-type="String">` +
			`<option id="undefined" value="red">Red</option>` +
			`<option id="undefined" value="blue">Blue</option>` +
			`<option id="undefined" selected="" value="green">Green</option>` +
			`<option id="undefined" value="violet">Violet</option>` +
			`</select>` +
			`<output id="id-help" class="help-box">Help!</output>` +
			`</div>`,
	)
})

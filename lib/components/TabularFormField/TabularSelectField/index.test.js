// @vitest-environment jsdom
import { expect, test } from "vitest"

import Option from "../../../elements/flow/interactive/Select/Option"
import renderTo from "../../../rendering/renderTo"
import TabularSelectField from "."

const tabularSelectField = TabularSelectField({
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
})()

test("[TabularSelectField] (components::TabularFormField) returns correct config object", () => {
	expect(tabularSelectField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "tabular-form-field select-field",
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
								content: "Bio",
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
				],
				tag: "Td",
			},
		],
		tag: "Tr",
	})
})

test("[TabularSelectField] (components::TabularFormField) can pass options as children", () => {
	const withChildren = TabularSelectField({
		label: "Bio",
		help: "Help!",
	})({
		id: "id",
		dataset: { type: "String" },
		name: "bio",
		tabIndex: -1,
	})([Option()(), Option({ selected: true, value: "value" })("Label")])

	renderTo(document.body)(withChildren)()

	expect(document.body.innerHTML).toStrictEqual(
		`<tr id="id-wrapper" class="tabular-form-field select-field">` +
			`<th id="id-label-cell">` +
			`<label id="id-label" for="id" data-help="Help!">Bio</label>` +
			`</th>` +
			`<td id="id-data-cell">` +
			`<select id="id" tabindex="-1" name="bio" data-type="String">` +
			`<option></option>` +
			`<option selected="" value="value">Label</option>` +
			`</select>` +
			`</td>` +
			`</tr>`,
	)

	document.body.innerHTML = ""
})

test("[TabularSelectField] (components::TabularFormField) renders properly", () => {
	renderTo(document.body)(tabularSelectField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<tr id="id-wrapper" class="tabular-form-field select-field">` +
			`<th id="id-label-cell">` +
			`<label id="id-label" for="id" data-help="Help!">Bio</label>` +
			`</th>` +
			`<td id="id-data-cell">` +
			`<select id="id" tabindex="-1" name="bio" data-type="String">` +
			`<option value="red">Red</option>` +
			`<option value="blue">Blue</option>` +
			`<option selected="" value="green">Green</option>` +
			`<option value="violet">Violet</option>` +
			`</select>` +
			`</td>` +
			`</tr>`,
	)

	document.body.innerHTML = ""
})

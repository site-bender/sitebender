// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import Constant from "../constructors/Constant"
import FromLookupTable from "../constructors/FromLookupTable"
import fromLookupTable from "."

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
	<input name="inputName" value="31">
	<input type="hidden"
		class="lookup-table"
		id="lookupTableId"
		name="lookupTableName"
		value="${JSON.stringify(table)}"
		data-type="Json"
	>
`,
)

globalThis.document = dom.window.document

test("[fromLookupTable] (injectors) works with DOM", async () => {
	const op = col => amount =>
		FromLookupTable("Json")({
			column: Constant("Integer")(col),
			tableName: "lookupTableName",
			test: Constant("Number")(amount),
		})

	expect(await fromLookupTable(op(1)(10))()).toMatchObject({ right: 0 })
	expect(await fromLookupTable(op(2)(10))()).toMatchObject({ right: 0 })
	expect(await fromLookupTable(op(1)(50000))()).toMatchObject({ right: 350 })
	expect(await fromLookupTable(op(2)(50000))()).toMatchObject({ right: 175 })
	expect(await fromLookupTable(op(1)(100000))()).toMatchObject({ right: 350 })
	expect(await fromLookupTable(op(2)(100000))()).toMatchObject({ right: 175 })
	expect(await fromLookupTable(op(1)(250000))()).toMatchObject({ right: 350 })
	expect(await fromLookupTable(op(2)(250000))()).toMatchObject({ right: 250 })
	expect(await fromLookupTable(op(1)(300000))()).toMatchObject({ right: 350 })
	expect(await fromLookupTable(op(2)(300000))()).toMatchObject({ right: 250 })
	expect(await fromLookupTable(op(1)(500000))()).toMatchObject({ right: 500 })
	expect(await fromLookupTable(op(2)(500000))()).toMatchObject({ right: 350 })
	expect(await fromLookupTable(op(1)(750000))()).toMatchObject({ right: 500 })
	expect(await fromLookupTable(op(2)(750000))()).toMatchObject({ right: 450 })
	expect(await fromLookupTable(op(1)(1000000))()).toMatchObject({ right: 750 })
	expect(await fromLookupTable(op(2)(1000000))()).toMatchObject({ right: 600 })
})

test("[fromLookupTable] (injectors) works with localVariables", async () => {
	const op = col => amount =>
		FromLookupTable("Json")({
			column: Constant("Integer")(col),
			tableName: "testTable",
			test: Constant("Number")(amount),
		})

	const table = {
		local: [
			[50000, 400, 150],
			[100000, 600, 300],
			[250000, 800, 450],
		],
	}

	expect(await fromLookupTable(op(1)(75000))(null, table)).toMatchObject({
		right: 400,
	})
	expect(await fromLookupTable(op(2)(175000))(null, table)).toMatchObject({
		right: 300,
	})
})

test("[fromLookupTable] (injectors) returns Left(Array(Errors)) for defaults to column 1", async () => {
	expect(
		await fromLookupTable(
			FromLookupTable("Json")({
				column: Constant("Integer")(),
				tableName: "lookupTableName",
				test: Constant("Number")(75000),
			}),
		)(),
	).toMatchObject({ right: 350 })
})

test("[fromLookupTable] (injectors) defaults to column 1", async () => {
	expect(
		await fromLookupTable(
			FromLookupTable("Json")({
				column: Constant("Integer")(2),
				tableName: "lookupTableName",
				test: Constant("Number")(),
			}),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				operation: {
					column: {
						tag: "Constant",
						datatype: "Integer",
						value: 2,
					},
					datatype: "Json",
					source: {
						class: "lookup-table",
						local: "local",
						name: "lookupTableName",
					},
					test: {
						tag: "Constant",
						datatype: "Number",
					},
					tag: "FromLookupTable",
				},
				type: "FromLookupTable",
			},
		],
	})
})

test("[fromLookupTable] (injectors) returns Left(Array(Errors)) for missing table", async () => {
	expect(
		await fromLookupTable(
			FromLookupTable("Json")({
				column: Constant("Integer")(2),
				tableName: "miss",
				test: Constant("Number")(75000),
			}),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: [
					{
						tag: "Error",
						message: "Element at `[name=miss]` not found.",
						operation: {
							column: {
								tag: "Constant",
								datatype: "Integer",
								value: 2,
							},
							datatype: "Json",
							source: {
								class: "lookup-table",
								local: "local",
								name: "miss",
							},
							test: {
								tag: "Constant",
								datatype: "Number",
								value: 75000,
							},
							tag: "FromLookupTable",
						},
						type: "FromLookupTable",
					},
				],
				operation: {
					column: {
						tag: "Constant",
						datatype: "Integer",
						value: 2,
					},
					datatype: "Json",
					source: {
						class: "lookup-table",
						local: "local",
						name: "miss",
					},
					test: {
						tag: "Constant",
						datatype: "Number",
						value: 75000,
					},
					tag: "FromLookupTable",
				},
				type: "FromLookupTable",
			},
		],
	})
})

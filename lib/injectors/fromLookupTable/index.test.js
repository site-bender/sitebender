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
	></table>
`,
)

globalThis.document = dom.window.document

test("test", () => {
	const op = col => amount =>
		FromLookupTable("Json")({
			column: Constant("Integer")(col),
			tableName: "lookupTableName",
			test: Constant("Number")(amount),
		})

	expect(fromLookupTable(op(1)(10))()).toMatchObject({ right: 0 })
	expect(fromLookupTable(op(2)(10))()).toMatchObject({ right: 0 })
	expect(fromLookupTable(op(1)(50000))()).toMatchObject({ right: 350 })
	expect(fromLookupTable(op(2)(50000))()).toMatchObject({ right: 175 })
	expect(fromLookupTable(op(1)(100000))()).toMatchObject({ right: 350 })
	expect(fromLookupTable(op(2)(100000))()).toMatchObject({ right: 175 })
	expect(fromLookupTable(op(1)(250000))()).toMatchObject({ right: 350 })
	expect(fromLookupTable(op(2)(250000))()).toMatchObject({ right: 250 })
	expect(fromLookupTable(op(1)(300000))()).toMatchObject({ right: 350 })
	expect(fromLookupTable(op(2)(300000))()).toMatchObject({ right: 250 })
	expect(fromLookupTable(op(1)(500000))()).toMatchObject({ right: 500 })
	expect(fromLookupTable(op(2)(500000))()).toMatchObject({ right: 350 })
	expect(fromLookupTable(op(1)(750000))()).toMatchObject({ right: 500 })
	expect(fromLookupTable(op(2)(750000))()).toMatchObject({ right: 450 })
	expect(fromLookupTable(op(1)(1000000))()).toMatchObject({ right: 750 })
	expect(fromLookupTable(op(2)(1000000))()).toMatchObject({ right: 600 })
})

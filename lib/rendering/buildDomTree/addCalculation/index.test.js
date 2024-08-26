// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import FromArgument from "../../../injectors/constructors/FromArgument"
import FromElement from "../../../injectors/constructors/FromElement"
import Add from "../../../operations/operators/constructors/Add"
import Divide from "../../../operations/operators/constructors/Divide"
import Multiply from "../../../operations/operators/constructors/Multiply"
import Subtract from "../../../operations/operators/constructors/Subtract"
import addCalculation from "./"

const dom = new JSDOM(`<!DOCTYPE html>
	<input id="test" name="test" value="3">
	<input id="input" name="input" value="10">
	<div id="div"></div>
`)

global.window = dom.window
globalThis.document = dom.window.document

const calculation = Add("Integer")([
	Multiply("Integer")([Constant("Integer")(3), FromArgument("Integer")]),
	Subtract("Integer")(Constant("Integer")(9))(Constant("Integer")(4)),
	Divide("Integer")(Constant("Integer")(15))(
		FromElement("Integer")({ name: "test" }),
	),
])

test("[addCalculation] (rendering::buildDomTree) adds the calculation from value element", async () => {
	const input = document.querySelector("#input")

	addCalculation(input)(calculation)

	expect(await input.__sbCalculate(5)).toMatchObject({ right: 25 })
})

test("[addCalculation] (rendering::buildDomTree) adds the calculation from innerHTML element", async () => {
	const div = document.querySelector("#div")

	addCalculation(div)(calculation)

	expect(await div.__sbCalculate(5)).toMatchObject({ right: 25 })
})

test("[addCalculation] (rendering::buildDomTree) uses value when arg not supplied", async () => {
	const input = document.querySelector("#input")

	addCalculation(input)(calculation)

	expect(await input.__sbCalculate()).toMatchObject({ right: 85 })

	const div = document.querySelector("#div")

	addCalculation(div)(calculation)

	expect(await div.__sbCalculate()).toMatchObject({ right: 85 })
})

test("[addCalculation] (rendering::buildDomTree) returns Left(Array(Errors)) when calculation fails", async () => {
	const div = document.querySelector("#div")

	addCalculation(div)(calculation)

	expect(await div.__sbCalculate("joe")).toMatchObject({
		left: [
			{
				right: 0,
			},
			{
				right: 3,
			},
			{
				tag: "Error",
				message: "Value is not a number.",
				operation: {
					tag: "FromArgument",
					datatype: "Integer",
				},
				type: "FromArgument",
			},
			{
				right: 5,
			},
			{
				right: 5,
			},
		],
	})
})

test("[addCalculation] (rendering::buildDomTree) returns Left(Array(Errors)) if calculation fails", async () => {
	const div = document.querySelector("#div")

	addCalculation(div)()

	expect(await div.__sbCalculate(5)).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Operation undefined or malformed: undefined.",
				type: "Operation",
			},
		],
	})

	expect(div.innerHTML).toEqual("Operation undefined or malformed: undefined.")
})

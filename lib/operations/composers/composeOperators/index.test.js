// @vitest-environment jsdom
import { JSDOM } from "jsdom"
import { expect, test } from "vitest"

import {
	Add,
	Constant,
	Divide,
	FromArgument,
	FromElement,
	FromLookup,
	Multiply,
	Negate,
	Power,
	Subtract,
} from "../../../main.js"
import composeOperators from "."

const dom = new JSDOM(
	`<!DOCTYPE html>
	<data class="lookup" id="exponent" value="3"></data>
	<input type="hidden" name="divisor" value="4">
	<input type="hidden" name="base" value="2">
`,
)

globalThis.document = dom.window.document

const op = Add()([
	Multiply()([
		Negate()(
			Divide()(Constant()(-21))(
				FromElement()({ local: "dvsr", name: "divisor" }),
			),
		),
		Power()(FromElement()({ local: "bs", name: "base" }))(
			FromLookup()("exponent"),
		),
	]),
	Subtract()(Constant()(5))(FromArgument()),
])

test("[composeOperators] (calculations::composers) works with HTML", async () => {
	expect(await composeOperators(op)(5)).toMatchObject({ right: 42 })
})

test("[composeOperators] (calculations::composers) works locally", async () => {
	const localValues = {
		dvsr: 7,
		bs: 3,
		exp: 3,
	}
	expect(await composeOperators(op)(2, localValues)).toMatchObject({
		right: 84,
	})
})

import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import FromArgument from "../../../injectors/constructors/FromArgument"
import AsMonetaryAmount from "../../constructors/AsMonetaryAmount"
import asMonetaryAmount from "."

test("[asMonetaryAmount] (formatters) works", async () => {
	expect(
		await asMonetaryAmount(AsMonetaryAmount()()(Constant()(12345678.9)))(),
	).toMatchObject({ right: "$12,345,678.90" })
	expect(
		await asMonetaryAmount(AsMonetaryAmount()()(FromArgument()))(98765432.1),
	).toMatchObject({ right: "$98,765,432.10" })
})

test("[asMonetaryAmount] (formatters) returns error for bad operand", async () => {
	expect(
		await asMonetaryAmount(AsMonetaryAmount()()(Constant()()))(),
	).toMatchObject({
		left: [
			{
				message: "Value is missing.",
				operation: {
					datatype: "Number",
					tag: "Constant",
					value: undefined,
				},
				tag: "Error",
				type: "Constant",
			},
		],
	})
})

test("[asMonetaryAmount] (formatters) returns error for bad format", async () => {
	expect(
		await asMonetaryAmount(
			AsMonetaryAmount({
				locales: "xxx",
			})()(Constant()(12345678.9)),
		)(),
	).toMatchObject({ right: "$12,345,678.90" })
})

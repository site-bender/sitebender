import { expect, test } from "vitest"

import FromArgument from "../injectors/constructors/FromArgument"
import format from "./"
import AsMonetaryAmount from "./constructors/AsMonetaryAmount"

test("[format] works", async () => {
	expect(
		await format(AsMonetaryAmount()({ currency: "EUR" })(FromArgument()))(
			1212121.2121,
		),
	).toMatchObject({ right: "€1,212,121.21" })
})

test("[format] returns error for unrecognized format", async () => {
	expect(
		await format({
			locales: "en-US",
			operand: {
				tag: "FromArgument",
				datatype: "Number",
			},
			options: {
				currency: "EUR",
			},
			tag: "AsNothingGood",
		})("666"),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: 'Formatter "AsNothingGood" does not exist.',
				operation: {
					locales: "en-US",
					operand: {
						tag: "FromArgument",
						datatype: "Number",
					},
					options: {
						currency: "EUR",
					},
					tag: "AsNothingGood",
				},
				type: "Operation",
			},
		],
	})
})

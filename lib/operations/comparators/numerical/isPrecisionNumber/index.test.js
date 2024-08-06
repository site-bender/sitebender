import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsPrecisionNumber from "../constructors/IsPrecisionNumber"
import isPrecisionNumber from "."

test("[isPrecisionNumber] (calculations::comparators::numerical) returns value when an integer", async () => {
	expect(
		await isPrecisionNumber(IsPrecisionNumber(Constant("Integer")(77))())(),
	).toMatchObject({
		right: 77,
	})
})

test("[isPrecisionNumber] (calculations::comparators::numerical) returns value when a precision number with no more than required decimal places", async () => {
	expect(
		await isPrecisionNumber(IsPrecisionNumber(Constant("Number")(77.7))(2))(),
	).toMatchObject({
		right: 77.7,
	})
})

test("[isPrecisionNumber] (calculations::comparators::numerical) returns an error when number exceeds precision", async () => {
	expect(
		await isPrecisionNumber(IsPrecisionNumber(Constant("Number")(0.666))(2))(),
	).toMatchObject({
		left: [
			{
				message: "0.666 is not a precision number of up to 2 decimal places.",
				operation: {
					datatype: "PrecisionNumber",
					decimalPlaces: 2,
					operand: {
						datatype: "Number",
						tag: "Constant",
						value: 0.666,
					},
					tag: "IsPrecisionNumber",
				},
				tag: "Error",
				type: "IsPrecisionNumber",
			},
		],
	})
})

test("[isPrecisionNumber] (calculations::comparators::numerical) returns an error when not a precision number", async () => {
	expect(
		await isPrecisionNumber(IsPrecisionNumber(Constant("String")("xyz"))(3))(),
	).toMatchObject({
		left: [
			{
				message: "xyz is not a precision number of up to 3 decimal places.",
				operation: {
					datatype: "PrecisionNumber",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "xyz",
					},
					tag: "IsPrecisionNumber",
				},
				tag: "Error",
				type: "IsPrecisionNumber",
			},
		],
	})
})

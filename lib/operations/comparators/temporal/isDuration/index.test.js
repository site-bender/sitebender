import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsDuration from "../constructors/IsDuration"
import isDuration from "."

test("[isDuration] (calculations::comparators::scalar) returns Right(value) when a duration", async () => {
	expect(
		await isDuration(IsDuration(Constant("Duration")("P1Y1M1DT1H1M1.1S")))(),
	).toMatchObject({
		right: "P1Y1M1DT1H1M1.1S",
	})
})

test("[isDuration] (calculations::comparators::scalar) returns Right(value) when a duration", async () => {
	expect(
		await isDuration(
			IsDuration(
				Constant("Duration")({
					years: 1,
					days: 1,
					seconds: 1,
					milliseconds: 500,
				}),
			),
		)(),
	).toMatchObject({
		right: { years: 1, days: 1, seconds: 1, milliseconds: 500 },
	})
})

test("[isDuration] (calculations::comparators::scalar) returns Left(Array(Errors)) when not a duration", async () => {
	expect(
		await isDuration(IsDuration(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bob is not a duration: RangeError: Cannot parse: Bob.",
				operation: {
					tag: "IsDuration",
					datatype: "Duration",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsDuration",
			},
		],
	})
})

test("[isDuration] (calculations::comparators::scalar) returns Left(Array(Errors)) when bad operand", async () => {
	expect(await isDuration(IsDuration(Constant("String")()))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Value is missing.",
				operation: {
					tag: "Constant",
					datatype: "String",
				},
				type: "Constant",
			},
		],
	})
})

import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsYearWeek from "../constructors/IsYearWeek"
import isYearWeek from "."

test("[isYearWeek] (calculations::comparators::scalar) returns value when a valid year-week", async () => {
	expect(
		await isYearWeek(IsYearWeek(Constant("YearWeek")("2020-W53")))(),
	).toMatchObject({
		right: "2020-W53",
	})
})

test("[isYearWeek] (calculations::comparators::scalar) returns value when a valid year-week", async () => {
	expect(
		await isYearWeek(IsYearWeek(Constant("YearWeek")("2022-W53")))(),
	).toMatchObject({
		left: [
			{
				message: "2022-W53 is not a valid week-year.",
				operation: {
					datatype: "YearWeek",
					operand: {
						datatype: "YearWeek",
						tag: "Constant",
						value: "2022-W53",
					},
					tag: "IsYearWeek",
				},
				tag: "Error",
				type: "IsYearWeek",
			},
		],
	})
})

test("[isYearWeek] (calculations::comparators::scalar) returns an error when not a valid year-week", async () => {
	expect(
		await isYearWeek(IsYearWeek(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bob is not a valid week-year.",
				operation: {
					tag: "IsYearWeek",
					datatype: "YearWeek",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsYearWeek",
			},
		],
	})
})

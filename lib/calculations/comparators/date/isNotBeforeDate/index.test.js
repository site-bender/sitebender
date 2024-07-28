import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsNotBeforeDate from "../constructors/IsNotBeforeDate"
import isNotBeforeDate from "."

test("[isNotBeforeDate] (calculations::comparators::date) returns an error when not not before date", () => {
	expect(
		isNotBeforeDate(
			IsNotBeforeDate("Date")(Constant("Date")("2001-09-11"))(
				Constant("Date")("2001-01-01"),
			),
		)(),
	).toMatchObject({ right: "2001-09-11" })
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error when not not before date", () => {
	expect(
		isNotBeforeDate(
			IsNotBeforeDate("Date")(Constant("Date")("2001-01-01"))(
				Constant("Date")("2001-09-11"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-01-01 is not not before 2001-09-11.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01",
					},
					tag: "IsNotBeforeDate",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-09-11",
					},
				},
				type: "IsNotBeforeDate",
			},
		],
	})
})

test("[isNotBeforeDate] (calculations::comparators::date) returns an error when same date", () => {
	expect(
		isNotBeforeDate(
			IsNotBeforeDate("Date")(Constant("Date")("2001-01-01"))(
				Constant("Date")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		right: "2001-01-01",
	})
})

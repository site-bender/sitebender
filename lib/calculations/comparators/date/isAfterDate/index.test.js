import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsAfterDate from "../constructors/IsAfterDate"
import isAfterDate from "."

test("[isAfterDate] (calculations::comparators::date) returns an error when not after date", () => {
	expect(
		isAfterDate(
			IsAfterDate("Date")(Constant("Date")("2001-09-11"))(
				Constant("Date")("2001-01-01"),
			),
		)(),
	).toMatchObject({ right: "2001-09-11" })
})

test("[isAfterDate] (calculations::comparators::date) returns an error when not after date", () => {
	expect(
		isAfterDate(
			IsAfterDate("Date")(Constant("Date")("2001-01-01"))(
				Constant("Date")("2001-09-11"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-01-01 is not after 2001-09-11.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01",
					},
					tag: "IsAfterDate",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-09-11",
					},
				},
				type: "IsAfterDate",
			},
		],
	})
})

test("[isAfterDate] (calculations::comparators::date) returns an error when same date", () => {
	expect(
		isAfterDate(
			IsAfterDate("Date")(Constant("Date")("2001-01-01"))(
				Constant("Date")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-01-01 is not after 2001-01-01.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01",
					},
					tag: "IsAfterDate",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01",
					},
				},
				type: "IsAfterDate",
			},
		],
	})
})

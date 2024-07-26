import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsBeforeDate from "../constructors/IsBeforeDate"
import isBeforeDate from "."

test("[isBeforeDate] (calculations::comparators::date) returns an error when not after date", () => {
	expect(
		isBeforeDate(
			IsBeforeDate("Date")(Constant("Date")("2001-01-01"))(
				Constant("Date")("2001-09-11"),
			),
		)(),
	).toMatchObject({ right: "2001-01-01" })
})

test("[isBeforeDate] (calculations::comparators::date) returns an error when not after date", () => {
	expect(
		isBeforeDate(
			IsBeforeDate("Date")(Constant("Date")("2001-09-11"))(
				Constant("Date")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-09-11 is not before 2001-01-01.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-09-11",
					},
					tag: "IsBeforeDate",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01",
					},
				},
				type: "IsBeforeDate",
			},
		],
	})
})

test("[isBeforeDate] (calculations::comparators::date) returns an error when same date", () => {
	expect(
		isBeforeDate(
			IsBeforeDate("Date")(Constant("Date")("2001-01-01"))(
				Constant("Date")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-01-01 is not before 2001-01-01.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01",
					},
					tag: "IsBeforeDate",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01",
					},
				},
				type: "IsBeforeDate",
			},
		],
	})
})

import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsNotAfterDate from "../constructors/IsNotAfterDate"
import isNotAfterDate from "."

test("[isNotAfterDate] (calculations::comparators::date) returns an error when not after date", () => {
	expect(
		isNotAfterDate(
			IsNotAfterDate("Date")(Constant("Date")("2001-01-01"))(
				Constant("Date")("2001-09-11"),
			),
		)(),
	).toMatchObject({ right: "2001-01-01" })
})

test("[isNotAfterDate] (calculations::comparators::date) returns an error when not after date", () => {
	expect(
		isNotAfterDate(
			IsNotAfterDate("Date")(Constant("Date")("2001-09-11"))(
				Constant("Date")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-09-11 is not not after 2001-01-01.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-09-11",
					},
					tag: "IsNotAfterDate",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01",
					},
				},
				type: "IsNotAfterDate",
			},
		],
	})
})

test("[isNotAfterDate] (calculations::comparators::date) returns an error when same date", () => {
	expect(
		isNotAfterDate(
			IsNotAfterDate("Date")(Constant("Date")("2001-01-01"))(
				Constant("Date")("2001-01-01"),
			),
		)(),
	).toMatchObject({
		right: "2001-01-01",
	})
})

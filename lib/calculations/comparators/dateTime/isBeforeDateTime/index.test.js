import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsBeforeDateTime from "../constructors/IsBeforeDateTime"
import isBeforeDateTime from "."

test("[isBeforeDateTime] (calculations::comparators::date) returns an error when not after date", () => {
	expect(
		isBeforeDateTime(
			IsBeforeDateTime("Date")(Constant("Date")("2001-01-01T00:05"))(
				Constant("Date")("2001-09-11T11:11:11"),
			),
		)(),
	).toMatchObject({ right: "2001-01-01T00:05" })
})

test("[isBeforeDateTime] (calculations::comparators::date) returns an error when not after date", () => {
	expect(
		isBeforeDateTime(
			IsBeforeDateTime("Date")(Constant("Date")("2001-09-11T11:11:11"))(
				Constant("Date")("2001-01-01T00:05"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-09-11T11:11:11 is not before 2001-01-01T00:05.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-09-11T11:11:11",
					},
					tag: "IsBeforeDateTime",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01T00:05",
					},
				},
				type: "IsBeforeDateTime",
			},
		],
	})
})

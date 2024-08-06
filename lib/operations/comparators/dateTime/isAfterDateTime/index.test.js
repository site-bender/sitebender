import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsAfterDateTime from "../constructors/IsAfterDateTime"
import isAfterDateTime from "."

test("[isAfterDateTime] (calculations::comparators::date) returns an error when not after date", async () => {
	expect(
		await isAfterDateTime(
			IsAfterDateTime("Date")(Constant("Date")("2001-09-11T12:34:50"))(
				Constant("Date")("2001-01-01T00:00:00"),
			),
		)(),
	).toMatchObject({ right: "2001-09-11T12:34:50" })
})

test("[isAfterDateTime] (calculations::comparators::date) returns an error when not after date", async () => {
	expect(
		await isAfterDateTime(
			IsAfterDateTime("Date")(Constant("Date")("2001-01-01T00:01"))(
				Constant("Date")("2001-09-11T12:12:12"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-01-01T00:01 is not after 2001-09-11T12:12:12.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01T00:01",
					},
					tag: "IsAfterDateTime",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-09-11T12:12:12",
					},
				},
				type: "IsAfterDateTime",
			},
		],
	})
})

test("[isAfterDateTime] (calculations::comparators::date) returns an error when same date", async () => {
	expect(
		await isAfterDateTime(
			IsAfterDateTime("Date")(Constant("Date")("2001-01-01T01:02:03"))(
				Constant("Date")("2001-01-01T01:02:03"),
			),
		)(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "2001-01-01T01:02:03 is not after 2001-01-01T01:02:03.",
				operation: {
					datatype: "Date",
					operand: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01T01:02:03",
					},
					tag: "IsAfterDateTime",
					test: {
						datatype: "Date",
						tag: "Constant",
						value: "2001-01-01T01:02:03",
					},
				},
				type: "IsAfterDateTime",
			},
		],
	})
})

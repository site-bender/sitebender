import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsCalendar from "../constructors/IsCalendar"
import isCalendar from "."

test("[isCalendar] (calculations::comparators::scalar) returns value when a calendar", async () => {
	expect(
		await isCalendar(IsCalendar(Constant("Calendar")("iso8601")))(),
	).toMatchObject({
		right: "iso8601",
	})
})

test("[isCalendar] (calculations::comparators::scalar) returns value when a calendar", async () => {
	expect(
		await isCalendar(
			IsCalendar(
				Constant("Calendar")(
					"2020-01-13T16:31:00.065858086-08:00[America/Vancouver][u-ca=iso8601]",
				),
			),
		)(),
	).toMatchObject({
		right:
			"2020-01-13T16:31:00.065858086-08:00[America/Vancouver][u-ca=iso8601]",
	})
})

test("[isCalendar] (calculations::comparators::scalar) returns an error when not a calendar", async () => {
	expect(
		await isCalendar(IsCalendar(Constant("String")("Bob")))(),
	).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Bob is not a calendar: RangeError: Invalid Calendar: bob.",
				operation: {
					tag: "IsCalendar",
					datatype: "Calendar",
					operand: { tag: "Constant", datatype: "String", value: "Bob" },
				},
				type: "IsCalendar",
			},
		],
	})
})

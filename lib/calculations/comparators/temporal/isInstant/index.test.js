import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsInstant from "../constructors/IsInstant"
import isInstant from "."

test("[isInstant] (calculations::comparators::scalar) returns value when an instant", async () => {
	expect(
		await isInstant(
			IsInstant(Constant("Instant")("2020-01-01T00:00:00.123456789+05:30")),
		)(),
	).toMatchObject({
		right: "2020-01-01T00:00:00.123456789+05:30",
	})
})

test("[isInstant] (calculations::comparators::scalar) returns an error when not an instant", async () => {
	expect(await isInstant(IsInstant(Constant("String")("Bob")))()).toMatchObject(
		{
			left: [
				{
					tag: "Error",
					message: "Bob is not an instant: RangeError: Cannot parse: Bob.",
					operation: {
						tag: "IsInstant",
						datatype: "Instant",
						operand: { tag: "Constant", datatype: "String", value: "Bob" },
					},
					type: "IsInstant",
				},
			],
		},
	)
})

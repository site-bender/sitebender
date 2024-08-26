import { expect, test } from "vitest"

import castToPercent from "./"

test("[castToPercent] (utilities::castValue) casts value to Right(boolean)", async () => {
	expect(castToPercent(33)).toMatchObject({ right: 0.33 })
	expect(castToPercent("-420")).toMatchObject({ right: -4.2 })

	const pct = castToPercent("99.9")

	expect(Math.round(pct.right * 1000) / 1000).toEqual(0.999)
})

test("[castToPercent] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToPercent({})).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot cast {} to a percent.",
				operation: {},
				type: "castToPercent",
			},
		],
	})
})

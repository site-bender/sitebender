import { expect, test } from "vitest"

import castToBoolean from "./"

test("[castToBoolean] (utilities::castValue) casts value to Right(boolean)", () => {
	expect(castToBoolean(true)).toMatchObject({ right: true })
	expect(castToBoolean("t")).toMatchObject({ right: true })
	expect(castToBoolean("TRUE")).toMatchObject({ right: true })
	expect(castToBoolean("Yes")).toMatchObject({ right: true })
	expect(castToBoolean(1)).toMatchObject({ right: true })
	expect(castToBoolean(42)).toMatchObject({ right: true })
	expect(castToBoolean(false)).toMatchObject({ right: false })
	expect(castToBoolean("F")).toMatchObject({ right: false })
	expect(castToBoolean("false")).toMatchObject({ right: false })
	expect(castToBoolean("NO")).toMatchObject({ right: false })
	expect(castToBoolean(0)).toMatchObject({ right: false })
})

test("[castToBoolean] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToBoolean({})).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot cast {} to a boolean.",
				operation: {},
				type: "castToBoolean",
			},
		],
	})
})

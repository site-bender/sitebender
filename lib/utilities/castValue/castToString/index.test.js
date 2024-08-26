import { expect, test } from "vitest"

import castToString from "./"

test("[castToString] (utilities::castValue) casts value to Right(string)", () => {
	expect(castToString("string")).toMatchObject({ right: "string" })
	expect(castToString(0)).toMatchObject({ right: "0" })
	expect(castToString(1.11)).toMatchObject({ right: "1.11" })
	expect(castToString(true)).toMatchObject({ right: "true" })
	expect(castToString(false)).toMatchObject({ right: "false" })
})

test("[castToString] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToString({})).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot cast {} to a string.",
				operation: {},
				type: "castToString",
			},
		],
	})
})

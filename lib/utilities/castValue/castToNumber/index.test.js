import { expect, test } from "vitest"

import castToNumber from "./"

test("[castToNumber] (utilities::castValue) casts value to Right(number)", () => {
	expect(castToNumber(33)).toMatchObject({ right: 33 })
	expect(castToNumber("-42")).toMatchObject({ right: -42 })
	expect(castToNumber("3.1415")).toMatchObject({ right: 3.1415 })
})

test("[castToNumber] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToNumber({})).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot cast {} to a number.",
				operation: {},
				type: "castToNumber",
			},
		],
	})
})

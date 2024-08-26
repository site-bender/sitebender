import { expect, test } from "vitest"

import castToInteger from "./"

test("[castToInteger] (utilities::castValue) casts value to Right(integer)", () => {
	expect(castToInteger(33)).toMatchObject({ right: 33 })
	expect(castToInteger("-42")).toMatchObject({ right: -42 })
})

test("[castToInteger] (utilities::castValue) casts value to Right(integer)", () => {
	expect(castToInteger(33.333)).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot cast 33.333 to an integer.",
				operation: 33.333,
				type: "castToInteger",
			},
		],
	})
})

test("[castToInteger] (utilities::castValue) returns Left(Array(Errors)) if uncastable", () => {
	expect(castToInteger({})).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Cannot cast {} to an integer.",
				operation: {},
				type: "castToInteger",
			},
		],
	})
})

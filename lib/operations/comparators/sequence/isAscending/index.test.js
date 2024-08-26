import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsAscending from "../constructors/IsAscending"
import isAscending from "."

test("[isAscending] (calculations::comparators::numerical) returns value when items are ascending", async () => {
	const op = IsAscending("Array")(Constant("Array")([1, 2, 3, 4, 5, 6, 7]))

	expect(await isAscending(op)()).toMatchObject({
		right: [1, 2, 3, 4, 5, 6, 7],
	})
})

test("[isAscending] (calculations::comparators::numerical) returns an error when items are not ascending", async () => {
	const op = IsAscending("Array")(Constant("Array")([1, 5, 6, 7, 2, 3, 4]))

	expect(await isAscending(op)()).toMatchObject({
		left: [
			{
				message: "JSON.stringify(list) is not ascending.",
				operation: {
					datatype: "Array",
					operand: {
						datatype: "Array",
						tag: "Constant",
						value: [1, 5, 6, 7, 2, 3, 4],
					},
					tag: "IsAscending",
				},
				tag: "Error",
				type: "IsAscending",
			},
		],
	})
})

test("[isAscending] (calculations::comparators::numerical) returns Left(Array(Errors)) when bad operand", async () => {
	expect(await isAscending(IsAscending(Constant("Array")()))()).toMatchObject({
		left: [
			{
				tag: "Error",
				message: "Operation undefined or malformed: undefined.",
				type: "Comparison",
			},
		],
	})
})

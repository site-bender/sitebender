import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsDescending from "../constructors/IsDescending"
import isDescending from "."

test("[isDescending] (calculations::comparators::numerical) returns value when items are ascending", () => {
	const op = IsDescending("Array")(Constant("Array")([7, 6, 5, 4, 3, 2, 1]))

	expect(isDescending(op)()).toMatchObject({
		right: [7, 6, 5, 4, 3, 2, 1],
	})
})

test("[isDescending] (calculations::comparators::numerical) returns an error when items are not ascending", () => {
	const op = IsDescending("Array")(Constant("Array")([1, 5, 6, 7, 2, 3, 4]))

	expect(isDescending(op)()).toMatchObject({
		left: [
			{
				message: "JSON.stringify(list) is not descending.",
				operation: {
					datatype: "Array",
					operand: {
						datatype: "Array",
						tag: "Constant",
						value: [1, 5, 6, 7, 2, 3, 4],
					},
					tag: "IsDescending",
				},
				tag: "Error",
				type: "IsDescending",
			},
		],
	})
})

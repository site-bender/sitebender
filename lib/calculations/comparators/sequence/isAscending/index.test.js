import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsAscending from "../constructors/IsAscending"
import isAscending from "."

test("[isAscending] (calculations::comparators::numerical) returns value when items are ascending", () => {
	const op = IsAscending("Array")(Constant("Integer")([1, 2, 3, 4, 5, 6, 7]))

	expect(isAscending(op)()).toMatchObject({
		right: [1, 2, 3, 4, 5, 6, 7],
	})
})

test("[isAscending] (calculations::comparators::numerical) returns an error when items are not ascending", () => {
	const op = IsAscending("Array")(Constant("Integer")([1, 5, 6, 7, 2, 3, 4]))

	expect(isAscending(op)()).toMatchObject({
		left: [
			{
				message: "JSON.stringify(list) is not ascending.",
				operation: {
					datatype: "Array",
					operand: {
						datatype: "Integer",
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

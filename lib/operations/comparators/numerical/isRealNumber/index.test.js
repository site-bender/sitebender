import { expect, test } from "vitest"

import Constant from "../../../../injectors/constructors/Constant"
import IsRealNumber from "../constructors/IsRealNumber"
import isRealNumber from "."

test("[isRealNumber] (calculations::comparators::numerical) returns value when an integer", async () => {
	expect(
		await isRealNumber(IsRealNumber(Constant("Integer")(77)))(),
	).toMatchObject({
		right: 77,
	})
})

test("[isRealNumber] (calculations::comparators::numerical) returns value when a real number", async () => {
	expect(
		await isRealNumber(IsRealNumber(Constant("Number")(77.7)))(),
	).toMatchObject({
		right: 77.7,
	})
})

test("[isRealNumber] (calculations::comparators::numerical) returns an error when not a real number", async () => {
	expect(
		await isRealNumber(IsRealNumber(Constant("String")("xyz")))(),
	).toMatchObject({
		left: [
			{
				message: "xyz is not a real number.",
				operation: {
					datatype: "RealNumber",
					operand: {
						datatype: "String",
						tag: "Constant",
						value: "xyz",
					},
					tag: "IsRealNumber",
				},
				tag: "Error",
				type: "IsRealNumber",
			},
		],
	})
})

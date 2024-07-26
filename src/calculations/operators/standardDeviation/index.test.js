import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import StandardDeviation from "../constructors/StandardDeviation"
import standardDeviation from "."

test("[standardDeviation] (calculations::operators) gets the standard deviation", () => {
	const op = StandardDeviation("Number")([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(11),
	])(false)

	expect(standardDeviation(op)()).toMatchObject({ right: 3.1622776601683795 })
})

test("[standardDeviation] (calculations::operators) gets the population standard deviation", () => {
	const op = StandardDeviation("Number")([
		Constant("Number")(7),
		Constant("Number")(5),
		Constant("Number")(13),
		Constant("Number")(9),
		Constant("Number")(11),
	])(true)

	expect(standardDeviation(op)()).toMatchObject({ right: 2.8284271247461903 })
})

test("[standardDeviation] (calculations::operators) returns a left error if array empty", () => {
	const op = StandardDeviation("Number")([])(false)

	expect(standardDeviation(op)()).toMatchObject({
		left: {
			message: "Cannot take root mean square of an empty array.",
			operation: {
				datatype: "Number",
				operands: [],
				tag: "StandardDeviation",
			},
			tag: "Error",
			type: "standardDeviation",
		},
	})
})

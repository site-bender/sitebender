import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Remainder from "../constructors/Remainder"
import remainder from "./"

test("[remainder] (calculations::operators) works with two positives", () => {
	const op = Remainder("Number")(Constant("Number")(7))(Constant("Number")(3))

	expect(remainder(op)()).toMatchObject({ right: 1 })
})

test("[remainder] (calculations::operators) works with negative divisor", () => {
	const op = Remainder("Number")(Constant("Number")(7))(Constant("Number")(-3))

	expect(remainder(op)()).toMatchObject({ right: 1 })
})

test("[remainder] (calculations::operators) works with negative dividend", () => {
	const op = Remainder("Number")(Constant("Number")(-7))(Constant("Number")(3))

	expect(remainder(op)()).toMatchObject({ right: -1 })
})

test("[remainder] (calculations::operators) works with two negatives", () => {
	const op = Remainder("Number")(Constant("Number")(-7))(Constant("Number")(-3))

	expect(remainder(op)()).toMatchObject({ right: -1 })
})

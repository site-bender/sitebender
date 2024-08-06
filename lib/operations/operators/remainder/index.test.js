import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Remainder from "../constructors/Remainder"
import remainder from "./"

test("[remainder] (calculations::operators) works with two positives", async () => {
	const op = Remainder("Number")(Constant("Number")(7))(Constant("Number")(3))

	expect(await remainder(op)()).toMatchObject({ right: 1 })
})

test("[remainder] (calculations::operators) works with negative divisor", async () => {
	const op = Remainder("Number")(Constant("Number")(7))(Constant("Number")(-3))

	expect(await remainder(op)()).toMatchObject({ right: 1 })
})

test("[remainder] (calculations::operators) works with negative dividend", async () => {
	const op = Remainder("Number")(Constant("Number")(-7))(Constant("Number")(3))

	expect(await remainder(op)()).toMatchObject({ right: -1 })
})

test("[remainder] (calculations::operators) works with two negatives", async () => {
	const op = Remainder("Number")(Constant("Number")(-7))(Constant("Number")(-3))

	expect(await remainder(op)()).toMatchObject({ right: -1 })
})

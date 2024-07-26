import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Modulo from "../constructors/Modulo"
import modulo from "./"

test("[modulo] (calculations::operators) works with two positives", () => {
	const op = Modulo("Number")(Constant("Number")(7))(Constant("Number")(3))

	expect(modulo(op)()).toMatchObject({ right: 1 })
})

test("[modulo] (calculations::operators) works with negative divisor", () => {
	const op = Modulo("Number")(Constant("Number")(7))(Constant("Number")(-3))

	expect(modulo(op)()).toMatchObject({ right: 1 })
})

test("[modulo] (calculations::operators) works with negative dividend", () => {
	const op = Modulo("Number")(Constant("Number")(-7))(Constant("Number")(3))

	expect(modulo(op)()).toMatchObject({ right: 2 })
})

test("[modulo] (calculations::operators) works with two negatives", () => {
	const op = Modulo("Number")(Constant("Number")(-7))(Constant("Number")(-3))

	expect(modulo(op)()).toMatchObject({ right: 2 })
})

import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Modulo from "../constructors/Modulo"
import modulo from "./"

test("[modulo] (calculations::operators) works with two positives", async () => {
	const op = Modulo("Number")(Constant("Number")(7))(Constant("Number")(3))

	expect(await modulo(op)()).toMatchObject({ right: 1 })
})

test("[modulo] (calculations::operators) works with negative divisor", async () => {
	const op = Modulo("Number")(Constant("Number")(7))(Constant("Number")(-3))

	expect(await modulo(op)()).toMatchObject({ right: -1 })
})

test("[modulo] (calculations::operators) works with negative dividend", async () => {
	const op = Modulo("Number")(Constant("Number")(-7))(Constant("Number")(3))

	expect(await modulo(op)()).toMatchObject({ right: 1 })
})

test("[modulo] (calculations::operators) works with two negatives", async () => {
	const op = Modulo("Number")(Constant("Number")(-7))(Constant("Number")(-3))

	expect(await modulo(op)()).toMatchObject({ right: -1 })
})

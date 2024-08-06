import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Cosecant from "../constructors/Cosecant"
import cosecant from "."

test("[cosecant] (calculations::operators) gets the cosecant of 0", async () => {
	const op = Cosecant("Number")(Constant("Number")(0))

	expect(await cosecant(op)()).toMatchObject({ right: Infinity })
})

test("[cosecant] (calculations::operators) gets the cosecant of 1", async () => {
	const op = Cosecant("Number")(Constant("Number")(1))

	expect(await cosecant(op)()).toMatchObject({ right: 1.1883951057781212 })
})

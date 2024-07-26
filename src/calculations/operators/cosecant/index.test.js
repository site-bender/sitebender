import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Cosecant from "../constructors/Cosecant"
import cosecant from "."

test("[cosecant] (calculations::operators) gets the cosecant of 0", () => {
	const op = Cosecant("Number")(Constant("Number")(0))

	expect(cosecant(op)()).toMatchObject({ right: Infinity })
})

test("[cosecant] (calculations::operators) gets the cosecant of 1", () => {
	const op = Cosecant("Number")(Constant("Number")(1))

	expect(cosecant(op)()).toMatchObject({ right: 1.1883951057781212 })
})

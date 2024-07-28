import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Exponent from "../constructors/Exponent"
import exponent from "."

test("[exponent] (calculations::operators) gets the exponent of 1", () => {
	const op = Exponent("Number")(Constant("Number")(1))

	expect(exponent(op)()).toMatchObject({ right: 2.718281828459045 })
})

test("[exponent] (calculations::operators) gets the exponent of o", () => {
	const op = Exponent("Number")(Constant("Number")(0))

	expect(exponent(op)()).toMatchObject({ right: 1 })
})

test("[exponent] (calculations::operators) gets the exponent of -1", () => {
	const op = Exponent("Number")(Constant("Number")(-1))

	expect(exponent(op)()).toMatchObject({ right: 0.36787944117144233 })
})

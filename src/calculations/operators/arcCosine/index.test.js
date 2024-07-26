import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import ArcCosine from "../constructors/ArcCosine"
import arcCosine from "."

test("[arcCosine] (calculations::operators) gets the arcCosine of 1", () => {
	const op = ArcCosine("Number")(Constant("Number")(1))

	expect(arcCosine(op)()).toMatchObject({ right: 0 })
})

test("[arcCosine] (calculations::operators) gets the arcCosine of o", () => {
	const op = ArcCosine("Number")(Constant("Number")(0))

	expect(arcCosine(op)()).toMatchObject({ right: Math.PI / 2 })
})

test("[arcCosine] (calculations::operators) gets the arcCosine of -1", () => {
	const op = ArcCosine("Number")(Constant("Number")(-1))

	expect(arcCosine(op)()).toMatchObject({ right: Math.PI })
})

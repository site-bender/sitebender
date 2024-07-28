import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import AbsoluteValue from "../constructors/AbsoluteValue"
import absoluteValue from "./"

test("[absoluteValue] (calculations::operators) makes negative positive", () => {
	const op = AbsoluteValue("Number")(Constant("Number")(-21))

	expect(absoluteValue(op)()).toMatchObject({ right: 21 })
})

test("[absoluteValue] (calculations::operators) keeps positive positive", () => {
	const op = AbsoluteValue("Number")(Constant("Number")(42))

	expect(absoluteValue(op)()).toMatchObject({ right: 42 })
})

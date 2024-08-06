import { expect, test } from "vitest"

import FromArgument from "../../../injectors/constructors/FromArgument"
import AbsoluteValue from "../constructors/AbsoluteValue"
import absoluteValue from "./"

test("[absoluteValue] (calculations::operators) makes negative positive", async () => {
	const op = AbsoluteValue("Number")(FromArgument("Number"))

	expect(await absoluteValue(op)(-21)).toMatchObject({ right: 21 })
})

test("[absoluteValue] (calculations::operators) keeps positive positive", async () => {
	const op = AbsoluteValue("Number")(FromArgument("Number"))

	expect(await absoluteValue(op)(42)).toMatchObject({ right: 42 })
})

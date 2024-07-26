import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Average from "../constructors/Average"
import average from "./"

test("[average] (calculations::operators) works", () => {
	const op = Average("Number")([
		Constant("Number")(5),
		Constant("Number")(7),
		Constant("Number")(9),
	])

	expect(average(op)()).toMatchObject({ right: 7 })
})

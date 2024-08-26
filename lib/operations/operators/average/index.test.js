import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Average from "../constructors/Average"
import average from "./"

test("[average] (operations::operators) works", async () => {
	const op = Average("Number")([
		Constant("Number")(5),
		Constant("Number")(7),
		Constant("Number")(9),
	])

	expect(await average(op)()).toMatchObject({ right: 7 })
})

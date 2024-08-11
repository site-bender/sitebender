import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import FromArgument from "../../../injectors/constructors/FromArgument"
import Ternary from "../../constructors/Ternary"
import ternary from "./"

test("[ternary] (operations::operators) works when condition is true", async () => {
	const op = Ternary(FromArgument("Boolean"))(Constant()(7))(Constant()(3))

	expect(await ternary(op)(true)).toMatchObject({ right: 7 })
})

test("[ternary] (operations::operators) works when condition is false", async () => {
	const op = Ternary(FromArgument("Boolean"))(Constant()(7))(Constant()(3))

	expect(await ternary(op)(false)).toMatchObject({ right: 3 })
})

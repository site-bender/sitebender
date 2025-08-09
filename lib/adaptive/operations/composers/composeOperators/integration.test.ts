// @vitest-environment jsdom
import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant/index.js"
import Add from "../../operators/constructors/Add/index.js"
import Multiply from "../../operators/constructors/Multiply/index.js"
import composeOperators from "./index.js"

test("[composeOperators] correctly handles a complex nested operation", async () => {
	// This test evaluates: 5 * (10 + 20) = 150
	const complexConfig = Multiply("Integer")([
		Constant("Integer")(5),
		Add("Integer")([Constant("Integer")(10), Constant("Integer")(20)]),
	])

	const composedFunction = await composeOperators(complexConfig)
	const result = await composedFunction()

	expect(result).toMatchObject({ right: 150 })
})

test("[composeOperators] correctly handles multiple levels of nesting", async () => {
	// This test evaluates: (5 + 10) * (2 + 3) = 75
	const complexConfig = Multiply("Integer")([
		Add("Integer")([Constant("Integer")(5), Constant("Integer")(10)]),
		Add("Integer")([Constant("Integer")(2), Constant("Integer")(3)]),
	])

	const composedFunction = await composeOperators(complexConfig)
	const result = await composedFunction()

	expect(result).toMatchObject({ right: 75 })
})

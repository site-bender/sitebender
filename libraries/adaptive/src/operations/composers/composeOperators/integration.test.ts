import { assertEquals } from "jsr:@std/assert"

import Constant from "../../../constructors/injectors/Constant/index.ts"
import Add from "../../../constructors/operators/Add/index.ts"
import Multiply from "../../../constructors/operators/Multiply/index.ts"
import composeOperators from "./index.ts"

Deno.test("[composeOperators] correctly handles a complex nested operation", async () => {
	// This test evaluates: 5 * (10 + 20) = 150
	const complexConfig = Multiply("Integer")([
		Constant("Integer")(5),
		Add("Integer")([Constant("Integer")(10), Constant("Integer")(20)]),
	])

	const composedFunction = (await composeOperators(complexConfig))
	const result = await composedFunction(undefined, undefined)

	assertEquals(result, { right: 150 })
})

Deno.test("[composeOperators] correctly handles multiple levels of nesting", async () => {
	// This test evaluates: (5 + 10) * (2 + 3) = 75
	const complexConfig = Multiply("Integer")([
		Add("Integer")([Constant("Integer")(5), Constant("Integer")(10)]),
		Add("Integer")([Constant("Integer")(2), Constant("Integer")(3)]),
	])

	const composedFunction = (await composeOperators(complexConfig))
	const result = await composedFunction(undefined, undefined)

	assertEquals(result, { right: 75 })
})

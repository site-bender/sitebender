import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import composeConditional from "./"

test("[composeConditional] (operations::composers) returns true when comparison returns Right(value)", async () => {
	const op = Constant("String")("Bob")

	expect(await composeConditional(op)()).toBe(true)
})

test("[composeConditional] (operations::composers) returns false when comparison returns Left(Array(Errors))", async () => {
	const op = Constant("String")()

	expect(await composeConditional(op)()).toBe(false)
})

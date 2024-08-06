import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Hypotenuse from "../constructors/Hypotenuse"
import hypotenuse from "."

test("[hypotenuse] (calculations::operators) returns hypotenuse for 3-4-5 right triangle", async () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(4),
		Constant("Number")(3),
	])

	expect(await hypotenuse(op)()).toMatchObject({ right: 5 })
})

test("[hypotenuse] (calculations::operators) returns hypotenuse for 5-12-13 right triangle", async () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(5),
		Constant("Number")(12),
	])

	expect(await hypotenuse(op)()).toMatchObject({ right: 13 })
})

test("[hypotenuse] (calculations::operators) returns hypotenuse for 3, 4, 5", async () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(3),
		Constant("Number")(4),
		Constant("Number")(5),
	])

	expect(await hypotenuse(op)()).toMatchObject({ right: 7.0710678118654755 })
})

test("[hypotenuse] (calculations::operators) returns hypotenuse for -5", async () => {
	const op = Hypotenuse("Number")([Constant("Number")(-5)])

	expect(await hypotenuse(op)()).toMatchObject({ right: 5 })
})

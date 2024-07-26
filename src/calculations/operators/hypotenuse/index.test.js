import { expect, test } from "vitest"

import Constant from "../../../injectors/constructors/Constant"
import Hypotenuse from "../constructors/Hypotenuse"
import hypotenuse from "."

test("[hypotenuse] (calculations::operators) returns hypotenuse for 3-4-5 right triangle", () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(4),
		Constant("Number")(3),
	])

	expect(hypotenuse(op)()).toMatchObject({ right: 5 })
})

test("[hypotenuse] (calculations::operators) returns hypotenuse for 5-12-13 right triangle", () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(5),
		Constant("Number")(12),
	])

	expect(hypotenuse(op)()).toMatchObject({ right: 13 })
})

test("[hypotenuse] (calculations::operators) returns hypotenuse for 3, 4, 5", () => {
	const op = Hypotenuse("Number")([
		Constant("Number")(3),
		Constant("Number")(4),
		Constant("Number")(5),
	])

	expect(hypotenuse(op)()).toMatchObject({ right: 7.0710678118654755 })
})

test("[hypotenuse] (calculations::operators) returns hypotenuse for -5", () => {
	const op = Hypotenuse("Number")([Constant("Number")(-5)])

	expect(hypotenuse(op)()).toMatchObject({ right: 5 })
})

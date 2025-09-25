import { expect } from "@std/expect"

import isLeft from "../either/isLeft/index.ts"
import isRight from "../either/isRight/index.ts"
import doEither, { Left, Right } from "./index.ts"

Deno.test("doEither - sequences Right values", () => {
	const comp = doEither<string, number>(function* () {
		const a = (yield Right<number, string>(2)) as number
		const b = (yield Right<number, string>(3)) as number
		return a + b
	})

	expect(isRight(comp)).toBe(true)
	if (isRight(comp)) {
		expect(comp.right).toBe(5)
	}
})

Deno.test("doEither - short-circuits on Left", () => {
	const comp = doEither<string, number>(function* () {
		yield Left<string, number>("err")
		return 42
	})
	expect(isLeft(comp)).toBe(true)
})

import { assertEquals } from "@std/assert"

import isLeft from "../isLeft/index.ts"
import isRight from "../isRight/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"
import chain from "./index.ts"

Deno.test("chain - sequences Right computations", async (t) => {
	const divide = (x: number) => (y: number) =>
		y === 0 ? left<string, number>("div/0") : right(x / y)
	const sqrt = (n: number) =>
		n < 0 ? left<string, number>("neg") : right(Math.sqrt(n))

	await t.step("should chain successful computations", () => {
		const result = chain(sqrt)(right(16))
		const final = chain(divide(12))(result)
		assertEquals(isRight(final), true)
		if (isRight(final)) {
			assertEquals(final.right, 3)
		}
	})

	await t.step("should short-circuit on left", () => {
		const result = chain(sqrt)(right(-4))
		assertEquals(isLeft(result), true)
	})

	await t.step("should not execute function on left input", () => {
		let executed = false
		const fn = (n: number) => {
			executed = true
			return right<number, string>(n * 2)
		}
		const result = chain<string, number, number>(fn)(
			left<string, number>("fail"),
		)
		assertEquals(executed, false)
		assertEquals(isLeft(result), true)
	})

	await t.step("should chain multiple operations", () => {
		const parse = (s: string) => {
			const n = Number(s)
			return isNaN(n) ? left<string, number>("nan") : right<number, string>(n)
		}
		const positive = (n: number) =>
			n > 0 ? right<number, string>(n) : left<string, number>("neg")
		const doubleIt = (n: number) => right<number, string>(n * 2)
		const step1 = parse("21")
		const step2 = chain(positive)(step1)
		const step3 = chain(doubleIt)(step2)
		assertEquals(isRight(step3), true)
		if (isRight(step3)) {
			assertEquals(step3.right, 42)
		}
	})
})

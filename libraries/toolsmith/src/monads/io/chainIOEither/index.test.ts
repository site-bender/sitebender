import { assertEquals } from "@std/assert"

import left from "../../either/left/index.ts"
import right from "../../either/right/index.ts"
import ioToIoEither from "../ioToIoEither/index.ts"
import of from "../of/index.ts"
import runIO from "../runIO/index.ts"
import chainIoEither from "./index.ts"

Deno.test("chainIoEither", async (t) => {
	await t.step("chains IoEither returning Right", () => {
		const ioEither = ioToIoEither<string, number>(of(10))
		const transform = function double(n: number) {
			return ioToIoEither<string, number>(of(n * 2))
		}

		const result = chainIoEither(transform)(ioEither)
		const value = runIO(result)

		assertEquals(value._tag, "Right")
		if (value._tag === "Right") {
			assertEquals(value.right, 20)
		}
	})

	await t.step("short-circuits on Left", () => {
		const ioEither = function ioLeft() {
			return left<string, number>("error")
		}
		const transform = function double(n: number) {
			return ioToIoEither<string, number>(of(n * 2))
		}

		const result = chainIoEither(transform)(ioEither)
		const value = runIO(result)

		assertEquals(value._tag, "Left")
		if (value._tag === "Left") {
			assertEquals(value.left, "error")
		}
	})

	await t.step("chains multiple operations", () => {
		const ioEither = ioToIoEither<string, number>(of(5))
		const addTen = function add(n: number) {
			return ioToIoEither<string, number>(of(n + 10))
		}
		const double = function mult(n: number) {
			return ioToIoEither<string, number>(of(n * 2))
		}

		const result = chainIoEither(double)(chainIoEither(addTen)(ioEither))
		const value = runIO(result)

		assertEquals(value._tag, "Right")
		if (value._tag === "Right") {
			assertEquals(value.right, 30)
		}
	})

	await t.step("transforms types", () => {
		const ioEither = ioToIoEither<string, number>(of(42))
		const toString = function convert(n: number) {
			return ioToIoEither<string, string>(of(`value: ${n}`))
		}

		const result = chainIoEither(toString)(ioEither)
		const value = runIO(result)

		assertEquals(value._tag, "Right")
		if (value._tag === "Right") {
			assertEquals(value.right, "value: 42")
		}
	})

	await t.step("supports currying", () => {
		const double = function doubleValue(n: number) {
			return ioToIoEither<string, number>(of(n * 2))
		}

		const chainDouble = chainIoEither(double)
		const io1 = ioToIoEither<string, number>(of(10))
		const io2 = ioToIoEither<string, number>(of(20))

		const result1 = runIO(chainDouble(io1))
		const result2 = runIO(chainDouble(io2))

		if (result1._tag === "Right") {
			assertEquals(result1.right, 20)
		}
		if (result2._tag === "Right") {
			assertEquals(result2.right, 40)
		}
	})

	await t.step("preserves Left value through chain", () => {
		const ioEither = function ioLeft() {
			return left<string, number>("first error")
		}
		const transform = function _unused(_n: number) {
			return function ioLeft2() {
				return left<string, number>("second error")
			}
		}

		const result = chainIoEither(transform)(ioEither)
		const value = runIO(result)

		assertEquals(value._tag, "Left")
		if (value._tag === "Left") {
			assertEquals(value.left, "first error")
		}
	})

	await t.step("lazy evaluation until run", () => {
		let executed = false

		const ioEither = ioToIoEither<string, number>(of(10))
		const transform = function track(n: number) {
			return function trackingIo() {
				executed = true
				return right<number, string>(n * 2)
			}
		}

		const chained = chainIoEither(transform)(ioEither)

		assertEquals(executed, false)

		runIO(chained)

		assertEquals(executed, true)
	})

	await t.step("handles complex error types", () => {
		type ErrorDetails = {
			readonly code: number
			readonly message: string
		}

		const ioEither = function ioError() {
			return left<ErrorDetails, number>({ code: 404, message: "Not found" })
		}
		const transform = function _unused(_n: number) {
			return ioToIoEither<ErrorDetails, number>(of(100))
		}

		const result = chainIoEither(transform)(ioEither)
		const value = runIO(result)

		assertEquals(value._tag, "Left")
		if (value._tag === "Left") {
			assertEquals(value.left.code, 404)
			assertEquals(value.left.message, "Not found")
		}
	})
})

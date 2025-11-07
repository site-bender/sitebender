import { assertEquals } from "@std/assert"

import just from "../../maybe/just/index.ts"
import nothing from "../../maybe/nothing/index.ts"
import ioToIoMaybe from "../ioToIoMaybe/index.ts"
import of from "../of/index.ts"
import runIO from "../runIO/index.ts"
import chainIoMaybe from "./index.ts"

Deno.test("chainIoMaybe", async (t) => {
	await t.step("chains IoMaybe returning Just", () => {
		const ioMaybe = ioToIoMaybe(of(10))
		const transform = function double(n: number) {
			return ioToIoMaybe(of(n * 2))
		}

		const result = chainIoMaybe(transform)(ioMaybe)
		const value = runIO(result)

		assertEquals(value._tag, "Just")
		if (value._tag === "Just") {
			assertEquals(value.value, 20)
		}
	})

	await t.step("short-circuits on Nothing", () => {
		const ioMaybe = function ioNothing() {
			return nothing<number>()
		}
		const transform = function double(n: number) {
			return ioToIoMaybe(of(n * 2))
		}

		const result = chainIoMaybe(transform)(ioMaybe)
		const value = runIO(result)

		assertEquals(value._tag, "Nothing")
	})

	await t.step("chains multiple operations", () => {
		const ioMaybe = ioToIoMaybe(of(5))
		const addTen = function add(n: number) {
			return ioToIoMaybe(of(n + 10))
		}
		const double = function mult(n: number) {
			return ioToIoMaybe(of(n * 2))
		}

		const result = chainIoMaybe(double)(chainIoMaybe(addTen)(ioMaybe))
		const value = runIO(result)

		if (value._tag === "Just") {
			assertEquals(value.value, 30)
		}
	})

	await t.step("transforms types", () => {
		const ioMaybe = ioToIoMaybe(of(42))
		const toString = function convert(n: number) {
			return ioToIoMaybe(of(`value: ${n}`))
		}

		const result = chainIoMaybe(toString)(ioMaybe)
		const value = runIO(result)

		if (value._tag === "Just") {
			assertEquals(value.value, "value: 42")
		}
	})

	await t.step("supports currying", () => {
		const double = function doubleValue(n: number) {
			return ioToIoMaybe(of(n * 2))
		}

		const chainDouble = chainIoMaybe(double)
		const io1 = ioToIoMaybe(of(10))
		const io2 = ioToIoMaybe(of(20))

		const result1 = runIO(chainDouble(io1))
		const result2 = runIO(chainDouble(io2))

		if (result1._tag === "Just") {
			assertEquals(result1.value, 20)
		}
		if (result2._tag === "Just") {
			assertEquals(result2.value, 40)
		}
	})

	await t.step("lazy evaluation until run", () => {
		let executed = false

		const ioMaybe = ioToIoMaybe(of(10))
		const transform = function track(n: number) {
			return function trackingIo() {
				executed = true
				return just(n * 2)
			}
		}

		const chained = chainIoMaybe(transform)(ioMaybe)

		assertEquals(executed, false)

		runIO(chained)

		assertEquals(executed, true)
	})
})

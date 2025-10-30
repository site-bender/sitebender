import { assertEquals } from "@std/assert"

import of from "../of/index.ts"
import runIO from "../runIO/index.ts"
import ioToIoEither from "./index.ts"

Deno.test("ioToIoEither", async (t) => {
	await t.step("converts Io to IoEither wrapping in Right", () => {
		const io = of(42)
		const ioEither = ioToIoEither<string, number>(io)
		const result = runIO(ioEither)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("preserves IO laziness", () => {
		let executed = false

		const io = function trackingIo() {
			executed = true
			return 100
		}

		const ioEither = ioToIoEither<string, number>(io)

		assertEquals(executed, false)

		runIO(ioEither)

		assertEquals(executed, true)
	})

	await t.step("converts string values", () => {
		const io = of("hello")
		const ioEither = ioToIoEither<number, string>(io)
		const result = runIO(ioEither)

		if (result._tag === "Right") {
			assertEquals(result.right, "hello")
		}
	})

	await t.step("converts null values", () => {
		const io = of(null)
		const ioEither = ioToIoEither<string, null>(io)
		const result = runIO(ioEither)

		if (result._tag === "Right") {
			assertEquals(result.right, null)
		}
	})

	await t.step("converts undefined values", () => {
		const io = of(undefined)
		const ioEither = ioToIoEither<string, undefined>(io)
		const result = runIO(ioEither)

		if (result._tag === "Right") {
			assertEquals(result.right, undefined)
		}
	})

	await t.step("converts complex types", () => {
		type User = {
			readonly id: number
			readonly name: string
		}

		const user: User = { id: 1, name: "Alice" }
		const io = of(user)
		const ioEither = ioToIoEither<string, User>(io)
		const result = runIO(ioEither)

		if (result._tag === "Right") {
			assertEquals(result.right.id, 1)
			assertEquals(result.right.name, "Alice")
		}
	})

	await t.step("can be chained with other IoEither operations", () => {
		const io = of(10)
		const ioEither = ioToIoEither<string, number>(io)
		const result = runIO(ioEither)

		assertEquals(result._tag, "Right")
	})

	await t.step("maintains referential transparency", () => {
		const io = of(42)
		const ioEither = ioToIoEither<string, number>(io)

		const result1 = runIO(ioEither)
		const result2 = runIO(ioEither)

		if (result1._tag === "Right" && result2._tag === "Right") {
			assertEquals(result1.right, result2.right)
		}
	})
})

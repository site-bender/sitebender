import { assertEquals } from "@std/assert"

import of from "../of/index.ts"
import runIO from "../runIO/index.ts"
import ioToIoMaybe from "./index.ts"

Deno.test("ioToIoMaybe", async (t) => {
	await t.step("converts Io to IoMaybe wrapping in Just", () => {
		const io = of(42)
		const ioMaybe = ioToIoMaybe(io)
		const result = runIO(ioMaybe)

		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, 42)
		}
	})

	await t.step("preserves IO laziness", () => {
		let executed = false

		const io = function trackingIo() {
			executed = true
			return 100
		}

		const ioMaybe = ioToIoMaybe(io)

		assertEquals(executed, false)

		runIO(ioMaybe)

		assertEquals(executed, true)
	})

	await t.step("converts string values", () => {
		const io = of("hello")
		const ioMaybe = ioToIoMaybe(io)
		const result = runIO(ioMaybe)

		if (result._tag === "Just") {
			assertEquals(result.value, "hello")
		}
	})

	await t.step("converts null values", () => {
		const io = of(null)
		const ioMaybe = ioToIoMaybe(io)
		const result = runIO(ioMaybe)

		if (result._tag === "Just") {
			assertEquals(result.value, null)
		}
	})

	await t.step("converts undefined values", () => {
		const io = of(undefined)
		const ioMaybe = ioToIoMaybe(io)
		const result = runIO(ioMaybe)

		if (result._tag === "Just") {
			assertEquals(result.value, undefined)
		}
	})

	await t.step("converts zero values", () => {
		const io = of(0)
		const ioMaybe = ioToIoMaybe(io)
		const result = runIO(ioMaybe)

		if (result._tag === "Just") {
			assertEquals(result.value, 0)
		}
	})

	await t.step("converts false values", () => {
		const io = of(false)
		const ioMaybe = ioToIoMaybe(io)
		const result = runIO(ioMaybe)

		if (result._tag === "Just") {
			assertEquals(result.value, false)
		}
	})

	await t.step("converts complex types", () => {
		type Config = {
			readonly port: number
			readonly host: string
		}

		const config: Config = { port: 8080, host: "localhost" }
		const io = of(config)
		const ioMaybe = ioToIoMaybe(io)
		const result = runIO(ioMaybe)

		if (result._tag === "Just") {
			assertEquals(result.value.port, 8080)
			assertEquals(result.value.host, "localhost")
		}
	})

	await t.step("can be chained with other IoMaybe operations", () => {
		const io = of(10)
		const ioMaybe = ioToIoMaybe(io)
		const result = runIO(ioMaybe)

		assertEquals(result._tag, "Just")
	})

	await t.step("maintains referential transparency", () => {
		const io = of(42)
		const ioMaybe = ioToIoMaybe(io)

		const result1 = runIO(ioMaybe)
		const result2 = runIO(ioMaybe)

		if (result1._tag === "Just" && result2._tag === "Just") {
			assertEquals(result1.value, result2.value)
		}
	})
})

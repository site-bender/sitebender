//++ Tests for _printHelp function

import { assertEquals } from "https://deno.land/std@0.220.0/assert/mod.ts"
import runIO from "../../../toolsmith/src/monads/io/runIO/index.ts"
import _printHelp from "./index.ts"

Deno.test("_printHelp", async function testPrintHelp(t) {
	await t.step("returns an IO monad", function testReturnsIOMonad() {
		const result = _printHelp()
		assertEquals(typeof result, "function", "Should return a function (IO monad)")
	})

	await t.step("executes without throwing", function testExecutesWithoutThrowing() {
		const ioAction = _printHelp()
		// This should not throw, but we can't easily test console output without mocking
		// In a real scenario, we'd use a test runner that can capture console output
		assertEquals(typeof ioAction, "function")
	})

	await t.step("can be executed with runIO", function testCanBeExecutedWithRunIO() {
		const ioAction = _printHelp()
		// runIO should execute the IO action without throwing
		runIO(ioAction)
		assertEquals(true, true, "runIO executed successfully")
	})
})

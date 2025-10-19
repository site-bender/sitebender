//++ Tests for _printHelp function

import { assertEquals } from "@std/assert"
import runIO from "../../../toolsmith/src/monads/io/runIO/index.ts"
import _printHelp from "./index.ts"
import { HELP_MESSAGE } from "./constants/index.ts"

Deno.test("_printHelp", async function testPrintHelp(t) {
	await t.step("returns an IO monad (function)", function testReturnsIOMonad() {
		const result = _printHelp()
		assertEquals(typeof result, "function")
	})

	await t.step("defers execution until IO is run", function testDefersExecution() {
		const originalLog = console.log
		let callCount = 0

		console.log = function interceptLog(_message: string): void {
			callCount = callCount + 1
		}

		const ioAction = _printHelp()
		assertEquals(callCount, 0, "console.log should not be called when creating IO")

		runIO(ioAction)
		assertEquals(callCount, 1, "console.log should be called exactly once when running IO")

		console.log = originalLog
	})

	await t.step("prints the correct help message", function testPrintsCorrectMessage() {
		const originalLog = console.log
		let capturedOutput = ""

		console.log = function interceptLog(message: string): void {
			capturedOutput = message
		}

		runIO(_printHelp())

		assertEquals(capturedOutput, HELP_MESSAGE, "Should print the exact HELP_MESSAGE constant")

		console.log = originalLog
	})

	await t.step("multiple calls return equivalent IOs (referential transparency)", function testReferentialTransparency() {
		const originalLog = console.log
		let output1 = ""
		let output2 = ""

		console.log = function interceptLog(message: string): void {
			output1 = message
		}
		const io1 = _printHelp()
		runIO(io1)

		console.log = function interceptLog(message: string): void {
			output2 = message
		}
		const io2 = _printHelp()
		runIO(io2)

		assertEquals(output1, output2, "Multiple calls should produce identical output")
		assertEquals(output1, HELP_MESSAGE, "Output should match HELP_MESSAGE constant")

		console.log = originalLog
	})
})

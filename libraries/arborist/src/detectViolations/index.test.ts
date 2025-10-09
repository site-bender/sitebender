// @sitebender/arborist/src/detectViolations/index.test.ts

import { assertEquals } from "@std/assert"
import { parse } from "npm:@swc/wasm-web@1.13.20"

import fold from "@sitebender/toolsmith/monads/validation/fold/index.ts"

import type { ParsedAst, ViolationInfo } from "../types/index.ts"
import _ensureSwcInitialized from "../parseFile/_ensureSwcInitialized/index.ts"
import detectViolations from "./index.ts"

async function createParsedAst(sourceText: string): Promise<ParsedAst> {
	await _ensureSwcInitialized()

	const module = await parse(sourceText, {
		syntax: "typescript",
		tsx: true,
		target: "es2022",
	})

	return {
		module,
		sourceText,
		filePath: "/test/fixture.ts",
	}
}

Deno.test({
	name: "detectViolations - detects arrow functions",
	sanitizeResources: false,
	sanitizeOps: false,
	async fn() {
		const ast = await createParsedAst(`
		const add = (a: number, b: number) => a + b
	`)

		const result = detectViolations(ast)

		fold(function handleSuccess(violations: ViolationInfo) {
			assertEquals(violations.hasArrowFunctions, true)
			assertEquals(violations.arrowFunctions.length, 1)
		})(
			() => {
				throw new Error("Should not fail")
			},
		)(result)
	},
})

Deno.test("detectViolations - detects classes", async () => {
	const ast = await createParsedAst(`
		class MyClass {
			method() {}
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasClasses, true)
		assertEquals(violations.classes.length, 1)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - detects throw statements", async () => {
	const ast = await createParsedAst(`
		function test() {
			throw new Error("test")
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasThrowStatements, true)
		assertEquals(violations.throwStatements.length, 1)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - detects try/catch blocks", async () => {
	const ast = await createParsedAst(`
		function test() {
			try {
				doSomething()
			} catch (e) {
				handleError(e)
			}
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasTryCatch, true)
		assertEquals(violations.tryCatchBlocks.length, 1)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - detects for loops", async () => {
	const ast = await createParsedAst(`
		function test() {
			for (let i = 0; i < 10; i++) {
				console.log(i)
			}
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasLoops, true)
		assertEquals(violations.loops.length, 1)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - detects for-in loops", async () => {
	const ast = await createParsedAst(`
		function test(obj: object) {
			for (const key in obj) {
				console.log(key)
			}
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasLoops, true)
		assertEquals(violations.loops.length, 1)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - detects for-of loops", async () => {
	const ast = await createParsedAst(`
		function test(arr: number[]) {
			for (const item of arr) {
				console.log(item)
			}
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasLoops, true)
		assertEquals(violations.loops.length, 1)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - detects while loops", async () => {
	const ast = await createParsedAst(`
		function test() {
			while (true) {
				break
			}
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasLoops, true)
		assertEquals(violations.loops.length, 1)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - detects update expressions (mutations)", async () => {
	const ast = await createParsedAst(`
		function test() {
			let x = 0
			x++
			++x
			x--
			--x
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasMutations, true)
		assertEquals(violations.mutations.length, 4)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - detects assignment mutations", async () => {
	const ast = await createParsedAst(`
		function test() {
			let x = 0
			x = 5
			x += 10
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasMutations, true)
		assertEquals(violations.mutations.length, 2)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - no violations in clean code", async () => {
	const ast = await createParsedAst(`
		export default function add(augend: number) {
			return function addToAugend(addend: number): number {
				return augend + addend
			}
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasArrowFunctions, false)
		assertEquals(violations.hasClasses, false)
		assertEquals(violations.hasThrowStatements, false)
		assertEquals(violations.hasTryCatch, false)
		assertEquals(violations.hasLoops, false)
		assertEquals(violations.hasMutations, false)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

Deno.test("detectViolations - multiple violations in one file", async () => {
	const ast = await createParsedAst(`
		const arrow = (x: number) => x + 1

		class BadClass {}

		function bad() {
			throw new Error("bad")

			try {
				doThing()
			} catch (e) {}

			for (let i = 0; i < 10; i++) {}

			let x = 0
			x++
		}
	`)

	const result = detectViolations(ast)

	fold(function handleSuccess(violations: ViolationInfo) {
		assertEquals(violations.hasArrowFunctions, true)
		assertEquals(violations.arrowFunctions.length, 1)
		assertEquals(violations.hasClasses, true)
		assertEquals(violations.classes.length, 1)
		assertEquals(violations.hasThrowStatements, true)
		assertEquals(violations.throwStatements.length, 1)
		assertEquals(violations.hasTryCatch, true)
		assertEquals(violations.tryCatchBlocks.length, 1)
		assertEquals(violations.hasLoops, true)
		assertEquals(violations.loops.length, 1)
		assertEquals(violations.hasMutations, true)
		// Detects both i++ in the for loop and x++ in the function body
		assertEquals(violations.mutations.length, 2)
	})(
		() => {
			throw new Error("Should not fail")
		},
	)(result)
})

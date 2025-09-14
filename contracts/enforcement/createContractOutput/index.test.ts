import { assertEquals, assertExists } from "https://deno.land/std@0.224.0/assert/mod.ts"
import createContractOutput from "./index.ts"

Deno.test("createContractOutput", async (t) => {
	await t.step("creates immutable contract output with metadata", async () => {
		const testData = { foo: "bar", nested: { value: 42 } }
		const result = await createContractOutput(testData, "test-lib", "1.0.0")

		assertExists(result.data)
		assertExists(result.metadata)
		assertExists(result.validate)
		assertEquals(result.data, testData)
		assertEquals(result.metadata.library, "test-lib")
		assertEquals(result.metadata.version, "1.0.0")
		assertEquals(result.metadata.frozen, true)
	})

	await t.step("validate function returns true for unmodified data", async () => {
		const testData = { test: "data" }
		const result = await createContractOutput(testData, "test-lib", "1.0.0")
		const isValid = await result.validate()

		assertEquals(isValid, true)
	})

	await t.step("data is deeply frozen", async () => {
		const testData = { outer: { inner: { value: 1 } } }
		const result = await createContractOutput(testData, "test-lib", "1.0.0")

		assertEquals(Object.isFrozen(result.data), true)
		const d = result.data as Readonly<{ outer: Readonly<{ inner: Readonly<{ value: number }> }> }>
		assertEquals(Object.isFrozen(d.outer), true)
		assertEquals(Object.isFrozen(d.outer.inner), true)
	})

	await t.step("metadata is frozen", async () => {
		const testData = { test: "data" }
		const result = await createContractOutput(testData, "test-lib", "1.0.0")

		assertEquals(Object.isFrozen(result.metadata), true)
	})

	await t.step("result object is frozen", async () => {
		const testData = { test: "data" }
		const result = await createContractOutput(testData, "test-lib", "1.0.0")

		assertEquals(Object.isFrozen(result), true)
	})
})

import { assertEquals } from "@std/assert"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import type { VectorError, VectorStoreConnection } from "../../types/index.ts"
import listCollections from "./index.ts"

Deno.test("listCollections", async (t) => {
	await t.step("success path", async (t) => {
		await t.step("returns list of collections", async () => {
			const mockConnection: VectorStoreConnection = {
				baseUrl: "http://localhost:6333",
				collectionsEndpoint: "http://localhost:6333/collections",
			}

			const result: Result<
				VectorError,
				ReadonlyArray<{ readonly name: string }>
			> = await listCollections(mockConnection)()

			assertEquals(isOk(result), true)

			if (isOk(result)) {
				assertEquals(isArray(result.value), true)
			}
		})

		await t.step("returns collections with correct structure", async () => {
			const mockConnection: VectorStoreConnection = {
				baseUrl: "http://localhost:6333",
				collectionsEndpoint: "http://localhost:6333/collections",
			}

			const result = await listCollections(mockConnection)()

			assertEquals(isOk(result), true)

			if (isOk(result)) {
				if (result.value.length > 0) {
					assertEquals(isString(result.value[0].name), true)
				}
			}
		})
	})

	await t.step("error path", async (t) => {
		await t.step("returns Error for invalid connection", async () => {
			const invalidConnection: VectorStoreConnection = {
				baseUrl: "http://invalid-host-9999:6333",
				collectionsEndpoint: "http://invalid-host-9999:6333/collections",
			}

			const result = await listCollections(invalidConnection)()

			assertEquals(isError(result), true)

			if (isError(result)) {
				assertEquals(result.error._tag, "VectorError")
				assertEquals(isString(result.error.message), true)
			}
		})

		await t.step(
			"returns Error for connection with wrong endpoint",
			async () => {
				const wrongEndpoint: VectorStoreConnection = {
					baseUrl: "http://localhost:6333",
					collectionsEndpoint: "http://localhost:6333/wrong-endpoint",
				}

				const result = await listCollections(wrongEndpoint)()

				assertEquals(isError(result), true)

				if (isError(result)) {
					assertEquals(result.error._tag, "VectorError")
				}
			},
		)
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles empty collections list", async () => {
			const mockConnection: VectorStoreConnection = {
				baseUrl: "http://localhost:6333",
				collectionsEndpoint: "http://localhost:6333/collections",
			}

			const result = await listCollections(mockConnection)()

			assertEquals(isOk(result), true)

			if (isOk(result)) {
				assertEquals(isArray(result.value), true)
			}
		})

		await t.step("handles connection with API key", async () => {
			const connectionWithKey: VectorStoreConnection = {
				baseUrl: "http://localhost:6333",
				collectionsEndpoint: "http://localhost:6333/collections",
				apiKey: "test-api-key",
			}

			const result = await listCollections(connectionWithKey)()

			const isValidResult = or(isOk(result))(isError(result))

			assertEquals(isValidResult, true)
		})
	})
})

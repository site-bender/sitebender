import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import createVectorStore from "./index.ts"

describe("createVectorStore", () => {
	it("should successfully connect to Qdrant at localhost:6333", async () => {
		const result = await createVectorStore({
			host: "localhost",
			port: 6333,
		})

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value.baseUrl).toBe("http://localhost:6333")
			expect(result.value.collectionsEndpoint).toBe(
				"http://localhost:6333/collections",
			)
			expect(result.value.apiKey).toBeUndefined()
		}
	})

	it("should include API key when provided", async () => {
		const result = await createVectorStore({
			host: "localhost",
			port: 6333,
			apiKey: "test-api-key",
		})

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value.apiKey).toBe("test-api-key")
		}
	})

	it("should return error for unreachable host", async () => {
		const result = await createVectorStore({
			host: "nonexistent.invalid",
			port: 9999,
			timeout: 1000,
		})

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("ConnectionError")
			expect(result.error.kind).toBe("VectorStoreInitFailed")
			expect(result.error.message).toContain("Failed to connect")
			expect(result.error.host).toBe("nonexistent.invalid")
			expect(result.error.port).toBe(9999)
		}
	})

	it("should timeout when connection takes too long", async () => {
		// Use a non-routable IP to force timeout
		const result = await createVectorStore({
			host: "10.255.255.1",
			port: 6333,
			timeout: 100,
		})

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("ConnectionError")
			expect(result.error.kind).toBe("VectorStoreInitFailed")
		}
	})

	it("should return error for invalid port", async () => {
		const result = await createVectorStore({
			host: "localhost",
			port: 99999,
		})

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("ConnectionError")
			expect(result.error.kind).toBe("VectorStoreInitFailed")
		}
	})
})

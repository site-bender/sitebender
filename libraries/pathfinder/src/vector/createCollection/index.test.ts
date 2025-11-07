import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import createCollection from "./index.ts"
import createVectorStore from "../../connection/createVectorStore/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"

describe("createCollection", () => {
	let connection: VectorStoreConnection

	// Helper to delete collection if it exists
	async function deleteCollectionIfExists(
		name: string,
	): Promise<void> {
		const headers: Record<string, string> = {}
		if (connection.apiKey) {
			headers["api-key"] = connection.apiKey
		}

		const response = await fetch(
			`${connection.collectionsEndpoint}/${name}`,
			{
				method: "DELETE",
				headers,
			},
		)

		// Consume response body to prevent resource leak
		await response.body?.cancel()
	}

	// Create connection before tests
	async function setup(): Promise<void> {
		const result = await createVectorStore({
			host: "localhost",
			port: 6333,
		})

		if (result._tag === "Ok") {
			connection = result.value
		} else {
			throw new Error("Failed to create vector store connection")
		}
	}

	it("should successfully create a collection with Cosine distance", async () => {
		await setup()
		await deleteCollectionIfExists("test_cosine")

		const result = await createCollection({
			name: "test_cosine",
			dimension: 128,
			distance: "Cosine",
		})(connection)

		expect(result._tag).toBe("Ok")

		// Cleanup
		await deleteCollectionIfExists("test_cosine")
	})

	it("should successfully create a collection with Euclidean distance", async () => {
		await setup()
		await deleteCollectionIfExists("test_euclidean")

		const result = await createCollection({
			name: "test_euclidean",
			dimension: 256,
			distance: "Euclid",
		})(connection)

		expect(result._tag).toBe("Ok")

		// Cleanup
		await deleteCollectionIfExists("test_euclidean")
	})

	it("should successfully create a collection with Dot product distance", async () => {
		await setup()
		await deleteCollectionIfExists("test_dot")

		const result = await createCollection({
			name: "test_dot",
			dimension: 512,
			distance: "Dot",
		})(connection)

		expect(result._tag).toBe("Ok")

		// Cleanup
		await deleteCollectionIfExists("test_dot")
	})

	it("should successfully create a collection with Manhattan distance", async () => {
		await setup()
		await deleteCollectionIfExists("test_manhattan")

		const result = await createCollection({
			name: "test_manhattan",
			dimension: 384,
			distance: "Manhattan",
		})(connection)

		expect(result._tag).toBe("Ok")

		// Cleanup
		await deleteCollectionIfExists("test_manhattan")
	})

	it("should handle creating a collection that already exists", async () => {
		await setup()
		await deleteCollectionIfExists("test_duplicate")

		// Create first time
		const firstResult = await createCollection({
			name: "test_duplicate",
			dimension: 128,
			distance: "Cosine",
		})(connection)

		expect(firstResult._tag).toBe("Ok")

		// Try to create again - Qdrant returns error for duplicate
		const secondResult = await createCollection({
			name: "test_duplicate",
			dimension: 128,
			distance: "Cosine",
		})(connection)

		// Qdrant should return error for already existing collection
		expect(secondResult._tag).toBe("Error")
		if (secondResult._tag === "Error") {
			expect(secondResult.error._tag).toBe("VectorError")
			expect(secondResult.error.kind).toBe("InsertFailed")
		}

		// Cleanup
		await deleteCollectionIfExists("test_duplicate")
	})

	it("should verify collection is actually created", async () => {
		await setup()
		await deleteCollectionIfExists("test_verify")

		// Create collection
		await createCollection({
			name: "test_verify",
			dimension: 768,
			distance: "Cosine",
		})(connection)

		// Verify by fetching collection info
		const headers: Record<string, string> = {}
		if (connection.apiKey) {
			headers["api-key"] = connection.apiKey
		}

		const response = await fetch(
			`${connection.collectionsEndpoint}/test_verify`,
			{ headers },
		)

		expect(response.ok).toBe(true)

		const data = (await response.json()) as {
			result: {
				config: { params: { vectors: { size: number; distance: string } } }
			}
		}
		expect(data.result.config.params.vectors.size).toBe(768)
		expect(data.result.config.params.vectors.distance).toBe("Cosine")

		// Cleanup
		await deleteCollectionIfExists("test_verify")
	})
})

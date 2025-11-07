import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import searchPoints from "./index.ts"
import insertPoints from "../insertPoints/index.ts"
import createCollection from "../createCollection/index.ts"
import createVectorStore from "../../connection/createVectorStore/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"

describe("searchPoints", () => {
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

	it("should find nearest neighbors", async () => {
		await setup()
		const collectionName = "test_search_nearest"
		await deleteCollectionIfExists(collectionName)

		// Create collection
		await createCollection({
			name: collectionName,
			dimension: 3,
			distance: "Cosine",
		})(connection)

		// Insert test vectors
		await insertPoints({
			collectionName,
			points: [
				{
					id: 1,
					vector: [1.0, 0.0, 0.0],
					payload: { label: "x-axis" },
				},
				{
					id: 2,
					vector: [0.0, 1.0, 0.0],
					payload: { label: "y-axis" },
				},
				{
					id: 3,
					vector: [0.0, 0.0, 1.0],
					payload: { label: "z-axis" },
				},
			],
		})(connection)

		// Search for vector similar to x-axis
		const result = await searchPoints({
			collectionName,
			vector: [0.9, 0.1, 0.0],
			limit: 2,
		})(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value.length).toBe(2)
			expect(result.value[0].id).toBe(1) // Closest to x-axis
			expect(result.value[0].score).toBeGreaterThan(0)
		}

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should respect limit parameter", async () => {
		await setup()
		const collectionName = "test_search_limit"
		await deleteCollectionIfExists(collectionName)

		// Create collection and insert points
		await createCollection({
			name: collectionName,
			dimension: 2,
			distance: "Euclid",
		})(connection)

		await insertPoints({
			collectionName,
			points: [
				{ id: 1, vector: [1.0, 0.0] },
				{ id: 2, vector: [0.0, 1.0] },
				{ id: 3, vector: [1.0, 1.0] },
				{ id: 4, vector: [0.5, 0.5] },
			],
		})(connection)

		// Search with limit 2
		const result = await searchPoints({
			collectionName,
			vector: [0.5, 0.5],
			limit: 2,
		})(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value.length).toBe(2)
		}

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should include payload when requested", async () => {
		await setup()
		const collectionName = "test_search_payload"
		await deleteCollectionIfExists(collectionName)

		// Create collection and insert points
		await createCollection({
			name: collectionName,
			dimension: 2,
			distance: "Dot",
		})(connection)

		await insertPoints({
			collectionName,
			points: [
				{
					id: 1,
					vector: [1.0, 0.0],
					payload: { category: "A", value: 100 },
				},
			],
		})(connection)

		// Search with payload
		const result = await searchPoints({
			collectionName,
			vector: [1.0, 0.0],
			limit: 1,
			withPayload: true,
		})(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value[0].payload).toBeDefined()
			expect(result.value[0].payload?.category).toBe("A")
			expect(result.value[0].payload?.value).toBe(100)
		}

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should include vectors when requested", async () => {
		await setup()
		const collectionName = "test_search_vectors"
		await deleteCollectionIfExists(collectionName)

		// Create collection and insert points
		await createCollection({
			name: collectionName,
			dimension: 2,
			distance: "Cosine",
		})(connection)

		await insertPoints({
			collectionName,
			points: [
				{ id: 1, vector: [1.0, 0.0] },
			],
		})(connection)

		// Search with vectors
		const result = await searchPoints({
			collectionName,
			vector: [1.0, 0.0],
			limit: 1,
			withVector: true,
		})(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value[0].vector).toBeDefined()
			expect(result.value[0].vector).toEqual([1.0, 0.0])
		}

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should filter by score threshold", async () => {
		await setup()
		const collectionName = "test_search_threshold"
		await deleteCollectionIfExists(collectionName)

		// Create collection and insert points
		await createCollection({
			name: collectionName,
			dimension: 3,
			distance: "Cosine",
		})(connection)

		await insertPoints({
			collectionName,
			points: [
				{ id: 1, vector: [1.0, 0.0, 0.0] }, // Exact match
				{ id: 2, vector: [0.5, 0.5, 0.0] }, // Partial match
				{ id: 3, vector: [0.0, 1.0, 0.0] }, // Low similarity
			],
		})(connection)

		// Search with high threshold
		const result = await searchPoints({
			collectionName,
			vector: [1.0, 0.0, 0.0],
			limit: 10,
			scoreThreshold: 0.9,
		})(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			// Should only return high-scoring results
			expect(result.value.length).toBeGreaterThan(0)
			for (const point of result.value) {
				expect(point.score).toBeGreaterThanOrEqual(0.9)
			}
		}

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should return error for non-existent collection", async () => {
		await setup()

		const result = await searchPoints({
			collectionName: "nonexistent_collection",
			vector: [1.0, 0.0],
			limit: 10,
		})(connection)

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("VectorError")
			expect(result.error.kind).toBe("SearchFailed")
			expect(result.error.collection).toBe("nonexistent_collection")
		}
	})

	it("should handle empty search results", async () => {
		await setup()
		const collectionName = "test_search_empty"
		await deleteCollectionIfExists(collectionName)

		// Create collection but don't insert any points
		await createCollection({
			name: collectionName,
			dimension: 2,
			distance: "Cosine",
		})(connection)

		// Search in empty collection
		const result = await searchPoints({
			collectionName,
			vector: [1.0, 0.0],
			limit: 10,
		})(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value.length).toBe(0)
		}

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})
})

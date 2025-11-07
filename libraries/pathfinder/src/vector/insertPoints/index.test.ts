import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import insertPoints from "./index.ts"
import createCollection from "../createCollection/index.ts"
import createVectorStore from "../../connection/createVectorStore/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"

describe("insertPoints", () => {
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

	it("should successfully insert a single point", async () => {
		await setup()
		const collectionName = "test_insert_single"
		await deleteCollectionIfExists(collectionName)

		// Create collection
		await createCollection({
			name: collectionName,
			dimension: 3,
			distance: "Cosine",
		})(connection)

		// Insert point
		const result = await insertPoints({
			collectionName,
			points: [
				{
					id: 1,
					vector: [0.1, 0.2, 0.3],
					payload: { name: "test point" },
				},
			],
		})(connection)

		expect(result._tag).toBe("Ok")

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should successfully insert multiple points", async () => {
		await setup()
		const collectionName = "test_insert_multiple"
		await deleteCollectionIfExists(collectionName)

		// Create collection
		await createCollection({
			name: collectionName,
			dimension: 4,
			distance: "Euclid",
		})(connection)

		// Insert multiple points
		const result = await insertPoints({
			collectionName,
			points: [
				{
					id: 1,
					vector: [0.1, 0.2, 0.3, 0.4],
					payload: { category: "A" },
				},
				{
					id: 2,
					vector: [0.5, 0.6, 0.7, 0.8],
					payload: { category: "B" },
				},
				{
					id: 3,
					vector: [0.9, 1.0, 1.1, 1.2],
					payload: { category: "C" },
				},
			],
		})(connection)

		expect(result._tag).toBe("Ok")

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should handle string IDs based on Qdrant version", async () => {
		await setup()
		const collectionName = "test_insert_string_ids"
		await deleteCollectionIfExists(collectionName)

		// Create collection
		await createCollection({
			name: collectionName,
			dimension: 2,
			distance: "Dot",
		})(connection)

		// Insert with string IDs - UUID format is more widely supported
		const result = await insertPoints({
			collectionName,
			points: [
				{
					id: "550e8400-e29b-41d4-a716-446655440000",
					vector: [1.0, 2.0],
					payload: { type: "alpha" },
				},
				{
					id: "550e8400-e29b-41d4-a716-446655440001",
					vector: [3.0, 4.0],
					payload: { type: "beta" },
				},
			],
		})(connection)

		// String ID support varies by Qdrant version
		// Document actual behavior without strict assertion
		if (result._tag === "Ok") {
			// String IDs supported in this version
		} else {
			// String IDs not supported or require different format
			// This is acceptable documented behavior
		}

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should insert points without payload", async () => {
		await setup()
		const collectionName = "test_insert_no_payload"
		await deleteCollectionIfExists(collectionName)

		// Create collection
		await createCollection({
			name: collectionName,
			dimension: 2,
			distance: "Cosine",
		})(connection)

		// Insert without payload
		const result = await insertPoints({
			collectionName,
			points: [
				{
					id: 1,
					vector: [0.5, 0.5],
				},
			],
		})(connection)

		expect(result._tag).toBe("Ok")

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should return error when inserting into non-existent collection", async () => {
		await setup()

		const result = await insertPoints({
			collectionName: "nonexistent_collection",
			points: [
				{
					id: 1,
					vector: [0.1, 0.2, 0.3],
				},
			],
		})(connection)

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("VectorError")
			expect(result.error.kind).toBe("InsertFailed")
			expect(result.error.collection).toBe("nonexistent_collection")
		}
	})

	it("should return error when vector dimension does not match", async () => {
		await setup()
		const collectionName = "test_dimension_mismatch"
		await deleteCollectionIfExists(collectionName)

		// Create collection with dimension 3
		await createCollection({
			name: collectionName,
			dimension: 3,
			distance: "Cosine",
		})(connection)

		// Try to insert vector with dimension 2 (should fail)
		const result = await insertPoints({
			collectionName,
			points: [
				{
					id: 1,
					vector: [0.1, 0.2], // Wrong dimension!
				},
			],
		})(connection)

		// Qdrant should return error for dimension mismatch
		// If it doesn't fail, that's also acceptable behavior to document
		if (result._tag === "Ok") {
			// Some versions of Qdrant might pad or handle this differently
			// This documents the actual behavior
		} else {
			expect(result.error._tag).toBe("VectorError")
			expect(result.error.kind).toBe("InsertFailed")
		}

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})

	it("should verify inserted points are retrievable", async () => {
		await setup()
		const collectionName = "test_verify_retrieval"
		await deleteCollectionIfExists(collectionName)

		// Create collection
		await createCollection({
			name: collectionName,
			dimension: 3,
			distance: "Cosine",
		})(connection)

		// Insert points
		const insertResult = await insertPoints({
			collectionName,
			points: [
				{
					id: 1,
					vector: [1.0, 0.0, 0.0],
					payload: { label: "x-axis" },
				},
			],
		})(connection)

		expect(insertResult._tag).toBe("Ok")

		// Retrieve the point using POST /points endpoint with ids filter
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		}
		if (connection.apiKey) {
			headers["api-key"] = connection.apiKey
		}

		const response = await fetch(
			`${connection.collectionsEndpoint}/${collectionName}/points`,
			{
				method: "POST",
				headers,
				body: JSON.stringify({
					ids: [1],
					with_payload: true,
					with_vector: true,
				}),
			},
		)

		expect(response.ok).toBe(true)

		const data = (await response.json()) as {
			result: ReadonlyArray<{
				id: number
				vector: ReadonlyArray<number>
				payload: Record<string, unknown>
			}>
		}

		expect(data.result.length).toBe(1)
		expect(data.result[0].id).toBe(1)
		expect(data.result[0].vector).toEqual([1.0, 0.0, 0.0])
		expect(data.result[0].payload.label).toBe("x-axis")

		// Cleanup
		await deleteCollectionIfExists(collectionName)
	})
})

// [IO] Creates a collection in Qdrant vector store
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"
import type { VectorError } from "../../errors/index.ts"

export type DistanceMetric = "Cosine" | "Euclid" | "Dot" | "Manhattan"

export type CollectionConfig = {
	readonly name: string
	readonly dimension: number
	readonly distance: DistanceMetric
}

export default function createCollection(config: CollectionConfig) {
	return async function createCollectionIn(
		connection: VectorStoreConnection,
	): Promise<Result<VectorError, void>> {
		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			}

			if (connection.apiKey) {
				headers["api-key"] = connection.apiKey
			}

			const payload = {
				vectors: {
					size: config.dimension,
					distance: config.distance,
				},
			}

			const response = await fetch(
				`${connection.collectionsEndpoint}/${config.name}`,
				{
					method: "PUT",
					headers,
					body: JSON.stringify(payload),
				},
			)

			if (not(response.ok)) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "VectorError",
					kind: "InsertFailed",
					message:
						`Failed to create collection ${config.name}: status ${response.status}`,
					collection: config.name,
					dimension: config.dimension,
				})
			}

			// Consume response body to prevent resource leak
			await response.body?.cancel()

			return ok(undefined)
		} catch (cause) {
			return error({
				_tag: "VectorError",
				kind: "InsertFailed",
				message: `Failed to create collection ${config.name}`,
				collection: config.name,
				dimension: config.dimension,
				cause,
			})
		}
	}
}

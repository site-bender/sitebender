// [IO] Searches for similar vectors in a Qdrant collection
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"
import type { VectorError } from "../../errors/index.ts"

export type SearchResult = {
	readonly id: string | number
	readonly score: number
	readonly vector?: ReadonlyArray<number>
	readonly payload?: Record<string, unknown>
}

export type SearchConfig = {
	readonly collectionName: string
	readonly vector: ReadonlyArray<number>
	readonly limit: number
	readonly scoreThreshold?: number
	readonly withVector?: boolean
	readonly withPayload?: boolean
}

export default function searchPoints(config: SearchConfig) {
	return async function searchPointsIn(
		connection: VectorStoreConnection,
	): Promise<Result<VectorError, ReadonlyArray<SearchResult>>> {
		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			}

			if (connection.apiKey) {
				headers["api-key"] = connection.apiKey
			}

			const payload = {
				vector: config.vector,
				limit: config.limit,
				"score_threshold": config.scoreThreshold,
				"with_vector": config.withVector ?? false,
				"with_payload": config.withPayload ?? true,
			}

			const response = await fetch(
				`${connection.collectionsEndpoint}/${config.collectionName}/points/search`,
				{
					method: "POST",
					headers,
					body: JSON.stringify(payload),
				},
			)

			if (!response.ok) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "VectorError",
					kind: "SearchFailed",
					message:
						`Failed to search collection ${config.collectionName}: status ${response.status}`,
					collection: config.collectionName,
				})
			}

			const data = (await response.json()) as {
				result: ReadonlyArray<{
					id: string | number
					score: number
					vector?: ReadonlyArray<number>
					payload?: Record<string, unknown>
				}>
			}

			const results: ReadonlyArray<SearchResult> = data.result

			return ok(results)
		} catch (cause) {
			return error({
				_tag: "VectorError",
				kind: "SearchFailed",
				message: `Failed to search collection ${config.collectionName}`,
				collection: config.collectionName,
				cause,
			})
		}
	}
}

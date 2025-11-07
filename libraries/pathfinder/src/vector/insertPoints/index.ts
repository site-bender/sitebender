// [IO] Inserts vector points into a Qdrant collection
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"
import type { VectorError } from "../../errors/index.ts"

export type VectorPoint = {
	readonly id: string | number
	readonly vector: ReadonlyArray<number>
	readonly payload?: Record<string, unknown>
}

export type InsertPointsConfig = {
	readonly collectionName: string
	readonly points: ReadonlyArray<VectorPoint>
}

function transformPoint(point: VectorPoint): {
	id: string | number
	vector: ReadonlyArray<number>
	payload: Record<string, unknown>
} {
	return {
		id: point.id,
		vector: point.vector,
		payload: point.payload ?? {},
	}
}

export default function insertPoints(config: InsertPointsConfig) {
	return async function insertPointsInto(
		connection: VectorStoreConnection,
	): Promise<Result<VectorError, void>> {
		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			}

			if (connection.apiKey) {
				headers["api-key"] = connection.apiKey
			}

			const points = map(transformPoint)(config.points)

			const payload = {
				points,
			}

			const response = await fetch(
				`${connection.collectionsEndpoint}/${config.collectionName}/points`,
				{
					method: "PUT",
					headers,
					body: JSON.stringify(payload),
				},
			)

			if (!response.ok) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "VectorError",
					kind: "InsertFailed",
					message:
						`Failed to insert points into collection ${config.collectionName}: status ${response.status}`,
					collection: config.collectionName,
				})
			}

			// Consume response body to prevent resource leak
			await response.body?.cancel()

			return ok(undefined)
		} catch (cause) {
			return error({
				_tag: "VectorError",
				kind: "InsertFailed",
				message:
					`Failed to insert points into collection ${config.collectionName}`,
				collection: config.collectionName,
				cause,
			})
		}
	}
}

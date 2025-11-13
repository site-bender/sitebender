// [IO] Lists all collections in Qdrant vector store
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { AsyncIoResult } from "@sitebender/toolsmith/types/fp/io/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import type { VectorError, VectorStoreConnection } from "../../types/index.ts"

export default function listCollections(
	connection: VectorStoreConnection,
): AsyncIoResult<VectorError, ReadonlyArray<{ readonly name: string }>> {
	return function executeListCollections(): Promise<
		Result<VectorError, ReadonlyArray<{ readonly name: string }>>
	> {
		return (async function listCollectionsFrom(): Promise<
			Result<VectorError, ReadonlyArray<{ readonly name: string }>>
		> {
			try {
				const headers: Record<string, string> = {
					"Content-Type": "application/json",
				}

				if (connection.apiKey) {
					headers["api-key"] = connection.apiKey
				}

				const response = await fetch(connection.collectionsEndpoint, {
					method: "GET",
					headers,
				})

				if (not(response.ok)) {
					// Consume response body to prevent resource leak
					await response.body?.cancel()

					return error({
						_tag: "VectorError",
						kind: "SearchFailed",
						message: `Failed to list collections: status ${response.status}`,
					})
				}

				const data = (await response.json()) as {
					result: {
						collections: ReadonlyArray<{ name: string }>
					}
				}

				return ok(data.result.collections)
			} catch (cause) {
				return error({
					_tag: "VectorError",
					kind: "SearchFailed",
					message: "Failed to list collections",
					cause,
				})
			}
		})()
	}
}

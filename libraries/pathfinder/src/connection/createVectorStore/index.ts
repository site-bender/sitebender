// [IO] Connects to Qdrant vector store via HTTP
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import type { VectorStoreConfig } from "../../config/types/index.ts"
import type { ConnectionError } from "../../errors/index.ts"

export type VectorStoreConnection = {
	readonly baseUrl: string
	readonly collectionsEndpoint: string
	readonly apiKey?: string
}

export default function createVectorStore(
	config: VectorStoreConfig,
): Promise<Result<ConnectionError, VectorStoreConnection>> {
	return async function executeVectorStoreConnection(): Promise<
		Result<ConnectionError, VectorStoreConnection>
	> {
		const baseUrl = `http://${config.host}:${config.port}`
		let timeoutId: number | undefined

		try {
			// Test connection health by fetching health endpoint
			const controller = new AbortController()
			timeoutId = setTimeout(() => {
				controller.abort()
			}, config.timeout ?? 5000)

			const headers: Record<string, string> = {}
			if (config.apiKey) {
				headers["api-key"] = config.apiKey
			}

			const response = await fetch(`${baseUrl}/`, {
				signal: controller.signal,
				headers,
			})

			clearTimeout(timeoutId)
			timeoutId = undefined

			// Consume the response body to prevent resource leak
			await response.body?.cancel()

			if (not(response.ok)) {
				return error({
					_tag: "ConnectionError",
					kind: "VectorStoreInitFailed",
					message:
						`Vector store at ${baseUrl} returned status ${response.status}`,
					host: config.host,
					port: config.port,
				})
			}

			return ok({
				baseUrl,
				collectionsEndpoint: `${baseUrl}/collections`,
				apiKey: config.apiKey,
			})
		} catch (cause) {
			// Ensure timeout is cleared even in error cases
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId)
			}

			return error({
				_tag: "ConnectionError",
				kind: "VectorStoreInitFailed",
				message:
					`Failed to connect to vector store at ${config.host}:${config.port}`,
				host: config.host,
				port: config.port,
				cause,
			})
		}
	}()
}

// [IO] Connects to Qdrant vector store via HTTP
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import timeout from "@sitebender/toolsmith/async/timeout/index.ts"
import type { VectorStoreConfig } from "../../config/types/index.ts"
import type {
	ConnectionError,
	VectorStoreConnection,
} from "../../types/index.ts"

export default function createVectorStore(
	config: VectorStoreConfig,
): Promise<Result<ConnectionError, VectorStoreConnection>> {
	return async function executeVectorStoreConnection(): Promise<
		Result<ConnectionError, VectorStoreConnection>
	> {
		const baseUrl = `http://${config.host}:${config.port}`

		try {
			const headers: Record<string, string> = {}
			if (config.apiKey) {
				headers["api-key"] = config.apiKey
			}

			// Race the fetch against a timeout - pure FP, no mutations
			const response = await Promise.race([
				fetch(`${baseUrl}/`, { headers }),
				timeout(config.timeout ?? 5000)(),
			])

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

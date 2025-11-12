// [IO] Connects to Oxigraph triple store via HTTP
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import timeout from "@sitebender/toolsmith/async/timeout/index.ts"
import type { TripleStoreConfig } from "../../config/types/index.ts"
import type {
	ConnectionError,
	TripleStoreConnection,
} from "../../types/index.ts"

export default function createTripleStore(
	config: TripleStoreConfig,
): Promise<Result<ConnectionError, TripleStoreConnection>> {
	return async function executeTripleStoreConnection(): Promise<
		Result<ConnectionError, TripleStoreConnection>
	> {
		const baseUrl = `http://${config.host}:${config.port}`

		try {
			// Race the fetch against a timeout - pure FP, no mutations
			const response = await Promise.race([
				fetch(baseUrl),
				timeout(config.timeout ?? 5000)(),
			])

			// Consume the response body to prevent resource leak
			await response.body?.cancel()

			if (not(response.ok)) {
				return error({
					_tag: "ConnectionError",
					kind: "TripleStoreInitFailed",
					message:
						`Triple store at ${baseUrl} returned status ${response.status}`,
					host: config.host,
					port: config.port,
				})
			}

			return ok({
				baseUrl,
				queryEndpoint: `${baseUrl}/query`,
				updateEndpoint: `${baseUrl}/update`,
			})
		} catch (cause) {
			return error({
				_tag: "ConnectionError",
				kind: "TripleStoreInitFailed",
				message:
					`Failed to connect to triple store at ${config.host}:${config.port}`,
				host: config.host,
				port: config.port,
				cause,
			})
		}
	}()
}

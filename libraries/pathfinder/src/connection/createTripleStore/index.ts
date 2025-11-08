// [IO] Connects to Oxigraph triple store via HTTP
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import type { TripleStoreConfig } from "../../config/types/index.ts"
import type { ConnectionError } from "../../errors/index.ts"

export type TripleStoreConnection = {
	readonly baseUrl: string
	readonly queryEndpoint: string
	readonly updateEndpoint: string
}

export default function createTripleStore(
	config: TripleStoreConfig,
): Promise<Result<ConnectionError, TripleStoreConnection>> {
	return async function executeTripleStoreConnection(): Promise<
		Result<ConnectionError, TripleStoreConnection>
	> {
		const baseUrl = `http://${config.host}:${config.port}`
		let timeoutId: number | undefined

		try {
			// Test connection health by fetching the base URL
			const controller = new AbortController()
			timeoutId = setTimeout(() => {
				controller.abort()
			}, config.timeout ?? 5000)

			const response = await fetch(baseUrl, {
				signal: controller.signal,
			})

			clearTimeout(timeoutId)
			timeoutId = undefined

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
			// Ensure timeout is cleared even in error cases
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId)
			}

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

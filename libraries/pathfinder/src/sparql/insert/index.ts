// [IO] Inserts triples into triple store
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import type { QueryError, TripleStoreConnection } from "../../types/index.ts"

export default function insert(turtle: string) {
	return async function insertInto(
		connection: TripleStoreConnection,
	): Promise<Result<QueryError, void>> {
		try {
			const sparql = `INSERT DATA { ${turtle} }`

			const response = await fetch(connection.updateEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/sparql-update",
				},
				body: sparql,
			})

			// Consume response body to prevent resource leak
			await response.body?.cancel()

			if (not(response.ok)) {
				return error({
					_tag: "QueryError",
					kind: "ExecutionFailed",
					message: `Failed to insert triples: status ${response.status}`,
					sparql: turtle,
				})
			}

			return ok(undefined)
		} catch (cause) {
			return error({
				_tag: "QueryError",
				kind: "ExecutionFailed",
				message: "Failed to insert triples",
				sparql: turtle,
				cause,
			})
		}
	}
}

// [IO] Executes SPARQL query against triple store
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import type { QueryError } from "../../errors/index.ts"
import type { TripleStoreConnection } from "../../connection/createTripleStore/index.ts"

type SparqlBinding = Record<string, { value: unknown }>

type SparqlResults = {
	readonly head: {
		readonly vars: ReadonlyArray<string>
	}
	readonly results: {
		readonly bindings: ReadonlyArray<SparqlBinding>
	}
}

export default function execute(sparql: string) {
	return async function executeOn(
		connection: TripleStoreConnection,
	): Promise<Result<QueryError, ReadonlyArray<Record<string, unknown>>>> {
		try {
			const response = await fetch(connection.queryEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/sparql-query",
					"Accept": "application/sparql-results+json",
				},
				body: sparql,
			})

			if (not(response.ok)) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "QueryError",
					kind: "ExecutionFailed",
					message: `SPARQL query failed with status ${response.status}`,
					sparql,
				})
			}

			const results = (await response.json()) as SparqlResults

			// Transform SPARQL JSON results to plain objects
			const extractValue = function extractValue(
				binding: SparqlBinding,
			): Record<string, unknown> {
				const keys = Object.keys(binding)

				const toEntry = function toEntry(key: string): [string, unknown] {
					return [key, binding[key].value]
				}

				const entries = map(toEntry)(keys)
				//++ [EXCEPTION] Object.fromEntries permitted for building object from entries
				return Object.fromEntries(entries)
			}

			const bindings = map(extractValue)(results.results.bindings)

			return ok(bindings)
		} catch (cause) {
			return error({
				_tag: "QueryError",
				kind: "ExecutionFailed",
				message: "SPARQL query execution failed",
				sparql,
				cause,
			})
		}
	}
}

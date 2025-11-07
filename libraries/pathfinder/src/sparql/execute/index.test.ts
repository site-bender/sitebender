import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import execute from "./index.ts"
import createTripleStore from "../../connection/createTripleStore/index.ts"
import type { TripleStoreConnection } from "../../connection/createTripleStore/index.ts"

describe("execute", () => {
	let connection: TripleStoreConnection

	// Create connection before tests
	async function setup(): Promise<void> {
		const result = await createTripleStore({
			host: "localhost",
			port: 7878,
		})

		if (result._tag === "Ok") {
			connection = result.value
		} else {
			throw new Error("Failed to create triple store connection")
		}
	}

	it("should execute SELECT query and return empty results", async () => {
		await setup()

		const sparql = "SELECT * WHERE { ?s ?p ?o } LIMIT 10"
		const result = await execute(sparql)(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(Array.isArray(result.value)).toBe(true)
		}
	})

	it("should return error for invalid SPARQL syntax", async () => {
		await setup()

		const sparql = "INVALID SPARQL QUERY"
		const result = await execute(sparql)(connection)

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("QueryError")
			expect(result.error.kind).toBe("ExecutionFailed")
			expect(result.error.sparql).toBe(sparql)
		}
	})

	it("should execute COUNT query", async () => {
		await setup()

		const sparql = "SELECT (COUNT(*) as ?count) WHERE { ?s ?p ?o }"
		const result = await execute(sparql)(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value.length).toBe(1)
			expect(result.value[0].count).toBeDefined()
		}
	})

	it("should handle query with no results", async () => {
		await setup()

		const sparql = `
			SELECT ?s ?p ?o
			WHERE {
				?s <http://example.org/nonexistent> ?o
			}
		`
		const result = await execute(sparql)(connection)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value.length).toBe(0)
		}
	})
})

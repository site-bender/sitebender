import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import insert from "./index.ts"
import execute from "../execute/index.ts"
import createTripleStore from "../../connection/createTripleStore/index.ts"
import type { TripleStoreConnection } from "../../connection/createTripleStore/index.ts"

describe("insert", () => {
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

	it("should insert valid Turtle triples successfully", async () => {
		await setup()

		const turtle = `
			<http://example.org/alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
			<http://example.org/alice> <http://xmlns.com/foaf/0.1/age> "30"^^<http://www.w3.org/2001/XMLSchema#integer> .
		`

		const result = await insert(turtle)(connection)

		expect(result._tag).toBe("Ok")
	})

	it("should make inserted triples queryable", async () => {
		await setup()

		const turtle = `
			<http://example.org/bob> <http://xmlns.com/foaf/0.1/name> "Bob" .
		`

		const insertResult = await insert(turtle)(connection)
		expect(insertResult._tag).toBe("Ok")

		// Query for the inserted triple
		const sparql = `
			SELECT ?name
			WHERE {
				<http://example.org/bob> <http://xmlns.com/foaf/0.1/name> ?name .
			}
		`

		const queryResult = await execute(sparql)(connection)
		expect(queryResult._tag).toBe("Ok")
		if (queryResult._tag === "Ok") {
			expect(queryResult.value.length).toBeGreaterThan(0)
			expect(queryResult.value[0].name).toBe("Bob")
		}
	})

	it("should return error for invalid Turtle syntax", async () => {
		await setup()

		const invalidTurtle = "INVALID TURTLE SYNTAX"
		const result = await insert(invalidTurtle)(connection)

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("QueryError")
			expect(result.error.kind).toBe("ExecutionFailed")
		}
	})

	it("should handle multiple insertions", async () => {
		await setup()

		const turtle1 = `
			<http://example.org/person1> <http://xmlns.com/foaf/0.1/name> "Person 1" .
		`
		const turtle2 = `
			<http://example.org/person2> <http://xmlns.com/foaf/0.1/name> "Person 2" .
		`

		const result1 = await insert(turtle1)(connection)
		const result2 = await insert(turtle2)(connection)

		expect(result1._tag).toBe("Ok")
		expect(result2._tag).toBe("Ok")

		// Verify both are in the store
		const sparql = `
			SELECT ?s ?name
			WHERE {
				?s <http://xmlns.com/foaf/0.1/name> ?name .
				FILTER (?s IN (<http://example.org/person1>, <http://example.org/person2>))
			}
		`

		const queryResult = await execute(sparql)(connection)
		expect(queryResult._tag).toBe("Ok")
		if (queryResult._tag === "Ok") {
			expect(queryResult.value.length).toBe(2)
		}
	})
})

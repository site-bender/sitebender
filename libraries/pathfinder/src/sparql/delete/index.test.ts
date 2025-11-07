import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import deleteSparql from "./index.ts"
import insert from "../insert/index.ts"
import execute from "../execute/index.ts"
import createTripleStore from "../../connection/createTripleStore/index.ts"
import type { TripleStoreConnection } from "../../connection/createTripleStore/index.ts"

describe("deleteSparql", () => {
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

	it("should delete matching triples", async () => {
		await setup()

		// First insert a triple
		const turtle = `
			<http://example.org/test1> <http://xmlns.com/foaf/0.1/name> "Test 1" .
		`
		await insert(turtle)(connection)

		// Delete the triple
		const pattern = `
			<http://example.org/test1> <http://xmlns.com/foaf/0.1/name> ?name .
		`
		const deleteResult = await deleteSparql(pattern)(connection)

		expect(deleteResult._tag).toBe("Ok")

		// Verify it's gone
		const sparql = `
			SELECT ?name
			WHERE {
				<http://example.org/test1> <http://xmlns.com/foaf/0.1/name> ?name .
			}
		`
		const queryResult = await execute(sparql)(connection)
		expect(queryResult._tag).toBe("Ok")
		if (queryResult._tag === "Ok") {
			expect(queryResult.value.length).toBe(0)
		}
	})

	it("should succeed when deleting non-existent triples", async () => {
		await setup()

		const pattern = `
			<http://example.org/nonexistent> <http://example.org/prop> ?value .
		`
		const result = await deleteSparql(pattern)(connection)

		expect(result._tag).toBe("Ok")
	})

	it("should return error for invalid pattern syntax", async () => {
		await setup()

		const invalidPattern = "INVALID SPARQL PATTERN"
		const result = await deleteSparql(invalidPattern)(connection)

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("QueryError")
			expect(result.error.kind).toBe("ExecutionFailed")
		}
	})

	it("should delete only matching triples, not all", async () => {
		await setup()

		// Insert two triples
		const turtle = `
			<http://example.org/person/alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
			<http://example.org/person/bob> <http://xmlns.com/foaf/0.1/name> "Bob" .
		`
		await insert(turtle)(connection)

		// Delete only Alice
		const pattern = `
			<http://example.org/person/alice> ?p ?o .
		`
		const deleteResult = await deleteSparql(pattern)(connection)
		expect(deleteResult._tag).toBe("Ok")

		// Verify Bob still exists
		const sparql = `
			SELECT ?name
			WHERE {
				<http://example.org/person/bob> <http://xmlns.com/foaf/0.1/name> ?name .
			}
		`
		const queryResult = await execute(sparql)(connection)
		expect(queryResult._tag).toBe("Ok")
		if (queryResult._tag === "Ok") {
			expect(queryResult.value.length).toBe(1)
			expect(queryResult.value[0].name).toBe("Bob")
		}
	})

	it("should handle deletion confirmed via SELECT query", async () => {
		await setup()

		// Insert a triple
		const turtle = `
			<http://example.org/testdelete> <http://example.org/property> "value" .
		`
		await insert(turtle)(connection)

		// Confirm it exists
		const checkQuery = `
			SELECT ?value
			WHERE {
				<http://example.org/testdelete> <http://example.org/property> ?value .
			}
		`
		const beforeDelete = await execute(checkQuery)(connection)
		expect(beforeDelete._tag).toBe("Ok")
		if (beforeDelete._tag === "Ok") {
			expect(beforeDelete.value.length).toBe(1)
		}

		// Delete it
		const pattern = `
			<http://example.org/testdelete> <http://example.org/property> ?value .
		`
		await deleteSparql(pattern)(connection)

		// Confirm it's gone
		const afterDelete = await execute(checkQuery)(connection)
		expect(afterDelete._tag).toBe("Ok")
		if (afterDelete._tag === "Ok") {
			expect(afterDelete.value.length).toBe(0)
		}
	})
})

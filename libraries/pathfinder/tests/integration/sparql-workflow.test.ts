// Integration test for full SPARQL workflow
import { afterAll, beforeAll, beforeEach, describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import createTripleStore from "../../src/connection/createTripleStore/index.ts"
import insert from "../../src/sparql/insert/index.ts"
import execute from "../../src/sparql/execute/index.ts"
import deleteQuery from "../../src/sparql/delete/index.ts"
import select from "../../src/sparql/select/index.ts"
import type { TripleStoreConnection } from "../../src/connection/createTripleStore/index.ts"

describe("SPARQL Workflow Integration", () => {
	let connection: TripleStoreConnection

	beforeAll(async () => {
		// Connect to Oxigraph (assumes running on localhost:7878)
		const connectionResult = await createTripleStore({
			host: "localhost",
			port: 7878,
			timeout: 5000,
		})

		if (connectionResult._tag === "Error") {
			throw new Error(
				`Failed to connect: ${connectionResult.value.message}`,
			)
		}

		connection = connectionResult.value
	})

	beforeEach(async () => {
		// Clean up test data before each test
		const cleanupTurtle = `
			<http://test.example/alice> ?p ?o .
			<http://test.example/bob> ?p ?o .
		`
		await deleteQuery(cleanupTurtle)(connection)
	})

	afterAll(async () => {
		// Clean up test data
		const turtle = `
			<http://test.example/alice> ?p ?o .
			<http://test.example/bob> ?p ?o .
		`
		await deleteQuery(turtle)(connection)
	})

	it("should complete full workflow: insert → build query → execute → validate", async () => {
		// Step 1: Insert test data
		const turtle = `
			<http://test.example/alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
			<http://test.example/alice> <http://xmlns.com/foaf/0.1/age> 30 .
			<http://test.example/bob> <http://xmlns.com/foaf/0.1/name> "Bob" .
			<http://test.example/bob> <http://xmlns.com/foaf/0.1/age> 25 .
		`

		const insertResult = await insert(turtle)(connection)
		expect(insertResult._tag).toBe("Ok")

		// Step 2: Build query using SELECT builder
		const query = select("?name", "?age")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/age>",
					object: "?age",
				},
			])
			.build()

		// Step 3: Execute query
		const executeResult = await execute(query)(connection)
		expect(executeResult._tag).toBe("Ok")

		if (executeResult._tag === "Ok") {
			const results = executeResult.value

			// Step 4: Validate results - should find at least Alice and Bob
			expect(results.length).toBeGreaterThanOrEqual(2)

			// Check Alice's data exists
			const alice = results.find((r) => r.name === "Alice")
			expect(alice).toBeDefined()
			// Age can be either string or number depending on how it was stored
			expect([30, "30"]).toContain(alice?.age)

			// Check Bob's data exists
			const bob = results.find((r) => r.name === "Bob")
			expect(bob).toBeDefined()
			expect([25, "25"]).toContain(bob?.age)
		}
	})

	it("should support filtered queries", async () => {
		// Insert test data with unique ages
		const turtle = `
			<http://test.example/alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
			<http://test.example/alice> <http://xmlns.com/foaf/0.1/age> 30 .
			<http://test.example/bob> <http://xmlns.com/foaf/0.1/name> "Bob" .
			<http://test.example/bob> <http://xmlns.com/foaf/0.1/age> 25 .
		`

		const insertResult = await insert(turtle)(connection)
		expect(insertResult._tag).toBe("Ok")

		// Build query with FILTER
		const query = select("?name", "?age")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/age>",
					object: "?age",
				},
			])
			.filter("?age > 25")
			.build()

		// Execute and validate
		const executeResult = await execute(query)(connection)
		expect(executeResult._tag).toBe("Ok")

		if (executeResult._tag === "Ok") {
			const results = executeResult.value

			// Should find at least Alice (age 30 > 25)
			expect(results.length).toBeGreaterThanOrEqual(1)
			const alice = results.find((r) => r.name === "Alice")
			expect(alice).toBeDefined()
			// Age can be number or string
			expect([30, "30"]).toContain(alice?.age)
		}
	})

	it("should support multiple filters", async () => {
		// Build query with multiple FILTER clauses
		const query = select("?name", "?age")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/age>",
					object: "?age",
				},
			])
			.filter("?age >= 25")
			.filter("?age <= 30")
			.build()

		// Execute and validate
		const executeResult = await execute(query)(connection)
		expect(executeResult._tag).toBe("Ok")

		if (executeResult._tag === "Ok") {
			const results = executeResult.value

			// Should find Alice and Bob (both in range 25-30)
			expect(results.length).toBeGreaterThanOrEqual(2)

			// Verify all ages are in the filtered range
			const ages = results.map((r) => r.age as number)
			const allInRange = ages.every((age) => age >= 25 && age <= 30)
			expect(allInRange).toBe(true)
		}
	})

	it("should handle empty results gracefully", async () => {
		// Query for non-existent data
		const query = select("?name")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
			])
			.filter('?name = "NonExistent"')
			.build()

		const executeResult = await execute(query)(connection)
		expect(executeResult._tag).toBe("Ok")

		if (executeResult._tag === "Ok") {
			expect(executeResult.value.length).toBe(0)
		}
	})

	it("should handle query builder immutability", async () => {
		// Create base query
		const baseQuery = select("?name")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
			])

		// Create two different filtered versions
		const aliceQuery = baseQuery.filter('?name = "Alice"').build()
		const bobQuery = baseQuery.filter('?name = "Bob"').build()

		// Execute both queries
		const aliceResult = await execute(aliceQuery)(connection)
		const bobResult = await execute(bobQuery)(connection)

		expect(aliceResult._tag).toBe("Ok")
		expect(bobResult._tag).toBe("Ok")

		if (aliceResult._tag === "Ok" && bobResult._tag === "Ok") {
			// Each query should have independent results
			const aliceResults = aliceResult.value
			const bobResults = bobResult.value

			// Should find at least one of each
			expect(aliceResults.length).toBeGreaterThanOrEqual(1)
			expect(bobResults.length).toBeGreaterThanOrEqual(1)

			// Verify all results match expected names
			const allAlice = aliceResults.every((r) => r.name === "Alice")
			const allBob = bobResults.every((r) => r.name === "Bob")
			expect(allAlice).toBe(true)
			expect(allBob).toBe(true)
		}
	})
})

// Property-based tests for SPARQL query builder
import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import select from "../../src/sparql/select/index.ts"
import type { TriplePattern } from "../../src/sparql/select/index.ts"

describe("SPARQL Query Builder Properties", () => {
	// Property: All queries should start with SELECT
	it("property: all queries start with SELECT", () => {
		const testCases = [
			["?s"],
			["?s", "?p"],
			["?s", "?p", "?o"],
			["?name", "?age", "?email"],
		]

		function testSelectPrefix(variables: Array<string>): void {
			const query = select(...variables)
				.where([
					{
						subject: "?s",
						predicate: "?p",
						object: "?o",
					},
				])
				.build()

			expect(query.startsWith("SELECT")).toBe(true)
		}

		Array.from(testCases, testSelectPrefix)
	})

	// Property: All queries should contain WHERE clause
	it("property: all queries contain WHERE clause", () => {
		const patterns: ReadonlyArray<TriplePattern> = [
			{
				subject: "?s",
				predicate: "<http://example.org/pred>",
				object: "?o",
			},
		]

		function testWhereClause(vars: Array<string>): void {
			const query = select(...vars)
				.where(patterns)
				.build()

			expect(query).toContain("WHERE {")
		}

		const testCases = [["?s"], ["?s", "?o"], ["?s", "?p", "?o"]]
		Array.from(testCases, testWhereClause)
	})

	// Property: Building same query multiple times produces identical results (idempotency)
	it("property: build is idempotent", () => {
		const builder = select("?name", "?age")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
			])
			.filter("?age > 18")

		const query1 = builder.build()
		const query2 = builder.build()
		const query3 = builder.build()

		expect(query1).toBe(query2)
		expect(query2).toBe(query3)
	})

	// Property: Adding filters should preserve WHERE patterns
	it("property: filters preserve WHERE patterns", () => {
		const patterns: ReadonlyArray<TriplePattern> = [
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
		]

		const baseQuery = select("?name")
			.where(patterns)
			.build()

		const filteredQuery = select("?name")
			.where(patterns)
			.filter('?name = "Alice"')
			.build()

		// Both queries should contain the same triple pattern
		expect(baseQuery).toContain(
			"?person <http://xmlns.com/foaf/0.1/name> ?name",
		)
		expect(filteredQuery).toContain(
			"?person <http://xmlns.com/foaf/0.1/name> ?name",
		)
	})

	// Property: Multiple filters should be combined with AND (&&)
	it("property: multiple filters combine with AND", () => {
		const query = select("?x")
			.where([
				{
					subject: "?x",
					predicate: "?p",
					object: "?o",
				},
			])
			.filter("?x > 10")
			.filter("?x < 100")
			.filter("?x != 50")
			.build()

		// All filters should be present
		expect(query).toContain("?x > 10")
		expect(query).toContain("?x < 100")
		expect(query).toContain("?x != 50")

		// Filters should be combined with &&
		expect(query).toContain("&&")
	})

	// Property: Triple patterns should end with period
	it("property: triple patterns end with period", () => {
		const patterns: ReadonlyArray<TriplePattern> = [
			{
				subject: "?s",
				predicate: "<http://example.org/p1>",
				object: "?o1",
			},
			{
				subject: "?s",
				predicate: "<http://example.org/p2>",
				object: "?o2",
			},
		]

		const query = select("?s", "?o1", "?o2")
			.where(patterns)
			.build()

		// Each pattern should end with a period
		expect(query).toContain("?s <http://example.org/p1> ?o1 .")
		expect(query).toContain("?s <http://example.org/p2> ?o2 .")
	})

	// Property: Variables in SELECT should match those in query
	it("property: SELECT variables appear in output", () => {
		const variables = ["?name", "?age", "?email"]

		const query = select(...variables)
			.where([
				{
					subject: "?person",
					predicate: "?p",
					object: "?o",
				},
			])
			.build()

		function checkVariable(variable: string): void {
			expect(query).toContain(variable)
		}

		Array.from(variables, checkVariable)
	})

	// Property: Immutability - calling filter doesn't modify original builder
	it("property: builders are immutable", () => {
		const baseBuilder = select("?x")
			.where([
				{
					subject: "?x",
					predicate: "?p",
					object: "?o",
				},
			])

		const baseQuery = baseBuilder.build()

		// Create filtered version
		const filteredBuilder = baseBuilder.filter("?x = 42")
		const filteredQuery = filteredBuilder.build()

		// Original should not have filter
		expect(baseQuery).not.toContain("FILTER")
		expect(baseQuery).not.toContain("?x = 42")

		// Filtered version should have filter
		expect(filteredQuery).toContain("FILTER")
		expect(filteredQuery).toContain("?x = 42")

		// Building base again should still not have filter
		const baseQueryAgain = baseBuilder.build()
		expect(baseQueryAgain).toBe(baseQuery)
	})

	// Property: Empty patterns array should still produce valid structure
	it("property: handles empty patterns gracefully", () => {
		const query = select("?s")
			.where([])
			.build()

		expect(query).toContain("SELECT ?s")
		expect(query).toContain("WHERE {")
		expect(query).toContain("}")
	})

	// Property: Order of filters should be preserved
	it("property: filter order is preserved", () => {
		const query = select("?x")
			.where([
				{
					subject: "?x",
					predicate: "?p",
					object: "?o",
				},
			])
			.filter("FIRST")
			.filter("SECOND")
			.filter("THIRD")
			.build()

		// Find positions of each filter
		const firstPos = query.indexOf("FIRST")
		const secondPos = query.indexOf("SECOND")
		const thirdPos = query.indexOf("THIRD")

		// They should appear in order
		expect(firstPos).toBeLessThan(secondPos)
		expect(secondPos).toBeLessThan(thirdPos)
	})
})

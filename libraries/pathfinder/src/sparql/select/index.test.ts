import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import select from "./index.ts"
import type { TriplePattern } from "./index.ts"

describe("select", () => {
	it("should create SELECT query with single variable", () => {
		const query = select("?name")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
			])
			.build()

		expect(query).toContain("SELECT ?name")
		expect(query).toContain("WHERE {")
		expect(query).toContain(
			"?person <http://xmlns.com/foaf/0.1/name> ?name .",
		)
	})

	it("should create SELECT query with multiple variables", () => {
		const query = select("?name", "?email")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
			])
			.build()

		expect(query).toContain("SELECT ?name ?email")
	})

	it("should create WHERE clause with single pattern", () => {
		const pattern: TriplePattern = {
			subject: "?s",
			predicate: "?p",
			object: "?o",
		}

		const query = select("?s", "?p", "?o")
			.where([pattern])
			.build()

		expect(query).toContain("WHERE {")
		expect(query).toContain("?s ?p ?o .")
		expect(query).toContain("}")
	})

	it("should create WHERE clause with multiple patterns", () => {
		const patterns: ReadonlyArray<TriplePattern> = [
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/name>",
				object: "?name",
			},
			{
				subject: "?person",
				predicate: "<http://xmlns.com/foaf/0.1/mbox>",
				object: "?email",
			},
			{
				subject: "?person",
				predicate: "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>",
				object: "<http://xmlns.com/foaf/0.1/Person>",
			},
		]

		const query = select("?name", "?email")
			.where(patterns)
			.build()

		expect(query).toContain("?person <http://xmlns.com/foaf/0.1/name> ?name .")
		expect(query).toContain("?person <http://xmlns.com/foaf/0.1/mbox> ?email .")
		expect(query).toContain(
			"?person <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://xmlns.com/foaf/0.1/Person> .",
		)
	})

	it("should create FILTER clause with single condition", () => {
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
			.filter("?age > 18")
			.build()

		expect(query).toContain("FILTER (?age > 18)")
	})

	it("should create FILTER clause with multiple conditions", () => {
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
			.filter("?age > 18")
			.filter("?age < 65")
			.build()

		expect(query).toContain("FILTER (?age > 18 && ?age < 65)")
	})

	it("should work without filter clause", () => {
		const query = select("?s", "?p", "?o")
			.where([
				{
					subject: "?s",
					predicate: "?p",
					object: "?o",
				},
			])
			.build()

		expect(query).not.toContain("FILTER")
	})

	it("should generate syntactically valid SPARQL", () => {
		const query = select("?name", "?email")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/mbox>",
					object: "?email",
				},
			])
			.filter('REGEX(?email, "@example.com")')
			.build()

		// Should have proper structure
		expect(query).toMatch(/^SELECT/)
		expect(query).toContain("WHERE {")
		expect(query).toContain("}")
		expect(query).toContain("FILTER")
	})

	it("should handle complex query with all features", () => {
		const query = select("?title", "?author", "?year")
			.where([
				{
					subject: "?book",
					predicate: "<http://purl.org/dc/terms/title>",
					object: "?title",
				},
				{
					subject: "?book",
					predicate: "<http://purl.org/dc/terms/creator>",
					object: "?author",
				},
				{
					subject: "?book",
					predicate: "<http://purl.org/dc/terms/date>",
					object: "?year",
				},
			])
			.filter("?year > 2000")
			.filter("?year < 2020")
			.build()

		expect(query).toContain("SELECT ?title ?author ?year")
		expect(query).toContain("WHERE {")
		expect(query).toContain("?book <http://purl.org/dc/terms/title> ?title .")
		expect(query).toContain(
			"?book <http://purl.org/dc/terms/creator> ?author .",
		)
		expect(query).toContain("?book <http://purl.org/dc/terms/date> ?year .")
		expect(query).toContain("FILTER (?year > 2000 && ?year < 2020)")
	})

	it("should maintain immutability - calling filter multiple times", () => {
		const baseQuery = select("?name")
			.where([
				{
					subject: "?person",
					predicate: "<http://xmlns.com/foaf/0.1/name>",
					object: "?name",
				},
			])

		const query1 = baseQuery.filter('?name = "Alice"').build()
		const query2 = baseQuery.filter('?name = "Bob"').build()

		// Both queries should be different
		expect(query1).toContain("Alice")
		expect(query1).not.toContain("Bob")
		expect(query2).toContain("Bob")
		expect(query2).not.toContain("Alice")
	})
})

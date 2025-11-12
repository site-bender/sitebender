import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import getAllTriples from "./index.ts"

describe("getAllTriples", () => {
	it("should generate SELECT * query", () => {
		const query = getAllTriples()

		expect(query).toContain("SELECT *")
	})

	it("should include WHERE clause with triple pattern", () => {
		const query = getAllTriples()

		expect(query).toContain("WHERE")
		expect(query).toContain("?s ?p ?o")
	})

	it("should generate syntactically valid SPARQL", () => {
		const query = getAllTriples()

		expect(query).toBe("SELECT * WHERE { ?s ?p ?o }")
	})
})

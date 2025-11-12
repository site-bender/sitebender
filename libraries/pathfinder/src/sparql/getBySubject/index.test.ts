import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import getBySubject from "./index.ts"

describe("getBySubject", () => {
	it("should generate query for specific subject URI", () => {
		const query = getBySubject("<http://example.org/alice>")

		expect(query).toContain("SELECT ?p ?o")
		expect(query).toContain("WHERE")
		expect(query).toContain("<http://example.org/alice> ?p ?o")
	})

	it("should work with variable subjects", () => {
		const query = getBySubject("?person")

		expect(query).toContain("?person ?p ?o")
	})

	it("should generate syntactically valid SPARQL", () => {
		const subject = "<http://example.org/resource>"
		const query = getBySubject(subject)

		expect(query).toBe(
			`SELECT ?p ?o WHERE { ${subject} ?p ?o }`,
		)
	})
})

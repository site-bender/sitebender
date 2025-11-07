import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import getByPredicate from "./index.ts"

describe("getByPredicate", () => {
	it("should generate query for specific predicate URI", () => {
		const query = getByPredicate("<http://xmlns.com/foaf/0.1/name>")

		expect(query).toContain("SELECT ?s ?o")
		expect(query).toContain("WHERE")
		expect(query).toContain("?s <http://xmlns.com/foaf/0.1/name> ?o")
	})

	it("should work with RDF type predicate", () => {
		const rdfType = "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>"
		const query = getByPredicate(rdfType)

		expect(query).toContain(`?s ${rdfType} ?o`)
	})

	it("should generate syntactically valid SPARQL", () => {
		const predicate = "<http://purl.org/dc/terms/title>"
		const query = getByPredicate(predicate)

		expect(query).toBe(
			`SELECT ?s ?o WHERE { ?s ${predicate} ?o }`,
		)
	})
})

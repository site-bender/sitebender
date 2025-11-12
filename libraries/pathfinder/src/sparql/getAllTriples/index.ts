// Helper to generate SPARQL query that retrieves all triples
export default function getAllTriples(): string {
	return `SELECT * WHERE { ?s ?p ?o }`
}

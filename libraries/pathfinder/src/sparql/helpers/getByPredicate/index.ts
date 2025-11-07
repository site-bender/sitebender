// Helper to generate SPARQL query for specific predicate
export default function getByPredicate(predicate: string): string {
	return `SELECT ?s ?o WHERE { ?s ${predicate} ?o }`
}

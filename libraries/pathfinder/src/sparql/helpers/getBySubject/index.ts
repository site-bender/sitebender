// Helper to generate SPARQL query for specific subject
export default function getBySubject(subject: string): string {
	return `SELECT ?p ?o WHERE { ${subject} ?p ?o }`
}

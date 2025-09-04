/**
 * Distributed RDF Experiment - Federated SPARQL queries
 */

console.log("🔗 Distributed RDF Experiment")
console.log("=" .repeat(50))

// Sample RDF data for local testing
const localRDFData = `
@prefix schema: <http://schema.org/> .
@prefix ex: <http://example.org/> .

ex:LocalArticle a schema:Article ;
    schema:headline "Local Article Title" ;
    schema:author "Local Author" ;
    schema:datePublished "2025-01-04" .

ex:LocalPerson a schema:Person ;
    schema:name "John Local" ;
    schema:email "john@local.test" .
`

/**
 * Simple in-memory triple store for demonstration
 */
class SimpleTripleStore {
	private triples: Array<[string, string, string]> = []
	
	constructor() {
		// Parse and store some sample triples
		this.addTriple("ex:Article1", "rdf:type", "schema:Article")
		this.addTriple("ex:Article1", "schema:headline", '"Distributed Web"')
		this.addTriple("ex:Article1", "schema:author", "ex:Alice")
		this.addTriple("ex:Alice", "rdf:type", "schema:Person")
		this.addTriple("ex:Alice", "schema:name", '"Alice Smith"')
	}
	
	addTriple(subject: string, predicate: string, object: string) {
		this.triples.push([subject, predicate, object])
	}
	
	query(pattern: { s?: string; p?: string; o?: string }) {
		return this.triples.filter(([s, p, o]) => {
			if (pattern.s && s !== pattern.s) return false
			if (pattern.p && p !== pattern.p) return false
			if (pattern.o && o !== pattern.o) return false
			return true
		})
	}
	
	sparqlSelect(query: string): Array<Record<string, string>> {
		// Very simplified SPARQL - just for demo
		const results: Array<Record<string, string>> = []
		
		if (query.includes("?s rdf:type schema:Article")) {
			this.triples.forEach(([s, p, o]) => {
				if (p === "rdf:type" && o === "schema:Article") {
					results.push({ s, type: o })
				}
			})
		}
		
		if (query.includes("?s ?p ?o")) {
			this.triples.forEach(([s, p, o]) => {
				results.push({ s, p, o })
			})
		}
		
		return results
	}
}

/**
 * Federated query executor
 */
interface QuerySource {
	name: string
	type: "local" | "fuseki" | "ipfs" | "solid"
	endpoint: string
	available: boolean
}

class FederatedQueryEngine {
	private sources: QuerySource[] = []
	
	addSource(source: QuerySource) {
		this.sources.push(source)
		console.log(`📌 Added source: ${source.name} (${source.type})`)
	}
	
	async checkAvailability() {
		console.log("\n🔍 Checking source availability...")
		
		for (const source of this.sources) {
			if (source.type === "local") {
				source.available = true
			} else if (source.type === "fuseki") {
				try {
					const response = await fetch(source.endpoint, {
						method: "POST",
						headers: { "Content-Type": "application/sparql-query" },
						body: "SELECT * WHERE { ?s ?p ?o } LIMIT 1",
					}).catch(() => null)
					
					source.available = response?.ok ?? false
				} catch {
					source.available = false
				}
			} else {
				source.available = false // Simulated for now
			}
			
			const status = source.available ? "✅" : "❌"
			console.log(`   ${status} ${source.name}: ${source.available ? "Available" : "Offline"}`)
		}
	}
	
	async executeQuery(sparql: string): Promise<Map<string, any[]>> {
		const results = new Map<string, any[]>()
		
		console.log("\n🚀 Executing federated query...")
		console.log(`Query: ${sparql.substring(0, 50)}...`)
		
		for (const source of this.sources) {
			if (!source.available) continue
			
			console.log(`   Querying ${source.name}...`)
			
			if (source.type === "local") {
				// Use our simple store
				const store = new SimpleTripleStore()
				const localResults = store.sparqlSelect(sparql)
				results.set(source.name, localResults)
			} else if (source.type === "fuseki") {
				// Real Fuseki query
				try {
					const response = await fetch(source.endpoint, {
						method: "POST",
						headers: { "Content-Type": "application/sparql-query" },
						body: sparql,
					})
					
					if (response.ok) {
						const data = await response.json()
						results.set(source.name, data.results?.bindings || [])
					}
				} catch (error) {
					console.log(`   ⚠️ Error querying ${source.name}`)
				}
			}
		}
		
		return results
	}
	
	mergeResults(results: Map<string, any[]>): any[] {
		const merged: any[] = []
		const seen = new Set<string>()
		
		for (const [source, data] of results) {
			for (const item of data) {
				const key = JSON.stringify(item)
				if (!seen.has(key)) {
					seen.add(key)
					merged.push({ ...item, _source: source })
				}
			}
		}
		
		return merged
	}
}

/**
 * Content-addressed dataset
 */
interface DistributedDataset {
	id: string
	cid?: string // IPFS CID
	url?: string // Traditional URL
	solidPod?: string // Solid Pod URL
	metadata: {
		created: Date
		format: string
		triples: number
		publisher?: string
	}
}

function createDistributedDataset(data: string): DistributedDataset {
	// Calculate a simple hash for demo
	const hash = btoa(data).substring(0, 10)
	
	return {
		id: `dataset-${hash}`,
		metadata: {
			created: new Date(),
			format: "text/turtle",
			triples: data.split("\n").filter(l => l.includes(" ")).length,
		},
	}
}

// Main experiment
async function main() {
	console.log("\n📊 Setting up distributed RDF architecture...")
	
	// Create federated query engine
	const engine = new FederatedQueryEngine()
	
	// Add different sources
	engine.addSource({
		name: "Local Cache",
		type: "local",
		endpoint: "memory://local",
		available: false,
	})
	
	engine.addSource({
		name: "Fuseki Server",
		type: "fuseki",
		endpoint: "http://localhost:3030/ds/sparql",
		available: false,
	})
	
	engine.addSource({
		name: "IPFS Dataset",
		type: "ipfs",
		endpoint: "ipfs://QmExampleDataset",
		available: false,
	})
	
	engine.addSource({
		name: "Solid Pod",
		type: "solid",
		endpoint: "https://alice.solidcommunity.net/public/",
		available: false,
	})
	
	// Check what's available
	await engine.checkAvailability()
	
	// Execute a federated query
	const sparql = "SELECT ?s ?p ?o WHERE { ?s ?p ?o } LIMIT 10"
	const results = await engine.executeQuery(sparql)
	
	console.log("\n📈 Query Results:")
	for (const [source, data] of results) {
		console.log(`\n   From ${source}:`)
		data.slice(0, 3).forEach(item => {
			console.log(`      ${JSON.stringify(item)}`)
		})
		if (data.length > 3) {
			console.log(`      ... and ${data.length - 3} more`)
		}
	}
	
	// Merge results
	const merged = engine.mergeResults(results)
	console.log(`\n🔀 Merged ${merged.length} unique results from ${results.size} sources`)
	
	// Create distributed dataset
	console.log("\n📦 Creating distributed dataset...")
	const dataset = createDistributedDataset(localRDFData)
	console.log(`   ID: ${dataset.id}`)
	console.log(`   Created: ${dataset.metadata.created.toISOString()}`)
	console.log(`   Triples: ${dataset.metadata.triples}`)
	
	// Show caching strategy
	console.log("\n💾 Caching Strategy:")
	console.log("   1. Query local cache first (IndexedDB)")
	console.log("   2. If incomplete, fetch from distributed sources")
	console.log("   3. Cache results with TTL")
	console.log("   4. Background sync when online")
	
	// Show how this integrates with Sitebender
	console.log("\n🔧 Sitebender Integration:")
	console.log("```tsx")
	console.log(`<FederatedQuery`)
	console.log(`  sources={[`)
	console.log(`    "local://cache",`)
	console.log(`    "fuseki://localhost:3030",`)
	console.log(`    "ipfs://QmDataset",`)
	console.log(`    "solid://alice.pod"`)
	console.log(`  ]}`)
	console.log(`  query={sparql}`)
	console.log(`  fallback={<LocalData />}`)
	console.log(`/>`)
	console.log("```")
	
	console.log("\n" + "=" .repeat(50))
	console.log("🎉 Distributed RDF Experiment Complete!")
}

// Run the experiment
if (import.meta.main) {
	main()
}
# Pathfinder

> **Data discovery, semantic search, and ontology inference for distributed applications**

## What Pathfinder Is

Pathfinder is Studio's data intelligence layer—the bridge between raw triples and actionable knowledge. It provides SPARQL query optimization, vector-powered semantic search, ontology-based inference, and observability data indexing. Every query, every search, every inference flows through Pathfinder.

**Core responsibilities:**

- SPARQL query building and optimization (type-safe, composable)
- Vector similarity search via Qdrant integration
- Ontology inference (RDFS/OWL reasoning makes implicit knowledge explicit)
- Observability ingestion (Prometheus metrics, logs, traces → searchable triples)
- Low-level query execution (Agent handles distribution, Pathfinder handles execution)

## Philosophy

**"Finding paths through knowledge is more valuable than storing facts."**

Traditional databases answer questions you already know how to ask. Pathfinder helps you discover questions you didn't know existed. By combining graph traversal, vector embeddings, and formal reasoning, it transforms static data into living knowledge.

**Key principles:**

1. **Queries are data** - SPARQL queries persist as triples, enabling query-over-queries
2. **Search is semantic** - Vector embeddings find conceptual similarity, not just keyword matches
3. **Inference is automatic** - Ontologies make implicit relationships explicit (no manual denormalization)
4. **Observability is searchable** - Production metrics become queryable knowledge, not opaque time-series
5. **Distribution is transparent** - Local queries and federated queries use identical APIs

## Revolutionary Features

### 1. Hybrid Search (Graph + Vector)

Combine SPARQL's precise graph traversal with vector search's semantic fuzziness:

```typescript
import { hybridSearch } from "@sitebender/pathfinder/hybridSearch/index.ts"

const results = await hybridSearch({
	sparql: `
    SELECT ?component WHERE {
      ?component rdf:type pagewright:Component ;
                 rdfs:label ?label .
    }
  `,
	vector: {
		query: "accessible form inputs",
		embedding: await embed("accessible form inputs"),
		topK: 10,
	},
	combine: "rerank", // or "union" | "intersection"
})

// Returns components matching SPARQL pattern, reranked by semantic similarity
```

**How it works:**

- SPARQL filters by structure (type, relationships, constraints)
- Vector search ranks by meaning (conceptual similarity)
- Results combine the precision of graphs with the flexibility of embeddings

### 2. Ontology Inference Engine

Turn implicit knowledge into explicit triples automatically:

```typescript
import { inferTriples } from "@sitebender/pathfinder/inference/index.ts"

// Given ontology: Recipe rdfs:subClassOf CreativeWork
// And triple: <recipe-123> rdf:type Recipe

const inferred = await inferTriples({
	base: [
		{ subject: "recipe-123", predicate: "rdf:type", object: "Recipe" },
	],
	ontology: "schema-org.ttl",
	rules: ["rdfs", "owl2-rl"], // RDFS + OWL2-RL reasoning
})

// Returns inferred triples:
// <recipe-123> rdf:type CreativeWork  (via subClassOf)
// <recipe-123> rdf:type schema:Thing  (via transitive subClassOf)
```

**Use cases:**

- Automatic schema evolution (add superclass, all instances gain properties)
- Constraint validation (OWL cardinality, domain/range checking)
- Query simplification (query for `CreativeWork`, get all `Recipe` results automatically)

### 3. Observability as Triples

Production metrics become queryable knowledge:

```typescript
import { ingestPrometheus } from "@sitebender/pathfinder/observability/ingestPrometheus/index.ts"

await ingestPrometheus({
	endpoint: "http://localhost:9090/api/v1/query",
	query: 'http_requests_total{job="api"}',
	interval: "1m",
})

// Now query metrics with SPARQL:
const slowEndpoints = await query(`
  SELECT ?endpoint (AVG(?latency) AS ?avg_latency) WHERE {
    ?request metrics:endpoint ?endpoint ;
             metrics:latency_ms ?latency ;
             metrics:timestamp ?time .
    FILTER(?time > "${Date.now() - 3600000}"^^xsd:dateTime)
  }
  GROUP BY ?endpoint
  HAVING (AVG(?latency) > 100)
  ORDER BY DESC(?avg_latency)
`)
```

**Benefits:**

- Correlate metrics across services (via SPARQL joins)
- Time-travel debugging (triples are immutable)
- Semantic alerts (query ontology for "critical path violations")

### 4. Query-as-Data (Meta-Querying)

Store queries as triples, then query your queries:

```typescript
import { persistQuery } from "@sitebender/pathfinder/queries/persistQuery/index.ts"

await persistQuery({
	id: "slow-queries",
	sparql:
		"SELECT ?q WHERE { ?q pathfinder:executionTime ?t . FILTER(?t > 1000) }",
	metadata: {
		author: "ops-team",
		description: "Find queries taking >1s",
		tags: ["performance", "monitoring"],
	},
})

// Now find all performance-related queries:
const perfQueries = await query(`
  SELECT ?query ?description WHERE {
    ?query rdf:type pathfinder:Query ;
           pathfinder:tag "performance" ;
           rdfs:comment ?description .
  }
`)
```

**Use cases:**

- Query libraries (reusable SPARQL patterns)
- Query optimization (find common patterns, create materialized views)
- Collaborative debugging (share queries as content-addressed IPFS objects)

## Architecture

### Triple Store: Oxigraph

**Why Oxigraph:**

- **Production-ready:** Rust-based, SPARQL 1.1 compliant, used by Wikidata and enterprise systems
- **Embeddable:** Runs in-process, no separate server (unlike Fuseki/Jena)
- **Distributed-ready:** SQLite backend enables Turso integration (edge replicas worldwide)
- **Standards-compliant:** Full SPARQL 1.1 Query, Update, and Federated Query support
- **Fast:** Written in Rust, compiled to WASM for browser use

**SQLite reality check:**

- Used in production by **every iOS/Android device on the planet**
- Powers major applications (Airbnb, Dropbox, Firefox bookmarks)
- Handles terabyte-scale databases (max 281TB with 64KB pages)
- Single-writer limitation addressed by Turso's distributed architecture

**Development → Production path:**

```
Development:  Oxigraph + local SQLite file
Production:   Oxigraph + Turso (distributed SQLite with edge replicas)
API changes:  ZERO (Turso is transparent backend swap)
```

### Vector Search: Qdrant

**Why Qdrant:**

- **Purpose-built:** Designed for vector similarity search (not retrofitted onto relational DB)
- **Fast:** Rust-based, HNSW indexing for sub-millisecond queries
- **Flexible:** Supports filtering (combine vector search with metadata constraints)
- **Production-proven:** Used by major AI platforms

**Integration approach:**

- Pathfinder uses Qdrant client directly (no ORM nonsense)
- Exposes abstract API to prevent Qdrant types from leaking into Studio
- If vector DB swap ever happens (it won't), Pathfinder absorbs the change

### Dependency Policy

**Pathfinder's allowed dependencies (Warden-enforced):**

```yaml
oxigraph: "^0.4" # Triple store (SPARQL execution)
@qdrant/qdrant-js: "^1.0" # Vector search
prom-client: "^15.0" # Prometheus metrics ingestion (observability)
```

**No other dependencies allowed.** See `contracts/dependencies.yaml` for whitelist.

## Integration with Other Libraries

### Agent (Distribution)

**Pathfinder provides:** Low-level query execution
**Agent provides:** Federated query routing, result aggregation

```typescript
// Without Agent (local only):
import { executeQuery } from "@sitebender/pathfinder/executeQuery/index.ts"
const results = await executeQuery("SELECT * WHERE { ?s ?p ?o }")(
	localTripleStore,
)

// With Agent (automatic distribution):
import { query } from "@sitebender/agent/query/index.ts"
const results = await query("SELECT * WHERE { ?s ?p ?o }")
// Agent discovers peers, routes via Pathfinder, merges with CRDTs
```

### Operator (Event Sourcing)

**Operator stores events as triples via Pathfinder:**

```typescript
import { storeEvent } from "@sitebender/operator/storeEvent/index.ts"

await storeEvent({
	type: "UserLoggedIn",
	userId: "user-123",
	timestamp: Date.now(),
})

// Query event history:
import { executeQuery } from "@sitebender/pathfinder/executeQuery/index.ts"
const loginEvents = await executeQuery(`
  SELECT * WHERE {
    ?event rdf:type operator:UserLoggedIn ;
           operator:userId ?userId ;
           operator:timestamp ?time .
    FILTER(?time > "${Date.now() - 86400000}"^^xsd:dateTime)
  }
`)(localTripleStore)
```

### Custodian (State Management)

**Custodian derives state from Operator events via Pathfinder queries:**

```typescript
import { deriveState } from "@sitebender/custodian/deriveState/index.ts"
import { executeQuery } from "@sitebender/pathfinder/executeQuery/index.ts"

const currentState = await deriveState({
	query: executeQuery(`
    SELECT ?key ?value WHERE {
      ?event operator:affects ?key ;
             operator:newValue ?value ;
             operator:timestamp ?time .
    }
    ORDER BY DESC(?time)
    LIMIT 1
  `)(localTripleStore),
})
```

### Envoy (Observability)

**Envoy visualizes data indexed by Pathfinder:**

```typescript
// Pathfinder ingests observability data:
import { ingestLogs } from "@sitebender/pathfinder/observability/ingestLogs/index.ts"
await ingestLogs({ source: "/var/log/app.log" })

// Envoy queries and visualizes:
import { createDashboard } from "@sitebender/envoy/createDashboard/index.ts"
const dashboard = await createDashboard({
	title: "Error Analysis",
	query: `
    SELECT ?level (COUNT(?log) AS ?count) WHERE {
      ?log rdf:type logs:LogEntry ;
           logs:level ?level .
    }
    GROUP BY ?level
  `,
})
```

## Core API

### Query Building (Type-Safe SPARQL)

```typescript
import { sparql } from "@sitebender/pathfinder/sparql/index.ts"

const query = sparql
	.select("?person", "?age")
	.where([
		{ subject: "?person", predicate: "rdf:type", object: "foaf:Person" },
		{ subject: "?person", predicate: "foaf:age", object: "?age" },
	])
	.filter("?age > 18")
	.orderBy("DESC(?age)")
	.limit(10)
	.build()

// Returns optimized SPARQL string:
// SELECT ?person ?age WHERE {
//   ?person rdf:type foaf:Person ;
//           foaf:age ?age .
//   FILTER(?age > 18)
// }
// ORDER BY DESC(?age)
// LIMIT 10
```

### Vector Search

```typescript
import { vectorSearch } from "@sitebender/pathfinder/vectorSearch/index.ts"
import { embed } from "@sitebender/pathfinder/embeddings/embed/index.ts"

const results = await vectorSearch({
	collection: "pagewright-components",
	vector: await embed("accessible navigation menu"),
	topK: 5,
	filter: { type: { $eq: "NavigationComponent" } }, // Qdrant metadata filter
})
```

### Ontology Inference

```typescript
import { inferTriples } from "@sitebender/pathfinder/inference/inferTriples/index.ts"

const inferred = await inferTriples({
	base: existingTriples,
	ontology: "schema-org.ttl",
	rules: ["rdfs", "owl2-rl"],
})
```

### Observability Ingestion

```typescript
import { ingestPrometheus } from "@sitebender/pathfinder/observability/ingestPrometheus/index.ts"
import { ingestLogs } from "@sitebender/pathfinder/observability/ingestLogs/index.ts"
import { ingestTraces } from "@sitebender/pathfinder/observability/ingestTraces/index.ts"

// Prometheus metrics → triples:
await ingestPrometheus({
	endpoint: "http://localhost:9090",
	interval: "1m",
})

// Structured logs → triples:
await ingestLogs({
	source: "/var/log/app.log",
	format: "json",
})

// Distributed traces → triples:
await ingestTraces({
	endpoint: "http://localhost:16686", // Jaeger
	service: "api-gateway",
})
```

## Performance Targets

**Query execution:**

- Simple SPARQL (< 100 triples): < 10ms
- Complex SPARQL (joins, aggregations): < 100ms
- Vector search (top-K): < 50ms
- Hybrid search: < 150ms

**Ingestion:**

- Prometheus scrape (1000 metrics): < 500ms
- Log parsing (1000 lines): < 200ms
- Triple insertion (batch 10K): < 1s

**Inference:**

- RDFS reasoning (1M triples): < 5s
- OWL2-RL reasoning (100K triples): < 30s

**Scalability:**

- Triple store: 281TB max (Oxigraph + SQLite with 64KB pages)
- Vector store: Billions of vectors (Qdrant)
- Distributed queries: Linear scaling via Agent federation

## Use Cases

### 1. Semantic Code Search

Find functions by meaning, not just name:

```typescript
const functions = await hybridSearch({
	sparql: `SELECT ?fn WHERE { ?fn rdf:type envoy:Function }`,
	vector: {
		query: "validate email addresses",
		topK: 10,
	},
})
// Returns: validateEmail, checkEmailFormat, isValidEmailAddress, etc.
```

### 2. Production Debugging

Query distributed traces as knowledge graph:

```typescript
const slowRequests = await executeQuery(`
  SELECT ?trace ?duration WHERE {
    ?trace rdf:type traces:Span ;
           traces:operation "http-request" ;
           traces:duration_ms ?duration .
    FILTER(?duration > 1000)
  }
  ORDER BY DESC(?duration)
  LIMIT 10
`)(localTripleStore)
```

### 3. Ontology-Driven Validation

Validate data against inferred constraints:

```typescript
const violations = await inferTriples({
	base: userData,
	ontology: "user-schema.ttl",
	rules: ["owl2-rl"],
	validateOnly: true, // Don't persist, just check
})

if (violations.length > 0) {
	throw new ValidationError(violations)
}
```

### 4. Multi-Dimensional Analytics

Correlate metrics across dimensions (service, region, time):

```typescript
const analysis = await executeQuery(`
  SELECT ?service ?region (AVG(?latency) AS ?avg) WHERE {
    ?req metrics:service ?service ;
         metrics:region ?region ;
         metrics:latency_ms ?latency ;
         metrics:timestamp ?time .
    FILTER(?time > "${Date.now() - 3600000}"^^xsd:dateTime)
  }
  GROUP BY ?service ?region
  ORDER BY DESC(?avg)
`)(localTripleStore)
```

## Development Status

**Current:** Planning phase (README-driven development)
**Next steps:**

1. Core SPARQL builder (type-safe query construction)
2. Oxigraph integration (local SQLite backend)
3. Qdrant integration (vector search)
4. Basic inference engine (RDFS reasoning)
5. Prometheus adapter (metrics → triples)

**Dependencies:**

- **Warden:** Must enforce dependency whitelist before Pathfinder development
- **Agent:** Pathfinder works standalone, enhanced by Agent for distribution
- **Operator:** Event storage requires Pathfinder API

**Priority:** Medium (after Warden, Steward, Toolsmith complete)

## Testing Strategy

**Unit tests:** Pure functions (query builders, inference rules)
**Integration tests:** Oxigraph + Qdrant interactions
**Property tests:** SPARQL query correctness (via Quarrier)
**Performance tests:** Query execution under load

**Example property test:**

```typescript
import { property } from "@sitebender/quarrier/property/index.ts"

property("SPARQL builder produces valid syntax", async () => {
	const query = sparql
		.select("?s", "?p", "?o")
		.where([{ subject: "?s", predicate: "?p", object: "?o" }])
		.build()

	// Should parse without errors:
	await executeQuery(query)(localTripleStore)
})
```

## Future Research

**Advanced inference:**

- Custom inference rules (Datalog-style)
- Probabilistic reasoning (Bayesian networks over triples)
- Temporal reasoning (Allen's interval algebra)

**Query optimization:**

- Learned query plans (ML-based cost estimation)
- Materialized views (cache common query patterns)
- Adaptive indexing (auto-create indexes based on query patterns)

**Distributed consensus:**

- CRDT-based triple replication (conflict-free merges)
- Causal consistency (vector clocks for query ordering)
- Byzantine fault tolerance (verify triple authenticity)

**Blockchain anchoring:**

- Periodic triple store hash → blockchain
- Immutable audit trail (prove data lineage)
- NOT for consensus (too slow), just for tamper evidence

## Philosophy vs. Reality

**Philosophy:** "Everything is queryable, everything is searchable."

**Reality:**

- SPARQL has learning curve (provide query templates)
- Vector embeddings cost money (cache aggressively)
- Inference is slow (materialize inferred triples)
- Distribution is complex (Agent handles it)

**Tradeoffs:**

- **Flexibility vs. Performance:** SPARQL is powerful but not always fast (cache common queries)
- **Precision vs. Recall:** Graph queries are precise, vector search has high recall (combine both)
- **Consistency vs. Availability:** Distributed triple stores face CAP theorem (Pathfinder + Agent choose AP)

## Why Pathfinder Matters

Most frameworks treat data as dead storage. Pathfinder treats data as living knowledge:

- **Dead storage:** "SELECT * FROM users WHERE id = 123"
- **Living knowledge:** "Find all entities related to user-123 within 3 hops, ranked by conceptual similarity to 'authentication failures'"

Every query discovers new relationships. Every search refines understanding. Every inference makes implicit knowledge explicit.

**This is how applications should reason about data.**

---

_SPARQL queries as data. Vector search as semantic navigation. Ontologies as automatic denormalization. This is data intelligence._

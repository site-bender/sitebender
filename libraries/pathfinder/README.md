# Pathfinder

Type-safe RDF triple store and vector database client for Deno.

**Version:** 1.0.0

Pathfinder provides a functional, type-safe interface to work with RDF triple stores (Oxigraph) and vector databases (Qdrant). Built with pure functions, immutable data structures, and monadic error handling.

## Features

- Type-safe SPARQL query builder with fluent API
- Oxigraph triple store connection and query execution
- Qdrant vector database integration with semantic similarity search
- Configuration validation with error accumulation
- Result/Validation monads for error handling (no exceptions)
- Pure functions with immutable data structures
- Full TypeScript type safety
- Comprehensive test coverage (85+ tests)

## Installation

Pathfinder is part of the Sitebender monorepo. Import functions using deno.jsonc aliases:

```typescript
import validateConfig from "@sitebender/pathfinder/config/validateConfig/index.ts"
import createTripleStore from "@sitebender/pathfinder/connection/createTripleStore/index.ts"
import execute from "@sitebender/pathfinder/sparql/execute/index.ts"
```

**CRITICAL - NO BARREL FILES:** This library follows a strict NO BARREL FILES architecture. You MUST import directly from deep paths like `@sitebender/pathfinder/sparql/execute/index.ts`. NEVER import from `mod.ts` or attempt to use barrel files. The `mod.ts` file exists ONLY for documentation and exports nothing. Attempting to import from it will fail. This is intentional. See [docs/IMPORTS.md](docs/IMPORTS.md) for complete details.

## Quick Start

### Connecting to Triple Store

```typescript
import createTripleStore from "@sitebender/pathfinder/connection/createTripleStore/index.ts"

const connectionResult = await createTripleStore({
	host: "localhost",
	port: 7878,
	timeout: 5000,
})

if (connectionResult._tag === "Error") {
	console.error(connectionResult.value.message)
} else {
	const connection = connectionResult.value
	// Use connection for queries
}
```

### Building and Executing SPARQL Queries

```typescript
import select from "@sitebender/pathfinder/sparql/select/index.ts"
import execute from "@sitebender/pathfinder/sparql/execute/index.ts"

// Build query using fluent API
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

// Execute query
const result = await execute(query)(connection)

if (result._tag === "Ok") {
	const data = result.value
	// Process results
}
```

### Inserting Triples

```typescript
import insert from "@sitebender/pathfinder/sparql/insert/index.ts"

const turtle = `
	<http://example.org/alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
	<http://example.org/alice> <http://xmlns.com/foaf/0.1/age> 30 .
`

const result = await insert(turtle)(connection)

if (result._tag === "Ok") {
	console.log("Triples inserted successfully")
}
```

### Deleting Triples

```typescript
import deleteQuery from "@sitebender/pathfinder/sparql/delete/index.ts"

const turtle = `
	<http://example.org/alice> ?p ?o .
`

const result = await deleteQuery(turtle)(connection)
```

### Vector Store Operations

#### Connecting to Vector Store

```typescript
import createVectorStore from "@sitebender/pathfinder/connection/createVectorStore/index.ts"

const connectionResult = await createVectorStore({
	host: "localhost",
	port: 6333,
	timeout: 5000,
})

if (connectionResult._tag === "Ok") {
	const connection = connectionResult.value
	// Use connection for vector operations
}
```

#### Creating a Collection

```typescript
import createCollection from "@sitebender/pathfinder/vector/createCollection/index.ts"

const result = await createCollection({
	name: "articles",
	dimension: 384, // Match your embedding model dimension
	distance: "Cosine", // Cosine | Euclid | Dot | Manhattan
})(connection)
```

#### Inserting Vectors

```typescript
import insertPoints from "@sitebender/pathfinder/vector/insertPoints/index.ts"

const result = await insertPoints({
	collectionName: "articles",
	points: [
		{
			id: 1, // Integer or UUID (crypto.randomUUID())
			vector: [0.1, 0.2, 0.3, ...], // Must match collection dimension
			payload: {
				title: "Introduction to FP",
				author: "Alice",
				url: "http://example.org/article/1",
			},
		},
	],
})(connection)
```

#### Searching Vectors

```typescript
import searchPoints from "@sitebender/pathfinder/vector/searchPoints/index.ts"

const result = await searchPoints({
	collectionName: "articles",
	vector: queryEmbedding, // Your query vector
	limit: 5,
	scoreThreshold: 0.7, // Optional minimum similarity score
	withPayload: true,
	withVector: false,
})(connection)

if (result._tag === "Ok") {
	result.value.forEach((match) => {
		console.log(`${match.payload?.title} (score: ${match.score})`)
	})
}
```

## API Reference

### Configuration

#### `validateConfig(config: PathfinderConfig)`

Validates Pathfinder configuration before use. Uses Validation monad to accumulate all errors.

**Parameters:**

- `config` - Configuration object with:
  - `tripleStore.host` - Triple store hostname (required, non-empty)
  - `tripleStore.port` - Triple store port (required, 1-65535)
  - `vectorStore.host` - Vector store hostname (required, non-empty)
  - `vectorStore.port` - Vector store port (required, 1-65535)

**Returns:** `Validation<ConfigError, ValidPathfinderConfig>`

**Example:**

```typescript
import validateConfig from "@sitebender/pathfinder/config/validateConfig/index.ts"

const configResult = validateConfig({
	tripleStore: { host: "localhost", port: 7878 },
	vectorStore: { host: "localhost", port: 6333 },
})

if (configResult._tag === "Failure") {
	// All validation errors accumulated
	configResult.value.forEach((error) => console.error(error.message))
} else {
	const validConfig = configResult.value
	// Use validated config
}
```

### Triple Store Connection

#### `createTripleStore(config: TripleStoreConfig)`

Creates a connection to an Oxigraph triple store.

**Parameters:**

- `config.host` - Hostname (e.g., "localhost")
- `config.port` - Port number (e.g., 7878)
- `config.timeout` - Connection timeout in milliseconds (optional, default: 5000)

**Returns:** `Promise<Result<ConnectionError, TripleStoreConnection>>`

### SPARQL Query Builder

#### `select(...variables: Array<string>)`

Creates a SELECT query builder.

**Parameters:**

- `variables` - SPARQL variables to select (e.g., "?name", "?age")

**Returns:** `SelectBuilder`

#### `SelectBuilder.where(patterns: ReadonlyArray<TriplePattern>)`

Adds WHERE clause with triple patterns.

**Parameters:**

- `patterns` - Array of triple patterns, each with:
  - `subject` - Subject of the triple (e.g., "?person")
  - `predicate` - Predicate URI (e.g., "&lt;http://xmlns.com/foaf/0.1/name&gt;")
  - `object` - Object of the triple (e.g., "?name")

**Returns:** `WhereBuilder`

#### `WhereBuilder.filter(condition: string)`

Adds FILTER clause to the query. Chainable for multiple filters.

**Parameters:**

- `condition` - SPARQL filter condition (e.g., "?age > 18")

**Returns:** `FilterBuilder`

#### `WhereBuilder.build()` / `FilterBuilder.build()`

Generates the final SPARQL query string.

**Returns:** `string`

### Query Execution

#### `execute(sparql: string)(connection: TripleStoreConnection)`

Executes a SPARQL query against the triple store.

**Parameters:**

- `sparql` - SPARQL query string
- `connection` - Triple store connection

**Returns:** `Promise<Result<QueryError, ReadonlyArray<Record<string, unknown>>>>`

### Data Manipulation

#### `insert(turtle: string)(connection: TripleStoreConnection)`

Inserts triples into the triple store using Turtle syntax.

**Parameters:**

- `turtle` - Turtle-formatted RDF data
- `connection` - Triple store connection

**Returns:** `Promise<Result<QueryError, void>>`

#### `deleteQuery(turtle: string)(connection: TripleStoreConnection)`

Deletes triples from the triple store.

**Parameters:**

- `turtle` - Turtle-formatted pattern matching triples to delete
- `connection` - Triple store connection

**Returns:** `Promise<Result<QueryError, void>>`

### Helper Functions

#### `getAllTriples()`

Generates a SPARQL query to retrieve all triples.

**Returns:** `string` - `SELECT * WHERE { ?s ?p ?o }`

#### `getBySubject(subject: string)`

Generates a SPARQL query for a specific subject.

**Parameters:**

- `subject` - Subject URI or variable (e.g., "&lt;http://example.org/alice&gt;" or "?person")

**Returns:** `string` - `SELECT ?p ?o WHERE { ${subject} ?p ?o }`

#### `getByPredicate(predicate: string)`

Generates a SPARQL query for a specific predicate.

**Parameters:**

- `predicate` - Predicate URI (e.g., "&lt;http://xmlns.com/foaf/0.1/name&gt;")

**Returns:** `string` - `SELECT ?s ?o WHERE { ?s ${predicate} ?o }`

### Vector Store Connection

#### `createVectorStore(config: VectorStoreConfig)`

Creates a connection to a Qdrant vector database.

**Parameters:**

- `config.host` - Hostname (e.g., "localhost")
- `config.port` - Port number (e.g., 6333)
- `config.timeout` - Connection timeout in milliseconds (optional, default: 5000)
- `config.apiKey` - API key for authentication (optional)

**Returns:** `Promise<Result<ConnectionError, VectorStoreConnection>>`

### Vector Operations

#### `createCollection(config: CollectionConfig)(connection: VectorStoreConnection)`

Creates a new vector collection in Qdrant.

**Parameters:**

- `config.name` - Collection name
- `config.dimension` - Vector dimension (must match your embedding model)
- `config.distance` - Distance metric: `"Cosine"` | `"Euclid"` | `"Dot"` | `"Manhattan"`

**Returns:** `Promise<Result<VectorError, void>>`

#### `insertPoints(config: InsertPointsConfig)(connection: VectorStoreConnection)`

Inserts vector points with metadata into a collection.

**Parameters:**

- `config.collectionName` - Name of the collection
- `config.points` - Array of points, each with:
  - `id` - Point ID (integer or UUID string)
  - `vector` - Vector embedding (ReadonlyArray of numbers)
  - `payload` - Optional metadata object

**Returns:** `Promise<Result<VectorError, void>>`

#### `searchPoints(config: SearchConfig)(connection: VectorStoreConnection)`

Searches for similar vectors using semantic similarity.

**Parameters:**

- `config.collectionName` - Name of the collection
- `config.vector` - Query vector to search for
- `config.limit` - Maximum number of results
- `config.scoreThreshold` - Minimum similarity score (optional)
- `config.withPayload` - Include metadata in results (optional, default: true)
- `config.withVector` - Include vectors in results (optional, default: false)

**Returns:** `Promise<Result<VectorError, ReadonlyArray<SearchResult>>>`

**SearchResult type:**

```typescript
{
	id: string | number
	score: number
	vector?: ReadonlyArray<number>
	payload?: Record<string, unknown>
}
```

## Error Handling

Pathfinder uses two monads for error handling:

- **Result monad** - For fail-fast operations (IO operations like connections, queries)
- **Validation monad** - For accumulating errors (configuration validation)

### Result Type

Used for IO operations. Returns first error encountered.

```typescript
type Result<E, T> =
	| { _tag: "Error"; value: E }
	| { _tag: "Ok"; value: T }
```

### Validation Type

Used for validation. Accumulates all errors.

```typescript
type Validation<E, T> =
	| { _tag: "Failure"; value: NonEmptyArray<E> }
	| { _tag: "Success"; value: T }
```

### Error Types

#### `ConfigError`

Returned when configuration validation fails.

```typescript
type ConfigError = {
	_tag: "ConfigError"
	kind: "MissingPath" | "MissingHost" | "InvalidPort" | "InvalidConfig"
	field: string
	message: string
	value?: unknown
}
```

#### `ConnectionError`

Returned when connection to triple store or vector store fails.

```typescript
type ConnectionError = {
	_tag: "ConnectionError"
	kind: "TripleStoreInitFailed" | "VectorStoreInitFailed"
	message: string
	host: string
	port: number
	cause?: unknown
}
```

#### `QueryError`

Returned when query execution fails.

```typescript
type QueryError = {
	_tag: "QueryError"
	kind: "ExecutionFailed"
	message: string
	sparql: string
	cause?: unknown
}
```

#### `VectorError`

Returned when vector operations fail.

```typescript
type VectorError = {
	_tag: "VectorError"
	kind: "InsertFailed" | "SearchFailed"
	message: string
	collection: string
	dimension?: number
	cause?: unknown
}
```

### Handling Errors

```typescript
const result = await execute(query)(connection)

if (result._tag === "Error") {
	const error = result.value
	console.error(`Query failed: ${error.message}`)
	console.error(`Query was: ${error.sparql}`)

	if (error.cause) {
		console.error("Cause:", error.cause)
	}
} else {
	const data = result.value
	// Process successful result
}
```

## Query Builder Immutability

The query builder is fully immutable. Each method call returns a new builder instance, allowing you to create multiple queries from a base template.

```typescript
const baseQuery = select("?name")
	.where([
		{
			subject: "?person",
			predicate: "<http://xmlns.com/foaf/0.1/name>",
			object: "?name",
		},
	])

// Create two different queries from the same base
const aliceQuery = baseQuery.filter('?name = "Alice"').build()
const bobQuery = baseQuery.filter('?name = "Bob"').build()

// baseQuery remains unchanged
```

## Testing

Run the test suite:

```bash
deno task test          # Run all tests
deno task test:strict   # Run with type checking
deno task test:cov      # Run with coverage
```

Run integration tests (requires Oxigraph running on localhost:7878):

```bash
deno test tests/integration/
```

## Development

Format code:

```bash
deno task fmt
```

Lint code:

```bash
deno task lint
```

## Architecture

Pathfinder follows strict functional programming principles:

- **Pure Functions:** All functions are pure except IO boundaries (marked with `// [IO]`)
- **Immutable Data:** All data structures use `const`, `Readonly<T>`, and `ReadonlyArray<T>`
- **No Exceptions:** Uses Result monad for error handling instead of try/catch
- **Currying:** All functions are curried for composition
- **No Classes:** Uses modules with exported pure functions
- **Type Safety:** Full TypeScript types throughout

## Documentation

- [API Reference](docs/API.md) - Complete API documentation
- [Import Guide](docs/IMPORTS.md) - Correct import patterns
- [Basic Usage Examples](docs/examples/basic-usage.ts) - Working code examples
- [Architect Integration](docs/examples/architect-integration.ts) - Integration patterns
- [Implementation Plan](docs/IMPLEMENTATION_PLAN.md) - Architecture and design

## License

MIT

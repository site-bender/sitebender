# Pathfinder

Type-safe RDF triple store and vector database client for Deno.

**Version:** 0.0.1-alpha

Pathfinder provides a functional, type-safe interface to work with RDF triple stores (Oxigraph) and vector databases (Qdrant). Built with pure functions, immutable data structures, and monadic error handling.

## Features

- Type-safe SPARQL query builder with fluent API
- Oxigraph triple store connection and query execution
- Qdrant vector database integration
- Result monad for error handling (no exceptions)
- Pure functions with immutable data structures
- Full TypeScript type safety

## Installation

```typescript
import { ... } from "@sitebender/pathfinder"
```

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

## API Reference

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

## Error Handling

Pathfinder uses the Result monad for error handling. All IO operations return `Result<E, T>` where `E` is the error type and `T` is the success type.

### Result Type

```typescript
type Result<E, T> =
	| { _tag: "Error"; value: E }
	| { _tag: "Ok"; value: T }
```

### Error Types

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

## License

MIT

# Pathfinder API Reference

Version 1.0.0

## Table of Contents

- [Overview](#overview)
- [Configuration](#configuration)
- [Connection Management](#connection-management)
- [Triple Store Operations](#triple-store-operations)
- [Vector Store Operations](#vector-store-operations)
- [Error Handling](#error-handling)
- [Type Reference](#type-reference)

## Overview

Pathfinder provides a functional interface to Oxigraph (triple store) and Qdrant (vector search). All functions are pure, curried, and follow constitutional rules. All IO operations return `Result<E, T>` monads for error handling.

### Import Pattern

Use deno.jsonc import aliases to import specific functions:

```typescript
import validateConfig from "@pathfinder/config/validateConfig/index.ts"
import createTripleStore from "@pathfinder/connection/createTripleStore/index.ts"
import execute from "@pathfinder/sparql/execute/index.ts"
```

**NEVER use barrel file imports.** Each function must be imported from its specific index.ts file.

## Configuration

### validateConfig

Validates Pathfinder configuration for both triple store and vector store settings.

**Signature:**

```typescript
function validateConfig(
	config: PathfinderConfig,
): Validation<ConfigError, ValidPathfinderConfig>
```

**Parameters:**

- `config: PathfinderConfig` - Configuration object containing triple store and vector store settings

**Returns:**

- `Validation<ConfigError, ValidPathfinderConfig>` - Either validation errors or branded valid config

**Validation Rules:**

- Triple store host must be non-empty string
- Triple store port must be between 1 and 65535
- Vector store host must be non-empty string
- Vector store port must be between 1 and 65535

**Example:**

```typescript
import validateConfig from "@pathfinder/config/validateConfig/index.ts"
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"

const config = {
	tripleStore: {
		host: "localhost",
		port: 7878,
		timeout: 5000,
	},
	vectorStore: {
		host: "localhost",
		port: 6333,
		timeout: 5000,
	},
}

const result = validateConfig(config)

if (isSuccess(result)) {
	// Config is valid, can be used with connection functions
	const validConfig = result.value
} else {
	// Handle validation errors
	const errors = result.errors // NonEmptyArray<ConfigError>
}
```

**Error Kinds:**

- `MissingHost` - Host field is empty or whitespace
- `MissingPath` - Path field is empty (unused in current implementation)
- `InvalidPort` - Port is outside valid range 1-65535
- `InvalidConfig` - General configuration error

**File:** `src/config/validateConfig/index.ts`

## Connection Management

### createTripleStore

Creates an HTTP connection to an Oxigraph triple store server.

**Signature:**

```typescript
function createTripleStore(
	config: TripleStoreConfig,
): Promise<Result<ConnectionError, TripleStoreConnection>>
```

**Parameters:**

- `config: TripleStoreConfig` - Connection settings for Oxigraph server
  - `host: string` - Server hostname or IP address
  - `port: number` - Server port (default 7878)
  - `timeout?: number` - Connection timeout in milliseconds (default 5000)

**Returns:**

- `Promise<Result<ConnectionError, TripleStoreConnection>>` - Either connection error or connection object

**Connection Object:**

```typescript
type TripleStoreConnection = {
	readonly baseUrl: string // http://host:port
	readonly queryEndpoint: string // http://host:port/query
	readonly updateEndpoint: string // http://host:port/update
}
```

**Example:**

```typescript
import createTripleStore from "@pathfinder/connection/createTripleStore/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

const config = {
	host: "localhost",
	port: 7878,
	timeout: 5000,
}

const result = await createTripleStore(config)

if (isOk(result)) {
	const connection = result.value
	// Use connection.queryEndpoint or connection.updateEndpoint
} else {
	// Handle connection error
	const err = result.error // ConnectionError
}
```

**Error Kinds:**

- `TripleStoreInitFailed` - Cannot connect to server or server returns non-ok status

**File:** `src/connection/createTripleStore/index.ts`

### createVectorStore

Creates an HTTP connection to a Qdrant vector store server.

**Signature:**

```typescript
function createVectorStore(
	config: VectorStoreConfig,
): Promise<Result<ConnectionError, VectorStoreConnection>>
```

**Parameters:**

- `config: VectorStoreConfig` - Connection settings for Qdrant server
  - `host: string` - Server hostname or IP address
  - `port: number` - Server port (default 6333)
  - `apiKey?: string` - Optional API key for authentication
  - `timeout?: number` - Connection timeout in milliseconds (default 5000)

**Returns:**

- `Promise<Result<ConnectionError, VectorStoreConnection>>` - Either connection error or connection object

**Connection Object:**

```typescript
type VectorStoreConnection = {
	readonly baseUrl: string // http://host:port
	readonly collectionsEndpoint: string // http://host:port/collections
	readonly apiKey?: string // API key if provided
}
```

**Example:**

```typescript
import createVectorStore from "@pathfinder/connection/createVectorStore/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

const config = {
	host: "localhost",
	port: 6333,
	apiKey: "my-secret-key", // optional
	timeout: 5000,
}

const result = await createVectorStore(config)

if (isOk(result)) {
	const connection = result.value
	// Use connection with vector operations
} else {
	const err = result.error // ConnectionError
}
```

**Error Kinds:**

- `VectorStoreInitFailed` - Cannot connect to server or server returns non-ok status
- `VectorStoreUnhealthy` - Server is reachable but reports unhealthy status

**File:** `src/connection/createVectorStore/index.ts`

## Triple Store Operations

All triple store operations are curried IO functions that take data first, then connection.

### insert

Inserts RDF triples into the triple store using Turtle format.

**Signature:**

```typescript
function insert(turtle: string) {
	return async function insertInto(
		connection: TripleStoreConnection,
	): Promise<Result<QueryError, void>>
}
```

**Parameters:**

- `turtle: string` - RDF data in Turtle format
- `connection: TripleStoreConnection` - Active triple store connection

**Returns:**

- `Promise<Result<QueryError, void>>` - Either error or success (undefined)

**Example:**

```typescript
import insert from "@pathfinder/sparql/insert/index.ts"
import pipe from "@sitebender/toolsmith/combinators/pipe/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

const turtle = `
	<http://example.org/article1> <http://purl.org/dc/terms/title> "My Article" .
	<http://example.org/article1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Article> .
`

// Option 1: Direct usage
const result = await insert(turtle)(connection)

// Option 2: With pipe
const result = await pipe(
	connection,
	insert(turtle),
)

if (isOk(result)) {
	// Triples successfully inserted
} else {
	// Handle error
	const err = result.error // QueryError
}
```

**Error Kinds:**

- `ExecutionFailed` - Insert operation failed due to network error or server rejection
- `InvalidSyntax` - Turtle syntax is malformed (returned by Oxigraph)

**File:** `src/sparql/insert/index.ts`

### execute

Executes a SPARQL SELECT query and returns results as array of plain objects.

**Signature:**

```typescript
function execute(sparql: string) {
	return async function executeOn(
		connection: TripleStoreConnection,
	): Promise<Result<QueryError, ReadonlyArray<Record<string, unknown>>>>
}
```

**Parameters:**

- `sparql: string` - SPARQL SELECT query
- `connection: TripleStoreConnection` - Active triple store connection

**Returns:**

- `Promise<Result<QueryError, ReadonlyArray<Record<string, unknown>>>>` - Either error or query results

**Example:**

```typescript
import execute from "@pathfinder/sparql/execute/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

const sparql = `
	SELECT ?title WHERE {
		?article <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/Article> .
		?article <http://purl.org/dc/terms/title> ?title .
	}
`

const result = await execute(sparql)(connection)

if (isOk(result)) {
	const bindings = result.value
	// bindings: ReadonlyArray<{ title: string }>
	bindings.forEach(function processBinding(binding) {
		console.log(binding.title)
	})
} else {
	const err = result.error // QueryError
}
```

**Error Kinds:**

- `ExecutionFailed` - Query execution failed
- `InvalidSyntax` - SPARQL syntax error
- `ResultParseFailed` - Cannot parse server response
- `Timeout` - Query exceeded timeout limit

**File:** `src/sparql/execute/index.ts`

### select

Fluent builder for constructing SPARQL SELECT queries in a type-safe manner.

**Signature:**

```typescript
function select(...variables: Array<string>): SelectBuilder
```

**Builder Methods:**

```typescript
type SelectBuilder = {
	readonly where: (patterns: ReadonlyArray<TriplePattern>) => WhereBuilder
}

type WhereBuilder = {
	readonly filter: (condition: string) => FilterBuilder
	readonly build: () => string
}

type FilterBuilder = {
	readonly filter: (condition: string) => FilterBuilder
	readonly build: () => string
}

type TriplePattern = {
	readonly subject: string
	readonly predicate: string
	readonly object: string
}
```

**Parameters:**

- `variables: Array<string>` - Variable names to select (without ? prefix)

**Returns:**

- `SelectBuilder` - Fluent builder for constructing query

**Example:**

```typescript
import select from "@pathfinder/sparql/select/index.ts"
import execute from "@pathfinder/sparql/execute/index.ts"
import pipe from "@sitebender/toolsmith/combinators/pipe/index.ts"

// Simple query
const query1 = select("title", "author")
	.where([
		{ subject: "?article", predicate: "rdf:type", object: "schema:Article" },
		{ subject: "?article", predicate: "dc:title", object: "?title" },
		{ subject: "?article", predicate: "dc:creator", object: "?author" },
	])
	.build()

// Query with filters
const query2 = select("title", "date")
	.where([
		{ subject: "?article", predicate: "rdf:type", object: "schema:Article" },
		{ subject: "?article", predicate: "dc:title", object: "?title" },
		{ subject: "?article", predicate: "dc:date", object: "?date" },
	])
	.filter("?date > '2024-01-01'^^xsd:date")
	.filter("CONTAINS(?title, 'TypeScript')")
	.build()

// Execute query
const result = await execute(query1)(connection)
```

**Generated SPARQL:**

```sparql
SELECT ?title ?author
WHERE {
    ?article rdf:type schema:Article .
    ?article dc:title ?title .
    ?article dc:creator ?author .
}
```

**File:** `src/sparql/select/index.ts`

### deleteSparql

Deletes triples matching a pattern from the triple store.

**Signature:**

```typescript
function deleteSparql(pattern: string) {
	return async function deleteFrom(
		connection: TripleStoreConnection,
	): Promise<Result<QueryError, void>>
}
```

**Parameters:**

- `pattern: string` - SPARQL triple pattern to match for deletion
- `connection: TripleStoreConnection` - Active triple store connection

**Returns:**

- `Promise<Result<QueryError, void>>` - Either error or success

**Example:**

```typescript
import deleteSparql from "@pathfinder/sparql/delete/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

// Delete all triples for a specific article
const pattern = "<http://example.org/article1> ?p ?o"
const result = await deleteSparql(pattern)(connection)

if (isOk(result)) {
	// Triples deleted successfully
} else {
	const err = result.error // QueryError
}
```

**Warning:** DELETE WHERE is a powerful operation. Ensure pattern is specific enough to avoid unintended deletions.

**Error Kinds:**

- `ExecutionFailed` - Delete operation failed

**File:** `src/sparql/delete/index.ts`

### SPARQL Query Helpers

Convenience functions for generating common SPARQL queries.

#### getAllTriples

Generates SPARQL query to retrieve all triples in the store.

**Signature:**

```typescript
function getAllTriples(): string
```

**Returns:**

- `string` - SPARQL SELECT query

**Example:**

```typescript
import getAllTriples from "@pathfinder/sparql/helpers/getAllTriples/index.ts"
import execute from "@pathfinder/sparql/execute/index.ts"

const query = getAllTriples() // "SELECT * WHERE { ?s ?p ?o }"
const result = await execute(query)(connection)
```

**File:** `src/sparql/helpers/getAllTriples/index.ts`

#### getBySubject

Generates SPARQL query to retrieve all predicates and objects for a specific subject.

**Signature:**

```typescript
function getBySubject(subject: string): string
```

**Parameters:**

- `subject: string` - RDF subject URI (e.g., `<http://example.org/article1>`)

**Returns:**

- `string` - SPARQL SELECT query

**Example:**

```typescript
import getBySubject from "@pathfinder/sparql/helpers/getBySubject/index.ts"
import execute from "@pathfinder/sparql/execute/index.ts"

const query = getBySubject("<http://example.org/article1>")
// SELECT ?p ?o WHERE { <http://example.org/article1> ?p ?o }

const result = await execute(query)(connection)
```

**File:** `src/sparql/helpers/getBySubject/index.ts`

#### getByPredicate

Generates SPARQL query to retrieve all subjects and objects for a specific predicate.

**Signature:**

```typescript
function getByPredicate(predicate: string): string
```

**Parameters:**

- `predicate: string` - RDF predicate URI (e.g., `<http://purl.org/dc/terms/title>`)

**Returns:**

- `string` - SPARQL SELECT query

**Example:**

```typescript
import getByPredicate from "@pathfinder/sparql/helpers/getByPredicate/index.ts"
import execute from "@pathfinder/sparql/execute/index.ts"

const query = getByPredicate("<http://purl.org/dc/terms/title>")
// SELECT ?s ?o WHERE { ?s <http://purl.org/dc/terms/title> ?o }

const result = await execute(query)(connection)
```

**File:** `src/sparql/helpers/getByPredicate/index.ts`

## Vector Store Operations

All vector store operations are curried IO functions that take configuration first, then connection.

### createCollection

Creates a new collection in the Qdrant vector store.

**Signature:**

```typescript
function createCollection(config: CollectionConfig) {
	return async function createCollectionIn(
		connection: VectorStoreConnection,
	): Promise<Result<VectorError, void>>
}
```

**Parameters:**

- `config: CollectionConfig` - Collection configuration
  - `name: string` - Collection name
  - `dimension: number` - Vector dimension size
  - `distance: DistanceMetric` - Distance metric for similarity calculation
- `connection: VectorStoreConnection` - Active vector store connection

**Distance Metrics:**

- `"Cosine"` - Cosine similarity (normalized dot product)
- `"Euclid"` - Euclidean distance
- `"Dot"` - Dot product similarity
- `"Manhattan"` - Manhattan (L1) distance

**Returns:**

- `Promise<Result<VectorError, void>>` - Either error or success

**Example:**

```typescript
import createCollection from "@pathfinder/vector/createCollection/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

const config = {
	name: "embeddings",
	dimension: 384, // e.g., for all-MiniLM-L6-v2 model
	distance: "Cosine" as const,
}

const result = await createCollection(config)(connection)

if (isOk(result)) {
	// Collection created successfully
} else {
	const err = result.error // VectorError
}
```

**Error Kinds:**

- `InsertFailed` - Collection creation failed
- `InvalidDimension` - Dimension is invalid (must be positive integer)

**File:** `src/vector/createCollection/index.ts`

### insertPoints

Inserts vector points into a Qdrant collection.

**Signature:**

```typescript
function insertPoints(config: InsertPointsConfig) {
	return async function insertPointsInto(
		connection: VectorStoreConnection,
	): Promise<Result<VectorError, void>>
}
```

**Parameters:**

- `config: InsertPointsConfig` - Insert configuration
  - `collectionName: string` - Target collection name
  - `points: ReadonlyArray<VectorPoint>` - Points to insert
- `connection: VectorStoreConnection` - Active vector store connection

**VectorPoint Type:**

```typescript
type VectorPoint = {
	readonly id: string | number // Unique point identifier
	readonly vector: ReadonlyArray<number> // Embedding vector
	readonly payload?: Record<string, unknown> // Optional metadata
}
```

**Returns:**

- `Promise<Result<VectorError, void>>` - Either error or success

**Example:**

```typescript
import insertPoints from "@pathfinder/vector/insertPoints/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

const config = {
	collectionName: "embeddings",
	points: [
		{
			id: "article-1",
			vector: [0.1, 0.2, 0.3 /* ... 384 dimensions */],
			payload: {
				title: "Introduction to TypeScript",
				url: "http://example.org/article1",
			},
		},
		{
			id: "article-2",
			vector: [0.4, 0.5, 0.6 /* ... 384 dimensions */],
			payload: {
				title: "Advanced Functional Programming",
				url: "http://example.org/article2",
			},
		},
	],
}

const result = await insertPoints(config)(connection)

if (isOk(result)) {
	// Points inserted successfully
} else {
	const err = result.error // VectorError
}
```

**Error Kinds:**

- `InsertFailed` - Insert operation failed
- `CollectionNotFound` - Target collection does not exist
- `InvalidDimension` - Vector dimension does not match collection dimension

**File:** `src/vector/insertPoints/index.ts`

### searchPoints

Searches for similar vectors in a Qdrant collection.

**Signature:**

```typescript
function searchPoints(config: SearchConfig) {
	return async function searchPointsIn(
		connection: VectorStoreConnection,
	): Promise<Result<VectorError, ReadonlyArray<SearchResult>>>
}
```

**Parameters:**

- `config: SearchConfig` - Search configuration
  - `collectionName: string` - Collection to search
  - `vector: ReadonlyArray<number>` - Query vector
  - `limit: number` - Maximum results to return
  - `scoreThreshold?: number` - Minimum similarity score (0-1)
  - `withVector?: boolean` - Include vectors in results (default: false)
  - `withPayload?: boolean` - Include payload in results (default: true)
- `connection: VectorStoreConnection` - Active vector store connection

**SearchResult Type:**

```typescript
type SearchResult = {
	readonly id: string | number
	readonly score: number // Similarity score (higher = more similar)
	readonly vector?: ReadonlyArray<number> // Only if withVector: true
	readonly payload?: Record<string, unknown> // Only if withPayload: true
}
```

**Returns:**

- `Promise<Result<VectorError, ReadonlyArray<SearchResult>>>` - Either error or search results

**Example:**

```typescript
import searchPoints from "@pathfinder/vector/searchPoints/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

const queryVector = [0.15, 0.25, 0.35 /* ... 384 dimensions */]

const config = {
	collectionName: "embeddings",
	vector: queryVector,
	limit: 5,
	scoreThreshold: 0.7, // Only results with score >= 0.7
	withPayload: true,
	withVector: false,
}

const result = await searchPoints(config)(connection)

if (isOk(result)) {
	const matches = result.value
	matches.forEach(function processMatch(match) {
		console.log(`ID: ${match.id}, Score: ${match.score}`)
		console.log(`Title: ${match.payload?.title}`)
	})
} else {
	const err = result.error // VectorError
}
```

**Error Kinds:**

- `SearchFailed` - Search operation failed
- `CollectionNotFound` - Collection does not exist
- `InvalidDimension` - Query vector dimension does not match collection

**File:** `src/vector/searchPoints/index.ts`

## Error Handling

Pathfinder uses the Result monad for all IO operations. Never use try/catch.

### Error Types

All errors are discriminated unions with a `_tag` field and specific `kind` values.

#### ConnectionError

```typescript
type ConnectionError = {
	readonly _tag: "ConnectionError"
	readonly kind:
		| "TripleStoreInitFailed"
		| "VectorStoreInitFailed"
		| "VectorStoreUnhealthy"
		| "InvalidStorePath"
	readonly message: string
	readonly path?: string
	readonly host?: string
	readonly port?: number
	readonly cause?: unknown
}
```

**Kinds:**

- `TripleStoreInitFailed` - Cannot connect to Oxigraph server
- `VectorStoreInitFailed` - Cannot connect to Qdrant server
- `VectorStoreUnhealthy` - Qdrant reports unhealthy status
- `InvalidStorePath` - File system path is invalid (unused in HTTP mode)

#### QueryError

```typescript
type QueryError = {
	readonly _tag: "QueryError"
	readonly kind:
		| "ExecutionFailed"
		| "InvalidSyntax"
		| "ResultParseFailed"
		| "Timeout"
	readonly message: string
	readonly sparql?: string
	readonly line?: number
	readonly column?: number
	readonly cause?: unknown
}
```

**Kinds:**

- `ExecutionFailed` - Query execution failed (network or server error)
- `InvalidSyntax` - SPARQL syntax error
- `ResultParseFailed` - Cannot parse server response
- `Timeout` - Query exceeded timeout

#### ConfigError

```typescript
type ConfigError = {
	readonly _tag: "ConfigError"
	readonly kind:
		| "MissingPath"
		| "MissingHost"
		| "InvalidPort"
		| "InvalidConfig"
	readonly field: string
	readonly message: string
	readonly value?: unknown
}
```

**Kinds:**

- `MissingHost` - Host is empty or whitespace
- `MissingPath` - Path is empty (unused)
- `InvalidPort` - Port outside valid range 1-65535
- `InvalidConfig` - General configuration error

#### VectorError

```typescript
type VectorError = {
	readonly _tag: "VectorError"
	readonly kind:
		| "CollectionNotFound"
		| "InsertFailed"
		| "SearchFailed"
		| "InvalidDimension"
	readonly message: string
	readonly collection?: string
	readonly dimension?: number
	readonly cause?: unknown
}
```

**Kinds:**

- `CollectionNotFound` - Collection does not exist
- `InsertFailed` - Insert operation failed
- `SearchFailed` - Search operation failed
- `InvalidDimension` - Vector dimension mismatch

### Error Handling Patterns

#### Pattern 1: isOk/isError Guards

```typescript
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

const result = await execute(query)(connection)

if (isOk(result)) {
	const value = result.value
	// Process success
} else {
	const err = result.error
	// Handle error
}
```

#### Pattern 2: map/mapError for Transformation

```typescript
import map from "@sitebender/toolsmith/monads/result/map/index.ts"
import mapError from "@sitebender/toolsmith/monads/result/mapError/index.ts"

const result = await execute(query)(connection)

const transformed = map(function transformBindings(bindings) {
	return bindings.length
})(result)

const withLogging = mapError(function logError(err) {
	console.error(`Query failed: ${err.message}`)
	return err
})(result)
```

#### Pattern 3: flatMap for Chaining

```typescript
import flatMap from "@sitebender/toolsmith/monads/result/flatMap/index.ts"

const result = await createTripleStore(config)

const insertResult = await flatMap(function insertData(connection) {
	return insert(turtle)(connection)
})(result)
```

#### Pattern 4: getOrElse for Defaults

```typescript
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

const result = await execute(query)(connection)

const bindings = getOrElse([])(result) // Empty array if error
```

## Type Reference

### Core Configuration Types

```typescript
type PathfinderConfig = {
	readonly tripleStore: TripleStoreConfig
	readonly vectorStore: VectorStoreConfig
}

type TripleStoreConfig = {
	readonly host: string
	readonly port: number
	readonly timeout?: number
}

type VectorStoreConfig = {
	readonly host: string
	readonly port: number
	readonly apiKey?: string
	readonly timeout?: number
}

type ValidPathfinderConfig = PathfinderConfig & {
	readonly __brand: "ValidPathfinderConfig"
}
```

### Connection Types

```typescript
type TripleStoreConnection = {
	readonly baseUrl: string
	readonly queryEndpoint: string
	readonly updateEndpoint: string
}

type VectorStoreConnection = {
	readonly baseUrl: string
	readonly collectionsEndpoint: string
	readonly apiKey?: string
}
```

### SPARQL Query Builder Types

```typescript
type TriplePattern = {
	readonly subject: string
	readonly predicate: string
	readonly object: string
}

type SelectBuilder = {
	readonly where: (patterns: ReadonlyArray<TriplePattern>) => WhereBuilder
}

type WhereBuilder = {
	readonly filter: (condition: string) => FilterBuilder
	readonly build: () => string
}

type FilterBuilder = {
	readonly filter: (condition: string) => FilterBuilder
	readonly build: () => string
}
```

### Vector Operation Types

```typescript
type VectorPoint = {
	readonly id: string | number
	readonly vector: ReadonlyArray<number>
	readonly payload?: Record<string, unknown>
}

type CollectionConfig = {
	readonly name: string
	readonly dimension: number
	readonly distance: DistanceMetric
}

type DistanceMetric = "Cosine" | "Euclid" | "Dot" | "Manhattan"

type InsertPointsConfig = {
	readonly collectionName: string
	readonly points: ReadonlyArray<VectorPoint>
}

type SearchConfig = {
	readonly collectionName: string
	readonly vector: ReadonlyArray<number>
	readonly limit: number
	readonly scoreThreshold?: number
	readonly withVector?: boolean
	readonly withPayload?: boolean
}

type SearchResult = {
	readonly id: string | number
	readonly score: number
	readonly vector?: ReadonlyArray<number>
	readonly payload?: Record<string, unknown>
}
```

## Best Practices

### 1. Always Validate Configuration

```typescript
import validateConfig from "@pathfinder/config/validateConfig/index.ts"
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"

const result = validateConfig(config)
if (isSuccess(result)) {
	// Proceed with connections
} else {
	// Display validation errors to user
}
```

### 2. Use Pipe for Composition

```typescript
import pipe from "@sitebender/toolsmith/combinators/pipe/index.ts"

const result = await pipe(
	connection,
	insert(turtle),
)
```

### 3. Handle All Error Cases

```typescript
if (isOk(result)) {
	// Success path
} else {
	// Always handle error path
	const err = result.error
	switch (err.kind) {
		case "ExecutionFailed":
			// Handle execution error
			break
		case "InvalidSyntax":
			// Handle syntax error
			break
		default:
			// Handle unknown error
	}
}
```

### 4. Use Type Guards for Error Discrimination

```typescript
function isConnectionError(
	err: AnyPathfinderError,
): err is ConnectionError {
	return err._tag === "ConnectionError"
}

function isQueryError(
	err: AnyPathfinderError,
): err is QueryError {
	return err._tag === "QueryError"
}
```

### 5. Prefer Query Builder Over Raw SPARQL

```typescript
// Good: Type-safe, composable
const query = select("title", "author")
	.where([
		{ subject: "?article", predicate: "rdf:type", object: "schema:Article" },
	])
	.build()

// Less ideal: Raw string (still valid)
const query = `SELECT ?title ?author WHERE { ?article rdf:type schema:Article }`
```

## See Also

- [README.md](../README.md) - Overview and quick start
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) - Architecture and design decisions
- [examples/basic-usage.ts](examples/basic-usage.ts) - Working code examples
- [examples/architect-integration.ts](examples/architect-integration.ts) - Integration patterns

## Version History

### 1.0.0 (2025-11-08)

- Initial API release
- Triple store operations (insert, execute, delete, select)
- Vector store operations (createCollection, insertPoints, searchPoints)
- Configuration validation
- Connection management
- Complete error handling with Result monad

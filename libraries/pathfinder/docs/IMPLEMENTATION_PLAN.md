# Pathfinder Implementation Plan

**Version:** 1.0.0
**Created:** 2025-11-07
**Status:** Approved - Ready for Implementation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Prerequisites](#prerequisites)
3. [Phase 0: Infrastructure Cleanup](#phase-0-infrastructure-cleanup)
4. [Phase 1: Foundation](#phase-1-foundation)
5. [Phase 2: Oxigraph Integration](#phase-2-oxigraph-integration)
6. [Phase 3: Qdrant Integration](#phase-3-qdrant-integration)
7. [Phase 4: Type-Safe SPARQL Builder](#phase-4-type-safe-sparql-builder)
8. [Phase 5: Testing & Documentation](#phase-5-testing--documentation)
9. [Phase 6: Public API](#phase-6-public-api)
10. [Constitutional Compliance Checklist](#constitutional-compliance-checklist)
11. [Dependencies & Integration](#dependencies--integration)

---

## Executive Summary

### Goal

Implement Pathfinder as Sitebender's **single source of truth** for data infrastructure, providing:

- **Oxigraph** (RDF triple store) - SPARQL 1.1 query/update
- **Qdrant** (vector database) - Semantic similarity search
- Unified API for all libraries to interact with persistent data

### Scope

**Middle ground - Core + Extensibility:**

- Essential operations (connect, insert, query, delete)
- Both Oxigraph AND Qdrant integration
- Hybrid SPARQL API (strings + type-safe builder)
- Proper abstractions for future enhancements

### Non-Negotiable Rules

All code MUST follow these constitutional rules:

1. ✅ **No classes** - Pure functions only
2. ✅ **No mutations** - Immutable data structures
3. ✅ **No loops** - Use map/filter/reduce from Toolsmith
4. ✅ **No exceptions** - Use Result/Validation monads
5. ✅ **One function per file** - Single responsibility
6. ✅ **Pure functions** - Except explicit IO boundaries
7. ✅ **No arrow functions** - Use `function` keyword only
8. ✅ **All functions curried** - Exactly ONE parameter per level
9. ✅ **Use Toolsmith functions** - Not OOP methods (.push, .forEach, etc.)
10. ✅ **Result for fail-fast**, **Validation for accumulation**

---

## Prerequisites

### External Dependencies (Approved in contracts/dependencies.yaml)

- [ ] `oxigraph@^0.4` - Triple store with SPARQL 1.1
- [ ] `@qdrant/js-client-rest@^1.0` - Vector search client
- [ ] Toolsmith library complete (Result/Validation monads available)

### Warden Enforcement

**Note:** Warden must be complete to enforce dependency whitelist. Until then, manually verify no unauthorized dependencies are added.

### Knowledge Requirements

Read these before starting:

- [ ] `/libraries/pathfinder/README.md` - Full architecture
- [ ] `/contracts/boundaries.json` - Dependency rules
- [ ] `.claude/skills/function-implementation/` - Function patterns
- [ ] `.claude/skills/error-handling/` - Result/Validation patterns
- [ ] `.claude/skills/type-definition/` - Branded types, discriminated unions

---

## Phase 0: Infrastructure Cleanup

**Goal:** Remove Fuseki from Docker infrastructure (no longer needed)

### Batch 0.1: Docker Compose Cleanup

**Files to modify:**

- `infrastructure/docker-compose.yml`

**Tasks:**

- [ ] Remove `fuseki` service definition (lines ~83-105)
- [ ] Remove `fuseki_data` volume from volumes section
- [ ] Verify Qdrant service is still present and configured
- [ ] Test remaining Docker services start correctly: `docker-compose up -d`
- [ ] Verify Qdrant accessible at `http://localhost:6333`

**Validation:**

```bash
cd infrastructure
docker-compose down
docker-compose up -d
curl http://localhost:6333 # Should return Qdrant response
```

### Batch 0.2: Documentation Updates

**Files to modify:**

- `infrastructure/README.md` (if exists)
- `infrastructure/docker-compose.yml` comments

**Tasks:**

- [ ] Remove Fuseki references from infrastructure docs
- [ ] Add note that Oxigraph runs embedded (no Docker service needed)
- [ ] Document that triple store is SQLite file (configurable path)

**Completion Criteria:**

- ✅ No Fuseki service in docker-compose.yml
- ✅ Only Qdrant running for Pathfinder dependencies
- ✅ Documentation reflects Oxigraph embedded architecture

---

## Phase 1: Foundation

**Goal:** Set up directory structure, types, configuration, and error definitions

### Batch 1.1: Directory Structure

**Create these directories:**

```
libraries/pathfinder/
├── src/
│   ├── connection/
│   │   ├── createTripleStore/
│   │   └── createVectorStore/
│   ├── config/
│   │   ├── validateConfig/
│   │   └── types/
│   ├── errors/
│   ├── sparql/
│   │   ├── execute/
│   │   ├── insert/
│   │   ├── select/
│   │   └── delete/
│   ├── vector/
│   │   ├── createCollection/
│   │   ├── insertVectors/
│   │   └── search/
│   └── types/
└── docs/
    └── examples/
```

**Tasks:**

- [ ] Create all directories listed above
- [ ] Verify workspace structure matches convention
- [ ] Create placeholder `.gitkeep` files if needed

### Batch 1.2: Library Configuration (deno.jsonc)

**File to create:** `libraries/pathfinder/deno.jsonc`

**Tasks:**

- [ ] Create deno.jsonc with correct name, version, exports
- [ ] Configure compiler options (strict, jsx settings)
- [ ] Set up imports (Toolsmith aliases, test libs)
- [ ] Add tasks (test, test:strict, test:cov, fmt, lint)
- [ ] Configure formatting (tabs, 80 chars, no semicolons)
- [ ] Configure linting (recommended rules)

**Template:**

```jsonc
{
	"name": "@sitebender/pathfinder",
	"version": "0.0.1-alpha",
	"exports": "./src/mod.ts",

	"compilerOptions": {
		"strict": true,
		"lib": ["esnext", "deno.ns"],
		"skipLibCheck": true
	},

	"imports": {
		"@sitebender/toolsmith/": "../toolsmith/src/",
		"@std/expect": "jsr:@std/expect@^1.0.17",
		"@std/assert": "jsr:@std/assert@^1.0.14",
		"@std/testing/bdd": "jsr:@std/testing@^1.0.15/bdd"
	},

	"tasks": {
		"test": "deno test --unstable-temporal --no-check '**/*.test.ts'",
		"test:strict": "deno test --unstable-temporal '**/*.test.ts'",
		"test:cov": "deno test --unstable-temporal --no-check '**/*.test.ts' --coverage=coverage && deno coverage coverage --lcov > coverage.lcov",
		"fmt": "deno fmt",
		"lint": "deno lint"
	},

	"fmt": {
		"useTabs": true,
		"lineWidth": 80,
		"indentWidth": 2,
		"semiColons": false,
		"singleQuote": false
	},

	"lint": {
		"rules": {
			"tags": ["recommended"]
		}
	}
}
```

### Batch 1.3: Error Type Definitions

**File to create:** `libraries/pathfinder/src/errors/index.ts`

**Tasks:**

- [ ] Define `PathfinderError` base type with `_tag` field
- [ ] Define `ConnectionError` discriminated union
- [ ] Define `QueryError` discriminated union
- [ ] Define `ConfigError` discriminated union
- [ ] Define `VectorError` discriminated union
- [ ] Use `kind` field for error variants
- [ ] All fields `readonly`
- [ ] Export with `export type { ... }`

**Template:**

```typescript
// Base error type
export type PathfinderError<Tag extends string> = {
	readonly _tag: Tag
}

// Connection errors
export type ConnectionError = PathfinderError<"ConnectionError"> & {
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

// Query errors
export type QueryError = PathfinderError<"QueryError"> & {
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

// Configuration errors
export type ConfigError = PathfinderError<"ConfigError"> & {
	readonly kind:
		| "MissingPath"
		| "MissingHost"
		| "InvalidPort"
		| "InvalidConfig"
	readonly field: string
	readonly message: string
	readonly value?: unknown
}

// Vector search errors
export type VectorError = PathfinderError<"VectorError"> & {
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

// Union of all Pathfinder errors
export type AnyPathfinderError =
	| ConnectionError
	| QueryError
	| ConfigError
	| VectorError
```

**Validation:**

- [ ] All error types extend `PathfinderError<Tag>`
- [ ] All fields are `readonly`
- [ ] All use discriminated unions with `kind` field
- [ ] All exported with `export type { ... }`

### Batch 1.4: Configuration Types

**File to create:** `libraries/pathfinder/src/config/types/index.ts`

**Tasks:**

- [ ] Define `PathfinderConfig` type
- [ ] Define `TripleStoreConfig` sub-type
- [ ] Define `VectorStoreConfig` sub-type
- [ ] Define `ValidPathfinderConfig` branded type
- [ ] All fields `readonly`
- [ ] Use optional fields (`?`) where appropriate

**Template:**

```typescript
export type TripleStoreConfig = {
	readonly path: string // SQLite database file path
	readonly readonly?: boolean // Open in read-only mode
}

export type VectorStoreConfig = {
	readonly host: string // Qdrant host
	readonly port: number // Qdrant port (default 6333)
	readonly apiKey?: string // Optional API key
	readonly timeout?: number // Request timeout in ms
}

export type PathfinderConfig = {
	readonly tripleStore: TripleStoreConfig
	readonly vectorStore: VectorStoreConfig
}

// Branded type for validated config
export type ValidPathfinderConfig = PathfinderConfig & {
	readonly __brand: "ValidPathfinderConfig"
}
```

### Batch 1.5: Configuration Validation

**File to create:** `libraries/pathfinder/src/config/validateConfig/index.ts`

**Tasks:**

- [ ] Import Validation monad from Toolsmith
- [ ] Import config types
- [ ] Import ConfigError type
- [ ] Implement curried validation function
- [ ] Accumulate ALL validation errors (use Validation, not Result)
- [ ] Check tripleStore.path is non-empty string
- [ ] Check vectorStore.host is non-empty string
- [ ] Check vectorStore.port is 1-65535
- [ ] Return `invalid(errors)` if any errors
- [ ] Return `valid(config as ValidPathfinderConfig)` if clean
- [ ] Function signature: `(config: PathfinderConfig) => Validation<ConfigError, ValidPathfinderConfig>`

**Template:**

```typescript
import type { Validation } from "@sitebender/toolsmith/monads/validation/types/index.ts"
import valid from "@sitebender/toolsmith/monads/validation/valid/index.ts"
import invalid from "@sitebender/toolsmith/monads/validation/invalid/index.ts"
import type { PathfinderConfig, ValidPathfinderConfig } from "../types/index.ts"
import type { ConfigError } from "../../errors/index.ts"

export default function validateConfig(
	config: PathfinderConfig,
): Validation<ConfigError, ValidPathfinderConfig> {
	const errors: Array<ConfigError> = []

	// Validate triple store path
	if (!config.tripleStore.path || config.tripleStore.path.trim() === "") {
		errors.push({
			_tag: "ConfigError",
			kind: "MissingPath",
			field: "tripleStore.path",
			message: "Triple store path is required",
		})
	}

	// Validate vector store host
	if (!config.vectorStore.host || config.vectorStore.host.trim() === "") {
		errors.push({
			_tag: "ConfigError",
			kind: "MissingHost",
			field: "vectorStore.host",
			message: "Vector store host is required",
		})
	}

	// Validate vector store port
	const port = config.vectorStore.port
	if (!port || port < 1 || port > 65535) {
		errors.push({
			_tag: "ConfigError",
			kind: "InvalidPort",
			field: "vectorStore.port",
			message: `Port must be between 1 and 65535, got ${port}`,
			value: port,
		})
	}

	// Return invalid if any errors, otherwise valid with brand
	return errors.length > 0
		? invalid(errors)
		: valid(config as ValidPathfinderConfig)
}
```

**Test file to create:** `libraries/pathfinder/src/config/validateConfig/index.test.ts`

**Test tasks:**

- [ ] Test valid configuration returns `{ _tag: "Valid", value: ... }`
- [ ] Test missing path returns `{ _tag: "Invalid", errors: [...] }`
- [ ] Test missing host returns ConfigError
- [ ] Test invalid port (0, -1, 70000) returns ConfigError
- [ ] Test multiple errors are accumulated (not just first error)

**Completion Criteria for Phase 1:**

- ✅ All directories created
- ✅ deno.jsonc configured correctly
- ✅ All error types defined as discriminated unions
- ✅ Config types defined with branded ValidPathfinderConfig
- ✅ validateConfig uses Validation monad (error accumulation)
- ✅ validateConfig tests pass
- ✅ Zero constitutional violations

---

## Phase 2: Oxigraph Integration

**Goal:** Connect to Oxigraph triple store and implement core SPARQL operations

### Batch 2.1: Triple Store Connection

**File to create:** `libraries/pathfinder/src/connection/createTripleStore/index.ts`

**Tasks:**

- [ ] Import oxigraph package: `import oxigraph from "npm:oxigraph@^0.4"`
- [ ] Import Result monad from Toolsmith
- [ ] Import TripleStoreConfig, ConnectionError
- [ ] Implement curried connection function
- [ ] Mark as IO boundary: `// [IO] Connects to Oxigraph triple store`
- [ ] Wrap external call in try/catch (ONLY place exceptions allowed)
- [ ] Return `error(...)` if connection fails
- [ ] Return `ok(store)` if successful
- [ ] Store type should be `oxigraph.Store`

**Function signature:**

```typescript
export default function createTripleStore(
	config: TripleStoreConfig,
): Result<ConnectionError, oxigraph.Store>
```

**Template:**

```typescript
// [IO] Connects to Oxigraph triple store
import oxigraph from "npm:oxigraph@^0.4"
import type { Result } from "@sitebender/toolsmith/monads/result/types/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { TripleStoreConfig } from "../../config/types/index.ts"
import type { ConnectionError } from "../../errors/index.ts"

export default function createTripleStore(
	config: TripleStoreConfig,
): Result<ConnectionError, oxigraph.Store> {
	try {
		// Create Oxigraph store with SQLite backend
		const store = new oxigraph.Store(config.path, {
			readonly: config.readonly ?? false,
		})
		return ok(store)
	} catch (cause) {
		return error({
			_tag: "ConnectionError",
			kind: "TripleStoreInitFailed",
			message: `Failed to initialize triple store at ${config.path}`,
			path: config.path,
			cause,
		})
	}
}
```

**Test file:** `libraries/pathfinder/src/connection/createTripleStore/index.test.ts`

**Test tasks:**

- [ ] Test with valid path creates store (use temp directory)
- [ ] Test with invalid path returns ConnectionError
- [ ] Test readonly flag is respected
- [ ] Clean up test database files in afterEach

### Batch 2.2: SPARQL Query Execution

**File to create:** `libraries/pathfinder/src/sparql/execute/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import QueryError type
- [ ] Implement double-curried function (sparql string, then store)
- [ ] Mark as IO boundary
- [ ] Wrap query execution in try/catch
- [ ] Parse results into JavaScript objects
- [ ] Return `error(...)` if execution fails
- [ ] Return `ok(results)` if successful

**Function signature:**

```typescript
export default function execute(sparql: string) {
	return function executeOn(
		store: oxigraph.Store
	): Result<QueryError, ReadonlyArray<Record<string, unknown>>>
}
```

**Template:**

```typescript
// [IO] Executes SPARQL query against triple store
import type oxigraph from "npm:oxigraph@^0.4"
import type { Result } from "@sitebender/toolsmith/monads/result/types/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { QueryError } from "../../errors/index.ts"

export default function execute(sparql: string) {
	return function executeOn(
		store: oxigraph.Store,
	): Result<QueryError, ReadonlyArray<Record<string, unknown>>> {
		// [IO] Execute SPARQL query
		try {
			const results = store.query(sparql)

			// Convert iterator to array (use Array.from, not loops)
			const parsed = Array.from(results, (binding) => {
				const obj: Record<string, unknown> = {}
				for (const [key, value] of binding) {
					obj[key] = value.value
				}
				return obj
			})

			return ok(parsed)
		} catch (cause) {
			return error({
				_tag: "QueryError",
				kind: "ExecutionFailed",
				message: `SPARQL query execution failed`,
				sparql,
				cause,
			})
		}
	}
}
```

**Test file:** `libraries/pathfinder/src/sparql/execute/index.test.ts`

**Test tasks:**

- [ ] Test SELECT query returns results array
- [ ] Test invalid SPARQL returns QueryError
- [ ] Test empty results returns empty array
- [ ] Test with closed store returns error

### Batch 2.3: Triple Insertion

**File to create:** `libraries/pathfinder/src/sparql/insert/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import QueryError type
- [ ] Implement double-curried function (Turtle string, then store)
- [ ] Mark as IO boundary
- [ ] Use SPARQL INSERT DATA with Turtle triples
- [ ] Return `error(...)` if insertion fails
- [ ] Return `ok(void)` if successful

**Function signature:**

```typescript
export default function insert(turtle: string) {
	return function insertInto(
		store: oxigraph.Store
	): Result<QueryError, void>
}
```

**Template:**

```typescript
// [IO] Inserts triples into triple store
import type oxigraph from "npm:oxigraph@^0.4"
import type { Result } from "@sitebender/toolsmith/monads/result/types/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { QueryError } from "../../errors/index.ts"

export default function insert(turtle: string) {
	return function insertInto(
		store: oxigraph.Store,
	): Result<QueryError, void> {
		// [IO] Insert triples using SPARQL UPDATE
		try {
			const sparql = `INSERT DATA { ${turtle} }`
			store.update(sparql)
			return ok(undefined)
		} catch (cause) {
			return error({
				_tag: "QueryError",
				kind: "ExecutionFailed",
				message: `Failed to insert triples`,
				sparql: turtle,
				cause,
			})
		}
	}
}
```

**Test file:** `libraries/pathfinder/src/sparql/insert/index.test.ts`

**Test tasks:**

- [ ] Test valid Turtle insertion succeeds
- [ ] Test invalid Turtle returns QueryError
- [ ] Test inserted triples are queryable
- [ ] Test multiple insertions accumulate

### Batch 2.4: Triple Deletion

**File to create:** `libraries/pathfinder/src/sparql/delete/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import QueryError type
- [ ] Implement double-curried function (pattern string, then store)
- [ ] Mark as IO boundary
- [ ] Use SPARQL DELETE WHERE
- [ ] Return `error(...)` if deletion fails
- [ ] Return `ok(void)` if successful

**Function signature:**

```typescript
export default function deleteSparql(pattern: string) {
	return function deleteFrom(
		store: oxigraph.Store
	): Result<QueryError, void>
}
```

**Template:**

```typescript
// [IO] Deletes triples matching pattern from triple store
import type oxigraph from "npm:oxigraph@^0.4"
import type { Result } from "@sitebender/toolsmith/monads/result/types/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { QueryError } from "../../errors/index.ts"

export default function deleteSparql(pattern: string) {
	return function deleteFrom(
		store: oxigraph.Store,
	): Result<QueryError, void> {
		// [IO] Delete triples using SPARQL UPDATE
		try {
			const sparql = `DELETE WHERE { ${pattern} }`
			store.update(sparql)
			return ok(undefined)
		} catch (cause) {
			return error({
				_tag: "QueryError",
				kind: "ExecutionFailed",
				message: `Failed to delete triples`,
				sparql: pattern,
				cause,
			})
		}
	}
}
```

**Test file:** `libraries/pathfinder/src/sparql/delete/index.test.ts`

**Test tasks:**

- [ ] Test deletion removes matching triples
- [ ] Test invalid pattern returns QueryError
- [ ] Test non-matching pattern succeeds (deletes zero)
- [ ] Test deletion confirmed via SELECT query

**Completion Criteria for Phase 2:**

- ✅ createTripleStore connects to Oxigraph successfully
- ✅ execute runs SPARQL SELECT queries
- ✅ insert adds triples via Turtle
- ✅ deleteSparql removes triples via pattern
- ✅ All operations return Result monad
- ✅ All IO boundaries marked with comments
- ✅ All tests pass
- ✅ Zero constitutional violations

---

## Phase 3: Qdrant Integration

**Goal:** Connect to Qdrant vector store and implement vector operations

### Batch 3.1: Vector Store Connection

**File to create:** `libraries/pathfinder/src/connection/createVectorStore/index.ts`

**Tasks:**

- [ ] Import Qdrant client: `import { QdrantClient } from "npm:@qdrant/js-client-rest@^1.0"`
- [ ] Import Result monad
- [ ] Import VectorStoreConfig, ConnectionError
- [ ] Implement curried connection function
- [ ] Mark as IO boundary
- [ ] Test connection health after creation
- [ ] Return `error(...)` if connection fails or unhealthy
- [ ] Return `ok(client)` if successful

**Function signature:**

```typescript
export default function createVectorStore(
	config: VectorStoreConfig,
): Promise<Result<ConnectionError, QdrantClient>>
```

**Template:**

```typescript
// [IO] Connects to Qdrant vector store
import { QdrantClient } from "npm:@qdrant/js-client-rest@^1.0"
import type { Result } from "@sitebender/toolsmith/monads/result/types/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { VectorStoreConfig } from "../../config/types/index.ts"
import type { ConnectionError } from "../../errors/index.ts"

export default function createVectorStore(
	config: VectorStoreConfig,
): Promise<Result<ConnectionError, QdrantClient>> {
	return async function executeVectorStoreCreation(): Promise<
		Result<ConnectionError, QdrantClient>
	> {
		try {
			// Create Qdrant client
			const client = new QdrantClient({
				host: config.host,
				port: config.port,
				apiKey: config.apiKey,
				timeout: config.timeout,
			})

			// Test connection health
			const health = await client.getHealth()
			if (!health) {
				return error({
					_tag: "ConnectionError",
					kind: "VectorStoreUnhealthy",
					message: `Qdrant at ${config.host}:${config.port} is unhealthy`,
					host: config.host,
					port: config.port,
				})
			}

			return ok(client)
		} catch (cause) {
			return error({
				_tag: "ConnectionError",
				kind: "VectorStoreInitFailed",
				message: `Failed to connect to Qdrant at ${config.host}:${config.port}`,
				host: config.host,
				port: config.port,
				cause,
			})
		}
	}()
}
```

**Note:** This is async - returns Promise<Result<...>>

**Test file:** `libraries/pathfinder/src/connection/createVectorStore/index.test.ts`

**Test tasks:**

- [ ] Test successful connection to local Qdrant (localhost:6333)
- [ ] Test connection failure with invalid host returns ConnectionError
- [ ] Test connection to unhealthy instance returns error
- [ ] Test with API key (if configured)

### Batch 3.2: Collection Creation

**File to create:** `libraries/pathfinder/src/vector/createCollection/index.ts`

**Tasks:**

- [ ] Import QdrantClient type
- [ ] Import Result monad
- [ ] Import VectorError type
- [ ] Implement triple-curried function (name, dimension, client)
- [ ] Mark as IO boundary
- [ ] Check if collection exists first
- [ ] Create collection if not exists
- [ ] Return `error(...)` if creation fails
- [ ] Return `ok(collectionInfo)` if successful

**Function signature:**

```typescript
export default function createCollection(name: string) {
	return function withDimension(dimension: number) {
		return function inVectorStore(
			client: QdrantClient
		): Promise<Result<VectorError, CollectionInfo>>
	}
}
```

**Template:**

```typescript
// [IO] Creates vector collection in Qdrant
import type { QdrantClient } from "npm:@qdrant/js-client-rest@^1.0"
import type { Result } from "@sitebender/toolsmith/monads/result/types/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { VectorError } from "../../errors/index.ts"

export type CollectionInfo = {
	readonly name: string
	readonly dimension: number
	readonly vectorCount: number
}

export default function createCollection(name: string) {
	return function withDimension(dimension: number) {
		return async function inVectorStore(
			client: QdrantClient,
		): Promise<Result<VectorError, CollectionInfo>> {
			try {
				// Check if collection exists
				const exists = await client.collectionExists(name)

				if (!exists) {
					// Create collection with specified dimension
					await client.createCollection(name, {
						vectors: {
							size: dimension,
							distance: "Cosine",
						},
					})
				}

				// Get collection info
				const info = await client.getCollection(name)

				return ok({
					name: info.name,
					dimension: info.config.params.vectors.size,
					vectorCount: info.points_count ?? 0,
				})
			} catch (cause) {
				return error({
					_tag: "VectorError",
					kind: "InsertFailed",
					message: `Failed to create collection ${name}`,
					collection: name,
					dimension,
					cause,
				})
			}
		}
	}
}
```

**Test file:** `libraries/pathfinder/src/vector/createCollection/index.test.ts`

**Test tasks:**

- [ ] Test collection creation succeeds
- [ ] Test creating existing collection is idempotent
- [ ] Test invalid dimension returns VectorError
- [ ] Clean up test collections after tests

### Batch 3.3: Vector Insertion

**File to create:** `libraries/pathfinder/src/vector/insertVectors/index.ts`

**Tasks:**

- [ ] Import QdrantClient type
- [ ] Import Result monad
- [ ] Import VectorError type
- [ ] Define Vector type (id, vector, payload)
- [ ] Implement triple-curried function (collection, vectors, client)
- [ ] Mark as IO boundary
- [ ] Validate vectors have correct dimension
- [ ] Use Qdrant upsert operation
- [ ] Return `error(...)` if insertion fails
- [ ] Return `ok(count)` if successful

**Types:**

```typescript
export type Vector = {
	readonly id: string | number
	readonly vector: ReadonlyArray<number>
	readonly payload?: Record<string, unknown>
}
```

**Function signature:**

```typescript
export default function insertVectors(collection: string) {
	return function withVectors(vectors: ReadonlyArray<Vector>) {
		return function intoVectorStore(
			client: QdrantClient
		): Promise<Result<VectorError, number>>
	}
}
```

**Test file:** `libraries/pathfinder/src/vector/insertVectors/index.test.ts`

**Test tasks:**

- [ ] Test inserting single vector succeeds
- [ ] Test inserting multiple vectors succeeds
- [ ] Test dimension mismatch returns VectorError
- [ ] Test invalid collection returns error

### Batch 3.4: Vector Search

**File to create:** `libraries/pathfinder/src/vector/search/index.ts`

**Tasks:**

- [ ] Import QdrantClient type
- [ ] Import Result monad
- [ ] Import VectorError type
- [ ] Define SearchResult type
- [ ] Implement quad-curried function (collection, vector, limit, client)
- [ ] Mark as IO boundary
- [ ] Execute similarity search
- [ ] Return `error(...)` if search fails
- [ ] Return `ok(results)` if successful

**Types:**

```typescript
export type SearchResult = {
	readonly id: string | number
	readonly score: number
	readonly payload?: Record<string, unknown>
}
```

**Function signature:**

```typescript
export default function search(collection: string) {
	return function withVector(vector: ReadonlyArray<number>) {
		return function withLimit(limit: number) {
			return function inVectorStore(
				client: QdrantClient
			): Promise<Result<VectorError, ReadonlyArray<SearchResult>>>
		}
	}
}
```

**Test file:** `libraries/pathfinder/src/vector/search/index.test.ts`

**Test tasks:**

- [ ] Test search returns similar vectors
- [ ] Test limit parameter is respected
- [ ] Test empty collection returns empty results
- [ ] Test invalid collection returns VectorError

**Completion Criteria for Phase 3:**

- ✅ createVectorStore connects to Qdrant successfully
- ✅ createCollection creates/checks collections
- ✅ insertVectors adds vectors with payloads
- ✅ search returns similarity results
- ✅ All operations return Promise<Result<...>>
- ✅ All IO boundaries marked
- ✅ All tests pass
- ✅ Zero constitutional violations

---

## Phase 4: Type-Safe SPARQL Builder

**Goal:** Implement fluent type-safe SPARQL query builder (hybrid approach)

### Batch 4.1: SELECT Builder

**File to create:** `libraries/pathfinder/src/sparql/select/index.ts`

**Tasks:**

- [ ] Import builder types
- [ ] Implement variadic `select(...variables)` function
- [ ] Return builder object with `where` method
- [ ] Use Toolsmith array functions (NO .join, .map OOP methods)
- [ ] All builder methods return new builders (immutable)
- [ ] Include `build()` method to generate SPARQL string

**Template:**

```typescript
import join from "@sitebender/toolsmith/array/join/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"

export type TriplePattern = {
	readonly subject: string
	readonly predicate: string
	readonly object: string
}

export type WhereBuilder = {
	readonly filter: (condition: string) => FilterBuilder
	readonly build: () => string
}

export type FilterBuilder = {
	readonly filter: (condition: string) => FilterBuilder
	readonly build: () => string
}

export default function select(
	...variables: ReadonlyArray<string>
) {
	const varList = join(" ")(variables)

	return {
		where: function whereClause(
			patterns: ReadonlyArray<TriplePattern>,
		): WhereBuilder {
			const filters: Array<string> = []

			return {
				filter: function filterClause(
					condition: string,
				): FilterBuilder {
					filters.push(condition)

					return {
						filter: function additionalFilter(
							additionalCondition: string,
						): FilterBuilder {
							filters.push(additionalCondition)
							return this
						},
						build: function buildQuery(): string {
							const triples = map((p: TriplePattern) =>
								`${p.subject} ${p.predicate} ${p.object} .`
							)(patterns)
							const tripleBlock = join("\n    ")(triples)
							const filterBlock = filters.length > 0
								? "\n    FILTER (" + join(" && ")(filters) + ")"
								: ""

							return `SELECT ${varList}\nWHERE {\n    ${tripleBlock}${filterBlock}\n}`
						},
					}
				},
				build: function buildQuery(): string {
					const triples = map((p: TriplePattern) =>
						`${p.subject} ${p.predicate} ${p.object} .`
					)(patterns)
					const tripleBlock = join("\n    ")(triples)

					return `SELECT ${varList}\nWHERE {\n    ${tripleBlock}\n}`
				},
			}
		},
	}
}
```

**Test file:** `libraries/pathfinder/src/sparql/select/index.test.ts`

**Test tasks:**

- [ ] Test SELECT with single variable
- [ ] Test SELECT with multiple variables
- [ ] Test WHERE with single pattern
- [ ] Test WHERE with multiple patterns
- [ ] Test FILTER clause generation
- [ ] Test multiple FILTER clauses
- [ ] Verify generated SPARQL is valid

### Batch 4.2: Helper Functions for Common Queries

**File to create:** `libraries/pathfinder/src/sparql/helpers/getAllTriples/index.ts`

**Tasks:**

- [ ] Implement helper that generates `SELECT * WHERE { ?s ?p ?o }`
- [ ] Return SPARQL string (unary curried function)

**File to create:** `libraries/pathfinder/src/sparql/helpers/getBySubject/index.ts`

**Tasks:**

- [ ] Implement helper that generates query for specific subject
- [ ] Curried: subject URI → SPARQL string

**File to create:** `libraries/pathfinder/src/sparql/helpers/getByPredicate/index.ts`

**Tasks:**

- [ ] Implement helper that generates query for specific predicate
- [ ] Curried: predicate URI → SPARQL string

**Completion Criteria for Phase 4:**

- ✅ select() builder creates SELECT queries
- ✅ where() adds triple patterns
- ✅ filter() adds FILTER clauses
- ✅ build() generates valid SPARQL
- ✅ Helper functions for common patterns
- ✅ All builder methods immutable
- ✅ Use Toolsmith functions (no OOP .map/.join)
- ✅ All tests pass
- ✅ Zero constitutional violations

---

## Phase 5: Testing & Documentation

**Goal:** Comprehensive test coverage and integration tests

### Batch 5.1: Integration Tests

**File to create:** `libraries/pathfinder/src/integration.test.ts`

**Tasks:**

- [ ] Create temporary triple store for testing
- [ ] Test full workflow: connect → insert → query → delete
- [ ] Test Qdrant workflow: connect → create collection → insert → search
- [ ] Test error scenarios (invalid config, failed connections)
- [ ] Clean up resources in afterEach/afterAll
- [ ] Verify all operations compose correctly

**Integration test template:**

```typescript
import { afterAll, beforeAll, describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import createTripleStore from "./connection/createTripleStore/index.ts"
import insert from "./sparql/insert/index.ts"
import execute from "./sparql/execute/index.ts"
import deleteSparql from "./sparql/delete/index.ts"

describe("Pathfinder integration", () => {
	let store: oxigraph.Store
	const testDbPath = "/tmp/pathfinder-test.db"

	beforeAll(() => {
		const result = createTripleStore({ path: testDbPath })
		if (result._tag === "Error") {
			throw new Error("Failed to create test store")
		}
		store = result.value
	})

	afterAll(() => {
		// Clean up test database
		try {
			Deno.removeSync(testDbPath)
		} catch {
			// Ignore if file doesn't exist
		}
	})

	it("should insert and query triples", () => {
		// Insert test data
		const turtle = `
			<http://example.org/alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
		`
		const insertResult = insert(turtle)(store)
		expect(insertResult._tag).toBe("Ok")

		// Query data
		const sparql = `
			SELECT ?name WHERE {
				<http://example.org/alice> <http://xmlns.com/foaf/0.1/name> ?name .
			}
		`
		const queryResult = execute(sparql)(store)
		expect(queryResult._tag).toBe("Ok")
		if (queryResult._tag === "Ok") {
			expect(queryResult.value.length).toBe(1)
			expect(queryResult.value[0].name).toBe("Alice")
		}
	})

	// More integration tests...
})
```

### Batch 5.2: Property-Based Tests

**File to create:** `libraries/pathfinder/src/properties.test.ts`

**Tasks:**

- [ ] Use Quarrier for property testing (if available)
- [ ] Test query execution is deterministic (same input → same output)
- [ ] Test insert → delete → query returns empty
- [ ] Test config validation with random inputs
- [ ] Test SPARQL builder generates syntactically valid queries

### Batch 5.3: API Documentation

**File to create:** `libraries/pathfinder/docs/API.md`

**Tasks:**

- [ ] Document all public functions
- [ ] Include function signatures
- [ ] Show usage examples for each function
- [ ] Document error types and when they occur
- [ ] Show integration patterns (how other libraries should use Pathfinder)

**Example structure:**

````markdown
# Pathfinder API Documentation

## Connection

### createTripleStore

Creates connection to Oxigraph triple store.

**Signature:**

```typescript
function createTripleStore(
	config: TripleStoreConfig,
): Result<ConnectionError, oxigraph.Store>
```
````

**Usage:**

```typescript
import createTripleStore from "@sitebender/pathfinder/connection/createTripleStore/index.ts"

const result = createTripleStore({
	path: "./data/store.db",
	readonly: false,
})

if (result._tag === "Ok") {
	const store = result.value
	// Use store...
}
```

**Errors:**

- `TripleStoreInitFailed` - Cannot create/open database file
- `InvalidStorePath` - Path is invalid or inaccessible

---

### createVectorStore

[Similar documentation for each function...]

````
### Batch 5.4: Usage Examples

**File to create:** `libraries/pathfinder/docs/examples/basic-usage.ts`

**Tasks:**
- [ ] Show complete example of triple store operations
- [ ] Show vector search example
- [ ] Show error handling patterns
- [ ] Show composition with pipe

**File to create:** `libraries/pathfinder/docs/examples/architect-integration.ts`

**Tasks:**
- [ ] Show how Architect would store compiled JSX
- [ ] Example: JSX → Turtle → insertTriples
- [ ] Example: Query components by type

**Completion Criteria for Phase 5:**
- ✅ Integration tests cover full workflows
- ✅ Property tests verify invariants
- ✅ API documentation complete
- ✅ Usage examples demonstrate patterns
- ✅ All tests pass
- ✅ Test coverage > 80%

---

## Phase 6: Public API

**Goal:** Consolidate exports and integrate with workspace

### Batch 6.1: Main Module (mod.ts)

**File to create:** `libraries/pathfinder/src/mod.ts`

**Tasks:**
- [ ] Export all public functions
- [ ] Export all public types
- [ ] Use named exports (NO default export for mod.ts)
- [ ] Group by category (Connection, SPARQL, Vector, Config, Errors)
- [ ] Add JSDoc comments

**Template:**
```typescript
/**
 * Pathfinder - Data Infrastructure Layer
 *
 * Single source of truth for triple store (Oxigraph) and vector search (Qdrant).
 *
 * @module pathfinder
 */

// Configuration
export { default as validateConfig } from "./config/validateConfig/index.ts"
export type {
	PathfinderConfig,
	TripleStoreConfig,
	VectorStoreConfig,
	ValidPathfinderConfig,
} from "./config/types/index.ts"

// Connection
export { default as createTripleStore } from "./connection/createTripleStore/index.ts"
export { default as createVectorStore } from "./connection/createVectorStore/index.ts"

// SPARQL Operations
export { default as execute } from "./sparql/execute/index.ts"
export { default as insert } from "./sparql/insert/index.ts"
export { default as deleteSparql } from "./sparql/delete/index.ts"
export { default as select } from "./sparql/select/index.ts"

// Vector Operations
export { default as createCollection } from "./vector/createCollection/index.ts"
export { default as insertVectors } from "./vector/insertVectors/index.ts"
export { default as search } from "./vector/search/index.ts"
export type { Vector, SearchResult } from "./vector/insertVectors/index.ts"

// Errors
export type {
	PathfinderError,
	ConnectionError,
	QueryError,
	ConfigError,
	VectorError,
	AnyPathfinderError,
} from "./errors/index.ts"
````

### Batch 6.2: Update Workspace Configuration

**File to modify:** `/deno.jsonc` (root workspace)

**Tasks:**

- [ ] Add Pathfinder to workspace members (if not present)
- [ ] Verify import map includes Pathfinder aliases

**File to modify:** `/contracts/boundaries.json`

**Tasks:**

- [ ] Add Pathfinder to layer structure (Layer 1 - Infrastructure)
- [ ] Define canImport: ["toolsmith"]
- [ ] Define canBeImportedBy: ["agent", "operator", "sentinel", "custodian", "envoy", "artificer", "applications"]
- [ ] Define forbiddenImports
- [ ] Add to dependency graph

**Template for boundaries.json addition:**

```json
{
	"pathfinder": {
		"layer": 1,
		"description": "Data infrastructure - triple store and vector search",
		"canImport": ["toolsmith"],
		"canBeImportedBy": [
			"agent",
			"operator",
			"sentinel",
			"custodian",
			"envoy",
			"artificer",
			"applications"
		],
		"forbiddenImports": [
			"arborist",
			"auditor",
			"architect",
			"formulator",
			"warden",
			"steward",
			"quartermaster"
		],
		"publicAPI": "libraries/pathfinder/src/",
		"notes": "Single source of truth for persistent data. All libraries requiring triple store or vector search must use Pathfinder API."
	}
}
```

### Batch 6.3: README Updates

**File to modify:** `/libraries/pathfinder/README.md`

**Tasks:**

- [ ] Update status from "Planning" to "Implemented"
- [ ] Add "Getting Started" section
- [ ] Add quick example
- [ ] Link to API documentation
- [ ] Update roadmap to reflect completed features

**File to modify:** `/README.md` (root)

**Tasks:**

- [ ] Update Pathfinder status in libraries overview
- [ ] Mark as "Implemented" instead of "Planned"

**Completion Criteria for Phase 6:**

- ✅ mod.ts exports all public API
- ✅ Workspace configuration updated
- ✅ contracts/boundaries.json includes Pathfinder
- ✅ README reflects implementation status
- ✅ Import aliases work across workspace
- ✅ Other libraries can import Pathfinder

---

## Constitutional Compliance Checklist

Before considering implementation complete, verify ALL of these:

### Code Structure

- [ ] ✅ Zero classes (no `class` keyword anywhere)
- [ ] ✅ Zero arrow functions (no `=>` syntax except type signatures)
- [ ] ✅ Zero loops (no `for`, `while`, `do-while`)
- [ ] ✅ Zero mutations (no `.push()`, `.pop()`, property assignment)
- [ ] ✅ Zero exceptions (no `try/catch/throw` except wrapping external libraries at IO boundary)
- [ ] ✅ One function per file (index.ts only)
- [ ] ✅ All functions curried (exactly ONE parameter per level)
- [ ] ✅ All helper functions in underscore-prefixed folders (`_helperName/`)

### Toolsmith Usage

- [ ] ✅ Use `map(fn)(array)` not `array.map(fn)`
- [ ] ✅ Use `filter(pred)(array)` not `array.filter(pred)`
- [ ] ✅ Use `reduce(fn)(init)(array)` not `array.reduce(fn, init)`
- [ ] ✅ Use `join(sep)(array)` not `array.join(sep)`
- [ ] ✅ Use `length(array)` not `array.length`
- [ ] ✅ Use `is(a)(b)` not `a === b` (where applicable)

### Error Handling

- [ ] ✅ All fallible operations return `Result<E, T>` or `Validation<E, T>`
- [ ] ✅ Use `Result` for fail-fast sequential operations
- [ ] ✅ Use `Validation` for error-accumulating operations (config validation, form validation)
- [ ] ✅ All errors are discriminated unions with `_tag` and `kind` fields
- [ ] ✅ All error fields are `readonly`

### Types

- [ ] ✅ All types use `readonly` or `ReadonlyArray`
- [ ] ✅ Branded types for validated data (ValidPathfinderConfig)
- [ ] ✅ Type imports use `import type { ... }`
- [ ] ✅ Type exports use `export type { ... }`

### File Organization

- [ ] ✅ All files named `index.ts` in function-named folders
- [ ] ✅ All folders use camelCase (not kebab-case or PascalCase)
- [ ] ✅ No barrel files (no re-exporting in index files except mod.ts)
- [ ] ✅ Test files named `index.test.ts` next to implementation

### Function Naming

- [ ] ✅ Inner function names capture outer parameter (`add(augend) { return function addToAugend(addend) { ... } }`)
- [ ] ✅ No abbreviations (except whitelisted)
- [ ] ✅ Full words used throughout

### IO Boundaries

- [ ] ✅ All IO functions marked with `// [IO]` comment
- [ ] ✅ Only IO functions use `try/catch` to wrap external library exceptions
- [ ] ✅ All IO functions convert exceptions to `Result` errors

### Documentation

- [ ] ✅ All public functions have JSDoc comments
- [ ] ✅ All complex algorithms explained
- [ ] ✅ Examples provided for usage

### Testing

- [ ] ✅ Every public function has tests
- [ ] ✅ Tests cover success cases
- [ ] ✅ Tests cover error cases
- [ ] ✅ Tests use Deno test framework
- [ ] ✅ No test code has constitutional violations

---

## Dependencies & Integration

### External Dependencies (Approved)

```json
{
	"dependencies": {
		"oxigraph": "npm:oxigraph@^0.4",
		"@qdrant/js-client-rest": "npm:@qdrant/js-client-rest@^1.0"
	},
	"devDependencies": {
		"@std/testing": "jsr:@std/testing@^1.0.15",
		"@std/expect": "jsr:@std/expect@^1.0.17",
		"@std/assert": "jsr:@std/assert@^1.0.14"
	}
}
```

### Internal Dependencies

**Pathfinder depends on:**

- Toolsmith (Result/Validation monads, array functions, composition)

**Libraries that will depend on Pathfinder:**

- Agent (federated queries)
- Operator (event storage)
- Sentinel (session persistence)
- Custodian (event history queries)
- Envoy (observability queries)
- Artificer (metadata registration - Phase 2+)
- Architect (compiled JSX storage - future)

### Integration Checklist

- [ ] Warden enforces dependency whitelist (oxigraph, qdrant only)
- [ ] Agent can import Pathfinder functions
- [ ] Operator can store events as triples
- [ ] Sentinel can persist session state
- [ ] Custodian can query event history
- [ ] No forbidden dependencies detected

---

## Success Metrics

### Code Quality

- [ ] Zero linting errors: `deno task lint`
- [ ] Zero formatting errors: `deno task fmt --check`
- [ ] Zero type errors: `deno task test:strict`
- [ ] Test coverage > 80%: `deno task test:cov`

### Functional Requirements

- [ ] Can connect to Oxigraph with configurable path
- [ ] Can execute SPARQL SELECT queries
- [ ] Can insert triples via Turtle syntax
- [ ] Can delete triples via SPARQL DELETE WHERE
- [ ] Can connect to Qdrant
- [ ] Can create vector collections
- [ ] Can insert vectors with payloads
- [ ] Can perform similarity search
- [ ] Type-safe SPARQL builder generates valid queries
- [ ] Configuration validation accumulates errors

### Documentation

- [ ] API documentation complete
- [ ] Usage examples provided
- [ ] Integration patterns documented
- [ ] README updated with status

### Integration

- [ ] Added to contracts/boundaries.json
- [ ] Import aliases work
- [ ] Other libraries can import successfully
- [ ] No circular dependencies

---

## Rollback Plan

If implementation fails or needs to be paused:

1. **Preserve Documentation**
   - Keep all planning documents
   - Document what was completed
   - Document blocking issues

2. **Revert Infrastructure Changes**
   - Restore Fuseki to docker-compose.yml if needed
   - Remove partial Pathfinder code
   - Remove from boundaries.json

3. **Isolate Completed Work**
   - Tag completed batches
   - Create feature branch for partial work
   - Document dependencies

---

## Timeline Estimation

**Total Estimated Time:** 20-30 hours

- Phase 0: 1 hour
- Phase 1: 3-4 hours
- Phase 2: 5-6 hours
- Phase 3: 5-6 hours
- Phase 4: 3-4 hours
- Phase 5: 4-5 hours
- Phase 6: 2-3 hours

**Critical Path:**

1. Phase 1 (Foundation) must complete first
2. Phases 2 and 3 can run in parallel
3. Phase 4 depends on Phase 2 (SPARQL operations)
4. Phase 5 depends on Phases 2, 3, 4
5. Phase 6 depends on all previous phases

---

## Notes

### Storage Path Recommendation

Use **configurable path (Option 3)** for maximum flexibility:

```typescript
// Development
const config = {
	tripleStore: { path: "./data/pathfinder.db" },
	vectorStore: { host: "localhost", port: 6333 },
}

// Testing
const config = {
	tripleStore: { path: "/tmp/test-store.db" },
	vectorStore: { host: "localhost", port: 6333 },
}

// Production
const config = {
	tripleStore: { path: "~/.config/sitebender/store.db" },
	vectorStore: { host: "production-qdrant.example.com", port: 6333 },
}
```

Add `.gitignore` entry:

```
data/
*.db
*.db-shm
*.db-wal
```

### Future Enhancements (Not in This Plan)

These are intentionally excluded from current scope:

- RDFS/OWL inference engine
- Prometheus metrics ingestion
- Federated query optimization (handled by Agent)
- Named graph support
- Transaction support
- SPARQL 1.1 Update full spec
- GeoSPARQL support
- Full-text search integration

These will be separate implementation plans when needed.

---

## Approval & Sign-Off

**Plan Status:** ✅ APPROVED
**Ready to Implement:** YES
**Constitutional Compliance:** VERIFIED
**Dependencies:** APPROVED

**Implementation may begin.**

---

**END OF IMPLEMENTATION PLAN**

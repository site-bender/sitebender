# Pathfinder Implementation Plan

**Version:** 2.0.0
**Created:** 2025-11-07
**Updated:** 2025-11-08 (Constitutional Compliance)
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
9. [Phase 6: Workspace Integration](#phase-6-workspace-integration)
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
│   │   ├── insertPoints/
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
	readonly host: string
	readonly port: number
	readonly timeout?: number
}

export type VectorStoreConfig = {
	readonly host: string
	readonly port: number
	readonly apiKey?: string
	readonly timeout?: number
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
- [ ] Check tripleStore.host is non-empty string using Toolsmith functions
- [ ] Check vectorStore.host is non-empty string using Toolsmith functions
- [ ] Check both ports are 1-65535 using betweenInclusive
- [ ] Use immutable array building (no .push())
- [ ] Use Toolsmith operator substitutions (not(), or(), isEqual(), isNotEmpty())
- [ ] Return `failure(errors)` if any errors
- [ ] Return `success(config as ValidPathfinderConfig)` if clean
- [ ] Function signature: `(config: PathfinderConfig) => Validation<ConfigError, ValidPathfinderConfig>`

**Template:**

```typescript
import type { Validation } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import type NonEmptyArray from "@sitebender/toolsmith/types/NonEmptyArray/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import betweenInclusive from "@sitebender/toolsmith/validation/betweenInclusive/index.ts"
import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"
import type { PathfinderConfig, ValidPathfinderConfig } from "../types/index.ts"
import type { ConfigError } from "../../errors/index.ts"

export default function validateConfig(
	config: PathfinderConfig,
): Validation<ConfigError, ValidPathfinderConfig> {
	// Build errors array immutably
	const tripleStoreHostError: ReadonlyArray<ConfigError> = or(
			not(config.tripleStore.host),
		)(isEqual("")(config.tripleStore.host.trim()))
		? [{
			_tag: "ConfigError",
			kind: "MissingHost",
			field: "tripleStore.host",
			message: "Triple store host is required",
		}]
		: []

	const tripleStorePort = config.tripleStore.port
	const tripleStorePortError: ReadonlyArray<ConfigError> = or(
			not(tripleStorePort),
		)(not(betweenInclusive(1)(65535)(tripleStorePort)))
		? [{
			_tag: "ConfigError",
			kind: "InvalidPort",
			field: "tripleStore.port",
			message: `Port must be between 1 and 65535, got ${tripleStorePort}`,
			value: tripleStorePort,
		}]
		: []

	const vectorStoreHostError: ReadonlyArray<ConfigError> = or(
			not(config.vectorStore.host),
		)(isEqual("")(config.vectorStore.host.trim()))
		? [{
			_tag: "ConfigError",
			kind: "MissingHost",
			field: "vectorStore.host",
			message: "Vector store host is required",
		}]
		: []

	const vectorStorePort = config.vectorStore.port
	const vectorStorePortError: ReadonlyArray<ConfigError> = or(
			not(vectorStorePort),
		)(not(betweenInclusive(1)(65535)(vectorStorePort)))
		? [{
			_tag: "ConfigError",
			kind: "InvalidPort",
			field: "vectorStore.port",
			message: `Port must be between 1 and 65535, got ${vectorStorePort}`,
			value: vectorStorePort,
		}]
		: []

	// Combine all errors immutably
	const errors = [
		...tripleStoreHostError,
		...tripleStorePortError,
		...vectorStoreHostError,
		...vectorStorePortError,
	]

	// Return failure if any errors, otherwise success with brand
	return isNotEmpty(errors)
		? failure(errors as NonEmptyArray<ConfigError>)
		: success(config as ValidPathfinderConfig)
}
```

**Test file to create:** `libraries/pathfinder/src/config/validateConfig/index.test.ts`

**Test tasks:**

- [ ] Test valid configuration returns `{ _tag: "Success", value: ... }`
- [ ] Test missing host returns `{ _tag: "Failure", errors: [...] }`
- [ ] Test invalid port (0, -1, 70000) returns ConfigError
- [ ] Test multiple errors are accumulated (not just first error)

**Completion Criteria for Phase 1:**

- ✅ All directories created
- ✅ deno.jsonc configured correctly
- ✅ All error types defined as discriminated unions
- ✅ Config types defined with branded ValidPathfinderConfig
- ✅ validateConfig uses Validation monad (error accumulation)
- ✅ validateConfig uses Toolsmith operator substitutions
- ✅ validateConfig tests pass
- ✅ Zero constitutional violations

---

## Phase 2: Oxigraph Integration

**Goal:** Connect to Oxigraph triple store and implement core SPARQL operations

### Batch 2.1: Triple Store Connection

**File to create:** `libraries/pathfinder/src/connection/createTripleStore/index.ts`

**Tasks:**

- [ ] Import Result monad from Toolsmith
- [ ] Import TripleStoreConfig, ConnectionError
- [ ] Implement async curried connection function
- [ ] Mark as IO boundary: `// [IO] Connects to Oxigraph triple store via HTTP`
- [ ] Use fetch() to test connection health
- [ ] Wrap external call in try/catch (ONLY place exceptions allowed)
- [ ] Return `error(...)` if connection fails
- [ ] Return `ok(connection)` if successful
- [ ] Connection type should include endpoint URLs

**Function signature:**

```typescript
export type TripleStoreConnection = {
	readonly queryEndpoint: string
	readonly updateEndpoint: string
	readonly timeout?: number
}

export default function createTripleStore(
	config: TripleStoreConfig,
): Promise<Result<ConnectionError, TripleStoreConnection>>
```

**Template:**

```typescript
// [IO] Connects to Oxigraph triple store via HTTP
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { TripleStoreConfig } from "../../config/types/index.ts"
import type { ConnectionError } from "../../errors/index.ts"

export type TripleStoreConnection = {
	readonly queryEndpoint: string
	readonly updateEndpoint: string
	readonly timeout?: number
}

export default function createTripleStore(
	config: TripleStoreConfig,
): Promise<Result<ConnectionError, TripleStoreConnection>> {
	return async function executeTripleStoreConnection(): Promise<
		Result<ConnectionError, TripleStoreConnection>
	> {
		try {
			const baseUrl = `http://${config.host}:${config.port}`
			const queryEndpoint = `${baseUrl}/query`
			const updateEndpoint = `${baseUrl}/update`

			// Test connection with health check
			const controller = new AbortController()
			const timeoutId = setTimeout(
				function abortConnection() {
					controller.abort()
				},
				config.timeout ?? 5000,
			)

			const response = await fetch(queryEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/sparql-query",
					"Accept": "application/sparql-results+json",
				},
				body: "ASK { }",
				signal: controller.signal,
			})

			clearTimeout(timeoutId)

			// Consume response body to prevent resource leak
			await response.body?.cancel()

			return ok({
				queryEndpoint,
				updateEndpoint,
				timeout: config.timeout,
			})
		} catch (cause) {
			return error({
				_tag: "ConnectionError",
				kind: "TripleStoreInitFailed",
				message:
					`Failed to connect to triple store at ${config.host}:${config.port}`,
				host: config.host,
				port: config.port,
				cause,
			})
		}
	}()
}
```

**Test file:** `libraries/pathfinder/src/connection/createTripleStore/index.test.ts`

**Test tasks:**

- [ ] Test with valid endpoint creates connection
- [ ] Test with invalid endpoint returns ConnectionError
- [ ] Test timeout is respected

### Batch 2.2: SPARQL Query Execution

**File to create:** `libraries/pathfinder/src/sparql/execute/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import QueryError type
- [ ] Import Toolsmith map function
- [ ] Implement double-curried function (sparql string, then connection)
- [ ] Mark as IO boundary
- [ ] Wrap query execution in try/catch
- [ ] Parse results into JavaScript objects using Toolsmith map
- [ ] NO arrow functions - use named function declarations
- [ ] NO for loops - use functional iteration
- [ ] Return `error(...)` if execution fails
- [ ] Return `ok(results)` if successful

**Function signature:**

```typescript
export default function execute(sparql: string) {
	return function executeOn(
		connection: TripleStoreConnection
	): Promise<Result<QueryError, ReadonlyArray<Record<string, unknown>>>>
}
```

**Template:**

```typescript
// [IO] Executes SPARQL query against triple store
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import type { QueryError } from "../../errors/index.ts"
import type { TripleStoreConnection } from "../../connection/createTripleStore/index.ts"

type SparqlBinding = Record<string, { value: unknown }>

type SparqlResults = {
	readonly head: {
		readonly vars: ReadonlyArray<string>
	}
	readonly results: {
		readonly bindings: ReadonlyArray<SparqlBinding>
	}
}

export default function execute(sparql: string) {
	return async function executeOn(
		connection: TripleStoreConnection,
	): Promise<Result<QueryError, ReadonlyArray<Record<string, unknown>>>> {
		try {
			const response = await fetch(connection.queryEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/sparql-query",
					"Accept": "application/sparql-results+json",
				},
				body: sparql,
			})

			if (!response.ok) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "QueryError",
					kind: "ExecutionFailed",
					message: `SPARQL query failed with status ${response.status}`,
					sparql,
				})
			}

			const results = (await response.json()) as SparqlResults

			// Transform SPARQL JSON results to plain objects
			const extractValue = function extractValue(
				binding: SparqlBinding,
			): Record<string, unknown> {
				const keys = Object.keys(binding)

				const toEntry = function toEntry(key: string): [string, unknown] {
					return [key, binding[key].value]
				}

				const entries = map(toEntry)(keys)
				//++ [EXCEPTION] Object.fromEntries permitted for building object from entries
				return Object.fromEntries(entries)
			}

			const bindings = map(extractValue)(results.results.bindings)

			return ok(bindings)
		} catch (cause) {
			return error({
				_tag: "QueryError",
				kind: "ExecutionFailed",
				message: "SPARQL query execution failed",
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

### Batch 2.3: Triple Insertion

**File to create:** `libraries/pathfinder/src/sparql/insert/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import QueryError type
- [ ] Implement double-curried function (Turtle string, then connection)
- [ ] Mark as IO boundary
- [ ] Use SPARQL INSERT DATA with Turtle triples
- [ ] Return `error(...)` if insertion fails
- [ ] Return `ok(void)` if successful

**Function signature:**

```typescript
export default function insert(turtle: string) {
	return function insertInto(
		connection: TripleStoreConnection
	): Promise<Result<QueryError, void>>
}
```

**Template:**

```typescript
// [IO] Inserts triples into triple store
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { QueryError } from "../../errors/index.ts"
import type { TripleStoreConnection } from "../../connection/createTripleStore/index.ts"

export default function insert(turtle: string) {
	return async function insertInto(
		connection: TripleStoreConnection,
	): Promise<Result<QueryError, void>> {
		try {
			const sparql = `INSERT DATA { ${turtle} }`

			const response = await fetch(connection.updateEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/sparql-update",
				},
				body: sparql,
			})

			if (!response.ok) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "QueryError",
					kind: "ExecutionFailed",
					message: `Failed to insert triples: status ${response.status}`,
					sparql: turtle,
				})
			}

			// Consume response body to prevent resource leak
			await response.body?.cancel()

			return ok(undefined)
		} catch (cause) {
			return error({
				_tag: "QueryError",
				kind: "ExecutionFailed",
				message: "Failed to insert triples",
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
- [ ] Implement double-curried function (pattern string, then connection)
- [ ] Mark as IO boundary
- [ ] Use SPARQL DELETE WHERE
- [ ] Return `error(...)` if deletion fails
- [ ] Return `ok(void)` if successful

**Function signature:**

```typescript
export default function deleteQuery(pattern: string) {
	return function deleteFrom(
		connection: TripleStoreConnection
	): Promise<Result<QueryError, void>>
}
```

**Template:**

```typescript
// [IO] Deletes triples matching pattern from triple store
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { QueryError } from "../../errors/index.ts"
import type { TripleStoreConnection } from "../../connection/createTripleStore/index.ts"

export default function deleteQuery(pattern: string) {
	return async function deleteFrom(
		connection: TripleStoreConnection,
	): Promise<Result<QueryError, void>> {
		try {
			const sparql = `DELETE WHERE { ${pattern} }`

			const response = await fetch(connection.updateEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/sparql-update",
				},
				body: sparql,
			})

			if (!response.ok) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "QueryError",
					kind: "ExecutionFailed",
					message: `Failed to delete triples: status ${response.status}`,
					sparql: pattern,
				})
			}

			// Consume response body to prevent resource leak
			await response.body?.cancel()

			return ok(undefined)
		} catch (cause) {
			return error({
				_tag: "QueryError",
				kind: "ExecutionFailed",
				message: "Failed to delete triples",
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
- ✅ deleteQuery removes triples via pattern
- ✅ All operations return Promise<Result>
- ✅ All IO boundaries marked with comments
- ✅ All tests pass
- ✅ Zero constitutional violations (no arrow functions, no loops, no mutations)

---

## Phase 3: Qdrant Integration

**Goal:** Connect to Qdrant vector store and implement vector operations

### Batch 3.1: Vector Store Connection

**File to create:** `libraries/pathfinder/src/connection/createVectorStore/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import VectorStoreConfig, ConnectionError
- [ ] Implement async curried connection function
- [ ] Mark as IO boundary
- [ ] Test connection health after creation using fetch
- [ ] Use Toolsmith not() instead of ! operator
- [ ] Return `error(...)` if connection fails or unhealthy
- [ ] Return `ok(connection)` if successful

**Function signature:**

```typescript
export type VectorStoreConnection = {
	readonly collectionsEndpoint: string
	readonly apiKey?: string
	readonly timeout?: number
}

export default function createVectorStore(
	config: VectorStoreConfig,
): Promise<Result<ConnectionError, VectorStoreConnection>>
```

**Template:**

```typescript
// [IO] Connects to Qdrant vector store
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import type { VectorStoreConfig } from "../../config/types/index.ts"
import type { ConnectionError } from "../../errors/index.ts"

export type VectorStoreConnection = {
	readonly collectionsEndpoint: string
	readonly apiKey?: string
	readonly timeout?: number
}

export default function createVectorStore(
	config: VectorStoreConfig,
): Promise<Result<ConnectionError, VectorStoreConnection>> {
	return async function executeVectorStoreConnection(): Promise<
		Result<ConnectionError, VectorStoreConnection>
	> {
		try {
			const baseUrl = `http://${config.host}:${config.port}`
			const healthUrl = `${baseUrl}/health`
			const collectionsEndpoint = `${baseUrl}/collections`

			// Test connection health
			const controller = new AbortController()
			const timeoutId = setTimeout(
				function abortConnection() {
					controller.abort()
				},
				config.timeout ?? 5000,
			)

			const headers: Record<string, string> = {}
			if (config.apiKey) {
				headers["api-key"] = config.apiKey
			}

			const response = await fetch(healthUrl, {
				method: "GET",
				headers,
				signal: controller.signal,
			})

			clearTimeout(timeoutId)

			if (not(response.ok)) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "ConnectionError",
					kind: "VectorStoreUnhealthy",
					message: `Qdrant at ${config.host}:${config.port} is unhealthy`,
					host: config.host,
					port: config.port,
				})
			}

			// Consume response body to prevent resource leak
			await response.body?.cancel()

			return ok({
				collectionsEndpoint,
				apiKey: config.apiKey,
				timeout: config.timeout,
			})
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

**Test file:** `libraries/pathfinder/src/connection/createVectorStore/index.test.ts`

**Test tasks:**

- [ ] Test successful connection to local Qdrant (localhost:6333)
- [ ] Test connection failure with invalid host returns ConnectionError
- [ ] Test connection to unhealthy instance returns error
- [ ] Test with API key (if configured)

### Batch 3.2: Collection Creation

**File to create:** `libraries/pathfinder/src/vector/createCollection/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import VectorError type
- [ ] Implement triple-curried function (name, dimension, connection)
- [ ] Mark as IO boundary
- [ ] Check if collection exists first
- [ ] Create collection if not exists
- [ ] Return `error(...)` if creation fails
- [ ] Return `ok(collectionInfo)` if successful

**Function signature:**

```typescript
export type CollectionInfo = {
	readonly name: string
	readonly dimension: number
	readonly vectorCount: number
}

export default function createCollection(name: string) {
	return function withDimension(dimension: number) {
		return function inVectorStore(
			connection: VectorStoreConnection
		): Promise<Result<VectorError, CollectionInfo>>
	}
}
```

**Template:**

```typescript
// [IO] Creates vector collection in Qdrant
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import type { VectorError } from "../../errors/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"

export type CollectionInfo = {
	readonly name: string
	readonly dimension: number
	readonly vectorCount: number
}

export default function createCollection(name: string) {
	return function withDimension(dimension: number) {
		return async function inVectorStore(
			connection: VectorStoreConnection,
		): Promise<Result<VectorError, CollectionInfo>> {
			try {
				const headers: Record<string, string> = {
					"Content-Type": "application/json",
				}

				if (connection.apiKey) {
					headers["api-key"] = connection.apiKey
				}

				// Check if collection exists
				const checkResponse = await fetch(
					`${connection.collectionsEndpoint}/${name}`,
					{
						method: "GET",
						headers,
					},
				)

				if (not(checkResponse.ok)) {
					// Collection doesn't exist, create it
					const createPayload = {
						vectors: {
							size: dimension,
							distance: "Cosine",
						},
					}

					const createResponse = await fetch(
						`${connection.collectionsEndpoint}/${name}`,
						{
							method: "PUT",
							headers,
							body: JSON.stringify(createPayload),
						},
					)

					if (not(createResponse.ok)) {
						// Consume response body to prevent resource leak
						await createResponse.body?.cancel()

						return error({
							_tag: "VectorError",
							kind: "InsertFailed",
							message: `Failed to create collection ${name}`,
							collection: name,
							dimension,
						})
					}

					// Consume response body to prevent resource leak
					await createResponse.body?.cancel()
				} else {
					// Consume response body to prevent resource leak
					await checkResponse.body?.cancel()
				}

				// Get collection info
				const infoResponse = await fetch(
					`${connection.collectionsEndpoint}/${name}`,
					{
						method: "GET",
						headers,
					},
				)

				const info = (await infoResponse.json()) as {
					result: {
						vectors_count: number
						config: {
							params: {
								vectors: {
									size: number
								}
							}
						}
					}
				}

				return ok({
					name,
					dimension: info.result.config.params.vectors.size,
					vectorCount: info.result.vectors_count ?? 0,
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

### Batch 3.3: Vector Point Insertion

**File to create:** `libraries/pathfinder/src/vector/insertPoints/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import VectorError type
- [ ] Import Toolsmith map function
- [ ] Define VectorPoint type (id, vector, payload)
- [ ] Implement triple-curried function (collection, points, connection)
- [ ] Mark as IO boundary
- [ ] Use Qdrant upsert operation
- [ ] Transform points using Toolsmith map (no .map() method)
- [ ] Return `error(...)` if insertion fails
- [ ] Return `ok(void)` if successful

**Types:**

```typescript
export type VectorPoint = {
	readonly id: string | number
	readonly vector: ReadonlyArray<number>
	readonly payload?: Record<string, unknown>
}

export type InsertPointsConfig = {
	readonly collectionName: string
	readonly points: ReadonlyArray<VectorPoint>
}
```

**Function signature:**

```typescript
export default function insertPoints(config: InsertPointsConfig) {
	return function insertPointsInto(
		connection: VectorStoreConnection
	): Promise<Result<VectorError, void>>
}
```

**Template:**

```typescript
// [IO] Inserts vector points into a Qdrant collection
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"
import type { VectorError } from "../../errors/index.ts"

export type VectorPoint = {
	readonly id: string | number
	readonly vector: ReadonlyArray<number>
	readonly payload?: Record<string, unknown>
}

export type InsertPointsConfig = {
	readonly collectionName: string
	readonly points: ReadonlyArray<VectorPoint>
}

function transformPoint(point: VectorPoint): {
	id: string | number
	vector: ReadonlyArray<number>
	payload: Record<string, unknown>
} {
	return {
		id: point.id,
		vector: point.vector,
		payload: point.payload ?? {},
	}
}

export default function insertPoints(config: InsertPointsConfig) {
	return async function insertPointsInto(
		connection: VectorStoreConnection,
	): Promise<Result<VectorError, void>> {
		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			}

			if (connection.apiKey) {
				headers["api-key"] = connection.apiKey
			}

			const points = map(transformPoint)(config.points)

			const payload = {
				points,
			}

			const response = await fetch(
				`${connection.collectionsEndpoint}/${config.collectionName}/points`,
				{
					method: "PUT",
					headers,
					body: JSON.stringify(payload),
				},
			)

			if (!response.ok) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "VectorError",
					kind: "InsertFailed",
					message:
						`Failed to insert points into collection ${config.collectionName}: status ${response.status}`,
					collection: config.collectionName,
				})
			}

			// Consume response body to prevent resource leak
			await response.body?.cancel()

			return ok(undefined)
		} catch (cause) {
			return error({
				_tag: "VectorError",
				kind: "InsertFailed",
				message:
					`Failed to insert points into collection ${config.collectionName}`,
				collection: config.collectionName,
				cause,
			})
		}
	}
}
```

**Test file:** `libraries/pathfinder/src/vector/insertPoints/index.test.ts`

**Test tasks:**

- [ ] Test inserting single point succeeds
- [ ] Test inserting multiple points succeeds
- [ ] Test invalid collection returns error

### Batch 3.4: Vector Search

**File to create:** `libraries/pathfinder/src/vector/search/index.ts`

**Tasks:**

- [ ] Import Result monad
- [ ] Import VectorError type
- [ ] Import Toolsmith map function
- [ ] Define SearchResult type
- [ ] Implement quad-curried function (collection, vector, limit, connection)
- [ ] Mark as IO boundary
- [ ] Execute similarity search
- [ ] Transform results using Toolsmith map
- [ ] Return `error(...)` if search fails
- [ ] Return `ok(results)` if successful

**Types:**

```typescript
export type SearchResult = {
	readonly id: string | number
	readonly score: number
	readonly payload?: Record<string, unknown>
}

export type SearchConfig = {
	readonly collectionName: string
	readonly vector: ReadonlyArray<number>
	readonly limit: number
}
```

**Function signature:**

```typescript
export default function search(config: SearchConfig) {
	return function inVectorStore(
		connection: VectorStoreConnection
	): Promise<Result<VectorError, ReadonlyArray<SearchResult>>>
}
```

**Template:**

```typescript
// [IO] Searches for similar vectors in Qdrant collection
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import type { VectorStoreConnection } from "../../connection/createVectorStore/index.ts"
import type { VectorError } from "../../errors/index.ts"

export type SearchResult = {
	readonly id: string | number
	readonly score: number
	readonly payload?: Record<string, unknown>
}

export type SearchConfig = {
	readonly collectionName: string
	readonly vector: ReadonlyArray<number>
	readonly limit: number
}

type QdrantSearchResult = {
	readonly id: string | number
	readonly score: number
	readonly payload?: Record<string, unknown>
}

export default function search(config: SearchConfig) {
	return async function inVectorStore(
		connection: VectorStoreConnection,
	): Promise<Result<VectorError, ReadonlyArray<SearchResult>>> {
		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			}

			if (connection.apiKey) {
				headers["api-key"] = connection.apiKey
			}

			const searchPayload = {
				vector: config.vector,
				limit: config.limit,
				with_payload: true,
			}

			const response = await fetch(
				`${connection.collectionsEndpoint}/${config.collectionName}/points/search`,
				{
					method: "POST",
					headers,
					body: JSON.stringify(searchPayload),
				},
			)

			if (!response.ok) {
				// Consume response body to prevent resource leak
				await response.body?.cancel()

				return error({
					_tag: "VectorError",
					kind: "SearchFailed",
					message:
						`Failed to search collection ${config.collectionName}: status ${response.status}`,
					collection: config.collectionName,
				})
			}

			const data = (await response.json()) as {
				result: ReadonlyArray<QdrantSearchResult>
			}

			const transformResult = function transformResult(
				result: QdrantSearchResult,
			): SearchResult {
				return {
					id: result.id,
					score: result.score,
					payload: result.payload,
				}
			}

			const results = map(transformResult)(data.result)

			return ok(results)
		} catch (cause) {
			return error({
				_tag: "VectorError",
				kind: "SearchFailed",
				message: `Failed to search collection ${config.collectionName}`,
				collection: config.collectionName,
				cause,
			})
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
- ✅ insertPoints adds vectors with payloads
- ✅ search returns similarity results
- ✅ All operations return Promise<Result<...>>
- ✅ All IO boundaries marked
- ✅ All tests pass
- ✅ Zero constitutional violations (use Toolsmith map, not .map())

---

## Phase 4: Type-Safe SPARQL Builder

**Goal:** Implement fluent type-safe SPARQL query builder (hybrid approach)

### Batch 4.1: SELECT Builder

**File to create:** `libraries/pathfinder/src/sparql/select/index.ts`

**Tasks:**

- [ ] Import Toolsmith functions (map, join, isNotEmpty, getOrElse)
- [ ] Implement variadic `select(...variables)` function
- [ ] Return builder object with `where` method
- [ ] Use Toolsmith array functions (NO .join, .map OOP methods)
- [ ] All builder methods return new builders (immutable)
- [ ] NO mutations (no .push(), use immutable array building)
- [ ] NO arrow functions in implementation
- [ ] Include `build()` method to generate SPARQL string

**Template:**

```typescript
import map from "@sitebender/toolsmith/array/map/index.ts"
import join from "@sitebender/toolsmith/array/join/index.ts"
import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

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

export type SelectBuilder = {
	readonly where: (
		patterns: ReadonlyArray<TriplePattern>,
	) => WhereBuilder
}

// Helper function to build SPARQL query string
function buildSparqlQuery(varList: string) {
	return function buildSparqlQueryWithVarList(
		patterns: ReadonlyArray<TriplePattern>,
	) {
		return function buildSparqlQueryWithPatterns(
			filters: ReadonlyArray<string>,
		): string {
			function formatTriplePattern(pattern: TriplePattern): string {
				return `${pattern.subject} ${pattern.predicate} ${pattern.object} .`
			}

			// Use Toolsmith map and join
			const triples = map(formatTriplePattern)(patterns)
			const tripleBlock = getOrElse("")(join("\n    ")(triples))
			const filterBlock = isNotEmpty(filters)
				? "\n    FILTER (" + getOrElse("")(join(" && ")(filters)) + ")"
				: ""

			return `SELECT ${varList}\nWHERE {\n    ${tripleBlock}${filterBlock}\n}`
		}
	}
}

// Helper to create FilterBuilder (immutable - returns new object each time)
function createFilterBuilder(varList: string) {
	return function createFilterBuilderWithVarList(
		patterns: ReadonlyArray<TriplePattern>,
	) {
		return function createFilterBuilderWithPatterns(
			filters: ReadonlyArray<string>,
		): FilterBuilder {
			return {
				filter: function additionalFilter(
					condition: string,
				): FilterBuilder {
					// Create new filters array (immutable!)
					const newFilters: ReadonlyArray<string> = [
						...filters,
						condition,
					]
					return createFilterBuilder(varList)(patterns)(newFilters)
				},
				build: function buildQuery(): string {
					return buildSparqlQuery(varList)(patterns)(filters)
				},
			}
		}
	}
}

// Helper to create WhereBuilder (immutable - returns new object)
function createWhereBuilder(varList: string) {
	return function createWhereBuilderWithVarList(
		patterns: ReadonlyArray<TriplePattern>,
	) {
		return function createWhereBuilderWithPatterns(
			filters: ReadonlyArray<string>,
		): WhereBuilder {
			return {
				filter: function filterClause(
					condition: string,
				): FilterBuilder {
					// Create new filters array (immutable!)
					const newFilters: ReadonlyArray<string> = [
						...filters,
						condition,
					]
					return createFilterBuilder(varList)(patterns)(newFilters)
				},
				build: function buildQuery(): string {
					return buildSparqlQuery(varList)(patterns)(filters)
				},
			}
		}
	}
}

// Main select function - creates a SelectBuilder
export default function select(...variables: Array<string>): SelectBuilder {
	const varList = getOrElse("")(join(" ")(variables))

	return {
		where: function whereClause(
			patterns: ReadonlyArray<TriplePattern>,
		): WhereBuilder {
			// Create WHERE builder with empty filters array
			const emptyFilters: ReadonlyArray<string> = []
			return createWhereBuilder(varList)(patterns)(emptyFilters)
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

**Template:**

```typescript
export default function getAllTriples(): string {
	return "SELECT * WHERE { ?s ?p ?o }"
}
```

**File to create:** `libraries/pathfinder/src/sparql/helpers/getBySubject/index.ts`

**Tasks:**

- [ ] Implement helper that generates query for specific subject
- [ ] Curried: subject URI → SPARQL string

**Template:**

```typescript
export default function getBySubject(subject: string) {
	return function buildQuery(): string {
		return `SELECT ?p ?o WHERE { ${subject} ?p ?o }`
	}
}
```

**File to create:** `libraries/pathfinder/src/sparql/helpers/getByPredicate/index.ts`

**Tasks:**

- [ ] Implement helper that generates query for specific predicate
- [ ] Curried: predicate URI → SPARQL string

**Template:**

```typescript
export default function getByPredicate(predicate: string) {
	return function buildQuery(): string {
		return `SELECT ?s ?o WHERE { ?s ${predicate} ?o }`
	}
}
```

**Completion Criteria for Phase 4:**

- ✅ select() builder creates SELECT queries
- ✅ where() adds triple patterns
- ✅ filter() adds FILTER clauses
- ✅ build() generates valid SPARQL
- ✅ Helper functions for common patterns
- ✅ All builder methods immutable
- ✅ Use Toolsmith functions (no OOP .map/.join)
- ✅ All tests pass
- ✅ Zero constitutional violations (no mutations, no arrow functions)

---

## Phase 5: Testing & Documentation

**Goal:** Comprehensive test coverage and integration tests

### Batch 5.1: Integration Tests

**File to create:** `libraries/pathfinder/src/integration.test.ts`

**Tasks:**

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
import deleteQuery from "./sparql/delete/index.ts"

describe("Pathfinder integration", () => {
	const config = {
		host: "localhost",
		port: 7878,
		timeout: 5000,
	}

	it("should connect, insert, query, and delete triples", async () => {
		const connectionResult = await createTripleStore(config)
		expect(connectionResult._tag).toBe("Ok")

		if (connectionResult._tag !== "Ok") {
			return
		}

		const connection = connectionResult.value

		// Insert test data
		const turtle = `
			<http://example.org/alice> <http://xmlns.com/foaf/0.1/name> "Alice" .
		`
		const insertResult = await insert(turtle)(connection)
		expect(insertResult._tag).toBe("Ok")

		// Query data
		const sparql = `
			SELECT ?name WHERE {
				<http://example.org/alice> <http://xmlns.com/foaf/0.1/name> ?name .
			}
		`
		const queryResult = await execute(sparql)(connection)
		expect(queryResult._tag).toBe("Ok")

		if (queryResult._tag === "Ok") {
			expect(queryResult.value.length).toBe(1)
			expect(queryResult.value[0].name).toBe("Alice")
		}

		// Delete data
		const deletePattern = `<http://example.org/alice> ?p ?o .`
		const deleteResult = await deleteQuery(deletePattern)(connection)
		expect(deleteResult._tag).toBe("Ok")
	})
})
```

### Batch 5.2: Property-Based Tests

**File to create:** `libraries/pathfinder/src/properties.test.ts`

**Tasks:**

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
): Promise<Result<ConnectionError, TripleStoreConnection>>
```

**Usage:**

```typescript
import createTripleStore from "@sitebender/pathfinder/connection/createTripleStore/index.ts"

const result = await createTripleStore({
	host: "localhost",
	port: 7878,
	timeout: 5000,
})

if (result._tag === "Ok") {
	const connection = result.value
	// Use connection...
}
```

**Errors:**

- `TripleStoreInitFailed` - Cannot connect to triple store
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

## Phase 6: Workspace Integration

**Goal:** Integrate Pathfinder into workspace using import aliases (NO BARREL FILES)

### IMPORTANT: No mod.ts Barrel File

**CRITICAL CONSTITUTIONAL RULE:**

- **NO BARREL FILES. EVER.**
- `mod.ts` is an exception to the FILE NAMING CONVENTION only (can be named `mod.ts` instead of `index.ts`)
- `mod.ts` is NOT an exception to the NO BARREL FILES rule
- `mod.ts` can ONLY contain Envoy comments describing the module, NO CODE

### Batch 6.1: Create mod.ts with Envoy Comments Only

**File to create:** `libraries/pathfinder/src/mod.ts`

**Tasks:**

- [ ] Create mod.ts with ONLY Envoy comments
- [ ] NO exports, NO code, ONLY documentation
- [ ] Describe the module purpose
- [ ] List public API surface

**Template:**

```typescript
/**
 * Pathfinder - Data Infrastructure Layer
 *
 * Single source of truth for triple store (Oxigraph) and vector search (Qdrant).
 *
 * Public API:
 *
 * Configuration:
 * - validateConfig: config/validateConfig/index.ts
 * - Types: config/types/index.ts
 *
 * Connection:
 * - createTripleStore: connection/createTripleStore/index.ts
 * - createVectorStore: connection/createVectorStore/index.ts
 *
 * SPARQL Operations:
 * - execute: sparql/execute/index.ts
 * - insert: sparql/insert/index.ts
 * - deleteQuery: sparql/delete/index.ts
 * - select: sparql/select/index.ts
 *
 * Vector Operations:
 * - createCollection: vector/createCollection/index.ts
 * - insertPoints: vector/insertPoints/index.ts
 * - search: vector/search/index.ts
 *
 * Errors:
 * - All error types: errors/index.ts
 *
 * @module pathfinder
 */

// This file intentionally contains no code.
// Use deno.jsonc import aliases to import specific functions.
```

### Batch 6.2: Update Workspace Configuration

**File to modify:** `/deno.jsonc` (root workspace)

**Tasks:**

- [ ] Add Pathfinder import aliases to workspace imports map
- [ ] Verify all other libraries can import Pathfinder functions

**Template addition to deno.jsonc imports:**

```jsonc
{
	"imports": {
		"@sitebender/pathfinder/": "./libraries/pathfinder/src/"
		// ... other aliases
	}
}
```

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

### Batch 6.3: Import Pattern Documentation

**File to create:** `libraries/pathfinder/docs/IMPORTS.md`

**Tasks:**

- [ ] Document correct import patterns using aliases
- [ ] Show examples of importing from other libraries
- [ ] Explain why mod.ts has no exports

**Template:**

````markdown
# Pathfinder Import Patterns

## Correct Import Pattern

Pathfinder follows Sitebender's constitutional rule: **NO BARREL FILES**.

Use deno.jsonc import aliases to import specific functions:

```typescript
// ✅ CORRECT - Import specific function using alias
import createTripleStore from "@sitebender/pathfinder/connection/createTripleStore/index.ts"
import execute from "@sitebender/pathfinder/sparql/execute/index.ts"
import type { PathfinderConfig } from "@sitebender/pathfinder/config/types/index.ts"
```

```typescript
// ❌ WRONG - Do not import from mod.ts
import { createTripleStore } from "@sitebender/pathfinder/mod.ts"
```

## Why mod.ts Has No Exports

The `mod.ts` file is an exception to the FILE NAMING CONVENTION (all files named `index.ts`), but it is NOT an exception to the NO BARREL FILES rule.

`mod.ts` contains ONLY Envoy comments describing the module. It has NO code, NO exports.

## Workspace Configuration

The workspace `deno.jsonc` includes import aliases:

```jsonc
{
	"imports": {
		"@sitebender/pathfinder/": "./libraries/pathfinder/src/"
	}
}
```

This allows importing any function by its full path:

```typescript
import functionName from "@sitebender/pathfinder/path/to/function/index.ts"
```

## Type Imports

Always use `import type` for type-only imports:

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { PathfinderConfig } from "@sitebender/pathfinder/config/types/index.ts"
```
````

### Batch 6.4: README Updates

**File to modify:** `/libraries/pathfinder/README.md`

**Tasks:**

- [ ] Update status from "Planning" to "Implemented"
- [ ] Add "Getting Started" section
- [ ] Add quick example with correct import pattern
- [ ] Link to API documentation
- [ ] Update roadmap to reflect completed features

**File to modify:** `/README.md` (root)

**Tasks:**

- [ ] Update Pathfinder status in libraries overview
- [ ] Mark as "Implemented" instead of "Planned"

**Completion Criteria for Phase 6:**

- ✅ mod.ts contains ONLY Envoy comments, NO exports
- ✅ Workspace deno.jsonc has Pathfinder import aliases
- ✅ contracts/boundaries.json includes Pathfinder
- ✅ IMPORTS.md documents correct usage pattern
- ✅ README reflects implementation status
- ✅ Other libraries can import Pathfinder functions using aliases
- ✅ Zero barrel files in entire codebase

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
- [ ] ✅ Use `isNotEmpty(array)` not `array.length > 0`
- [ ] ✅ Use `not(value)` not `!value`
- [ ] ✅ Use `or(a)(b)` not `a || b`
- [ ] ✅ Use `isEqual(a)(b)` not `a === b`

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
- [ ] ✅ NO BARREL FILES (mod.ts has only comments, no code)
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
	"dependencies": {},
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

- [ ] Warden enforces dependency whitelist
- [ ] Agent can import Pathfinder functions using aliases
- [ ] Operator can store events as triples
- [ ] Sentinel can persist session state
- [ ] Custodian can query event history
- [ ] No forbidden dependencies detected
- [ ] No barrel files detected

---

## Success Metrics

### Code Quality

- [ ] Zero linting errors: `deno task lint`
- [ ] Zero formatting errors: `deno task fmt --check`
- [ ] Zero type errors: `deno task test:strict`
- [ ] Test coverage > 80%: `deno task test:cov`

### Functional Requirements

- [ ] Can connect to Oxigraph with configurable host/port
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
- [ ] IMPORTS.md explains correct import pattern

### Integration

- [ ] Added to contracts/boundaries.json
- [ ] Import aliases work
- [ ] Other libraries can import successfully
- [ ] No circular dependencies
- [ ] mod.ts has only comments, no exports

---

## Rollback Plan

If implementation fails or needs to be paused:

1. **Preserve Documentation**
   - Keep all planning documents
   - Document what was completed
   - Document blocking issues

2. **Revert Infrastructure Changes**
   - Remove partial Pathfinder code
   - Remove from boundaries.json
   - Remove import aliases

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

**Plan Status:** ✅ APPROVED (Constitutional Compliance Verified)
**Ready to Implement:** YES
**Constitutional Compliance:** VERIFIED
**Dependencies:** APPROVED

**Implementation may begin.**

---

**END OF IMPLEMENTATION PLAN**

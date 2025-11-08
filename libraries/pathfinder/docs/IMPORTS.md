# Pathfinder Import Guide

## Overview

Pathfinder follows Sitebender's constitutional rule: **NO BARREL FILES**. This means:

- ✅ Import from specific `index.ts` files using import aliases
- ❌ NEVER import from `mod.ts` (it contains only documentation)
- ❌ NEVER use barrel file re-exports

## Correct Import Pattern

### Using Import Aliases (Recommended)

The workspace `deno.jsonc` defines import aliases for Pathfinder:

```typescript
import validateConfig from "@pathfinder/config/validateConfig/index.ts"
import createTripleStore from "@pathfinder/connection/createTripleStore/index.ts"
import createVectorStore from "@pathfinder/connection/createVectorStore/index.ts"
import insert from "@pathfinder/sparql/insert/index.ts"
import execute from "@pathfinder/sparql/execute/index.ts"
import select from "@pathfinder/sparql/select/index.ts"
```

### Direct Path Imports (Alternative)

You can also use direct paths:

```typescript
import validateConfig from "../../libraries/pathfinder/src/config/validateConfig/index.ts"
import createTripleStore from "../../libraries/pathfinder/src/connection/createTripleStore/index.ts"
```

However, import aliases are preferred because:

- Shorter, more readable paths
- Workspace-relative (works from any location)
- Easier to refactor if paths change

## Why No Barrel Files?

Barrel files (re-exporting multiple modules from a single file) are prohibited because:

1. **Hidden Dependencies** - Barrel files obscure the actual source of imports
2. **Circular Dependencies** - They can create circular dependency issues
3. **Bundle Size** - Can bloat bundles by importing unused code
4. **Build Performance** - Slows down type checking and compilation
5. **Explicit is Better** - Direct imports make dependencies clear

## mod.ts Exception

The `src/mod.ts` file is an exception to the **file naming convention** (all files named `index.*`), NOT to the no barrel files rule:

- `mod.ts` can exist with that name (not `index.ts`)
- It can ONLY contain Envoy comments (JSDoc-style module documentation)
- It MUST NOT contain any code
- It MUST NOT export anything
- It serves as module documentation for tools like Deno Doc

## Import Alias Configuration

Import aliases are defined in the workspace `deno.jsonc`:

```json
{
	"imports": {
		"@pathfinder/": "./libraries/pathfinder/src/"
	}
}
```

This allows:

```typescript
// Instead of:
import validateConfig from "../../libraries/pathfinder/src/config/validateConfig/index.ts"

// Write:
import validateConfig from "@pathfinder/config/validateConfig/index.ts"
```

## Common Imports

### Configuration

```typescript
import validateConfig from "@pathfinder/config/validateConfig/index.ts"
import type { PathfinderConfig } from "@pathfinder/config/types/index.ts"
import type { ValidPathfinderConfig } from "@pathfinder/config/types/index.ts"
```

### Connections

```typescript
import createTripleStore from "@pathfinder/connection/createTripleStore/index.ts"
import createVectorStore from "@pathfinder/connection/createVectorStore/index.ts"
import type { TripleStoreConnection } from "@pathfinder/connection/createTripleStore/index.ts"
import type { VectorStoreConnection } from "@pathfinder/connection/createVectorStore/index.ts"
```

### Triple Store Operations

```typescript
import insert from "@pathfinder/sparql/insert/index.ts"
import execute from "@pathfinder/sparql/execute/index.ts"
import select from "@pathfinder/sparql/select/index.ts"
import deleteSparql from "@pathfinder/sparql/delete/index.ts"
```

### SPARQL Query Helpers

```typescript
import getAllTriples from "@pathfinder/sparql/helpers/getAllTriples/index.ts"
import getBySubject from "@pathfinder/sparql/helpers/getBySubject/index.ts"
import getByPredicate from "@pathfinder/sparql/helpers/getByPredicate/index.ts"
```

### Vector Operations

```typescript
import createCollection from "@pathfinder/vector/createCollection/index.ts"
import insertPoints from "@pathfinder/vector/insertPoints/index.ts"
import searchPoints from "@pathfinder/vector/searchPoints/index.ts"
import type { VectorPoint } from "@pathfinder/vector/insertPoints/index.ts"
import type { SearchResult } from "@pathfinder/vector/searchPoints/index.ts"
```

### Error Types

```typescript
import type { ConnectionError } from "@pathfinder/errors/index.ts"
import type { QueryError } from "@pathfinder/errors/index.ts"
import type { ConfigError } from "@pathfinder/errors/index.ts"
import type { VectorError } from "@pathfinder/errors/index.ts"
import type { AnyPathfinderError } from "@pathfinder/errors/index.ts"
```

## Complete Example

Here's a complete example showing correct import usage:

```typescript
// Configuration and types
import validateConfig from "@pathfinder/config/validateConfig/index.ts"
import type { PathfinderConfig } from "@pathfinder/config/types/index.ts"

// Connections
import createTripleStore from "@pathfinder/connection/createTripleStore/index.ts"
import createVectorStore from "@pathfinder/connection/createVectorStore/index.ts"

// Triple store operations
import insert from "@pathfinder/sparql/insert/index.ts"
import execute from "@pathfinder/sparql/execute/index.ts"
import select from "@pathfinder/sparql/select/index.ts"

// Vector operations
import createCollection from "@pathfinder/vector/createCollection/index.ts"
import insertPoints from "@pathfinder/vector/insertPoints/index.ts"
import searchPoints from "@pathfinder/vector/searchPoints/index.ts"

// Toolsmith utilities for error handling
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import pipe from "@sitebender/toolsmith/combinators/pipe/index.ts"

// Application code
const config: PathfinderConfig = {
	tripleStore: { host: "localhost", port: 7878 },
	vectorStore: { host: "localhost", port: 6333 },
}

const validationResult = validateConfig(config)

if (isSuccess(validationResult)) {
	const validConfig = validationResult.value
	const connectionResult = await createTripleStore(validConfig.tripleStore)

	if (isOk(connectionResult)) {
		const connection = connectionResult.value
		// Use connection...
	}
}
```

## Anti-Patterns (DO NOT USE)

### ❌ Wrong: Importing from mod.ts

```typescript
// WRONG - mod.ts has no exports
import { validateConfig } from "@pathfinder/mod.ts"
```

### ❌ Wrong: Expecting Barrel File Exports

```typescript
// WRONG - No barrel file exists
import { createTripleStore, validateConfig } from "@pathfinder/"
```

### ❌ Wrong: Importing Internal Helpers

```typescript
// WRONG - Only import from index.ts files
import buildSparqlQuery from "@pathfinder/sparql/select/_buildQuery/index.ts"
```

Files/folders starting with `_` are private implementation details and should never be imported.

## File Organization Rules

Each public function follows this structure:

```
src/
  sparql/
    execute/
      index.ts              ← Public function (IMPORT THIS)
      index.test.ts         ← Tests
      _helper/              ← Private helper (DO NOT IMPORT)
        index.ts
```

**Rules:**

1. Only import from `index.ts` files
2. Never import from `_prefixed` folders (private)
3. Never import from test files (`.test.ts`)
4. Use import aliases (`@pathfinder/...`) when available

## Verifying Imports

To verify your imports are correct:

```bash
# Check for constitutional violations
deno task contracts:check

# Run linter
deno task lint

# Run tests
deno task test
```

## See Also

- [API.md](API.md) - Complete API reference
- [README.md](../README.md) - Quick start guide
- [examples/basic-usage.ts](examples/basic-usage.ts) - Working examples
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) - Architecture details

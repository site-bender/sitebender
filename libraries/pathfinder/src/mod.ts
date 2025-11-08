/**
 * Pathfinder - Data Infrastructure Layer
 *
 * Single source of truth for triple store (Oxigraph) and vector search (Qdrant).
 * Provides functional interfaces for RDF triple storage and semantic vector search.
 *
 * ## Architecture
 *
 * Pathfinder is the data layer for Sitebender Studio, providing:
 * - RDF triple store operations via Oxigraph (SPARQL 1.1)
 * - Vector similarity search via Qdrant
 * - Type-safe query builders
 * - Result monad error handling
 *
 * ## Public API
 *
 * ### Configuration
 * - `config/validateConfig/index.ts` - Validate Pathfinder configuration
 * - `config/types/index.ts` - Configuration type definitions
 *
 * ### Connection Management
 * - `connection/createTripleStore/index.ts` - Connect to Oxigraph server
 * - `connection/createVectorStore/index.ts` - Connect to Qdrant server
 *
 * ### Triple Store Operations
 * - `sparql/insert/index.ts` - Insert RDF triples (Turtle format)
 * - `sparql/execute/index.ts` - Execute SPARQL SELECT queries
 * - `sparql/select/index.ts` - Type-safe SPARQL query builder
 * - `sparql/delete/index.ts` - Delete triples by pattern
 * - `sparql/helpers/getAllTriples/index.ts` - Get all triples query
 * - `sparql/helpers/getBySubject/index.ts` - Query by subject
 * - `sparql/helpers/getByPredicate/index.ts` - Query by predicate
 *
 * ### Vector Store Operations
 * - `vector/createCollection/index.ts` - Create Qdrant collection
 * - `vector/insertPoints/index.ts` - Insert vector embeddings
 * - `vector/searchPoints/index.ts` - Semantic similarity search
 *
 * ### Error Types
 * - `errors/index.ts` - All Pathfinder error types
 *
 * ## Import Pattern
 *
 * Use deno.jsonc import aliases to import specific functions:
 *
 * ```typescript
 * import validateConfig from "@pathfinder/config/validateConfig/index.ts"
 * import createTripleStore from "@pathfinder/connection/createTripleStore/index.ts"
 * import execute from "@pathfinder/sparql/execute/index.ts"
 * ```
 *
 * **NEVER import from this file.** It contains only documentation.
 * **NEVER use barrel file imports.** Import from specific index.ts files.
 *
 * ## Documentation
 *
 * - `docs/API.md` - Complete API reference
 * - `docs/IMPORTS.md` - Import pattern guide
 * - `docs/examples/basic-usage.ts` - Working examples
 * - `docs/examples/architect-integration.ts` - Integration patterns
 * - `docs/IMPLEMENTATION_PLAN.md` - Architecture and design
 *
 * ## Design Principles
 *
 * 1. **Pure Functions** - All non-IO functions are pure
 * 2. **Immutable Data** - All data structures are immutable
 * 3. **No Exceptions** - Use Result/Validation monads for errors
 * 4. **Curried Functions** - All functions take one parameter
 * 5. **Named Functions** - No arrow functions
 * 6. **One Function Per File** - Each index.ts exports one function
 *
 * ## Integration
 *
 * Pathfinder integrates with other Sitebender libraries:
 *
 * - **Architect** - Stores compiled JSX component metadata as RDF
 * - **Toolsmith** - Uses Result/Validation monads and functional utilities
 * - **Quartermaster** - Provides configuration management
 *
 * ## Technology Stack
 *
 * - **Oxigraph** - Embeddable RDF triple store with SPARQL 1.1 support
 * - **Qdrant** - High-performance vector similarity search engine
 * - **Deno** - Modern JavaScript/TypeScript runtime
 *
 * ## Version
 *
 * Current version: 1.0.0
 *
 * @module pathfinder
 */

// This file intentionally contains no code.
// Use deno.jsonc import aliases to import specific functions.
// See docs/IMPORTS.md for the correct import pattern.

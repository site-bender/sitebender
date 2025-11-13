# Pathfinder Implementation Plan - Complete Missing Operations

**Version:** 3.0.0
**Created:** 2025-01-12
**Status:** IN PROGRESS - Implementing Missing Operations

---

## Executive Summary

Pathfinder currently implements **13% of Qdrant operations** (3/23) and **27-33% of Oxigraph operations** (4-5/15). This plan details the implementation of ALL missing critical operations to bring Pathfinder to production completeness.

### Current State

- ✅ Qdrant: createCollection, insertPoints, searchPoints
- ✅ Oxigraph: execute (SELECT only), insert, delete, select builder
- ❌ **Missing 20 Qdrant operations**
- ❌ **Missing 10 Oxigraph operations**

### Goal

Implement ALL missing critical operations with:

- 100% test coverage
- Full constitutional compliance
- TDD methodology (tests first)
- Proper error handling with monads
- Complete documentation

---

## Constitutional Rules (MANDATORY)

Every function MUST comply with ALL of these rules:

1. ✅ **No classes** - Pure functions only, no `class` keyword
2. ✅ **No mutations** - All data immutable, use `const` and `Readonly<T>`
3. ✅ **No loops** - Use Toolsmith `map`/`filter`/`reduce`, never `for`/`while`
4. ✅ **No exceptions** - Return `Result<E,T>` or `Validation<E,T>`, never `throw`
5. ✅ **One function per file** - Each `index.ts` exports exactly ONE function
6. ✅ **Pure functions** - Same input → same output, except IO boundaries marked `// [IO]`
7. ✅ **No arrow functions** - Use `function` keyword, except in type signatures
8. ✅ **All functions curried** - ONE parameter per function level
9. ✅ **Use Toolsmith operators** - Never use raw operators like `!`, `&&`, `||`, `.map()`, `.push()`
10. ✅ **Result for fail-fast** - Use `Result` monad for IO operations
11. ✅ **Validation for accumulation** - Use `Validation` monad for validation with multiple errors
12. ✅ **Helper functions private** - Prefix with underscore, place in subfolders: `functionName/_helperName/`

---

## Implementation Workflow (MANDATORY FOR EVERY BATCH)

### For Each Function Implementation:

#### Phase 1: Test-Driven Development (TDD)

1. ✅ **Consult `testing` skill** - Use `.claude/skills/testing/` for test patterns
2. ✅ **Write tests FIRST** - Create `index.test.ts` before implementation
3. ✅ **Test success cases** - Happy path scenarios
4. ✅ **Test error cases** - All failure modes
5. ✅ **Test edge cases** - Empty inputs, invalid data, boundaries
6. ✅ **Verify tests fail** - Run `deno task test` to confirm tests fail (no implementation yet)

#### Phase 2: Implementation

7. ✅ **Consult `function-implementation` skill** - Use `.claude/skills/function-implementation/` for patterns
8. ✅ **Consult `error-handling` skill** - Use `.claude/skills/error-handling/` for Result/Validation patterns
9. ✅ **Implement function** - Follow constitutional rules exactly
10. ✅ **Use Toolsmith operators** - Consult `operator-substitutions` skill for all operators
11. ✅ **Mark IO boundaries** - Add `// [IO]` comment to functions with side effects
12. ✅ **Return IO monad if needed** - Use `Io<A>` type from Toolsmith for deferred IO
13. ✅ **Extract helper functions** - Move to `_helperName/` subfolders with underscore prefix

#### Phase 3: Verification

14. ✅ **Run tests** - Execute `deno task test`
15. ✅ **Confirm 100% pass** - ALL test cases must pass
16. ✅ **Verify tests are correct** - Tests actually test what function is supposed to do
17. ✅ **Run type check** - Execute `deno task test:strict` (no `--no-check` cheating!)
18. ✅ **Run linter** - Execute `deno task lint`
19. ✅ **Run formatter** - Execute `deno task fmt`
20. ✅ **Check coverage** - Verify 100% code coverage for this function

#### Phase 4: Documentation

21. ✅ **Add function comments** - JSDoc describing purpose, parameters, return type
22. ✅ **Document helper functions** - Explain what each private helper does
23. ✅ **Add usage examples** - Show how to use the function in comments

#### Phase 5: Compliance Check

24. ✅ **No classes** - Verify zero `class` keywords
25. ✅ **No arrow functions** - Verify zero `=>` except type signatures
26. ✅ **No loops** - Verify zero `for`/`while`
27. ✅ **No mutations** - Verify zero `.push()`, `.pop()`, property assignments
28. ✅ **No raw operators** - Verify using Toolsmith functions instead
29. ✅ **Proper currying** - Each function level takes exactly ONE parameter
30. ✅ **Helpers are private** - All in `_helperName/` subfolders

#### Phase 6: Checklist Update

31. ✅ **Mark batch complete** - Update checklist in this document
32. ✅ **Note any issues** - Document blockers or deviations

### CRITICAL: Do NOT Report Completion Until ALL 32 Steps Pass

---

## Phase 1: Critical Qdrant Operations (Priority 1)

### Batch 1.1: listCollections

**Purpose:** Discover what collections exist in Qdrant
**File:** `src/vector/listCollections/index.ts`
**Test File:** `src/vector/listCollections/index.test.ts`

**Qdrant API:**

```
GET /collections
Returns: { result: { collections: [{ name: string }] } }
```

**Function Signature:**

```typescript
export type CollectionSummary = {
	readonly name: string
}

export default function listCollections(
	connection: VectorStoreConnection,
): Promise<Result<VectorError, ReadonlyArray<CollectionSummary>>>
```

**Implementation Checklist:**

-
  1. [x] Consult `testing` skill
-
  2. [x] Write tests FIRST (index.test.ts)
-
  3. [x] Test success: returns list of collections
-
  4. [x] Test error: connection fails
-
  5. [x] Test edge: empty list
-
  6. [x] Verify tests fail (no implementation)
-
  7. [x] Consult `function-implementation` skill
-
  8. [x] Consult `error-handling` skill
-
  9. [x] Implement function
-
  10. [x] Use Toolsmith `map` to transform results
-
  11. [x] Mark with `// [IO]` comment
-
  12. [x] Return `Io<Promise<Result<...>>>` if needed
-
  13. [x] Extract any helpers to `_transformCollectionList/` if needed
-
  14. [x] Run `deno task test`
-
  15. [x] Confirm 100% tests pass
-
  16. [x] Verify tests check actual functionality
-
  17. [x] Run `deno task test:strict` (no --no-check!)
-
  18. [x] Run `deno task lint`
-
  19. [x] Run `deno task fmt`
-
  20. [x] Check coverage 100%
-
  21. [x] Add JSDoc comments
-
  22. [x] Document any helpers
-
  23. [x] Add usage example in comments
-
  24. [x] Verify no `class` keywords
-
  25. [x] Verify no arrow functions
-
  26. [x] Verify no loops
-
  27. [x] Verify no mutations
-
  28. [x] Verify using Toolsmith operators
-
  29. [x] Verify proper currying (one param)
-
  30. [x] Verify helpers in `_subfolder/`
-
  31. [x] Mark batch complete
-
  32. [x] Note any issues

**Completion Status:** ✅ COMPLETE (2025-01-13)

---

### Batch 1.2: getCollectionInfo

**Purpose:** Inspect collection metadata (dimension, count, etc.)
**File:** `src/vector/getCollectionInfo/index.ts`
**Test File:** `src/vector/getCollectionInfo/index.test.ts`

**Qdrant API:**

```
GET /collections/{collection_name}
Returns: { result: { vectors_count: number, config: {...} } }
```

**Function Signature:**

```typescript
export type CollectionInfo = {
	readonly name: string
	readonly vectorCount: number
	readonly dimension: number
	readonly distance: string
}

export default function getCollectionInfo(collectionName: string) {
	return function fromVectorStore(
		connection: VectorStoreConnection
	): Promise<Result<VectorError, CollectionInfo>>
}
```

**Implementation Checklist:**

-
  1. [ ] Consult `testing` skill
-
  2. [ ] Write tests FIRST
-
  3. [ ] Test success: returns collection info
-
  4. [ ] Test error: collection not found
-
  5. [ ] Test error: invalid collection name
-
  6. [ ] Verify tests fail
-
  7. [ ] Consult `function-implementation` skill
-
  8. [ ] Consult `error-handling` skill
-
  9. [ ] Implement double-curried function
-
  10. [ ] Use Toolsmith `not()` instead of `!`
-
  11. [ ] Mark with `// [IO]`
-
  12. [ ] Return proper Result type
-
  13. [ ] Extract transformation helpers if needed
-
  14. [ ] Run `deno task test`
-
  15. [ ] Confirm 100% pass
-
  16. [ ] Verify tests correct
-
  17. [ ] Run `deno task test:strict`
-
  18. [ ] Run `deno task lint`
-
  19. [ ] Run `deno task fmt`
-
  20. [ ] Check 100% coverage
-
  21. [ ] Add JSDoc
-
  22. [ ] Document helpers
-
  23. [ ] Add usage example
-
  24. [ ] No classes
-
  25. [ ] No arrow functions
-
  26. [ ] No loops
-
  27. [ ] No mutations
-
  28. [ ] Toolsmith operators only
-
  29. [ ] Proper currying
-
  30. [ ] Helpers private
-
  31. [ ] Mark complete
-
  32. [ ] Note issues

**Completion Status:** ⬜ NOT STARTED

---

### Batch 1.3: deleteCollection

**Purpose:** Remove collection and all its data
**File:** `src/vector/deleteCollection/index.ts`
**Test File:** `src/vector/deleteCollection/index.test.ts`

**Qdrant API:**

```
DELETE /collections/{collection_name}
Returns: { result: true }
```

**Function Signature:**

```typescript
export default function deleteCollection(collectionName: string) {
	return function fromVectorStore(
		connection: VectorStoreConnection
	): Promise<Result<VectorError, void>>
}
```

**Implementation Checklist:**

- [ ] 1-32. [Same 32-step checklist as above]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 1.4: retrievePoints

**Purpose:** Fetch specific points by ID
**File:** `src/vector/retrievePoints/index.ts`
**Test File:** `src/vector/retrievePoints/index.test.ts`

**Qdrant API:**

```
POST /collections/{collection_name}/points
Body: { ids: [id1, id2, ...], with_payload: true, with_vector: false }
Returns: { result: [{ id, vector?, payload? }] }
```

**Function Signature:**

```typescript
export type RetrievePointsConfig = {
	readonly collectionName: string
	readonly ids: ReadonlyArray<string | number>
	readonly withPayload?: boolean
	readonly withVector?: boolean
}

export type PointData = {
	readonly id: string | number
	readonly vector?: ReadonlyArray<number>
	readonly payload?: Record<string, unknown>
}

export default function retrievePoints(config: RetrievePointsConfig) {
	return function fromVectorStore(
		connection: VectorStoreConnection
	): Promise<Result<VectorError, ReadonlyArray<PointData>>>
}
```

**Implementation Checklist:**

- [ ] 1-32. [Same 32-step checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 1.5: deletePoints

**Purpose:** Remove specific points by ID
**File:** `src/vector/deletePoints/index.ts`
**Test File:** `src/vector/deletePoints/index.test.ts`

**Qdrant API:**

```
POST /collections/{collection_name}/points/delete
Body: { points: [id1, id2, ...] }
Returns: { result: { operation_id: number, status: "completed" } }
```

**Function Signature:**

```typescript
export type DeletePointsConfig = {
	readonly collectionName: string
	readonly ids: ReadonlyArray<string | number>
}

export default function deletePoints(config: DeletePointsConfig) {
	return function fromVectorStore(
		connection: VectorStoreConnection
	): Promise<Result<VectorError, void>>
}
```

**Implementation Checklist:**

- [ ] 1-32. [Same 32-step checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 1.6: updatePayload

**Purpose:** Modify point metadata without re-inserting vector
**File:** `src/vector/updatePayload/index.ts`
**Test File:** `src/vector/updatePayload/index.test.ts`

**Qdrant API:**

```
POST /collections/{collection_name}/points/payload
Body: { payload: {...}, points: [id1, id2, ...] }
Returns: { result: { operation_id: number, status: "completed" } }
```

**Function Signature:**

```typescript
export type UpdatePayloadConfig = {
	readonly collectionName: string
	readonly ids: ReadonlyArray<string | number>
	readonly payload: Record<string, unknown>
}

export default function updatePayload(config: UpdatePayloadConfig) {
	return function inVectorStore(
		connection: VectorStoreConnection
	): Promise<Result<VectorError, void>>
}
```

**Implementation Checklist:**

- [ ] 1-32. [Same 32-step checklist]

**Completion Status:** ⬜ NOT STARTED

---

## Phase 2: Critical Oxigraph Operations (Priority 1)

### Batch 2.1: ASK Query Support

**Purpose:** Check if pattern exists (returns boolean)
**File:** `src/sparql/ask/index.ts`
**Test File:** `src/sparql/ask/index.test.ts`

**SPARQL Syntax:**

```sparql
ASK WHERE { ?s ?p ?o }
```

**Returns:**

```json
{
	"head": {},
	"boolean": true
}
```

**Function Signature:**

```typescript
export default function ask(sparql: string) {
	return function executeOn(
		connection: TripleStoreConnection
	): Promise<Result<QueryError, boolean>>
}
```

**Implementation Checklist:**

-
  1. [ ] Consult `testing` skill
-
  2. [ ] Write tests FIRST
-
  3. [ ] Test success: ASK returns true
-
  4. [ ] Test success: ASK returns false
-
  5. [ ] Test error: invalid SPARQL
-
  6. [ ] Verify tests fail
-
  7. [ ] Consult `function-implementation` skill
-
  8. [ ] Consult `error-handling` skill
-
  9. [ ] Implement function
-
  10. [ ] Use Toolsmith operators
-
  11. [ ] Mark `// [IO]`
-
  12. [ ] Return Result<QueryError, boolean>
-
  13. [ ] Extract parsing helpers if needed
-
  14. [ ] Run tests
-
  15. [ ] Confirm 100% pass
-
  16. [ ] Verify correctness
-
  17. [ ] Type check (strict)
-
  18. [ ] Lint
-
  19. [ ] Format
-
  20. [ ] Coverage 100%
-
  21. [ ] JSDoc
-
  22. [ ] Document helpers
-
  23. [ ] Usage example
-
  24. [ ] No classes
-
  25. [ ] No arrows
-
  26. [ ] No loops
-
  27. [ ] No mutations
-
  28. [ ] Toolsmith only
-
  29. [ ] Proper currying
-
  30. [ ] Helpers private
-
  31. [ ] Mark complete
-
  32. [ ] Note issues

**Completion Status:** ⬜ NOT STARTED

---

### Batch 2.2: CONSTRUCT Query Support

**Purpose:** Build new RDF graph from query results
**File:** `src/sparql/construct/index.ts`
**Test File:** `src/sparql/construct/index.test.ts`

**SPARQL Syntax:**

```sparql
CONSTRUCT { ?s <http://new/predicate> ?o }
WHERE { ?s <http://old/predicate> ?o }
```

**Returns:** RDF graph in N-Triples format

**Function Signature:**

```typescript
export type RdfTriple = {
	readonly subject: string
	readonly predicate: string
	readonly object: string
}

export default function construct(sparql: string) {
	return function executeOn(
		connection: TripleStoreConnection
	): Promise<Result<QueryError, ReadonlyArray<RdfTriple>>>
}
```

**Implementation Checklist:**

- [ ] 1-32. [Same 32-step checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 2.3: DESCRIBE Query Support

**Purpose:** Get all triples about a resource
**File:** `src/sparql/describe/index.ts`
**Test File:** `src/sparql/describe/index.test.ts`

**SPARQL Syntax:**

```sparql
DESCRIBE <http://example.org/resource>
```

**Returns:** RDF graph describing the resource

**Function Signature:**

```typescript
export type RdfTriple = {
	readonly subject: string
	readonly predicate: string
	readonly object: string
}

export default function describe(resourceUri: string) {
	return function executeOn(
		connection: TripleStoreConnection
	): Promise<Result<QueryError, ReadonlyArray<RdfTriple>>>
}
```

**Implementation Checklist:**

- [ ] 1-32. [Same 32-step checklist]

**Completion Status:** ⬜ NOT STARTED

---

## Phase 3: Additional Qdrant Operations (Priority 2)

### Batch 3.1: countPoints

**Purpose:** Count points in collection matching filter
**File:** `src/vector/countPoints/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 3.2: scrollPoints

**Purpose:** Iterate through points with pagination
**File:** `src/vector/scrollPoints/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 3.3: batchSearch

**Purpose:** Multiple searches in one request
**File:** `src/vector/batchSearch/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 3.4: recommendPoints

**Purpose:** Recommendation based on positive/negative examples
**File:** `src/vector/recommendPoints/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

## Phase 4: Additional Oxigraph Operations (Priority 2)

### Batch 4.1: Combined DELETE/INSERT

**Purpose:** Atomic replace operation
**File:** `src/sparql/deleteInsert/index.ts`

**SPARQL Syntax:**

```sparql
DELETE { ?s ?p ?old }
INSERT { ?s ?p ?new }
WHERE { ?s ?p ?old }
```

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 4.2: LOAD Operation

**Purpose:** Load RDF from URL
**File:** `src/sparql/load/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 4.3: CLEAR Graph

**Purpose:** Remove all triples from named graph
**File:** `src/sparql/clear/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 4.4: DROP Graph

**Purpose:** Delete named graph entirely
**File:** `src/sparql/drop/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 4.5: CREATE Graph

**Purpose:** Create empty named graph
**File:** `src/sparql/create/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

## Phase 5: Advanced Qdrant Operations (Priority 3)

### Batch 5.1: updateVectors

**Purpose:** Modify specific vectors without changing payload
**File:** `src/vector/updateVectors/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.2: setPayload

**Purpose:** Add/modify specific payload fields
**File:** `src/vector/setPayload/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.3: deletePayloadKeys

**Purpose:** Remove specific payload fields
**File:** `src/vector/deletePayloadKeys/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.4: clearPayload

**Purpose:** Remove all payload from points
**File:** `src/vector/clearPayload/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.5: createSnapshot

**Purpose:** Create collection backup
**File:** `src/vector/createSnapshot/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.6: restoreSnapshot

**Purpose:** Restore collection from backup
**File:** `src/vector/restoreSnapshot/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.7: createAlias

**Purpose:** Create collection alias
**File:** `src/vector/createAlias/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.8: deleteAlias

**Purpose:** Remove collection alias
**File:** `src/vector/deleteAlias/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.9: updateCollection

**Purpose:** Modify collection parameters
**File:** `src/vector/updateCollection/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 5.10: discoverPoints

**Purpose:** Discovery search with context pairs
**File:** `src/vector/discoverPoints/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

## Phase 6: Advanced Oxigraph Operations (Priority 3)

### Batch 6.1: COPY Graph

**Purpose:** Copy all triples from one graph to another
**File:** `src/sparql/copy/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 6.2: MOVE Graph

**Purpose:** Move triples between graphs
**File:** `src/sparql/move/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

### Batch 6.3: ADD Graph

**Purpose:** Add triples from one graph to another
**File:** `src/sparql/add/index.ts`

**Implementation Checklist:**

- [ ] 1-32. [Same checklist]

**Completion Status:** ⬜ NOT STARTED

---

## Overall Progress Tracking

### Completion Summary

**Phase 1 (Critical Qdrant): 1/6 Complete**

- [x] listCollections
- [ ] getCollectionInfo
- [ ] deleteCollection
- [ ] retrievePoints
- [ ] deletePoints
- [ ] updatePayload

**Phase 2 (Critical Oxigraph): 0/3 Complete**

- [ ] ask
- [ ] construct
- [ ] describe

**Phase 3 (Additional Qdrant): 0/4 Complete**

- [ ] countPoints
- [ ] scrollPoints
- [ ] batchSearch
- [ ] recommendPoints

**Phase 4 (Additional Oxigraph): 0/5 Complete**

- [ ] deleteInsert
- [ ] load
- [ ] clear
- [ ] drop
- [ ] create

**Phase 5 (Advanced Qdrant): 0/10 Complete**

- [ ] updateVectors
- [ ] setPayload
- [ ] deletePayloadKeys
- [ ] clearPayload
- [ ] createSnapshot
- [ ] restoreSnapshot
- [ ] createAlias
- [ ] deleteAlias
- [ ] updateCollection
- [ ] discoverPoints

**Phase 6 (Advanced Oxigraph): 0/3 Complete**

- [ ] copy
- [ ] move
- [ ] add

### Total Progress: 1/31 Operations (3%)

**Target Completion:** ALL 31 operations at 100% quality

---

## Success Criteria (MANDATORY)

For Pathfinder to be considered complete, ALL of the following MUST be true:

### Code Quality

- [ ] Zero linting errors: `deno task lint`
- [ ] Zero formatting errors: `deno task fmt`
- [ ] Zero type errors: `deno task test:strict` (NO --no-check cheating!)
- [ ] 100% test coverage: `deno task test:cov`
- [ ] All tests pass: `deno task test`

### Constitutional Compliance

- [ ] Zero classes in entire codebase
- [ ] Zero arrow functions (except type signatures)
- [ ] Zero loops (for/while/do-while)
- [ ] Zero mutations (.push/.pop/assignments)
- [ ] Zero raw operators (use Toolsmith everywhere)
- [ ] All functions curried properly
- [ ] All helpers in _private/ folders
- [ ] All IO functions marked with // [IO]
- [ ] All errors use Result/Validation monads

### Functional Requirements

- [ ] All 6 critical Qdrant operations work
- [ ] All 3 critical Oxigraph operations work
- [ ] All operations return proper Result types
- [ ] All operations handle errors gracefully
- [ ] All operations tested with real services

### Documentation

- [ ] Every function has JSDoc comments
- [ ] Every function has usage examples
- [ ] README reflects actual completeness (no lies!)
- [ ] API documentation complete
- [ ] Integration examples provided

---

## Notes

### Skills to Consult

For EVERY function implementation:

1. **testing** skill (`.claude/skills/testing/`) - Test patterns, property testing, TDD
2. **function-implementation** skill (`.claude/skills/function-implementation/`) - Structure, currying, naming
3. **error-handling** skill (`.claude/skills/error-handling/`) - Result/Validation patterns
4. **operator-substitutions** skill (`.claude/skills/operator-substitutions/`) - Toolsmith operator usage

### Do NOT:

- ❌ Skip tests
- ❌ Write implementation before tests
- ❌ Use --no-check flag
- ❌ Report completion prematurely
- ❌ Violate ANY constitutional rules
- ❌ Make assumptions about what's complete
- ❌ Lie about coverage or test passage

### DO:

- ✅ Follow TDD strictly (tests first!)
- ✅ Use all 32 steps for EVERY batch
- ✅ Run ALL checks before marking complete
- ✅ Document everything
- ✅ Ask questions if unclear
- ✅ Report blockers immediately

---

**END OF IMPLEMENTATION PLAN**

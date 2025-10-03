# RAG Implementation Plan

## Purpose

This document serves as the **single source of truth** for tracking the
implementation progress of the Haskell-in-TypeScript RAG (Retrieval-Augmented
Generation) system. It enables resumption of work across sessions by
maintaining a clear, actionable checklist of all implementation steps.

The RAG system will encode our coding rules using a 6-way embedding strategy
to ensure AI assistants receive contextually appropriate guidance during code
generation and review.

**Last Updated:** 2025-10-02

---

## Core Rules

These rules define the foundation of our codebase and must be encoded into
the RAG system for retrieval during AI-assisted development.

### Constitutional Rules

**No Classes**
- TypeScript classes are prohibited
- Use modules with exported functions instead
- Organize related functions by domain/capability

**No Mutations**
- All data structures must be immutable
- Use `const` declarations exclusively
- Return new objects/arrays instead of modifying existing ones
- Array operations: use `.map()`, `.filter()`, `.reduce()` instead of `.push()`,
  `.pop()`, etc.

**No Loops**
- Prohibited: `for`, `for...of`, `for...in`, `while`, `do...while`
- Use recursion or array methods (`.map()`, `.filter()`, `.reduce()`,
  `.flatMap()`)
- Tail recursion preferred where applicable

**No Exceptions**
- No `try...catch...finally` blocks
- No `throw` statements
- Use discriminated unions for error handling:
  ```typescript
  type Result<T, E> =
    | { _tag: "success"; value: T }
    | { _tag: "failure"; error: E };
  ```

### Functional Programming Rules

**Pure Functions**
- Functions must not have side effects
- Same input always produces same output
- No global state access or modification
- No I/O operations within pure functions

**Immutability**
- All variables declared with `const`
- Use `ReadonlyArray<T>` instead of `T[]`
- Use `Readonly<T>` for object types
- Spread operators for creating modified copies: `{ ...obj, field: newValue }`

**Total Functions**
- Every function must handle all possible inputs
- No `undefined` or `null` returns without explicit encoding in return type
- Use `Option<T>` or `Maybe<T>` types for optional values:
  ```typescript
  type Option<T> = { _tag: "some"; value: T } | { _tag: "none" };
  ```

**Function Composition**
- Build complex operations from simple functions
- Use pipe operations for left-to-right composition
- Keep functions small and focused on single responsibility

**Higher-Order Functions**
- Functions that take functions as parameters
- Functions that return functions
- Enables powerful abstractions and reusability

### TypeScript-Specific Rules

**Discriminated Unions**
- Use tagged unions for all variant types
- Tag field named `tag` with string literal type
- Exhaustive pattern matching via switch statements
- Example:
  ```typescript
  type Shape =
    | { _tag: "circle"; radius: number }
    | { _tag: "rectangle"; width: number; height: number };
  ```

**Branded Types**
- Use phantom types for nominal typing
- Prevents mixing semantically different values of same structural type
- Example:
  ```typescript
  type UserId = string & { readonly __brand: unique symbol };
  type Email = string & { readonly __brand: unique symbol };
  ```

**Type-Level Programming**
- Leverage TypeScript's type system for compile-time guarantees
- Use mapped types, conditional types, template literal types
- Encode constraints in types rather than runtime checks where possible

**Explicit Type Annotations**
- Always annotate function parameters
- Always annotate function return types
- Avoid relying on type inference for public APIs

### Syntax Rules

**No Arrow Functions**
- Prohibited: `const fn = () => ...`, `const fn = (x) => ...`
- Use only `function` keyword with named functions
- Rationale: Encourages naming and explicit function declarations
- Example:
  ```typescript
  // ✗ Prohibited
  const add = (a: number, b: number): number => a + b;
  
  // ✓ Correct
  function add(a: number, b: number): number {
    return a + b;
  }
  ```

**No Abbreviations**
- Write full, descriptive names for all identifiers
- Exceptions whitelist (to be populated as discovered):
  - Standard abbreviations: `id`, `html`, `url`, `uri`, `api`
  - Domain-specific terms: `ast`, `ir`, `dsl`
- Rationale: Code should read like plain English

**Plain English Names**
- Names must be readable as natural language
- Use complete words and phrases
- Avoid cryptic or overly terse names
- Example:
  ```typescript
  // ✗ Poor
  function procUsr(u: Usr): Result { ... }
  
  // ✓ Good
  function processUser(user: User): Result { ... }
  ```

**Curried Function Naming**
- Inner functions in curried style include captured parameters in name
- Makes closure behavior explicit
- Example:
  ```typescript
  function add(augend: number): (addend: number) => number {
    function addToAugend(addend: number): number {
      return augend + addend;
    }
    
    return addToAugend;
  }
  ```

### Formatting Rules

**From `.editorconfig`:**

- **Character Encoding:** UTF-8
- **Line Endings:** LF (Unix-style)
- **Indent Style:** Tabs (for code files)
- **Indent Size:** 2 spaces (visual width)
- **Max Line Length:** 80 characters
- **Final Newline:** Always insert
- **Trailing Whitespace:** Trim (except in markdown)

**Markdown-Specific:**
- **Indent Style:** Spaces (not tabs)
- **Indent Size:** 2 spaces
- **Max Line Length:** No limit
- **Trailing Whitespace:** Preserve (for markdown formatting)

**YAML-Specific:**
- **Indent Style:** Spaces
- **Indent Size:** 2 spaces
- **Max Line Length:** No limit
- **Trailing Whitespace:** Trim

---

## Implementation Checklist

### Phase 1: Rule Extraction and Categorization
- [x] Step 1.1: Extract constitutional rules from documentation
  - [x] Parse `docs/haskell-in-typescript.md`
  - [x] Parse `CLAUDE_RULES.md`
  - [x] Parse `docs/steward-rules.md`
  - [x] Compile no-classes rule with rationale
  - [x] Compile no-mutations rule with examples
  - [x] Compile no-loops rule with alternatives
  - [x] Compile no-exceptions rule with Result type patterns

- [x] Step 1.2: Extract functional programming rules
  - [x] Document pure function requirements
  - [x] Document immutability patterns
  - [x] Document total function requirements
  - [x] Document function composition patterns
  - [x] Document higher-order function patterns

- [x] Step 1.3: Extract syntax rules
  - [x] Document no-arrow-functions rule with examples
  - [x] Document no-abbreviations rule with whitelist
  - [x] Document plain-English naming conventions
  - [x] Document curried function naming patterns
  - [x] Compile positive and negative examples for each

- [x] Step 1.4: Extract formatting rules
  - [x] Parse `.editorconfig` completely
  - [x] Document tab/space usage per file type
  - [x] Document line length requirements
  - [x] Document newline and whitespace rules

- [x] Step 1.5: Extract TypeScript-specific rules
  - [x] Document discriminated union patterns
  - [x] Document branded type patterns
  - [x] Document type-level programming guidelines
  - [x] Document explicit annotation requirements

### Phase 2: 6-Way Encoding Generation
- [x] Step 2.1: Generate principle embeddings
  - [x] Create principle statements for constitutional rules
  - [x] Create principle statements for FP rules
  - [x] Create principle statements for syntax rules
  - [x] Create principle statements for formatting rules
  - [x] Create principle statements for TypeScript rules
  - [x] Generate embeddings using text-embedding model

- [x] Step 2.2: Generate pattern embeddings
  - [x] Extract positive code patterns for each rule category
  - [x] Create pattern templates (e.g., Result type template)
  - [x] Create pattern variations for different contexts
  - [x] Generate embeddings for each pattern

- [x] Step 2.3: Generate query-phrase embeddings
  - [x] Identify likely developer questions per rule
  - [x] Create query variations (formal, casual, implicit)
  - [x] Map queries to relevant rules
  - [x] Generate embeddings for query phrases

- [x] Step 2.4: Generate anti-pattern embeddings
  - [x] Document prohibited patterns for each rule
  - [x] Create examples of common violations
  - [x] Link anti-patterns to correct alternatives
  - [x] Generate embeddings for anti-patterns

- [x] Step 2.5: Generate example embeddings
  - [x] Create compliant code examples for each rule
  - [x] Include context and rationale
  - [x] Cover common use cases
  - [x] Generate embeddings for examples

- [x] Step 2.6: Generate counter-example embeddings
  - [x] Create violation examples for each rule
  - [x] Annotate with explanation of violation
  - [x] Link to correct alternative
  - [x] Generate embeddings for counter-examples

### Phase 3: Vector Database Setup
- [x] Step 3.1: Design collection schema
  - [x] Define metadata fields (rule category, type, severity)
  - [x] Define vector dimensions (match embedding model)
  - [x] Design indexing strategy for performance
  - [x] Define payload structure for retrieval

- [x] Step 3.2: Configure Qdrant collections
  - [x] Create `constitutional_rules` collection
  - [x] Create `functional_programming_rules` collection
  - [x] Create `syntax_rules` collection
  - [x] Create `formatting_rules` collection
  - [x] Create `typescript_rules` collection
  - [x] Configure HNSW parameters for each collection

- [x] Step 3.3: Implement upsert logic
  - [x] Create batch upsert functions
  - [x] Implement idempotent point IDs
  - [x] Add error handling and retries
  - [x] Create progress tracking/logging

- [x] Step 3.4: Populate collections
  - [x] Upsert principle embeddings
  - [x] Upsert pattern embeddings
  - [x] Upsert query-phrase embeddings
  - [x] Upsert anti-pattern embeddings
  - [x] Upsert example embeddings
  - [x] Upsert counter-example embeddings
  - [x] Verify counts and sampling

### Phase 4: Retrieval Pipeline Development
- [x] Step 4.1: Implement multi-collection search
  - [x] Create search function with collection routing
  - [x] Implement relevance scoring across collections
  - [x] Add filtering by metadata (category, severity)
  - [x] Optimize search parameters (limit, score threshold)

- [x] Step 4.2: Implement context assembly
  - [x] Design context template structure
  - [x] Implement deduplication logic
  - [x] Add relevance ranking
  - [x] Create context formatting for AI consumption

- [x] Step 4.3: Implement query understanding
  - [x] Classify query intent (check, fix, explain, example)
  - [x] Extract rule categories from query
  - [x] Determine optimal encoding types to retrieve
  - [x] Route to appropriate collections

- [x] Step 4.4: Implement result synthesis
  - [x] Combine results from multiple encoding types
  - [x] Prioritize based on query intent
  - [x] Format for clear AI comprehension
  - [x] Add citations/references to source rules

### Phase 5: Integration with Steward
- [ ] Step 5.1: Integrate with `steward check`
  - [ ] Identify linter violation types
  - [ ] Query RAG for relevant rules on violation
  - [ ] Enhance error messages with context
  - [ ] Add links to examples/documentation

- [ ] Step 5.2: Integrate with `steward fix`
  - [ ] Query RAG for fix patterns
  - [ ] Retrieve compliant examples
  - [ ] Generate fix suggestions
  - [ ] Include rationale in fix output

- [ ] Step 5.3: Create RAG query API
  - [ ] Design API interface for rule queries
  - [ ] Implement caching for common queries
  - [ ] Add performance monitoring
  - [ ] Document API usage for other tools

### Phase 6: Testing and Validation
- [ ] Step 6.1: Create test query dataset
  - [ ] Design queries covering all rule categories
  - [ ] Include edge cases and ambiguous queries
  - [ ] Create expected result sets
  - [ ] Document test rationale

- [ ] Step 6.2: Implement retrieval quality tests
  - [ ] Test precision (relevant results returned)
  - [ ] Test recall (all relevant results found)
  - [ ] Test ranking (most relevant first)
  - [ ] Measure retrieval latency

- [ ] Step 6.3: Validate end-to-end integration
  - [ ] Test with real code violations
  - [ ] Verify rule context is helpful
  - [ ] Test fix suggestion quality
  - [ ] Validate across different rule categories

- [ ] Step 6.4: Performance optimization
  - [ ] Profile query performance
  - [ ] Optimize collection parameters
  - [ ] Implement caching strategies
  - [ ] Load test with concurrent queries

### Phase 7: Documentation and Maintenance
- [ ] Step 7.1: Document RAG architecture
  - [ ] Create architecture diagram
  - [ ] Document collection schemas
  - [ ] Document retrieval pipeline
  - [ ] Document integration points

- [ ] Step 7.2: Create rule maintenance workflow
  - [ ] Document process for adding new rules
  - [ ] Create scripts for re-embedding
  - [ ] Document versioning strategy
  - [ ] Create backup/restore procedures

- [ ] Step 7.3: Create usage documentation
  - [ ] Write API documentation
  - [ ] Create example queries
  - [ ] Document best practices
  - [ ] Create troubleshooting guide

- [ ] Step 7.4: Implement monitoring
  - [ ] Track query patterns
  - [ ] Monitor retrieval quality metrics
  - [ ] Alert on performance degradation
  - [ ] Create usage analytics dashboard

---

## Progress Tracking

### Current Phase
**Phase 3: Vector Database Setup - COMPLETE**
- All 5 collections created and configured
- All 360 embeddings upserted across 6 encoding types
- Schema designed with proper metadata fields
- HNSW indexing configured (Cosine distance, 384 dimensions)
- Batch upsert implemented with error handling
- Verification tests passing
- Next: Begin Phase 4 - Retrieval Pipeline Development

### Last Updated
2025-10-03T07:06:00Z

### Next Steps
1. Implement multi-collection search with relevance scoring
2. Implement context assembly with deduplication
3. Implement query understanding (intent classification)
4. Implement result synthesis from multiple encoding types

### Notes/Blockers
- Embedding model: all-MiniLM-L6-v2 (384 dimensions) ✓
- Qdrant running at localhost:6333 ✓
- MCP server configured and working ✓
- Collections populated and verified ✓

---

## Rule Examples

This section illustrates how each major rule category will be encoded in
the RAG system using the 6-way approach.

### Example 1: No Arrow Functions Rule

**Principle:**
> All functions must be declared using the `function` keyword with explicit
> names. Arrow function syntax is prohibited to encourage clear naming and
> explicit function declarations.

**Pattern:**
```typescript
// Named function declaration
function calculateTotal(items: ReadonlyArray<number>): number {
  return items.reduce(addNumbers, 0);
}

function addNumbers(accumulator: number, current: number): number {
  return accumulator + current;
}
```

**Query Phrases:**
- "How do I define a function?"
- "What syntax should I use for functions?"
- "Can I use arrow functions?"
- "Why can't I use () => syntax?"

**Anti-Pattern:**
```typescript
// ✗ Prohibited: Arrow function
const calculateTotal = (items: number[]): number => {
  return items.reduce((acc, curr) => acc + curr, 0);
};
```

**Example (Compliant):**
```typescript
// ✓ Correct: Named function with descriptive name
function multiplyByFactor(factor: number): (value: number) => number {
  function multiplyValueByFactor(value: number): number {
    return value * factor;
  }
  return multiplyValueByFactor;
}
```

**Counter-Example (Violation):**
```typescript
// ✗ Violation: Using arrow function
const multiply = (a: number) => (b: number) => a * b;

// Why it violates:
// 1. Uses arrow function syntax (=>)
// 2. Outer function has no explicit name
// 3. Inner function has no name showing captured parameters
```

### Example 2: No Mutations Rule

**Principle:**
> All data structures must be immutable. Variables must be declared with
> `const`, and operations must return new values instead of modifying
> existing ones.

**Pattern:**
```typescript
// Creating modified copies with spread operator
function updateUser(
  user: Readonly<User>,
  updates: Readonly<Partial<User>>
): Readonly<User> {
  return { ...user, ...updates };
}

// Array operations returning new arrays
function addItem<T>(
  array: ReadonlyArray<T>,
  item: T
): ReadonlyArray<T> {
  return [...array, item];
}
```

**Query Phrases:**
- "How do I modify an object?"
- "How do I add to an array?"
- "Can I use push or pop?"
- "How do I update state?"

**Anti-Pattern:**
```typescript
// ✗ Prohibited: Mutation
function updateUser(user: User, name: string): void {
  user.name = name; // Direct mutation
}

// ✗ Prohibited: Array mutation
function addItem<T>(array: T[], item: T): void {
  array.push(item); // Mutating method
}
```

**Example (Compliant):**
```typescript
// ✓ Correct: Returning new array with map
function doubleNumbers(
  numbers: ReadonlyArray<number>
): ReadonlyArray<number> {
  return numbers.map(function doubleNumber(n: number): number {
    return n * 2;
  });
}
```

**Counter-Example (Violation):**
```typescript
// ✗ Violation: In-place modification
function sortItems(items: Item[]): Item[] {
  items.sort((a, b) => a.value - b.value); // Mutates array
  return items;
}

// Why it violates:
// 1. Uses .sort() which mutates the array in place
// 2. Also uses arrow functions (secondary violation)
// Correct approach: [...items].sort() or use immutable sort
```

### Example 3: Discriminated Unions

**Principle:**
> Use tagged unions with a `tag` field for all variant types. This enables
> exhaustive pattern matching and type-safe handling of different cases.

**Pattern:**
```typescript
// Defining discriminated union
type Result<T, E> =
  | { _tag: "success"; value: T }
  | { _tag: "failure"; error: E };

// Pattern matching with exhaustive checking
function handleResult<T, E>(result: Result<T, E>): string {
  switch (result.tag) {
    case "success":
      return `Success: ${result.value}`;
    case "failure":
      return `Error: ${result.error}`;
  }
}
```

**Query Phrases:**
- "How do I represent optional values?"
- "How do I handle errors without exceptions?"
- "What's the pattern for success/failure?"
- "How do I do union types?"

**Anti-Pattern:**
```typescript
// ✗ Prohibited: Using null/undefined
function findUser(id: string): User | null {
  // ...
}

// ✗ Prohibited: Throwing exceptions
function validateInput(input: string): void {
  if (!input) throw new Error("Invalid");
}
```

**Example (Compliant):**
```typescript
// ✓ Correct: Option type for optional values
type Option<T> =
  | { _tag: "some"; value: T }
  | { _tag: "none" };

function findUser(id: string): Option<User> {
  // Implementation returns Option type
}
```

**Counter-Example (Violation):**
```typescript
// ✗ Violation: Boolean flag instead of discriminated union
type Result<T> = {
  success: boolean;
  value?: T;
  error?: Error;
};

// Why it violates:
// 1. Uses boolean flag instead of tag field
// 2. Uses optional properties (?) which can be undefined
// 3. Type system cannot ensure mutual exclusivity
// 4. Pattern matching is not exhaustive
```

---

## Embedding Strategy Details

### Collection Organization

Each rule category gets its own collection for targeted retrieval:

1. **constitutional_rules**: No classes, no mutations, no loops, no exceptions
2. **functional_programming_rules**: Pure functions, immutability, totality
3. **syntax_rules**: No arrow functions, naming conventions, currying patterns
4. **formatting_rules**: Line length, indentation, whitespace, encodings
5. **typescript_rules**: Discriminated unions, branded types, type annotations

### Encoding Type Metadata

Each vector point includes metadata identifying its encoding type:

- `encoding_type`: One of [principle, pattern, query, antipattern, example,
  counterexample]
- `rule_id`: Unique identifier linking related encodings
- `category`: Rule category (constitutional, fp, syntax, formatting, typescript)
- `severity`: Importance level (error, warning, info)
- `keywords`: Searchable terms for filtering

### Query Routing Strategy

Query understanding determines which collections and encoding types to search:

- **"How do I..."** → patterns + examples
- **"What's wrong with..."** → antipatterns + counterexamples + principles
- **"Why can't I..."** → principles + antipatterns
- **"Show me..."** → examples + patterns
- **Code violation** → antipatterns + counterexamples + patterns

---

## Success Criteria

The RAG system will be considered successfully implemented when:

1. **Coverage**: All rules from source documents are encoded with all 6
   embedding types
2. **Retrieval Quality**: Test queries achieve >90% precision and >85% recall
3. **Performance**: Average query response time <100ms for relevant context
4. **Integration**: Steward tools successfully use RAG for enhanced error
   messages
5. **Maintainability**: New rules can be added without code changes, only data
   updates
6. **Documentation**: Complete API documentation and usage examples exist

---

## Future Enhancements

Consider after initial implementation:

- [ ] Multi-language support for rule descriptions
- [ ] Visual diagrams in embeddings (encode image + text)
- [ ] Contextual learning from user feedback on relevance
- [ ] Auto-generation of test cases from rules
- [ ] Integration with IDE extensions for real-time guidance
- [ ] Rule conflict detection and resolution
- [ ] Performance profiling integration (mark rule-compliant hot paths)
- [ ] Version tracking for rule evolution over time

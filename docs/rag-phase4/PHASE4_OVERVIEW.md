# Phase 4: Retrieval Pipeline Development

## Purpose

Phase 4 builds the **intelligence layer** that sits between the vector database (Phase 3) and the AI assistants. This is where we implement the logic that:

1. **Understands** what the developer/AI is asking for
2. **Decides** which collections and encoding types to search
3. **Retrieves** relevant rules from Qdrant
4. **Combines** results from multiple sources
5. **Formats** the context for AI consumption

---

## The Challenge

We have 360 embeddings across 5 collections with 6 encoding types each. The retrieval pipeline must:

- **Be smart about what to retrieve** - Don't dump all 360 embeddings into context
- **Understand query intent** - "How do I..." vs "What's wrong with..." need different encodings
- **Combine results intelligently** - Deduplicate, rank, and synthesize
- **Format for AI comprehension** - Clear, structured, actionable

---

## Phase 4 Steps

### Step 4.1: Multi-Collection Search

**Goal**: Search across multiple collections with intelligent routing and relevance scoring.

**What to Build:**

```typescript
type SearchConfig = Readonly<{
  collections: ReadonlyArray<string>
  encodingTypes: ReadonlyArray<EncodingType>
  limit: number
  scoreThreshold: number
}>

function searchRules(query: string) {
  return function searchRulesWithQuery(
    config: SearchConfig
  ): Promise<ReadonlyArray<SearchResult>> {
    // 1. Generate query embedding
    // 2. Search each collection
    // 3. Filter by score threshold
    // 4. Combine results
    // 5. Sort by relevance
  }
}
```

**Key Features:**
- Search multiple collections in parallel
- Filter by encoding type (e.g., only patterns + examples)
- Apply score threshold to filter low-relevance results
- Combine and deduplicate across collections
- Rank by relevance score

**Example Usage:**
```typescript
// Search for error handling patterns
const results = await searchRules("How do I handle errors")({
  collections: ["constitutional_rules", "functional_programming_rules"],
  encodingTypes: ["pattern", "example"],
  limit: 10,
  scoreThreshold: 0.7
})
```

---

### Step 4.2: Context Assembly

**Goal**: Take search results and assemble them into coherent context for AI.

**What to Build:**

```typescript
type AssembledContext = Readonly<{
  primaryRule: Rule
  relatedRules: ReadonlyArray<Rule>
  patterns: ReadonlyArray<Pattern>
  examples: ReadonlyArray<Example>
  antiPatterns: ReadonlyArray<AntiPattern>
  formattedContext: string
}>

function assembleContext(
  results: ReadonlyArray<SearchResult>
): AssembledContext {
  // 1. Group by rule_id
  // 2. Deduplicate (same rule, different encoding types)
  // 3. Rank by relevance
  // 4. Select primary rule (highest score)
  // 5. Select related rules
  // 6. Format for AI consumption
}
```

**Key Features:**
- **Deduplication**: Same rule appears once with all its encoding types
- **Grouping**: Related encodings grouped together
- **Ranking**: Most relevant rule first
- **Formatting**: Clear structure for AI to parse

**Output Format:**
```
PRIMARY RULE: const-004-no-exceptions (severity: blocking)

PRINCIPLE:
Exception throwing and try-catch blocks are prohibited in pure code...

CORRECT PATTERN:
// ✓ Use Result<T,E> for fail-fast error handling
function parseUserId(input: string): Result<UserId, ParseError> { ... }

EXAMPLE WITH CONTEXT:
Error as value makes error handling explicit, composable, and type-safe...

WHAT NOT TO DO:
// ✗ WRONG: Using exceptions
function parseUser(data: unknown): User {
  if (!data) throw new Error('Invalid data')
  ...
}

WHY IT'S WRONG:
1. Exceptions break referential transparency
2. Not tracked in type system
3. Implicit control flow
...

RELATED RULES:
- fp-003-total-functions: Use Result/Validation for totality
- ts-001-discriminated-unions: Result type definition
```

---

### Step 4.3: Query Understanding

**Goal**: Classify query intent to determine optimal retrieval strategy.

**What to Build:**

```typescript
type QueryIntent = 
  | { _tag: 'check', pattern: string }           // "Can I use classes?"
  | { _tag: 'fix', violation: string }           // "How to fix this loop?"
  | { _tag: 'explain', concept: string }         // "What are pure functions?"
  | { _tag: 'example', useCase: string }         // "Show me error handling"
  | { _tag: 'violation', code: string }          // Detected violation in code

function classifyQuery(query: string): QueryIntent {
  // Analyze query to determine intent
  // Use pattern matching on query structure
}

function determineRetrievalStrategy(
  intent: QueryIntent
): SearchConfig {
  // Map intent to optimal search configuration
}
```

**Intent-Based Retrieval:**

| Intent | Retrieve | Why |
|--------|----------|-----|
| **check** | principles + anti-patterns | Show rule + what not to do |
| **fix** | patterns + examples | Show correct way to do it |
| **explain** | principles + examples | Explain concept with context |
| **example** | examples + patterns | Show working code |
| **violation** | anti-patterns + counter-examples | Explain what's wrong + how to fix |

**Example:**
```typescript
const intent = classifyQuery("Can I use arrow functions?")
// Returns: { _tag: 'check', pattern: 'arrow functions' }

const strategy = determineRetrievalStrategy(intent)
// Returns: {
//   collections: ["syntax_rules"],
//   encodingTypes: ["principle", "antipattern", "counterexample"],
//   limit: 5,
//   scoreThreshold: 0.7
// }
```

---

### Step 4.4: Result Synthesis

**Goal**: Combine results from multiple encoding types into a coherent response.

**What to Build:**

```typescript
type SynthesizedResult = Readonly<{
  answer: string
  rules: ReadonlyArray<RuleReference>
  codeExamples: ReadonlyArray<CodeExample>
  citations: ReadonlyArray<Citation>
  confidence: number
}>

function synthesizeResults(
  intent: QueryIntent,
  context: AssembledContext
): SynthesizedResult {
  // 1. Prioritize encoding types based on intent
  // 2. Combine information from multiple encodings
  // 3. Format as clear answer
  // 4. Add citations to source rules
  // 5. Calculate confidence score
}
```

**Synthesis Strategy by Intent:**

**For "check" queries** (Can I use X?):
```
Answer: No, X is prohibited.

Rule: const-001-no-classes (blocking)
Principle: Classes are prohibited because...

Instead, use:
[Pattern code example]

Why X is wrong:
[Anti-pattern explanation]

Citation: const-001-no-classes (constitutional_rules)
```

**For "fix" queries** (How to fix X?):
```
Answer: Replace X with Y.

Correct pattern:
[Pattern code example]

Complete example:
[Example with context]

Why your current approach is wrong:
[Counter-example with learning points]

Citations: 
- const-003-no-loops (pattern)
- const-003-no-loops (example)
```

**For "explain" queries** (What is X?):
```
Answer: X is [principle explanation]

Why it matters:
[Context from example]

How to use it:
[Pattern code]

Common mistakes:
[Anti-pattern]

Citations:
- fp-001-pure-functions (principle)
- fp-001-pure-functions (example)
```

---

## Implementation Architecture

```
┌─────────────────────────────────────────┐
│         Developer/AI Query              │
│    "How do I handle errors?"            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Step 4.3: Query Understanding      │
│   - Classify intent: "explain"          │
│   - Extract concepts: "error handling"  │
│   - Determine strategy                  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    Step 4.1: Multi-Collection Search    │
│   - Search: constitutional_rules        │
│   - Search: functional_programming_rules│
│   - Search: typescript_rules            │
│   - Encoding types: principle, example  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Step 4.2: Context Assembly         │
│   - Group by rule_id                    │
│   - Deduplicate                         │
│   - Rank by relevance                   │
│   - Format for AI                       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Step 4.4: Result Synthesis         │
│   - Prioritize by intent                │
│   - Combine encodings                   │
│   - Format answer                       │
│   - Add citations                       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Formatted Response              │
│   "Use Result<T,E> for error handling   │
│    [principle] [pattern] [example]"     │
└─────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. Intent-Based Retrieval

Different query intents need different encoding types:
- **Learning** → principles + examples
- **Coding** → patterns + examples
- **Debugging** → anti-patterns + counter-examples
- **Verification** → anti-patterns + principles

### 2. Multi-Encoding Synthesis

A single rule has 6 encodings. Synthesis combines them intelligently:
- Start with principle (the "why")
- Show pattern (the "how")
- Provide example (the "when")
- Warn about anti-pattern (the "don't")

### 3. Relevance Scoring

Not all results are equally relevant:
- **Score > 0.85**: High confidence, use directly
- **Score 0.65-0.85**: Medium confidence, present for confirmation
- **Score < 0.65**: Low confidence, expand search or ask for clarification

### 4. Cross-Collection Intelligence

Some queries span multiple rule categories:
- "Error handling" → constitutional + functional_programming + typescript
- "Immutability" → constitutional + functional_programming + typescript
- "Function syntax" → syntax + functional_programming

Pipeline must search relevant collections and synthesize across them.

---

## Success Criteria for Phase 4

✅ **Phase 4 is successful when:**

1. **Query understanding** correctly classifies 95%+ of intents
2. **Multi-collection search** returns relevant results from all applicable collections
3. **Context assembly** produces coherent, non-redundant context
4. **Result synthesis** formats answers that AI can act on
5. **Performance** < 200ms for typical query (including Qdrant search)
6. **Accuracy** > 90% of queries get the right rules

---

## Implementation Approach

### Option A: TypeScript Implementation

Build retrieval pipeline in TypeScript:
- Integrates with existing codebase
- Type-safe throughout
- Can be used by Steward and other tools
- Requires Qdrant client library

### Option B: Python Implementation

Build retrieval pipeline in Python:
- Easier to prototype
- Rich ML/NLP libraries available
- Can be called from TypeScript via subprocess
- Faster iteration

### Option C: Hybrid

- Python for ML-heavy parts (query understanding, relevance scoring)
- TypeScript for integration (Steward, API)
- Communication via JSON API

**Recommendation**: Start with **Option B (Python)** for rapid prototyping, then port critical paths to TypeScript (Option C) for production.

---

## Next Steps

1. **Review Phase 3** - Verify all embeddings are working
2. **Design Phase 4 API** - Define interfaces for retrieval pipeline
3. **Implement query understanding** - Start with simple pattern matching
4. **Build multi-collection search** - Parallel search with result merging
5. **Create context assembly** - Deduplication and formatting
6. **Implement result synthesis** - Intent-based response generation

---

**Phase 3 is complete. Phase 4 is where the RAG system becomes intelligent!**

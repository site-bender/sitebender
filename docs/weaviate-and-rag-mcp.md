# Qdrant RAG System for Sitebender Studio

## The Challenge: Teaching AI to Write Haskell in TypeScript

Sitebender Studio is extraordinarily different from conventional web development. This document outlines how to use Qdrant with RAG (Retrieval-Augmented Generation) to help AI assistants understand and follow our unique architectural patterns.

## Core Problem

AI assistants have "muscle memory" from millions of conventional code examples:
- When they see arrays, they use `.map()` not `toolsmith/vanilla/array/map`
- When they see errors, they use `try/catch` not Validation monads
- When they see JSX, they assume React components, not data compilation
- When organizing code, they create barrel files automatically

Our codebase violates nearly every conventional pattern, making it essential to override these defaults.

## The Solution: "Pretend You're Writing Haskell in TypeScript"

This single instruction is the key mental model shift. When AIs think "Haskell", they naturally align with our patterns:

### Automatic Pattern Activation
```haskell
-- Haskell mindset triggers:
map f xs                    -- Not xs.map(f)
foldr (+) 0 xs             -- Not xs.reduce((a,b) => a+b, 0)
Either String Int           -- Not try/catch
Maybe a                     -- Not null/undefined
do notation                 -- Monadic composition
```

### Natural Rule Alignment
- **No classes** → Haskell has no classes
- **No mutations** → Everything immutable in Haskell
- **No loops** → Recursion and higher-order functions
- **Curried functions** → Haskell's default
- **Monadic error handling** → Either/Maybe/Validation
- **One function per file** → Like Haskell modules

## Weaviate Schema Design

### Core Classes

```typescript
const weaviateClasses = [
  {
    class: "CodePattern",
    properties: [
      { name: "pattern", dataType: ["text"] },
      { name: "library", dataType: ["text"] },
      { name: "category", dataType: ["text"] }, // "monad", "import", "function", "comment"
      { name: "example", dataType: ["text"] },
      { name: "antiExample", dataType: ["text"] },
      { name: "envoyMarkers", dataType: ["text[]"] },
      { name: "rule", dataType: ["text"] },
      { name: "rationale", dataType: ["text"] },
      { name: "haskellEquivalent", dataType: ["text"] }
    ]
  },
  {
    class: "ArchitecturalRule",
    properties: [
      { name: "rule", dataType: ["text"] },
      { name: "enforcement", dataType: ["text"] },
      { name: "violation", dataType: ["text"] },
      { name: "correction", dataType: ["text"] },
      { name: "wardenContract", dataType: ["boolean"] },
      { name: "priority", dataType: ["int"] } // 1-10 severity
    ]
  },
  {
    class: "LibraryIntegration",
    properties: [
      { name: "sourceLibrary", dataType: ["text"] },
      { name: "targetLibrary", dataType: ["text"] },
      { name: "dataFlow", dataType: ["text"] },
      { name: "example", dataType: ["text"] },
      { name: "constraints", dataType: ["text[]"] }
    ]
  },
  {
    class: "MonadicPattern",
    properties: [
      { name: "monadType", dataType: ["text"] }, // "Validation", "Result", "Maybe", "Task"
      { name: "operation", dataType: ["text"] }, // "map", "chain", "fold", "sequence"
      { name: "example", dataType: ["text"] },
      { name: "haskellEquivalent", dataType: ["text"] },
      { name: "errorHandling", dataType: ["text"] },
      { name: "accumulation", dataType: ["boolean"] }
    ]
  }
]
```

## Critical Knowledge to Index

### 1. Monadic Patterns (Priority 1)
```typescript
const validationPatterns = {
  "error_accumulation": "Use Validation, not Result, when collecting ALL errors",
  "happy_path": "valid(value) for success cases",
  "error_path": "invalid([error]) with NonEmptyArray",
  "sequencing": "validateAll for multiple validators on same value",
  "combining": "combineValidations for merging validation results"
}
```

### 2. Architectural Boundaries (Priority 1)
```typescript
const boundaries = {
  "arborist_only": "ONLY Arborist can import TypeScript compiler",
  "agent_only": "ONLY Agent can connect to external services",
  "no_barrels": "NEVER create barrel files or re-exports",
  "one_per_file": "ONE function per folder with index.ts",
  "privacy_folders": "Use underscore prefix for private functions"
}
```

### 3. Anti-Patterns (Priority 1)
```typescript
const antiPatterns = {
  "no_classes": "NEVER use classes or OOP",
  "no_loops": "Use toolsmith functions, not for/while",
  "no_mutations": "Everything immutable except seeded random",
  "no_arrow_exports": "Named functions only for exports",
  "no_jsx_runtime": "JSX compiles to data, not React components"
}
```

### 4. Progressive Enhancement (Priority 2)
```typescript
const progressiveLayers = {
  "layer1": "Pure HTML - must work in Lynx/Mosaic",
  "layer2": "CSS enhancement - visual improvements only",
  "layer3": "JavaScript - optional interactivity",
  "principle": "Core functionality NEVER requires JavaScript"
}
```

### 5. Library Integration Patterns (Priority 2)
```typescript
const integrationPatterns = {
  "pagewright_architect": "Pagewright for HTML, Architect adds reactivity",
  "custodian_agent": "Custodian for local state, Agent for distributed",
  "quarrier_auditor": "Quarrier generates, Auditor verifies",
  "arborist_envoy": "Arborist parses, Envoy documents"
}
```

## RAG Implementation Strategy

### Two-Layer Approach

#### Layer 1: Immediate Pattern Matching
- For each coding task, retrieve relevant patterns
- Weight anti-patterns 2x higher than positive patterns
- Include Haskell equivalents for mental model reinforcement

#### Layer 2: Continuous Reinforcement
- Keep core rules active in context at all times
- Re-inject rules after every code generation
- Validate output against patterns before presenting

### Pre-Processing Hook
```typescript
const preProcessing = async (task: string) => {
  // 1. Retrieve relevant patterns from Weaviate
  const patterns = await weaviate.query
    .get('CodePattern')
    .withNearText({ concepts: [task] })
    .withLimit(10)
    .do()
  
  // 2. Inject into context
  return `
    You are writing Haskell in TypeScript.
    For this task, remember:
    ${patterns.map(p => `- ${p.rule}: ${p.example}`).join('\n')}
    NEVER: ${patterns.map(p => p.antiExample).filter(Boolean).join(', ')}
  `
}
```

### Post-Processing Validation
```typescript
const validateCode = (code: string): ValidationResult => {
  const violations = []
  
  if (code.includes("class ")) violations.push("Contains classes")
  if (code.includes(".map(")) violations.push("Uses array methods")
  if (code.includes("try {")) violations.push("Uses try/catch")
  if (code.includes("=>")) violations.push("Uses arrow functions for exports")
  
  return violations.length > 0 
    ? { valid: false, violations }
    : { valid: true }
}
```

## System Prompt Template

```typescript
const systemPrompt = `
You are writing Haskell in TypeScript. Think like a Haskell programmer:

1. MENTAL MODEL: You're translating Haskell patterns to TypeScript
2. NO OOP: Would you use classes in Haskell? Never.
3. PURE FUNCTIONS: Everything is pure except explicit IO
4. MONADIC THINKING: Use Result/Validation/Maybe, not exceptions
5. ALGEBRAIC DATA TYPES: Tagged unions, not classes
6. CURRYING DEFAULT: All functions are curried
7. COMPOSITION OVER APPLICATION: Compose small functions

When you see:
- An array operation → Think: map, filter, fold from toolsmith
- Error handling → Think: Either/Validation monad
- State management → Think: State monad or immutable updates
- Async operations → Think: Task/IO monad
- Missing values → Think: Maybe monad

Remember: toolsmith IS your Prelude.
`
```

## Success Metrics

### Level 1: Basic Compliance (Must Have)
- No classes in generated code
- No array method calls
- No try/catch blocks
- Proper imports from toolsmith

### Level 2: Pattern Adoption (Should Have)
- Uses Validation monad for errors
- Functions are curried
- One function per file structure
- Envoy comment format

### Level 3: Native Fluency (Nice to Have)
- Composes functions naturally
- Chooses correct monad for context
- Follows privacy conventions
- Generates mathematically sound properties

## Implementation Checklist

### Phase 1: Foundation
- [ ] Install and configure Weaviate
- [ ] Create schema with four core classes
- [ ] Import rules/index.json patterns
- [ ] Index validation monad examples
- [ ] Index toolsmith function patterns

### Phase 2: Pattern Library
- [ ] Extract patterns from all toolsmith functions
- [ ] Document anti-patterns with corrections
- [ ] Create Haskell equivalence mappings
- [ ] Index Envoy comment examples
- [ ] Map library integration patterns

### Phase 3: Integration
- [ ] Set up MCP server for Weaviate
- [ ] Create pre-processing hooks
- [ ] Implement post-validation
- [ ] Configure vector similarity thresholds
- [ ] Test with real coding tasks

### Phase 4: Optimization
- [ ] Tune retrieval weights
- [ ] Add feedback loop for improvements
- [ ] Create pattern coverage metrics
- [ ] Build pattern suggestion system
- [ ] Monitor success rates

## Expected Outcomes

### With RAG Properly Configured:
1. **Initial resistance** will decrease from ~80% violations to ~20%
2. **Pattern adoption** will improve from 10% to 70% correct usage
3. **Correction cycles** will drop from 5-10 to 1-2 per task
4. **Complex compositions** will become possible with guidance

### Realistic Expectations:
- **Not perfect immediately** - Expect gradual improvement
- **Edge cases will challenge** - New patterns need new examples
- **Base model fights back** - Continuous reinforcement needed
- **Success requires patience** - Guide and correct consistently

## The Bottom Line

Your codebase is like asking someone to write Haskell when they've only known JavaScript. With:
- **The Haskell mental model** as foundation
- **Comprehensive RAG patterns** for guidance
- **Continuous reinforcement** of rules
- **Patient correction** when needed

AI assistants CAN learn to code the Sitebender way. The key is overwhelming them with correct patterns while explicitly blocking conventional ones.

---

_"We're not fighting syntax preferences - we're changing an entire mental model. That's hard, but not impossible."_
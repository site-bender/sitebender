---
description: Reference for querying MCP Qdrant servers - What to query and when
---

# MCP SERVER QUERY REFERENCE

**This is your reference for what MCP servers exist and what to query them for.**

---

## AVAILABLE MCP SERVERS

1. **constitutional_rules** - Architecture rules (no classes, no mutations, file structure)
2. **syntax_rules** - Syntax rules (named functions, naming conventions, full words)
3. **functional_programming_rules** - FP rules (pure functions, no loops, no exceptions, monads)
4. **formatting_rules** - Formatting rules (tabs, line length, encoding)
5. **jsx_rules** - JSX/Component rules (VirtualNode, data as configuration)
6. **typescript_rules** - TypeScript rules (branded types, discriminated unions, type-level programming)
7. **toolsmith_rules** - Toolsmith library usage patterns
8. **accessibility_rules** - Accessibility rules (semantic HTML, progressive enhancement)
9. **operator_substitutions** - Semantic function substitutions for operators

---

## HOW TO QUERY

Use the MCP tool with this pattern:

```
mcp__[server_name]__qdrant-find with parameter: { query: "search terms" }
```

Example:
```
mcp__functional_programming_rules__qdrant-find { query: "Result monad error handling" }
```

---

## QUERY GUIDE BY TASK TYPE

### When Implementing ANY Function

**ALWAYS query these:**

```
mcp__constitutional_rules__qdrant-find { query: "one function per file exports" }
mcp__constitutional_rules__qdrant-find { query: "no mutations immutable data" }
mcp__functional_programming_rules__qdrant-find { query: "pure functions no side effects" }
mcp__syntax_rules__qdrant-find { query: "named functions no arrow functions" }
mcp__syntax_rules__qdrant-find { query: "currying patterns" }
mcp__syntax_rules__qdrant-find { query: "naming conventions" }
mcp__operator_substitutions__qdrant-find { query: "semantic functions instead of operators" }
```

### When Implementing Error Handling

```
mcp__functional_programming_rules__qdrant-find { query: "Result monad fail fast" }
mcp__functional_programming_rules__qdrant-find { query: "Validation monad error accumulation" }
mcp__functional_programming_rules__qdrant-find { query: "no exceptions try catch throw" }
mcp__typescript_rules__qdrant-find { query: "ValidationError structure" }
mcp__typescript_rules__qdrant-find { query: "discriminated unions error types" }
```

### When Implementing Types

```
mcp__typescript_rules__qdrant-find { query: "branded types newtypes" }
mcp__typescript_rules__qdrant-find { query: "discriminated unions" }
mcp__typescript_rules__qdrant-find { query: "type guards predicates" }
mcp__typescript_rules__qdrant-find { query: "smart constructors" }
mcp__syntax_rules__qdrant-find { query: "type naming PascalCase" }
```

### When Implementing Components

```
mcp__jsx_rules__qdrant-find { query: "VirtualNode data structures" }
mcp__jsx_rules__qdrant-find { query: "component patterns" }
mcp__jsx_rules__qdrant-find { query: "data as configuration not React" }
mcp__jsx_rules__qdrant-find { query: "Props type patterns" }
mcp__accessibility_rules__qdrant-find { query: "semantic HTML components" }
mcp__accessibility_rules__qdrant-find { query: "progressive enhancement" }
```

### When Implementing Tests

```
mcp__functional_programming_rules__qdrant-find { query: "testing pure functions" }
mcp__functional_programming_rules__qdrant-find { query: "property based testing" }
mcp__syntax_rules__qdrant-find { query: "test file naming" }
mcp__syntax_rules__qdrant-find { query: "test organization" }
```

### When Working with Arrays/Iteration

```
mcp__functional_programming_rules__qdrant-find { query: "no loops map filter reduce" }
mcp__functional_programming_rules__qdrant-find { query: "array operations immutable" }
mcp__operator_substitutions__qdrant-find { query: "array methods semantic functions" }
mcp__toolsmith_rules__qdrant-find { query: "map reduce filter usage" }
```

### When Organizing Files/Folders

```
mcp__constitutional_rules__qdrant-find { query: "file structure one entity per folder" }
mcp__constitutional_rules__qdrant-find { query: "no barrel files imports" }
mcp__constitutional_rules__qdrant-find { query: "private helpers underscore prefix" }
mcp__syntax_rules__qdrant-find { query: "file naming index only" }
mcp__syntax_rules__qdrant-find { query: "folder naming camelCase PascalCase" }
```

### When Working with Async/IO

```
mcp__functional_programming_rules__qdrant-find { query: "IO boundaries side effects" }
mcp__functional_programming_rules__qdrant-find { query: "async Promise Result" }
mcp__functional_programming_rules__qdrant-find { query: "effect isolation" }
```

### When Naming Things

```
mcp__syntax_rules__qdrant-find { query: "naming conventions camelCase" }
mcp__syntax_rules__qdrant-find { query: "abbreviations full words" }
mcp__syntax_rules__qdrant-find { query: "predicate naming is has can" }
mcp__syntax_rules__qdrant-find { query: "curried function inner names With To For" }
```

### When Using Toolsmith Library

```
mcp__toolsmith_rules__qdrant-find { query: "common imports patterns" }
mcp__toolsmith_rules__qdrant-find { query: "operator substitutions" }
mcp__toolsmith_rules__qdrant-find { query: "monadic functions usage" }
```

---

## MANDATORY QUERIES FOR ALL TASKS

**These should ALWAYS be queried before writing ANY code:**

```
mcp__constitutional_rules__qdrant-find { query: "no classes pure functions only" }
mcp__constitutional_rules__qdrant-find { query: "no mutations immutable" }
mcp__functional_programming_rules__qdrant-find { query: "no loops" }
mcp__functional_programming_rules__qdrant-find { query: "no exceptions" }
mcp__syntax_rules__qdrant-find { query: "no arrow functions" }
```

---

## AFTER QUERYING

1. **Show the user what you retrieved:** Don't just query silently. Paste the actual results.

2. **Cite specific rules:** Don't say "I found some rules." Say "Rule X states: [exact quote]"

3. **Explain how you'll apply them:** Connect the rules to your implementation plan.

4. **Get confirmation:** Ask "Is this understanding correct?"

---

## EXAMPLE COMPLETE QUERY WORKFLOW

```
## MCP Research for [Task Name]

I detected this as an error handling task.

### Queries Performed:

1. Query: mcp__functional_programming_rules__qdrant-find { query: "Result monad fail fast" }

   Results: [paste actual results]

2. Query: mcp__functional_programming_rules__qdrant-find { query: "no exceptions try catch throw" }

   Results: [paste actual results]

[... all queries ...]

### Key Rules Retrieved:

1. **Never use try/catch/throw** (constitutional_rules)
   - Quote: "[exact quote from retrieval]"

2. **Use Result<ValidationError, T> for fail-fast** (functional_programming_rules)
   - Quote: "[exact quote from retrieval]"

[... all rules ...]

### How I Will Apply These Rules:

- I will return Result<ValidationError, T> instead of throwing exceptions
- I will use the `ok()` constructor for success
- I will use the `error()` constructor for failures
- I will not use try/catch unless wrapping external libraries

Is this correct?
```

---

## WHY YOU MUST QUERY MCP SERVERS

You have repeatedly:
- Made assumptions about patterns
- Violated constitutional rules
- Created code that doesn't match the codebase
- Ignored explicit instructions

The MCP servers contain the actual rules. Querying them:
- Gives you the exact rules to follow
- Prevents you from guessing
- Provides evidence of what you looked up
- Allows the user to correct misunderstandings

**USE THEM. EVERY TIME. BEFORE ANY CODE.**

# AI Assistant Development Guide for Studio

> **Write declarative TSX. Follow the rules. Everything else is automatic.**

## Core Philosophy for AI Development

Studio is designed for AI-first development. Every architectural decision optimizes for:
1. **Declarative patterns** that can't be misunderstood
2. **Strict functional programming** with no mutations
3. **Everything as data** - even behaviors and tests
4. **Rules enforced cryptographically** by Warden

As an AI assistant, you have ONE job: **Write declarative TSX that follows the rules.**

## The Golden Rules

### 1. NEVER Assume, ALWAYS Verify

```typescript
// ❌ WRONG - Assuming React patterns work
import { useState } from "react"  // NO! Studio has no React

// ✅ RIGHT - Using Studio's declarative approach
<Display>
  <From.Element selector="#counter" />
</Display>
```

### 2. Everything Is Declarative

```typescript
// ❌ WRONG - Imperative code
function handleClick() {
  const value = document.getElementById('input').value
  if (value > 10) {
    document.getElementById('result').textContent = value * 2
  }
}

// ✅ RIGHT - Declarative TSX
<Display id="result">
  <ShowIf>
    <IsGreaterThan>
      <Referent><From.Element selector="#input" /></Referent>
      <Comparand><From.Constant>10</From.Constant></Comparand>
    </IsGreaterThan>
    <Multiply>
      <From.Element selector="#input" />
      <From.Constant>2</From.Constant>
    </Multiply>
  </ShowIf>
</Display>
```

### 3. Use TodoWrite for Complex Tasks

Always use TodoWrite to track multi-step implementations:

```typescript
// When implementing a feature, FIRST create todos:
<TodoWrite>
  <Todo>Parse user requirements</Todo>
  <Todo>Check existing patterns in codebase</Todo>
  <Todo>Write declarative TSX components</Todo>
  <Todo>Add test scenarios</Todo>
  <Todo>Verify with Warden</Todo>
</TodoWrite>
```

### 4. One Function Per File, Always

```
✅ RIGHT:
libraries/toolsmith/src/arrays/map/index.ts      - Contains ONLY map function
libraries/toolsmith/src/arrays/filter/index.ts   - Contains ONLY filter function

❌ WRONG:
libraries/toolsmith/src/arrays/utils.ts          - Multiple functions
libraries/toolsmith/src/arrays.ts                - Barrel file
```

### 5. Tests Are Data Too

```tsx
// Tests are declarative JSX, not imperative code
<TestScenario name="Counter increments">
  <Setup>
    <Counter id="test" value={0} />
  </Setup>
  <Action>
    <Click target="#increment" />
  </Action>
  <Assertion>
    <ValueEquals target="#test" expected={1} />
  </Assertion>
</TestScenario>
```

## Component Patterns

### Data Collection (Forms)

**CRITICAL**: Think DATA TYPES, not widgets!

```tsx
// ❌ WRONG - Widget-focused
<Input type="radio" name="choice" />

// ✅ RIGHT - Data-focused
<ChooseOneField name="priority" of={["low", "medium", "high"]} />
// System decides: radio buttons (≤6 items) or select (>6 items)
```

### Reactive Calculations

```tsx
// Everything cascades automatically
<Display id="total">
  <Add>
    <Multiply>
      <From.Element selector="#price" />
      <From.Element selector="#quantity" />
    </Multiply>
    <Multiply>
      <From.Element selector="#price" />
      <From.Element selector="#quantity" />
      <From.Element selector="#taxRate" />
    </Multiply>
  </Add>
</Display>
```

### Distributed State (CRDTs)

```tsx
// Distributed counter with automatic conflict resolution
<DistributedCounter id="votes">
  <SyncWith.Peers interval={1000} />
  <PersistTo.LocalStorage />
</DistributedCounter>
```

### Event Handling

```tsx
// Declarative pub/sub
<Button>
  <Publishes event="click" as="user:action:save" />
  Save
</Button>

<Panel>
  <Subscribes to="user:action:*" then={<RefreshDisplay />} />
</Panel>
```

## Library Import Rules

### Direct Imports Only

```typescript
// ✅ RIGHT - Direct tree imports
import map from "@sitebender/toolsmith/arrays/map/index.ts"
import filter from "@sitebender/toolsmith/arrays/filter/index.ts"

// ❌ WRONG - Barrel imports
import { map, filter } from "@sitebender/toolsmith/arrays"
```

### Privacy Boundaries

```typescript
// ✅ RIGHT - Public function
import calculate from "@sitebender/architect/calculate/index.ts"

// ❌ WRONG - Private function (underscore = private)
import helper from "@sitebender/architect/calculate/_helper/index.ts"
```

## Common AI Mistakes to Avoid

### 1. Creating Classes

```typescript
// ❌ NEVER use classes
class UserService {
  getUser() { }
}

// ✅ ALWAYS use pure functions
export function getUser(id: string): User {
  // ...
}
```

### 2. Mutations

```typescript
// ❌ NEVER mutate
const arr = [1, 2, 3]
arr.push(4)  // MUTATION!

// ✅ ALWAYS create new
const arr = [1, 2, 3]
const newArr = [...arr, 4]
```

### 3. Loops

```typescript
// ❌ NEVER use loops
for (let i = 0; i < arr.length; i++) {
  // ...
}

// ✅ ALWAYS use functional methods
import map from "@sitebender/toolsmith/arrays/map/index.ts"
const result = map(transform)(arr)
```

### 4. Async Without Handling

```typescript
// ❌ NEVER ignore errors
const data = await fetch('/api')

// ✅ ALWAYS handle Both cases
const result = await fetch('/api')
if (isErr(result)) {
  // Handle error
} else {
  // Use result.right
}
```

## Testing Strategy

### Contract Testing

```tsx
<Contract library="@sitebender/formulator" provides="parser">
  <Invariant>Parse → Decompile → Parse preserves structure</Invariant>
  <PropertyTest with={<GenerateFormulas count={1000} />} />
</Contract>
```

### Integration Testing

```tsx
<IntegrationTest libraries={["architect", "formulator"]}>
  <Given formula="x * 2 + 1" />
  <When parsed={true} compiled={true} />
  <Then calculatesCorrectly={true} />
</IntegrationTest>
```

## Performance Measurement

```tsx
// Built into every operation
<Measure target="#calculation">
  <Latency percentiles={[50, 90, 99]} />
  <StoreTo triple-store="metrics" />
</Measure>
```

## Documentation Requirements

```typescript
//++ Describes what the function does (MANDATORY for exports)
export function calculate(x: number): number {
  //-- [OPTIMIZATION] Could use lookup table for common values
  return x * 2
}

//?? [EXAMPLE] calculate(5) // 10
//>> [RELATED] [Calculation docs](./docs/calc.md)
```

## Warden Enforcement

Everything you write is verified:

```typescript
// Warden checks:
// ✓ No barrel files
// ✓ One function per file
// ✓ No private imports across boundaries
// ✓ Named functions only
// ✓ Export on same line as declaration
// ✓ Proper Envoy comments
```

## Working with the Triple Store

```tsx
// Everything becomes queryable data
<StoreTo triple-store="events">
  <Event subject="user" predicate="clicked" object="button" />
</StoreTo>

// Query with SPARQL
<Query>
  {`
    SELECT ?user ?action
    WHERE {
      ?user performed ?action .
      ?action timestamp ?time .
      FILTER(?time > NOW() - "PT1H"^^xsd:duration)
    }
  `}
</Query>
```

## Quick Reference

### File Structure
```
src/
  functionName/
    index.ts         # Public function
    index.test.ts    # Test file
    _helper/         # Private helper
      index.ts
```

### Import Map
```typescript
"@sitebender/toolsmith/": "./libraries/toolsmith/src/"
"@sitebender/architect/": "./libraries/architect/src/"
// etc.
```

### Type Imports
```typescript
import type { Result } from "@sitebender/toolsmith/types/index.ts"
```

### Testing Commands
```bash
deno task test        # Run tests
deno task test:cov    # With coverage
deno task lint        # Lint check
deno task typecheck   # Type check
```

## Final Advice

1. **Read existing code first** - Patterns are consistent
2. **Use TodoWrite always** - Track your progress
3. **Test as you go** - Tests are data too
4. **Ask when uncertain** - Better to clarify than assume
5. **Follow the rules** - Warden will catch violations

Remember: Studio makes the complex simple through **declarative TSX**. Don't fight it with imperative patterns. Embrace the declarative paradigm and everything becomes trivial.

## When You Get Stuck

1. Check if there's an existing pattern in the codebase
2. Look for similar functionality in library READMEs
3. Verify your understanding with a simple test
4. Ask for clarification rather than guessing
5. Remember: If it feels complicated, you're doing it wrong

The Studio way is always simple, always declarative, always data.

# The Proximity Principle in Code

The proximity principle is a fundamental design concept: **related things should be close together, unrelated things should be apart**. In code, we use blank lines as visual separators to create logical groupings.

## Core Rules

### 1. No Blank Lines at Block Boundaries
Never put blank lines at the start or end of a block (`{}`, `()`, `[]`).

```typescript
// ❌ WRONG
function doSomething() {

  const x = 5
  return x

}

// ✅ CORRECT
function doSomething() {
  const x = 5

  return x
}
```

### 2. Multi-line Statements Need Space
Any statement spanning multiple lines needs a blank line above and below.

```typescript
// ❌ WRONG
const x = 5
const config = {
  name: "test",
  value: 42,
  enabled: true
}
const y = 10

// ✅ CORRECT
const x = 5

const config = {
  name: "test",
  value: 42,
  enabled: true
}

const y = 10
```

### 3. Different Statement Types Need Separation
Put a blank line when the statement type changes.

```typescript
// ❌ WRONG
const x = 5
const y = 10
if (x > y) {
  console.log("x is bigger")
}
return x

// ✅ CORRECT
const x = 5
const y = 10

if (x > y) {
  console.log("x is bigger")
}

return x
```

### 4. Functions Need Breathing Room
Blank line above and below functions, but NOT between the Envoy comment and function.

```typescript
// ❌ WRONG
const x = 5
//++ Does something important

function doSomething() {
  return 42
}
const y = 10

// ✅ CORRECT
const x = 5

//++ Does something important
function doSomething() {
  return 42
}

const y = 10
```

### 5. Import Ordering and Spacing

Imports must be in this specific order, with blank lines between each group:

```typescript
// 1. Type imports from external libraries
import type { Request, Response } from "https://deno.land/std/http/mod.ts"

// 2. Type imports from internal sources
import type { User, Product } from "../types/index.ts"

// 3. Named imports from external libraries
import { assertEquals, assertThrows } from "https://deno.land/std/assert/mod.ts"

// 4. Constants imports from external libraries
import { HTTP_STATUS } from "https://deno.land/std/http/status.ts"

// 5. Default imports from external libraries
import express from "npm:express"

// 6. Named imports from internal sources
import { validateUser, formatDate } from "../utils/index.ts"

// 7. Constants imports from internal sources
import { MAX_RETRIES, DEFAULT_TIMEOUT } from "../constants/index.ts"

// 8. Default imports from internal sources
import processRequest from "../handlers/processRequest/index.ts"
```

### 6. Help Comments Need Space
Envoy help comments (`//??`) need a blank line before them.

```typescript
//++ Calculates the factorial of a number
function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1)
}

//?? [EXAMPLE] factorial(5) // returns 120
```

## Why This Matters

Visual structure should mirror logical structure. When you look at code, your brain instantly groups things based on proximity. We leverage this automatic process to make code easier to understand:

- **Grouped constants** tell you "these are all the configuration values"
- **Separated statement types** tell you "now we're doing something different"
- **Spaced multi-line blocks** tell you "this is a complex unit, treat it as one thing"
- **Organized imports** tell you "here's what we depend on, organized by origin and type"

## Common Patterns

### Test Files
```typescript
import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import functionToTest from "./index.ts"

Deno.test("functionToTest", async function testFunctionToTest(t) {
  await t.step("handles basic case", function testBasic() {
    const input = "test"
    const expected = "TEST"

    assertEquals(functionToTest(input), expected)
  })

  await t.step("handles edge case", function testEdge() {
    const input = ""
    const expected = ""

    assertEquals(functionToTest(input), expected)
  })
})
```

### Production Files
```typescript
import type { Config } from "../types/index.ts"

import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"

import { MAX_SIZE } from "../constants/index.ts"

import processItem from "./processItem/index.ts"

//++ Processes a list of items according to config
export default function processItems(config: Config) {
  const items = config.items
  const threshold = config.threshold || MAX_SIZE

  const filtered = filter((item: any) => item.size < threshold)(items)

  const processed = map(processItem)(filtered)

  return processed
}
```

## Remember

- **Never more than one blank line in a row**
- **Group like with like**
- **Separate unlike with a blank line**
- **Visual structure = logical structure**

This isn't about aesthetics or personal preference. It's about reducing cognitive load by making the code's structure instantly visible to the brain.

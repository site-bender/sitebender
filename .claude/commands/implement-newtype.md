---
description: Implement a new branded type (newtype) following ALL constitutional rules
---

# MANDATORY: Pre-Implementation Checklist

Before implementing ANY newtype, you MUST complete these steps IN ORDER:

## Step 1: Query MCP Servers for Rules

Query these servers and SHOW THE USER what rules you retrieved:

1. **Functional Programming Rules:**
   - Query: "no loops map filter reduce"
   - Query: "Result monad error handling no exceptions"
   - Query: "immutability no mutations"

2. **Syntax Rules:**
   - Query: "named functions no arrow functions"
   - Query: "naming conventions"

3. **Operator Substitutions:**
   - Query: "semantic functions operators"

## Step 2: Read Reference Implementation

Read the MOST RECENT completed newtype implementation as a reference (check NEWTYPES_IMPLEMENTATION_CHECKLIST.md for the last completed type).

## Step 3: Present Rules to User

SHOW THE USER the key rules you will follow:
- NO for/while loops → use reduce/map/filter/findIndex
- NO arrow functions → use named function declarations
- NO mutations (let, .push(), .pop()) → use const, spread, filter
- NO .replace(), .map(), .filter(), .reduce() → use the curried and lifted Toolsmith functions
- NO try/catch/throw → use Result monad
- Use semantic functions (isEqual not ===, length(arr) not arr.length) from Toolsmith

## Step 4: Implement Following Rules

Write the code following ALL retrieved rules.

## Step 5: Self-Verify BEFORE Presenting

Check your code for violations:
- ❌ `for (` or `while (`
- ❌ `=>` (arrow functions)
- ❌ `let ` declarations (except in generators with [OPTIMIZATION] comment)
- ❌ `.push()`, `.pop()`, `.shift()`, `.unshift()`
- ❌ `.replace()`, `.map()`, `.filter()`, `.reduce()`, etc.
- ❌ `try`, `catch`, `throw`
- ❌ `===`, `!==` → use isEqual, isUnequal
- ❌ `!condition` → use not(condition)
- ❌ `.length` → use length(arr)

If you find ANY violations, FIX THEM before presenting code to the user.

## Step 6: Run Tests

Run tests with `deno test` and ensure all pass.

---

**CRITICAL**: Do NOT skip any step. Do NOT present code with constitutional violations. If you violate rules, you wasted everyone's time and must rewrite everything.

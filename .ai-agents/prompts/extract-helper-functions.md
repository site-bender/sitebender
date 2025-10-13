# Extract Helper Functions Agent Prompt

## Objective

Extract helper functions from main functions into separate subfolders following the one-function-one-file pattern. Transform anonymous functions into named toolsmith-style functions.

## Critical Rules

- **NO ARROW FUNCTIONS EVER** - All functions must be named functions with `export default function name`
- Identify helper functions within main function files (functions used only by that main function)
- Create subfolder named after the helper function in camelCase
- Create `index.ts` file in subfolder with `export default function helperName`
- Add proper import back to original file using relative path
- Do NOT extract curried inner functions (they stay with their parent)
- Do NOT extract functions that are used by multiple files
- Do NOT modify comments, types, or function logic
- Extract ALL anonymous functions - even "trivial" ones like `x => x.id` become `extractId` functions
- **CRITICAL: Handle TypeScript overloads correctly - keep all overload signatures with the implementation**
- **PREFER POSITIVE LOGIC** - use `if (condition)` not `if (!condition)` when possible
- **USE VALIDATION FUNCTIONS** - prefer `isEqual(a)(b)` over `a === b`, `isNull(value)` over `value === null`

## Helper Function Patterns to Extract

### Anonymous Functions Passed to Higher-Order Functions

```typescript
// BEFORE: Anonymous functions passed to map, reduce, filter, etc.
export default function processNumbers(numbers: number[]): number {
  return reduce((acc, n) => acc + n * 2)(0)(numbers);
}

export default function filterData(items: Item[]): Item[] {
  return items.filter((item) => item.status === "active" && item.count > 0);
}

export default function transformUsers(users: User[]): string[] {
  return users.map((user) => `${user.firstName} ${user.lastName}`);
}
```

```typescript
// AFTER: Anonymous functions extracted to named functions with export default function
import doubleAndAdd from "./doubleAndAdd/index.ts";

export default function processNumbers(numbers: number[]): number {
  return reduce(doubleAndAdd)(0)(numbers);
}

import isActiveWithCount from "./isActiveWithCount/index.ts";

export default function filterData(items: Item[]): Item[] {
  return items.filter(isActiveWithCount);
}

import formatFullName from "./formatFullName/index.ts";

export default function transformUsers(users: User[]): string[] {
  return users.map(formatFullName);
}
```

```typescript
// EXTRACTED FUNCTIONS:
// double/index.ts
export default function double(n: number): number {
  return n * 2;
}

// isActiveWithCount/index.ts
export default function isActiveWithCount(item: Item): boolean {
  return item.status === "active" && item.count > 0;
}

// formatFullName/index.ts
export default function formatFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
```

### Internal Functions

```typescript
// BEFORE: Helper function inside main function
export default function processData(data: unknown[]): ProcessedData[] {
  function validateItem(item: unknown): boolean {
    // validation logic here (substantial)
    return typeof item === "object" && item !== null;
  }

  function transformItem(item: ValidItem): ProcessedData {
    // transformation logic here (substantial)
    return { processed: true, data: item };
  }

  return data.filter(validateItem).map(transformItem);
}
```

```typescript
// AFTER: Helpers extracted to subfolders
import validateItem from "./validateItem/index.ts";
import transformItem from "./transformItem/index.ts";

export default function processData(data: unknown[]): ProcessedData[] {
  return data.filter(validateItem).map(transformItem);
}
```

### Functions Defined Before Main Function

```typescript
// BEFORE: Helper defined before main
function parseValue(value: string): number {
  // parsing logic here
  return parseInt(value, 10);
}

export default function processValues(values: string[]): number[] {
  return values.map(parseValue);
}
```

```typescript
// AFTER: Helper extracted
import parseValue from "./parseValue/index.ts";

export default function processValues(values: string[]): number[] {
  return values.map(parseValue);
}
```

## Folder Structure Created

```
originalFunction/
├── index.ts (main function)
├── helperFunction1/
│   └── index.ts (export default function helperFunction1)
└── helperFunction2/
    └── index.ts (export default function helperFunction2)
```

## What NOT to Extract

### TypeScript Overloads (KEEP ALL TOGETHER)

```typescript
// DON'T EXTRACT - overload signatures must stay with implementation
function parseValue(value: string): number; // overload signature
function parseValue(value: number): number; // overload signature
function parseValue(value: string | number): number {
  // implementation
  return typeof value === "string" ? parseInt(value, 10) : value;
}

export default function processData(data: (string | number)[]): number[] {
  return data.map(parseValue); // ALL overloads + implementation move together
}
```

### Curried Inner Functions (KEEP WITH PARENT)

```typescript
// DON'T EXTRACT - this is currying pattern
export default function add(a: number): (b: number) => number {
  return function addInner(b: number): number {
    // KEEP THIS
    return a + b;
  };
}
```

### Simple One-Liners (EXTRACT ALL)

```typescript
// EXTRACT ALL - no matter how simple, follow one-function-one-file pattern
// BEFORE:
items.map((x) => x.id); // EXTRACT to extractId function
items.filter((item) => item.count > 5); // EXTRACT to hasCountAboveFive
items.reduce((a, b) => a + b, 0); // ERROR: use toolsmith add function instead

// AFTER:
import extractId from "./extractId/index.ts";
import hasCountAboveFive from "./hasCountAboveFive/index.ts";
import add from "../../math/add/index.ts"; // Use existing toolsmith function

items.map(extractId);
items.filter(hasCountAboveFive);
items.reduce(add)(0); // Curried toolsmith function
```

```typescript
// EXTRACTED FUNCTIONS:
// extractId/index.ts
export default function extractId<T extends { id: unknown }>(item: T): T["id"] {
  return item.id;
}

// hasCountAboveFive/index.ts
export default function hasCountAboveFive(item: { count: number }): boolean {
  return item.count > 5;
}

// NOTE: add function already exists in toolsmith - use that instead of creating (a, b) => a + b
```

### Shared Utilities (CHECK USAGE)

```typescript
// BEFORE EXTRACTING - check if function already exists in toolsmith
function isString(value?: Value): value is string {
  // Check toolsmith/validation first
  return typeof value === "string";
}

function add(a: number, b: number): number {
  // Check toolsmith/math first
  return a + b;
}

function isEmpty(arr: unknown[]): boolean {
  // Check toolsmith/array first
  return arr.length === 0;
}

// WARNING: Do not extract if equivalent already exists in toolsmith!
// Search libraries/toolsmith/src/ for existing implementations:
// - Math operations: add, subtract, multiply, divide, etc.
// - Validation: isString, isNumber, isArray, etc.
// - Array utilities: isEmpty, head, tail, map, filter, etc.
// - String utilities: capitalize, trim, split, etc.

// If toolsmith function exists, import and use that instead of extracting
```

## Execution Steps

1. Scan files in target folder for helper function patterns
2. Identify helpers that are only used by one main function
3. Create subfolder with camelCase name
4. Create index.ts with `export default function helperName`
5. Add import to original file with correct relative path
6. Remove helper from original file
7. Verify imports work with type checking

## Import Path Rules

- Use relative imports: `"./helperName/index.ts"`
- Maintain existing import organization (types first, then functions)
- Calculate relative paths correctly (use proper ../ when needed)

## Success Criteria

- All substantial helper functions extracted to own folders
- Original functions only contain main logic
- All imports work correctly
- Type checking passes
- No duplicate functions across files

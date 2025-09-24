# Envoy Advanced Comments Prompt

## Objective

Add meaningful Envoy comments to code that already has basic `//++` descriptions and `//?? [EXAMPLE]` blocks. This requires understanding the code and exercising judgment about what deserves documentation.

## CRITICAL RULE: RESTRAINT

**DO NOT OVERDO IT**. Only add comments that provide real value:
- A genuine gotcha that would surprise developers
- A critical performance consideration
- An important architectural decision
- A non-obvious link to related functionality
- Actual technical debt that needs addressing

If it's obvious from the code or not particularly important, **DON'T ADD A COMMENT**.

## Comment Types to Consider

### 1. Help Comments (`//?? [CATEGORY]`)

Add these ONLY when genuinely helpful. Categories:

**[GOTCHA]** - Non-obvious behavior that will trip people up
```typescript
//++ Checks if value is negative number (excludes -0 and -Infinity)
export default function isNegative(value: unknown): boolean {
  // implementation
}

//?? [GOTCHA] Returns false for -0 since JavaScript considers it neither positive nor negative
```

**[PRO]** - Significant advantage worth highlighting
```typescript
//++ Safely parses JSON without throwing errors
export default function safeParseJson(str: string): object | null {
  // implementation
}

//?? [PRO] Returns null instead of throwing, making it safe for pipeline operations
```

**[CON]** - Important limitation users should know
```typescript
//++ Converts object to JSON string with sorted keys
export default function stringify(obj: object): string {
  // implementation
}

//?? [CON] Performance overhead from sorting keys may be significant for large objects
```

**[MIGRATION]** - Only if replacing a common pattern
```typescript
//++ Curried equality check using Object.is semantics
export default function is<T>(a: T) {
  return function isSameAs<U>(b: U): boolean {
    return Object.is(a, b)
  }
}

//?? [MIGRATION] Replaces direct Object.is(a, b) usage. Usage: is(expected)(actual)
```

### 2. Reference Links (`//>>`)

Add ONLY for non-obvious but important connections:

```typescript
//++ Implements the Y combinator for recursive anonymous functions
export default function Y(f: Function): Function {
  // implementation
}

//>> [CANONICAL] [Y Combinator](https://en.wikipedia.org/wiki/Fixed-point_combinator)
```

**DO NOT add links for:**
- Common JavaScript methods (everyone knows Array.sort)
- Basic functional concepts (currying, composition)
- Internal toolsmith functions (unless critical relationship)

### 3. Tech Debt (`//--`)

Document ONLY significant existing debt, not minor issues:

```typescript
export default function sortByKey([a]: [string, unknown], [b]: [string, unknown]): number {
  //-- [REFACTOR] Should be curried but Array.sort expects (a,b) => number signature
  return a.localeCompare(b)
}
```

Categories: `[WORKAROUND]`, `[LIMITATION]`, `[OPTIMIZATION]`, `[REFACTOR]`, `[COMPATIBILITY]`

**Must include:**
- WHY it's debt
- OUTLINE of fix (if possible)

### 4. Critical Issues (`//!!`)

Use SPARINGLY for actual blockers:

```typescript
//!! [INCOMPLETE] Missing support for Temporal.ZonedDateTime - blocks timezone features
export default function toPlainDate(value: unknown): Temporal.PlainDate | null {
  // implementation
}
```

Categories: `[SECURITY]`, `[PERFORMANCE]`, `[CORRECTNESS]`, `[INCOMPLETE]`, `[BREAKING]`

## What NOT to Document

### DON'T State the Obvious

```typescript
// BAD - Obvious from function name and signature
//++ Adds two numbers
export default function add(a: number) {
  return function addTo(b: number): number {
    return a + b
  }
}
//?? [PRO] Can be partially applied  // NO! Obvious from curried signature

// GOOD - Only document if needed
//++ Adds two numbers
export default function add(a: number) {
  return function addTo(b: number): number {
    return a + b
  }
}
// No additional comments needed - function is self-explanatory
```

### DON'T Document Standard Patterns

```typescript
// BAD - Standard FP pattern
//++ Composes two functions
export default function compose(f: Function) {
  return function composeWithF(g: Function) {
    return function composed(x: any): any {
      return f(g(x))
    }
  }
}
//?? [PRO] Enables function composition  // NO! That's what compose does
//>> [RELATED] [Function composition](...)  // NO! Too basic

// GOOD - No extra comments needed
//++ Composes two functions
export default function compose(f: Function) {
  return function composeWithF(g: Function) {
    return function composed(x: any): any {
      return f(g(x))
    }
  }
}
```

### DON'T Add Noise

```typescript
// BAD - Too much commentary
//++ Validates if value is a string
export default function isString(value: unknown): value is string {
  //-- [OPTIMIZATION] Could cache type check results  // NO! Premature optimization
  return typeof value === 'string'
}
//?? [PRO] Type guard narrows TypeScript types  // NO! That's what type guards do
//?? [CON] Only checks primitive strings  // NO! Obvious from implementation

// GOOD - Keep it simple
//++ Validates if value is a string
export default function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

## Examples of GOOD Advanced Comments

### Example 1: Genuine Gotcha
```typescript
//++ Finds last index of item in array using Object.is equality
export default function lastIndexOf<T>(item: T) {
  return function findLastIndexOf(array: ReadonlyArray<T>): number | undefined {
    // implementation
  }
}

//?? [GOTCHA] Returns undefined (not -1) when not found, unlike native Array.lastIndexOf
```

### Example 2: Important Performance Note
```typescript
//++ Deep clones an object including nested structures
export default function deepClone<T>(obj: T): T {
  // complex implementation
}

//?? [CON] O(n) memory usage for deeply nested structures
//?? [GOTCHA] Doesn't handle circular references - will stack overflow
```

### Example 3: Meaningful Tech Debt
```typescript
export default function toPlainDateTime(value: unknown): Temporal.PlainDateTime | null {
  //-- [LIMITATION] Falls back to current date for time-only strings. Need explicit time parser
  if (isTimeOnlyString(value)) {
    const today = Temporal.Now.plainDateISO()
    // workaround implementation
  }
}
```

## Process

1. **Read and understand** what the function actually does
2. **Identify** any non-obvious behavior, limitations, or gotchas
3. **Consider** if it's worth documenting (would it help someone?)
4. **Add sparingly** - when in doubt, don't add
5. **Use correct format** - proper Envoy syntax with categories in [BRACKETS]

## Remember

- Less is more
- Only document what's not obvious
- Focus on helping future developers avoid problems
- Don't document standard patterns or obvious behavior
- Quality over quantity - one good [GOTCHA] is worth more than ten obvious [PRO]s

# Toolkit Functions Needed for Full FP Compliance

## Critical Missing Functions

### Array Operations

1. **forEach** - Need a functional forEach alternative
   - Files affected: 9+ files in scripts/
   - Current workaround: Use map with side effects or keep loops
   - Priority: HIGH

2. **push/append** - Need immutable append function
   - Files affected: 20+ files in scripts/
   - Current workaround: Use spread operator [...arr, item] or concat
   - Priority: HIGH

### String Operations

All critical string operations are available:
- ✅ split
- ✅ trim, trimStart, trimEnd
- ✅ replace, replaceAll
- ✅ contains (for includes)
- ✅ test (for regex)

### Object/Set Operations

1. **Set.has()** - Need functional Set operations
   - Files affected: Limited usage
   - Current workaround: Convert to array or keep native
   - Priority: LOW

## Files Blocked by Missing Functions

### Blocked by missing forEach:
- scripts/enforceImports/index.ts (multiple uses)
- scripts/sortImports/sortFileImports/sortImports/index.ts
- scripts/findUnformatted/index.ts
- scripts/tests/enforce-imports/index.test.ts
- scripts/integrity/runAll/index.test.ts

### Blocked by missing push/append:
- scripts/analyzeFiles/index.ts
- scripts/enforceImports/index.ts (multiple uses)
- scripts/enforceImports/aliasGuards/helpers/findViolations/index.ts
- scripts/findUnformatted/index.ts
- scripts/enforceNoReactJunk/index.ts
- scripts/sortImports/sortFileImports/extractImports/index.ts
- scripts/sortImports/sortFileImports/sortImports/index.ts

## Recommended Implementation

### forEach Alternative
```typescript
// Option 1: Use map with side effects (not ideal but functional)
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"

// Instead of: arr.forEach(fn)
// Use: map(fn)(arr)

// Option 2: Create a forEach function in toolkit
export function forEach<T>(fn: (item: T, index: number) => void) {
  return function(array: Array<T>): void {
    for (let i = 0; i < array.length; i++) {
      fn(array[i], i)
    }
  }
}
```

### append/push Alternative
```typescript
// Option 1: Use concat (already exists)
import concat from "@sitebender/toolkit/vanilla/array/concat/index.ts"

// Instead of: arr.push(item)
// Use: concat([item])(arr)

// Option 2: Create an append function in toolkit
export function append<T>(item: T) {
  return function(array: Array<T>): Array<T> {
    return [...array, item]
  }
}
```

## Priority Actions

1. **Immediate**: Document these gaps for The Architect
2. **Short-term**: Use existing workarounds where possible (concat, spread)
3. **Long-term**: Add forEach and append to toolkit for cleaner code

## Notes

- TypeScript's forEachChild from compiler API cannot be replaced
- Some async iteration (for await...of) must remain for Deno APIs
- Native methods on external objects (like Deno.* methods) are acceptable
# createElement Implementation Notes

## Date: 2025-10-26

## Toolsmith Fixes Required

### 1. Property Access Function / Lens

**Currently missing:** Safe property access function or lens implementation

**Current workaround in `_processChild`:**
```ts
if (isObject(child) && "_tag" in child) {
  const tagged = child as { _tag: unknown }
  if (tagged._tag === "element" || tagged._tag === "text" || tagged._tag === "comment") {
    return child as ElementConfig
  }
}
```

**Desired approach:**
```ts
// With property access function
const tagValue = getProperty("_tag")(child)
if (includes(tagValue)(["element", "text", "comment"])) {
  return child as ElementConfig
}

// Or with lens
const tagLens = lens("_tag")
const tagValue = view(tagLens)(child)
if (includes(tagValue)(["element", "text", "comment"])) {
  return child as ElementConfig
}
```

**Implementation needed:**
- `getProperty(key: string) => (obj: object) => value | undefined`
- Or full lens implementation: `lens`, `view`, `set`, `over`
- Should be curried and return Result/Validation monads
- Located in `@sitebender/toolsmith/object/` or `@sitebender/toolsmith/optics/`

### 2. flatMap Function Needs Updating

**Current state** (`@sitebender/toolsmith/src/array/flatMap/index.ts`):
- Only handles `ReadonlyArray<T>` input
- Always returns `Result<ValidationError, ReadonlyArray<U>>`
- Does not handle `Result` or `Validation` input types

**Required behavior** (matching `map` pattern):
```ts
// Should support three overloads like map does:

// 1. Array → Array (plain arrays)
function flatMap<T, U>(fn: (element: T) => ReadonlyArray<U>)(
  array: ReadonlyArray<T>
): ReadonlyArray<U>

// 2. Result → Result (fail-fast)
function flatMap<T, U>(fn: (element: T) => ReadonlyArray<U>)(
  array: Result<ValidationError, ReadonlyArray<T>>
): Result<ValidationError, ReadonlyArray<U>>

// 3. Validation → Validation (error accumulation)
function flatMap<T, U>(fn: (element: T) => ReadonlyArray<U>)(
  array: Validation<ValidationError, ReadonlyArray<T>>
): Validation<ValidationError, ReadonlyArray<U>>
```

**Implementation notes:**
- Follow same pattern as `map` function
- Use `isArray`, `isOk`, `isSuccess` to determine input type
- Delegate to internal helpers: `_flatMapArray`, `_flatMapToResult`, `_flatMapToValidation`
- Use `chainResults` and `chainValidations` for monadic operations
- Use `array.flatMap(fn)` internally ([EXCEPTION] allowed for native array method)

### 3. isNotNull Predicate

**Status:** ✅ COMPLETED

**Location:** `@sitebender/toolsmith/src/predicates/isNotNull/index.ts`

**Implementation:**
```ts
export default function isNotNull<T>(value: T | null): value is T {
  return not(isNull(value))
}
```

This predicate is now available for use in `filter` operations.

### 4. toUpper Function Enhancement (Optional)

**Current location:** `@sitebender/toolsmith/src/string/toCase/toUpper/index.ts`

**Current implementation:**
- Uses `str.toLocaleUpperCase()` (locale-aware, good!)
- Returns input unchanged if not string (defensive)

**Potential enhancement for pagewright:**
- Consider adding a dedicated `toUpperAscii` that uses `str.toUpperCase()` for HTML tag names
- HTML spec requires ASCII uppercase for tag names, not locale-specific
- Or document that `toUpper` is acceptable for our use case

## Constitutional Rule Clarifications

### 1. Inner Function Naming Convention

**RULE:** Inner curried functions are named after what they **CARRY** (the enclosed value), not their parameter.

**Correct pattern:**
```ts
function createElement(component: Component | string) {
  return function createElementWithComponent(props: Props | null) {
    return function createElementWithComponentAndProps(
      ...children: ReadonlyArray<Child>
    ): ElementConfig {
      // Implementation uses: component, props, children
    }
  }
}
```

**Why:**
- The parameter is visible in the signature
- The enclosed/carried value is hidden - naming it makes the closure's purpose clear
- Enables traceability in stack traces

### 2. Default Export with Underscore for Private Functions

**RULE:**
- Public functions: `export default function publicFunction`
- Private functions: `export default function _privateFunction` (underscore in function name AND file/folder name)

**Import pattern:**
```ts
// Public function
import createElement from "./createElement/index.ts"

// Private function (underscore in path AND import name)
import _processChildren from "./createElement/_processChildren/index.ts"
```

### 3. Allowed Exceptions

**Rest parameters:** `...children` is ALLOWED for function parameters
**Object spread:** `{ ...props }` is ALLOWED (creates new object, doesn't mutate)
**typeof operator:** `typeof value === "string"` is ALLOWED for type checking
**Array.isArray():** Use Toolsmith `isArray` predicate instead
**String methods:** Use Toolsmith `toUpper` instead of `.toUpperCase()`

### 4. Validation vs Result

**Processing createElement children is PARALLEL, not serial:**
- Children are independent - one child's error shouldn't stop processing others
- We want to accumulate ALL errors for comprehensive feedback
- **Use Validation monad exclusively** for error accumulation
- flatMap should return Validation when processing children

## Implementation Strategy

### 1. Type Definitions First

Create types in `/libraries/pagewright/src/types/`:
- `Component` - function or string
- `Props` - attributes object
- `Child` - string | number | ElementConfig | array | null | undefined | boolean
- `ElementConfig` - discriminated union with `_tag`
- `TextConfig` - text node config
- `CommentConfig` - comment node config

### 2. Main createElement Function

File: `/libraries/pagewright/src/createElement/index.ts`

Responsibilities:
1. Curry the function correctly with proper inner function names
2. Process children using Toolsmith functions (no loops!)
3. Determine if component is function or string using Toolsmith predicates
4. Delegate to appropriate helper functions
5. Return Validation monad for error handling

### 3. Helper Functions (All with underscore prefix)

- `_processChildren` - Map over children array, accumulate errors
- `_processChild` - Handle single child (string → text, number → text, etc.)
- `_createElementConfig` - Build element config from tagName + props + children
- `_createTextConfig` - Build text node config from string
- `_callComponent` - Call component function with merged props
- `_flattenChildren` - Flatten nested arrays (uses flatMap)

### 4. Error Handling

All processing should return `Validation<ValidationError, T>`:
- Invalid component type → Validation.failure
- Invalid child type → Validation.failure
- Null/undefined/boolean children → skip (filter out)
- Accumulate all errors for comprehensive feedback

## Performance Considerations

**Current implementation:** Using boxed Toolsmith functions (map, filter, flatMap)
- These return monads for error handling
- Appropriate for application-level code (pagewright is application library)
- Performance overhead acceptable for config generation (not hot path)

**Future optimization (if needed):**
- Profile first, measure impact
- Could use vanilla Toolsmith functions for internal helpers
- Document with [PERFORMANCE_OVER_IDEOLOGY] comment
- Only optimize if benchmarks show significant impact

## Testing Strategy

1. **Happy path:** Valid components, valid children, proper nesting
2. **Error cases:** Invalid component types, invalid children, nested errors
3. **Edge cases:** Empty children, null/undefined, deeply nested arrays
4. **Monadic behavior:** Validation accumulation works correctly

## Open Questions

1. **Should we validate HTML nesting rules in createElement?**
   - Example: `<a>` cannot contain another `<a>`
   - Or defer to separate linting pass?

2. **How to handle component CSS/JS tracking?**
   - createElement should add CSS/JS links to head config
   - Need global state or pass through context?

3. **Namespace handling for SVG/MathML?**
   - Add `namespace` parameter?
   - Auto-detect from tagName?

## Related Documentation

- `/docs/pagewright-discussion.md` - Full architecture discussion
- MCP constitutional_rules - File structure, one function per file
- MCP syntax_rules - Naming conventions, currying patterns
- MCP functional_programming_rules - Monads, immutability, composition

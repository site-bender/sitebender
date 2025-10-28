# createElement Implementation Notes

## Date: 2025-10-28 (Updated after VirtualNode refactoring)

## VirtualNode Refactoring - COMPLETE

**Date completed:** 2025-10-28

All `ElementConfig` references replaced with `VirtualNode`. Type now lives in Toolsmith for reuse across all Sitebender libraries (Architect, Custodian, Operator, Pagewright).

## Toolsmith Enhancements Used

### 1. Property Access with getTag

**✅ COMPLETE:** Property access uses Toolsmith's `getTag` function

**Implementation in `_processChild`:**
```ts
import getTag from "@sitebender/toolsmith/object/getTag/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

if (isObject(child) && "_tag" in child) {
  const tagged = child as { _tag: string }
  const tagResult = getTag(tagged)
  const tag = getOrElse("")(tagResult)
  const isValidTag = includes(ELEMENT_TYPES)(tag as typeof ELEMENT_TYPES[number])

  if (isValidTag) {
    return child as VirtualNode
  }
}
```

### 2. flatMap Function

**✅ COMPLETE:** flatMap fully implemented in Toolsmith with three overloads:
- `ReadonlyArray<T> → ReadonlyArray<U>` - Plain arrays
- `Result<Array<T>> → Result<Array<U>>` - Fail-fast monadic
- `Validation<Array<T>> → Validation<Array<U>>` - Error accumulation monadic

All overloads tested and working. createElement uses plain array overload.

### 3. isNotNullish Predicate

**Status:** ✅ AVAILABLE

**Location:** `@sitebender/toolsmith/src/predicates/isNotNullish/index.ts`

**Usage in createElement:**
Used in `_convertAttributeEntry` to filter out null and undefined attribute values:
```ts
import isNotNullish from "@sitebender/toolsmith/predicates/isNotNullish/index.ts"

if (isNotNullish(value)) {
  return { ...accumulator, [key]: String(value) }
}
```

### 4. toUpper Function

**Status:** ✅ WORKS CORRECTLY

**Location:** `@sitebender/toolsmith/src/string/toCase/toUpper/index.ts`

**Current implementation:**
- Uses `str.toLocaleUpperCase()` (locale-aware)
- Works correctly for HTML tag names in createElement

**Usage in `_createVirtualNode`:**
```ts
import toUpper from "@sitebender/toolsmith/string/toCase/toUpper/index.ts"

return {
  _tag: "element" as const,
  tagName: toUpper(tagName),  // "div" → "DIV"
  attributes,
  children,
}
```

**Note:** HTML tag names are ASCII-only, so locale-aware uppercasing is fine for this use case.

## Constitutional Rule Compliance

### 1. Inner Function Naming Convention - ✅ FOLLOWED

**RULE:** Inner curried functions are named after what they **CARRY** (the enclosed value), not their parameter.

**Implementation in createElement:**
```ts
function createElement(component: Component) {
  return function createElementWithComponent(props: Props | null) {
    return function createElementWithComponentAndProps(
      ...children: ReadonlyArray<Child>
    ): VirtualNode {
      // Uses: component, props, children
    }
  }
}
```

All curried functions in createElement follow this pattern.

### 2. Default Export with Underscore - ✅ FOLLOWED

**Implementation:**
- ✅ Public: `export default function createElement`
- ✅ Private: `export default function _processChildren` (underscore in name AND path)

All helper functions follow this convention.

### 3. Documented Exceptions - ✅ ALL DOCUMENTED

**Used and documented with [EXCEPTION] comments:**
- ✅ Rest parameters: `...children`
- ✅ Object spread: `{ ...props }`, `{ ...accumulator }`
- ✅ typeof operator: `typeof child === "boolean"`
- ✅ Property access: `"_tag" in child`
- ✅ as const: `as const` for literal type narrowing
- ✅ Uncurried callbacks: Functions passed to reduce/map/filter are uncurried to match native Array API

**Avoided (using Toolsmith instead):**
- ✅ Uses `isArray` instead of `Array.isArray()`
- ✅ Uses `toUpper` instead of `.toUpperCase()`
- ✅ Uses `isString`, `isNumber`, `isObject` instead of typeof checks where possible

### 4. Uncurried Callbacks Exception - NEW RULE CLARIFICATION

**RULE:** Functions passed to Array operations (reduce, map, filter, flatMap) should be **uncurried** to match the native Array method signatures these Toolsmith functions wrap.

**Rationale:**
- Toolsmith Array functions are thin wrappers around native methods
- Native methods expect callbacks like `(acc, item) => result`, not `(acc) => (item) => result`
- Fighting this creates unnecessary wrapper functions
- Pragmatic approach: don't fight the platform

**Example in createElement:**
```ts
// _convertAttributeEntry is uncurried
function _convertAttributeEntry(
  accumulator: Readonly<Record<string, string>>,
  entry: readonly [string, unknown],
): Readonly<Record<string, string>> {
  // Implementation
}

// Used directly with reduce
const result = reduce(_convertAttributeEntry)({})(entries)
```

**Previous mistake:** Initially wrote `_convertAttributeEntry` as curried, then created pointless `_reduceAttributes` wrapper to uncurry it. This was unnecessary complexity.

### 5. Error Handling Strategy

**Current implementation:**
- Uses error configs instead of monads for graceful degradation
- Invalid children become error nodes in the config tree
- Errors preserved in output for debugging/linting
- No exceptions thrown - pure functional error handling

**Future consideration:**
- Could add Validation monad for error accumulation if needed
- Current approach works well for createElement's use case

## Implementation Status

### 1. Type Definitions - ✅ COMPLETE

**Location:** `/libraries/pagewright/src/types/index.ts`

All types implemented:
- ✅ `Component` - function or string
- ✅ `Props` - attributes object with optional children
- ✅ `Child` - string | number | VirtualNode | array | null | undefined | boolean
- ✅ `VirtualNode` - discriminated union with `_tag` (element, text, comment, error)

### 2. Main createElement Function - ✅ COMPLETE

**File:** `/libraries/pagewright/src/createElement/index.ts`

All requirements met:
- ✅ Properly curried with correct inner function names
- ✅ Uses Toolsmith functions (map, flatMap, reduce, predicates)
- ✅ Uses Toolsmith predicates (isFunction, isString)
- ✅ Delegates to helper functions
- ✅ Pure functional error handling via error configs

### 3. Helper Functions - ✅ ALL COMPLETE

All implemented with underscore prefix and placed at lowest common ancestor:
- ✅ `_processChildren` - Maps and flattens children array
- ✅ `_processChild` - Handles single child type discrimination
- ✅ `_flattenChild` - Recursively flattens nested arrays (in _processChildren/ subfolder)
- ✅ `_createVirtualNode` - Builds element config (triple-curried)
- ✅ `_createErrorConfig` - Builds error config (triple-curried, at top level - used by createElement and _processChild)
- ✅ `_createTextConfig` - Builds text node config (in _processChild/ subfolder)
- ✅ `_createCommentConfig` - Builds comment node config (not yet used)
- ✅ `_callComponent` - Calls component function with props
- ✅ `_convertAttributeEntry` - Converts attribute entry to string (uncurried for reduce)

### 4. Error Handling - ✅ IMPLEMENTED

**Current approach:**
- Invalid children become error configs (not filtered out)
- Errors preserved in tree for debugging
- Graceful degradation - no crashes
- No exceptions thrown

## Performance Considerations

**Current implementation:**
- Uses Toolsmith predicates and array functions (map, flatMap, reduce)
- Pure functional approach with immutable data structures
- Performance overhead acceptable for config generation (not hot path)
- No premature optimization

**Benchmarking:**
- Profile before optimizing
- Measure impact of any changes
- Document performance exceptions if needed

## Testing Status - ✅ COMPLETE

All test categories implemented:
1. ✅ **Happy path:** Valid components, children, nesting - all tested
2. ✅ **Error cases:** Invalid types, nulls, booleans - all become error configs
3. ✅ **Edge cases:** Empty children, deeply nested arrays - all tested
4. ✅ **Property-based:** All helpers have fast-check property tests
5. ✅ **Integration:** createElement integration tests cover all scenarios

## Design Decisions Made

1. **HTML validation deferred to linting:**
   - createElement does not validate HTML nesting rules
   - Separate linting pass can provide better error messages
   - Keeps createElement fast and focused

2. **CSS/JS tracking deferred:**
   - createElement does not track component dependencies
   - Separate traversal function can collect dependencies from config tree
   - Avoids global state or context threading

3. **Namespace support deferred:**
   - VirtualNode has optional `namespace` field
   - Auto-detection from tagName can be added later
   - Not blocking current implementation

## Next Steps

1. **Update jsx-runtime.ts** to use new createElement
2. **Implement renderToString** for HTML generation
3. **Implement renderToDom** for browser rendering
4. **Add linting/validation** as separate pass
5. **Implement dependency tracking** as separate traversal

## Related Documentation

- `/docs/pagewright-discussion.md` - Full architecture discussion
- MCP constitutional_rules - File structure, one function per file
- MCP syntax_rules - Naming conventions, currying patterns
- MCP functional_programming_rules - Monads, immutability, composition

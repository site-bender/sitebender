# createElement Implementation Summary

## Date: 2025-10-27

## What Was Implemented

### 1. Type Definitions

**Location:** `/libraries/architect/src/types/`

All types use `readonly` and `ReadonlyArray` for immutability:

- **Component** (`Component/index.ts`):
  - Union: function or string
  - Functions take Props and return VirtualNode

- **Props** (`Props/index.ts`):
  - Record with optional children
  - All keys/values readonly

- **Child** (`Child/index.ts`):
  - Union: string | number | VirtualNode | array | null | undefined | boolean
  - Supports nested arrays for flexibility

- **VirtualNode** (`VirtualNode/index.ts`):
  - Discriminated union with `_tag` field
  - Three variants: "element", "text", "comment"
  - All fields readonly

### 2. Helper Functions

**Location:** `/libraries/architect/src/createElement/`

All helper functions follow constitutional rules:

- Default exports with underscore prefix in name
- Properly curried with descriptive inner function names
- Pure functions (no mutations, no side effects)
- Use Toolsmith predicates and array functions

**Implemented helpers:**

- **`_createTextConfig`** - Creates text node config from string (used by _processChild)
- **`_createCommentConfig`** - Creates comment node config from string (not yet used)
- **`_createVirtualNode`** - Creates element config (curried: tagName → attributes → children)
- **`_createErrorConfig`** - Creates error config (curried: code → message → received)
- **`_callComponent`** - Calls component function with props
- **`_processChild`** - Processes single child (string→text, filter nulls, etc.)
- **`_processChildren`** - Processes array of children (map, flatten, filter)
- **`_flattenChild`** - Flattens single child item (recursively processes arrays, wraps configs)
- **`_convertAttributeEntry`** - Converts single attribute entry to string (uncurried for reduce)

### 3. Main createElement Function

**Location:** `/libraries/architect/src/createElement/index.ts`

**Signature:**

```ts
function createElement(component: Component) {
  return function createElementWithComponent(props: Props | null) {
    return function createElementWithComponentAndProps(
      ...children: ReadonlyArray<Child>
    ): VirtualNode
  }
}
```

**Behavior:**

1. Processes children recursively (inside-out)
2. If component is function: calls it with merged props + children
3. If component is string: creates element config with uppercase tagName
4. Invalid component: returns error element config for graceful degradation

**Constitutional Compliance:**

- ✅ Properly curried with correct inner function naming
- ✅ Default export
- ✅ Pure function
- ✅ Uses Toolsmith predicates (`isFunction`, `isString`)
- ✅ No loops (uses `map`, `flatMap`, `filter`)
- ✅ No mutations (object spread creates new objects)
- ✅ Documented exceptions (rest parameters, object spread, typeof)

## Known Issues & Limitations

### 1. Attribute Value Conversion

**Current behavior:**

- All attribute values converted to strings with `String(value)`
- No validation or special handling for different value types

**Potential issues:**

- Boolean attributes (e.g., `disabled`, `checked`) should be handled specially
- Objects/arrays stringified as `[object Object]` or comma-separated

**Future enhancement:**

- Add `_convertAttributeValue` helper
- Handle booleans (true→"" or attribute name, false→remove)
- Handle arrays (join with space for class names, etc.)
- Validate against allowed values for specific attributes

### 2. No HTML Validation

**Current behavior:**

- createElement accepts any tagName
- createElement accepts any attribute names/values
- No nesting validation (e.g., `<a>` inside `<a>`)

**Rationale:**

- Validation deferred to separate linting pass
- Keeps createElement fast and simple
- Linting can provide better error messages with full context

**Future:**

- Separate `lintVirtualNode` function
- Validates against HTML spec
- Returns Validation with accumulated errors

### 3. No CSS/JS Tracking

**Current behavior:**

- createElement does not track component CSS/JS dependencies
- No head config manipulation

**Design decision needed:**

- How to track which components were used?
- Global mutable Set? (violates FP rules)
- Thread through context parameter?
- Separate traversal pass to collect dependencies?

**Suggested approach:**

- Separate `collectDependencies` function
- Traverses VirtualNode tree
- Returns array of CSS/JS paths needed
- renderToString adds these to head

### 4. No Namespace Support

**Current behavior:**

- No `namespace` parameter
- All elements created in HTML namespace

**Future enhancement:**

- Add optional `namespace` parameter to Props
- Auto-detect from tagName? (e.g., "svg" → SVG namespace)
- Pass through to `_createVirtualNode`

## Testing Status

**✅ Implemented and complete:**

1. **Unit tests for all helpers:**
   - ✅ `_processChild/_createTextConfig/index.test.ts` - text node creation
   - ✅ `_createCommentConfig/index.test.ts` - comment node creation
   - ✅ `_createVirtualNode/index.test.ts` - element config with uppercase
   - ✅ `_createErrorConfig/index.test.ts` - error config creation
   - ✅ `_callComponent/index.test.ts` - component function calling
   - ✅ `_processChild/index.test.ts` - all child types (string, number, null, array, etc.)
   - ✅ `_processChildren/index.test.ts` - nested arrays, filtering, flattening
   - ✅ `_processChildren/_flattenChild/index.test.ts` - array flattening and config wrapping
   - ✅ `_convertAttributeEntry/index.test.ts` - uncurried attribute conversion for reduce

2. **Integration tests for createElement:**
   - ✅ `createElement/index.test.ts` - all integration scenarios
   - Simple elements, props, children, nesting
   - Component functions
   - Deeply nested arrays
   - Mixed children types
   - Invalid inputs

3. **Property-based tests:**
   - ✅ All helper functions have property-based tests using fast-check
   - ✅ Tests cover immutability, type safety, error handling
   - 🔲 Roundtrip testing (JSX → config → HTML → parse) - requires renderToString implementation
   - 🔲 Idempotence testing - can be added as enhancement

## Integration Points

### JSX Transform Configuration

**Deno config (deno.jsonc):**

```json
{
	"compilerOptions": {
		"jsx": "react-jsx",
		"jsxImportSource": "@sitebender/architect"
	}
}
```

**JSX runtime file:**

- Location: `/libraries/architect/src/jsx-runtime.ts`
- Exports: `jsx`, `jsxs`, `Fragment`
- These call `createElement` internally

**Current status:** jsx-runtime.ts exists but needs updating to use new createElement

### Component Usage

**Before (incorrect - doesn't exist yet):**

```tsx
import { createElement } from "@sitebender/architect"

function MyComponent({ title }: { title: string }) {
	return createElement("h1")(null)(title)
}
```

**After (with JSX):**

```tsx
function MyComponent({ title }: { title: string }) {
	return <h1>{title}</h1>
}
```

JSX transform automatically converts to `createElement("h1")({ title })()` calls.

## Next Steps

### Immediate (Required for Basic Functionality):

1. **Update jsx-runtime.ts**
   - Import new createElement
   - Implement jsx/jsxs/Fragment
   - Handle key/ref props (if needed)

2. **Write comprehensive tests**
   - ✅ Unit tests for all helpers - COMPLETE
   - ✅ Integration tests for createElement - COMPLETE
   - ✅ Edge cases and error handling - COMPLETE

3. **Update existing components**
   - Thousands of components need migration
   - Each should return VirtualNode
   - May need migration script

### Short-term (For Production Readiness):

4. **Implement renderToString**
   - Traverse VirtualNode tree
   - Generate HTML string
   - Escape content properly
   - Handle void elements (no closing tag)

5. **Implement renderToDom**
   - Use DOM APIs (createElement, createTextNode, etc.)
   - Attach properties (for behaviors)
   - Handle namespaces (SVG, MathML)

6. **Add HTML linting/validation**
   - Validate tag names
   - Validate nesting rules
   - Validate attributes
   - Return Validation with all errors

7. **Implement CSS/JS dependency tracking**
   - Decide on architecture
   - Collect dependencies during traversal
   - Generate head config with links

### Long-term (Enhancements):

8. **Schema.org components**
   - ~1000 components for structured data
   - Generate JSON-LD from component tree
   - Automatic SEO metadata

9. **Performance optimization**
   - Profile createElement performance
   - Consider vanilla Toolsmith functions for hot paths
   - Benchmark against baseline

10. **Developer tooling**
    - VS Code extension for validation
    - Config → JSX decompiler
    - Visual tree inspector

## Files Created

```
/libraries/architect/src/
  types/
    index.ts                                    # All type exports
  createElement/
    index.ts                                    # Main function
    index.test.ts                               # Integration tests
    NOTES.md                                    # Implementation notes
    IMPLEMENTATION_SUMMARY.md                   # This file
    constants/
      index.ts                                  # ELEMENT_TYPES constant
    _createCommentConfig/
      index.ts                                  # Comment config creator (not yet used)
      index.test.ts
    _createVirtualNode/
      index.ts
      index.test.ts
    _createErrorConfig/
      index.ts                                  # Error config creator
      index.test.ts
    _callComponent/
      index.ts
      index.test.ts
    _convertAttributeEntry/
      index.ts                                  # Uncurried for use with reduce
      index.test.ts
    _processChild/
      index.ts
      index.test.ts
      _createTextConfig/                        # Used only by _processChild
        index.ts
        index.test.ts
    _processChildren/
      index.ts
      index.test.ts
      _flattenChild/                            # Used only by _processChildren
        index.ts
        index.test.ts
```

## Constitutional Rule Compliance

**Verification checklist:**

- ✅ No classes
- ✅ No mutations (all `const`, `readonly`, `ReadonlyArray`)
- ✅ No loops (uses `map`, `flatMap`, `filter`)
- ✅ No exceptions/try-catch (returns configs, not throws)
- ✅ One function per file
- ✅ Pure functions (except documented I/O boundaries)
- ✅ No arrow functions (uses `function` keyword)
- ✅ All functions curried (except callbacks for reduce/map/filter which are uncurried)
- ✅ Default exports
- ✅ Private functions prefixed with underscore
- ✅ Inner functions named after carried values
- ✅ Uses Toolsmith predicates (`isString`, `isFunction`, etc.)
- ✅ Documented exceptions ([EXCEPTION] comments)

**Allowed exceptions used:**

- Rest parameters (`...children`)
- Object spread (`{ ...props }`)
- `typeof` operator (for type checking)
- Property access checks (`"_tag" in child`)
- `as const` (for literal type narrowing)
- Uncurried callbacks for reduce/map/filter (matches native Array API)

All exceptions are documented with `[EXCEPTION]` comments explaining why they're necessary.

## Conclusion

The createElement function is **fully implemented, comprehensively tested, and constitutional-compliant**.

**Status:**

- ✅ All helper functions implemented
- ✅ All functions follow constitutional rules (curried, pure, immutable, no loops, no exceptions)
- ✅ Comprehensive test coverage with unit and property-based tests
- ✅ All exceptions properly documented with [EXCEPTION] comments
- ✅ Uses Toolsmith predicates and functions throughout
- 🔲 jsx-runtime.ts needs updating to use new createElement
- 🔲 renderToString/renderToDom need implementation
- 🔲 CSS/JS dependency tracking needs architecture decision

The architecture is sound, follows all FP rules strictly, and provides a solid, well-tested foundation for the Architect library.

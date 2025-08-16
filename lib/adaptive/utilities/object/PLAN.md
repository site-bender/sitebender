# Object Utilities Audit and Improvement Plan

## Current State Analysis

### Existing Functions
1. **omit** - Creates object without specified keys
2. **pick** - Creates object with only specified keys  
3. **path** - Retrieves nested value using dot notation
4. **pathOr** - Retrieves nested value with default fallback

### Initial Observations

#### ✅ Strengths
- All functions are properly curried
- Type-safe with TypeScript generics
- Basic JSDoc comments present
- Tests exist for all functions

#### ⚠️ Issues Found

### 1. **omit**
- ✅ Properly curried: `(keys) => (obj) => result`
- ⚠️ JSDoc is minimal, needs @curried notation and more examples
- ⚠️ No edge case documentation (empty keys, undefined obj)
- ⚠️ Should handle prototype pollution protection

### 2. **pick**
- ✅ Properly curried: `(keys) => (obj) => result`
- ⚠️ JSDoc is minimal, needs @curried notation and more examples
- ⚠️ No edge case documentation
- ⚠️ Should handle undefined/null objects gracefully

### 3. **path**
- ✅ Properly curried: `(pathStr) => (obj) => result`
- ⚠️ JSDoc doesn't mention array path support (code shows only string)
- ⚠️ No @curried notation
- ⚠️ Edge cases not documented (empty path, null objects)
- ❌ Doesn't support array syntax despite example suggesting it

### 4. **pathOr**
- ✅ Properly curried: `(path) => (or) => (source) => result`
- ✅ Supports both string and array paths
- ⚠️ JSDoc needs @curried notation
- ⚠️ Complex implementation could be simplified
- ⚠️ Recursion might cause stack overflow on very deep paths
- ⚠️ Uses unnecessary dependencies (head, isDefined, isUndefined, not)

## Proposed Improvements

### 1. Documentation Enhancements
- Add comprehensive JSDoc with @curried notation to all functions
- Include property-based test documentation (@property)
- Add edge case examples
- Document performance characteristics

### 2. Function Improvements

#### **omit**
- Add prototype pollution protection
- Handle undefined/null objects gracefully
- Add support for deep omit (nested paths)

#### **pick**
- Handle undefined/null objects gracefully
- Add support for deep pick (nested paths)
- Consider adding pickBy (predicate-based picking)

#### **path**
- Simplify implementation
- Add array path support properly
- Handle edge cases better
- Consider memoization for repeated path access

#### **pathOr**
- Simplify implementation (remove unnecessary dependencies)
- Optimize recursion or convert to iteration
- Better type inference

### 3. New Functions to Add

#### **merge** / **mergeDeep**
- Shallow and deep object merging
- Handle circular references

#### **mapKeys** / **mapValues**
- Transform object keys or values

#### **invert**
- Swap keys and values

#### **groupBy**
- Group array of objects by key

#### **keyBy**
- Create object from array using key function

#### **defaults** / **defaultsDeep**
- Fill in undefined properties with defaults

#### **has** / **hasPath**
- Check if property exists

#### **set** / **setPath**
- Immutably set nested value

#### **update** / **updatePath**
- Immutably update nested value with function

#### **entries** / **fromEntries**
- Curried versions of Object methods

#### **keys** / **values**
- Curried versions with type safety

### 4. Testing Improvements
- Add property-based tests for all functions
- Test edge cases comprehensively
- Add performance benchmarks for deep operations
- Ensure 100% code coverage

### 5. Type Safety Improvements
- Better type inference for nested paths
- Strict null checking
- Path autocomplete support (template literal types)

## Implementation Priority

1. **High Priority** (Core functionality)
   - Fix and enhance existing functions (omit, pick, path, pathOr)
   - Add comprehensive JSDoc
   - Fix path array support issue

2. **Medium Priority** (Common use cases)
   - Add merge/mergeDeep
   - Add has/hasPath
   - Add set/setPath
   - Add mapValues/mapKeys

3. **Low Priority** (Nice to have)
   - Add remaining utility functions
   - Performance optimizations
   - Advanced type features

## Testing Strategy

1. **Behavioral Tests**
   - Test what functions do, not how
   - Cover all documented behaviors
   - Test edge cases explicitly

2. **Property-Based Tests**
   - Idempotency where applicable
   - Composition laws
   - Type preservation
   - Immutability verification

3. **Performance Tests**
   - Deep nesting scenarios
   - Large object handling
   - Memory usage verification

## Success Criteria
- [ ] All functions have comprehensive JSDoc with @curried notation
- [ ] All functions handle edge cases gracefully
- [ ] 100% test coverage achieved
- [ ] Property-based tests for mathematical properties
- [ ] No type errors or warnings
- [ ] Consistent parameter order (data-last)
- [ ] All functions are pure and immutable
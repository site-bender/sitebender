# Set - Operation Functions

**Location**: `src/vanilla/set/`
**Functions**: 15
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### add
- **Current**: `(element: T) => (set: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set with element added; creates singleton Set if input is null/undefined/non-Set)
- **Description**: [REFACTOR] Adds an element to a Set immutably by creating new Set from original and adding element
- **Target**: `(element: T) => (set: Set<T>) => Result<SetError, Set<T>>`

### delete (exported as deleteElement — do we need a `del` alias?)
- **Current**: `(element: T) => (set: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set with element removed; returns empty Set if input is null/undefined/non-Set)
- **Description**: [REFACTOR] Deletes an element from a Set immutably by creating new Set from original and deleting element; named deleteElement because delete is reserved keyword
- **Target**: `(element: T) => (set: Set<T>) => Result<SetError, Set<T>>`

### has
- **Current**: `(element: T) => (set: Set<T> | null | undefined) => boolean`
- **Returns**: boolean (false if input is null/undefined/non-Set)
- **Description**: [REFACTOR] Checks if a Set contains a specific element; returns false for invalid input
- **Target**: `(element: T) => (set: Set<T>) => Result<SetError, boolean>`

### union
- **Current**: `(set2: Set<T> | null | undefined) => (set1: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set containing all unique elements from both sets)
- **Description**: [REFACTOR] Returns union of two Sets; uses native Set.union if available (ES2025), otherwise uses spread operator; handles null/undefined gracefully
- **Target**: `(set2: Set<T>) => (set1: Set<T>) => Result<SetError, Set<T>>`

### unionWith
- **Current**: `(equals: (a: T, b: T) => boolean) => (set2: Set<T> | null | undefined) => (set1: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set with custom equality comparison)
- **Description**: [REFACTOR] Returns union using custom equality function; filters set2 elements that don't equal any in set1
- **Target**: `(equals: (a: T, b: T) => boolean) => (set2: Set<T>) => (set1: Set<T>) => Result<SetError, Set<T>>`

### intersection
- **Current**: `(set2: Set<T> | null | undefined) => (set1: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set containing only common elements)
- **Description**: [REFACTOR] Returns intersection of two Sets; uses native Set.intersection if available (ES2025), otherwise iterates over smaller set for efficiency
- **Target**: `(set2: Set<T>) => (set1: Set<T>) => Result<SetError, Set<T>>`

### intersectionWith
- **Current**: `(comparator: (a: T, b: T) => boolean) => (set2: Set<T> | null | undefined) => (set1: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set with custom equality comparison)
- **Description**: [REFACTOR] Returns intersection using custom comparator; filters set1 elements that match any in set2 via comparator
- **Target**: `(comparator: (a: T, b: T) => boolean) => (set2: Set<T>) => (set1: Set<T>) => Result<SetError, Set<T>>`

### difference
- **Current**: `(subtrahend: Set<T> | null | undefined) => (minuend: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set with elements in minuend but not in subtrahend)
- **Description**: [REFACTOR] Returns set difference (minuend - subtrahend); uses native Set.difference if available (ES2025), otherwise filters elements not in subtrahend
- **Target**: `(subtrahend: Set<T>) => (minuend: Set<T>) => Result<SetError, Set<T>>`

### differenceWith
- **Current**: `(comparator: (a: T, b: T) => boolean) => (subtrahend: Set<T> | null | undefined) => (minuend: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set with custom equality comparison)
- **Description**: [REFACTOR] Returns set difference using custom comparator; filters minuend elements that don't match any in subtrahend via comparator
- **Target**: `(comparator: (a: T, b: T) => boolean) => (subtrahend: Set<T>) => (minuend: Set<T>) => Result<SetError, Set<T>>`

### symmetricDifference
- **Current**: `(setB: Set<T> | null | undefined) => (setA: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set with elements in either set but not both)
- **Description**: [REFACTOR] Returns symmetric difference (elements in A or B but not both); uses native Set.symmetricDifference if available (ES2025), otherwise combines filtered arrays
- **Target**: `(setB: Set<T>) => (setA: Set<T>) => Result<SetError, Set<T>>`

### symmetricDifferenceWith
- **Current**: `(equals: (a: T, b: T) => boolean) => (set2: Set<T> | null | undefined) => (set1: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (new Set with custom equality comparison)
- **Description**: [REFACTOR] Returns symmetric difference using custom equality; combines elements unique to each set based on custom comparator
- **Target**: `(equals: (a: T, b: T) => boolean) => (set2: Set<T>) => (set1: Set<T>) => Result<SetError, Set<T>>`

### isSubsetOf
- **Current**: `(superset: Set<T> | null | undefined) => (subset: Set<T> | null | undefined) => boolean`
- **Returns**: boolean (true if every element in subset exists in superset)
- **Description**: [REFACTOR] Checks if subset is a subset of superset; empty set is subset of any set; uses native Set.isSubsetOf if available (ES2025); includes size optimization
- **Target**: `(superset: Set<T>) => (subset: Set<T>) => Result<SetError, boolean>`

### isSupersetOf
- **Current**: `(subset: Set<T> | null | undefined) => (superset: Set<T> | null | undefined) => boolean`
- **Returns**: boolean (true if superset contains all elements in subset)
- **Description**: [REFACTOR] Checks if superset is a superset of subset; any set is superset of empty set; uses native Set.isSupersetOf if available (ES2025); includes size optimization
- **Target**: `(subset: Set<T>) => (superset: Set<T>) => Result<SetError, boolean>`

### isDisjointFrom
- **Current**: `(set2: Set<T> | null | undefined) => (set1: Set<T> | null | undefined) => boolean`
- **Returns**: boolean (true if sets have no common elements)
- **Description**: [REFACTOR] Checks if two sets are disjoint (no common elements); empty sets are disjoint from everything; uses native Set.isDisjointFrom if available (ES2025); optimizes by checking smaller set against larger
- **Target**: `(set2: Set<T>) => (set1: Set<T>) => Result<SetError, boolean>`

---

## Migration Notes

Set operation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when operation succeeds with valid Set inputs
2. Return `error(SetError)` when operation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve immutability (all functions return new Sets, never mutate inputs)
5. Replace implicit null/undefined handling with explicit error values
6. Maintain functional purity (no loops, pure operations)
7. Preserve ES2025 native Set method usage when available

## Special Considerations

### Return Value Patterns

#### Element Manipulation Functions
- **add**: Returns new Set with element added; creates singleton if input invalid
- **delete**: Returns new Set with element removed; returns empty Set if input invalid
- **has**: Returns boolean indicating element presence

#### Set Combination Functions
- **union**: Combines all unique elements from both sets
- **unionWith**: Union with custom equality function
- **intersection**: Returns only common elements
- **intersectionWith**: Intersection with custom comparator
- **difference**: Returns elements in first set but not second
- **differenceWith**: Difference with custom comparator
- **symmetricDifference**: Returns elements in either set but not both
- **symmetricDifferenceWith**: Symmetric difference with custom equality

#### Set Relationship Functions
- **isSubsetOf**: Checks subset relationship
- **isSupersetOf**: Checks superset relationship
- **isDisjointFrom**: Checks if sets have no common elements

### ES2025 Native Set Methods

Several functions use progressive enhancement with ES2025 Set methods:
- **union**: Uses native `Set.prototype.union` if available
- **intersection**: Uses native `Set.prototype.intersection` if available
- **difference**: Uses native `Set.prototype.difference` if available
- **symmetricDifference**: Uses native `Set.prototype.symmetricDifference` if available
- **isSubsetOf**: Uses native `Set.prototype.isSubsetOf` if available
- **isSupersetOf**: Uses native `Set.prototype.isSupersetOf` if available
- **isDisjointFrom**: Uses native `Set.prototype.isDisjointFrom` if available

All functions include feature detection and fallback implementations for compatibility.

### Null/Undefined Input Handling

Functions handle null/undefined/non-Set inputs gracefully:

#### add
- Creates singleton Set if input is null/undefined/non-Set

#### delete
- Returns empty Set if input is null/undefined/non-Set

#### has
- Returns false if input is null/undefined/non-Set

#### Binary Operations (union, intersection, difference, symmetricDifference)
- If both inputs invalid: return empty Set
- If one input invalid: return copy of valid input (or empty Set based on operation semantics)
- Empty sets handled specially:
  - **union**: Returns copy of non-empty set
  - **intersection**: Returns empty Set
  - **difference**: Returns copy of minuend if subtrahend empty
  - **symmetricDifference**: Returns copy of non-empty set

#### Relationship Checks (isSubsetOf, isSupersetOf, isDisjointFrom)
- **isSubsetOf**: Empty set is subset of any set; non-empty set cannot be subset of null
- **isSupersetOf**: Any set is superset of empty set; null cannot be superset of non-empty set
- **isDisjointFrom**: Empty sets are disjoint from everything

### Arrow Function Syntax

Several functions use arrow syntax and need refactoring to named functions:
- **add** (uses named arrow)
- **delete/deleteElement** (uses named arrow)
- **has** (uses named arrow)
- **union** (uses named arrow)
- **unionWith** (uses named arrow)
- **intersection** (uses named arrow)
- **intersectionWith** (uses named arrow)
- **difference** (uses named arrow)
- **differenceWith** (uses named arrow)
- **symmetricDifference** (uses named arrow)
- **symmetricDifferenceWith** (uses named arrow)
- **isSubsetOf** (uses named arrow)
- **isSupersetOf** (uses named arrow)
- **isDisjointFrom** (uses named arrow)

### Functional Purity

All functions maintain immutability:
- **add**: Creates new Set via constructor, then uses native add (which mutates the new Set before returning)
- **delete**: Creates new Set via constructor, then uses native delete (which mutates the new Set before returning)
- **union**: Uses native method or spread operator `new Set([...set1, ...set2])`
- **intersection**: Uses native method or filter with has check
- **difference**: Uses native method or filter with negated has check
- **symmetricDifference**: Uses native method or combines filtered arrays
- **With variants**: Use Array.from conversions and array methods (filter, some)
- All functions create and return new Sets, never mutate inputs

### Complex Validation Logic

#### add
- Validates input is Set instance
- Returns singleton Set with element if input invalid
- Creates new Set from original before adding element (immutability)

#### delete
- Validates input is Set instance
- Returns empty Set if input invalid
- Creates new Set from original before deleting element (immutability)

#### union
- Handles both sets being invalid: returns empty Set
- Handles one set being invalid: returns copy of valid set
- Feature detection for ES2025 native method
- Fallback uses spread operator for efficiency

#### intersection
- Returns empty Set if either set is invalid or empty
- Feature detection for ES2025 native method
- Fallback iterates over smaller set for efficiency optimization

#### difference
- Returns empty Set if minuend is invalid
- Returns copy of minuend if subtrahend is invalid or empty
- Feature detection for ES2025 native method
- Fallback filters minuend elements not in subtrahend

#### symmetricDifference
- Treats invalid sets as empty sets
- Feature detection for ES2025 native method
- Fallback builds two filtered arrays (onlyInA, onlyInB) and combines

#### isSubsetOf
- Empty set is always subset (returns true)
- Non-empty set cannot be subset of null/invalid (returns false)
- Size optimization: subset cannot be larger than superset
- Feature detection for ES2025 native method
- Fallback uses every() to check all subset elements in superset

#### isSupersetOf
- Any set is superset of empty set (returns true)
- Null/invalid cannot be superset of non-empty set (returns false)
- Size optimization: superset must be at least as large as subset
- Feature detection for ES2025 native method
- Fallback uses every() to check all subset elements in superset

#### isDisjointFrom
- Empty sets are disjoint from everything (returns true)
- Feature detection for ES2025 native method
- Fallback optimizes by checking smaller set against larger
- Uses some() to find any common element

### Custom Comparator Functions

Four functions accept custom equality/comparator functions:
- **unionWith**: `equals: (a: T, b: T) => boolean`
- **intersectionWith**: `comparator: (a: T, b: T) => boolean`
- **differenceWith**: `comparator: (a: T, b: T) => boolean`
- **symmetricDifferenceWith**: `equals: (a: T, b: T) => boolean`

These use pure functional patterns:
- Convert Sets to arrays
- Use filter/some combinations to apply custom comparison
- Build new Set from filtered results
- No mutation of input Sets

### Performance Optimizations

#### intersection
- Iterates over smaller set for efficiency:
  ```typescript
  const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1]
  ```

#### isDisjointFrom
- Checks smaller set against larger for efficiency:
  ```typescript
  const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1]
  return !Array.from(smaller).some((element) => larger.has(element))
  ```

#### Size optimizations
- **isSubsetOf**: Early return false if subset.size > superset.size
- **isSupersetOf**: Early return false if superset.size < subset.size

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies
- Most functions depend on `isNullish` from validation
- All functions validate Set instances with `instanceof Set` check

### Array Operation Dependencies
- **With variants** use `Array.from` and array methods (filter, some, every)
- **symmetricDifference** uses `Array.from` and filter
- **isSubsetOf** uses `Array.from` and every
- **isSupersetOf** uses `Array.from` and every
- **isDisjointFrom** uses `Array.from` and some

### Native Set Method Dependencies
Seven functions use ES2025 Set methods with fallbacks:
- Feature detection pattern: `"method" in Set.prototype && typeof set.method === "function"`
- All maintain functional fallback implementations

---

## Notes

### Parameter Naming Conventions

Functions use mathematical naming for clarity:
- **difference**: Uses `minuend` and `subtrahend` (minuend - subtrahend)
- **union/intersection**: Use descriptive names like `set1`, `set2`, `setA`, `setB`
- **Custom comparator variants**: Use `equals`, `comparator` for comparison functions

### Reserved Keyword Handling

- **delete**: Exported as `deleteElement` because `delete` is a JavaScript reserved keyword
- Implementation uses `deleteElement` as function name throughout

### Missing Standard Set Operations

Consider implementing these during migration:
- **cartesianProduct**: Cartesian product of two sets
- **powerSet**: Set of all subsets
- **complement**: Set complement (requires universe set)
- **isProperSubsetOf**: Subset but not equal
- **isProperSupersetOf**: Superset but not equal
- **equals/isEqual**: Set equality check
- **count/cardinality**: Alias for `size`

### With Variants Pattern

Four functions have "With" variants that accept custom comparators:
- Base version uses JavaScript's default equality (===)
- "With" version accepts custom equality/comparator function
- Enables custom object comparison for complex types

This pattern should be preserved in monadic versions.

### ES2025 Set Methods

Functions leverage new Set methods when available:
- `Set.prototype.union`
- `Set.prototype.intersection`
- `Set.prototype.difference`
- `Set.prototype.symmetricDifference`
- `Set.prototype.isSubsetOf`
- `Set.prototype.isSupersetOf`
- `Set.prototype.isDisjointFrom`

All include feature detection and maintain compatibility with older JavaScript engines.

### Testing Considerations

When migrating, ensure comprehensive tests for:
- Null/undefined inputs (all functions)
- Non-Set inputs (all functions)
- Empty Sets (special case handling)
- Single-element Sets
- Identical Sets (union, intersection, difference)
- Disjoint Sets
- Subset/superset relationships (including proper subsets)
- Custom comparator functions (With variants)
- ES2025 method availability (feature detection)
- Size optimization logic (intersection, isDisjointFrom, isSubsetOf, isSupersetOf)
- Mathematical properties:
  - Union is commutative: A ∪ B = B ∪ A
  - Intersection is commutative: A ∩ B = B ∩ A
  - Symmetric difference is commutative: A ⊕ B = B ⊕ A
  - Difference is NOT commutative: A \ B ≠ B \ A
  - Subset relationship: A ⊆ B and B ⊆ A implies A = B

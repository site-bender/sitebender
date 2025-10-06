# Lens Functions

**Location**: `src/vanilla/lens/`
**Functions**: 5
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### composeLens
- **Current**: `<S, A, B>(first: Lens<S, A>, second: Lens<A, B>) => Lens<S, B>`
- **Returns**: Lens<S, B>
- **Description**: Composes two lenses to create a lens that focuses deeper into a structure; combines get operations sequentially and set operations in reverse; enables functional property access composition
- **Target**: Same signature (lenses are already functional constructs)

### lensEq (should be `lensEquals`)
- **Current**: `<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that checks if the value extracted by a lens equals a specific value using strict equality (===)
- **Target**: `<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S) => Result<ValidationError, S>`

### lensGte (should be `lensGreaterThanOrEqual` with alias)
- **Current**: `<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that checks if the value extracted by a lens is greater than or equal to a specific value (>=)
- **Target**: `<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S) => Result<ValidationError, S>`

### lensLte (should be `lensLessThanOrEqual` with alias)
- **Current**: `<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that checks if the value extracted by a lens is less than or equal to a specific value (<=)
- **Target**: `<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S) => Result<ValidationError, S>`

### lensSatisfies
- **Current**: `<S, A>(lens: Lens<S, A>) => (predicate: (value: A) => boolean) => (subject: S) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that checks if the value extracted by a lens satisfies an arbitrary predicate function
- **Target**: `<S, A>(lens: Lens<S, A>) => (predicate: (value: A) => boolean) => (subject: S) => Result<ValidationError, S>`

---

## Migration Notes

Lens functions are already highly functional constructs. The monadic migration will:

1. Return `ok(subject)` when validation succeeds (for validation functions)
2. Return `error(ValidationError)` when validation fails
3. Keep `composeLens` as-is (it's a pure lens combinator)
4. Convert predicate-returning functions to Result-returning validators

## Special Considerations

### Lens Type Definition

Lenses follow the functional programming pattern with `get` and `set` operations:
```typescript
type Lens<S, A> = {
  get: (s: S) => A
  set: (a: A) => (s: S) => S
}
```

This type is defined in `src/vanilla/object/lens/index.ts`.

### Arrow Function Syntax

All functions use arrow syntax and need refactoring to named functions:
- **composeLens** (arrow function)
- **lensEq** (arrow function)
- **lensGte** (arrow function)
- **lensLte** (arrow function)
- **lensSatisfies** (arrow function)

### Function Categories

#### Lens Combinators
- **composeLens**: Pure lens composition (should remain as-is)

#### Lens-Based Predicates (Validation)
- **lensEq**: Equality check
- **lensGte**: Greater-than-or-equal check
- **lensLte**: Less-than-or-equal check
- **lensSatisfies**: Custom predicate check

---

## Implementation Dependencies

### Type Dependencies
- All functions depend on `Lens<S, A>` type from `object/lens`
- Should maintain this dependency

### No External Function Dependencies
- Lens functions are self-contained
- Use only type composition and JavaScript operators

---

## Notes

### Missing Standard Lens Functions

Consider implementing these during migration:
- **lensGt**: Greater-than comparison
- **lensLt**: Less-than comparison
- **lensNotEq**: Not-equal comparison
- **lensPath**: Create lens from property path array
- **lensProp**: Create lens for object property
- **lensIndex**: Create lens for array index
- **over**: Modify value through lens with function
- **view**: Alias for get
- **set**: Standalone set operation

### Lens Laws

Proper lenses should obey three laws:
1. **GetPut**: `set(get(s))(s) === s`
2. **PutGet**: `get(set(a)(s)) === a`
3. **PutPut**: `set(a2)(set(a1)(s)) === set(a2)(s)`

Ensure these laws hold during migration.

### Testing Considerations

When migrating, ensure tests for:
- Lens composition (multiple levels deep)
- Comparison operators with edge values
- Predicate satisfaction with various functions
- Type safety with generic parameters

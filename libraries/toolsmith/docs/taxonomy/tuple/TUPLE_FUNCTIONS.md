# Tuple Functions

**Location**: `src/vanilla/tuple/`
**Functions**: 13
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### pair

- **Current**: `<A, B>(first: A) => (second: B) => [A, B]`
- **Returns**: Pair<A, B> (2-element tuple)
- **Description**: Creates a 2-element tuple (pair) from two values; curried constructor
- **Target**: Same signature (pure constructor, no errors)

### triple

- **Current**: `<A, B, C>(first: A) => (second: B) => (third: C) => [A, B, C]`
- **Returns**: Triple<A, B, C> (3-element tuple)
- **Description**: Creates a 3-element tuple (triple) from three values; curried constructor
- **Target**: Same signature (pure constructor, no errors)

### quad

- **Current**: `<A, B, C, D>(first: A) => (second: B) => (third: C) => (fourth: D) => [A, B, C, D]`
- **Returns**: Quad<A, B, C, D> (4-element tuple)
- **Description**: Creates a 4-element tuple (quad) from four values; curried constructor
- **Target**: Same signature (pure constructor, no errors)

### fst (should be `firstOfPair` with alias)

- **Current**: `<A, B>(tuple: [A, B]) => A`
- **Returns**: First element of pair
- **Description**: Extracts first element from a 2-element tuple
- **Target**: `<A, B>(tuple: [A, B]) => Result<TupleError, A>`

### snd (should be `secondOfPair` with alias)

- **Current**: `<A, B>(tuple: [A, B]) => B`
- **Returns**: Second element of pair
- **Description**: Extracts second element from a 2-element tuple
- **Target**: `<A, B>(tuple: [A, B]) => Result<TupleError, B>`

### swap

- **Current**: `<A, B>(tuple: [A, B]) => [B, A]`
- **Returns**: Swapped pair
- **Description**: Swaps elements of a 2-element tuple
- **Target**: `<A, B>(tuple: [A, B]) => Result<TupleError, [B, A]>`

### curry

- **Current**: `<A, B, C>(fn: (a: A, b: B) => C) => (a: A) => (b: B) => C`
- **Returns**: Curried function
- **Description**: Converts a 2-argument function to curried form
- **Target**: Same signature (pure transformation, no errors)

### uncurry

- **Current**: `<A, B, C>(fn: (a: A) => (b: B) => C) => (a: A, b: B) => C`
- **Returns**: Uncurried function
- **Description**: Converts a curried function to 2-argument form
- **Target**: Same signature (pure transformation, no errors)

### both

- **Current**: `<A, B>(fn: (a: A) => B) => (tuple: [A, A]) => [B, B]`
- **Returns**: Transformed pair
- **Description**: Applies function to both elements of a homogeneous pair
- **Target**: `<A, B>(fn: (a: A) => B) => (tuple: [A, A]) => Result<TupleError, [B, B]>`

### mapFst (should be `mapFirstOfPair` with alias)

- **Current**: `<A, B, C>(fn: (a: A) => C) => (tuple: [A, B]) => [C, B]`
- **Returns**: Transformed pair
- **Description**: Applies function to first element of pair, preserving second
- **Target**: `<A, B, C>(fn: (a: A) => C) => (tuple: [A, B]) => Result<TupleError, [C, B]>`

### mapSnd (should be `mapSecondOfPair` with alias)

- **Current**: `<A, B, C>(fn: (b: B) => C) => (tuple: [A, B]) => [A, C]`
- **Returns**: Transformed pair
- **Description**: Applies function to second element of pair, preserving first
- **Target**: `<A, B, C>(fn: (b: B) => C) => (tuple: [A, B]) => Result<TupleError, [A, C]>`

### bimap

- **Current**: `<A, B, C, D>(fnA: (a: A) => C) => (fnB: (b: B) => D) => (tuple: [A, B]) => [C, D]`
- **Returns**: Transformed pair
- **Description**: Applies different functions to each element of a pair
- **Target**: `<A, B, C, D>(fnA: (a: A) => C) => (fnB: (b: B) => D) => (tuple: [A, B]) => Result<TupleError, [C, D]>`

### uncurry3

- **Current**: `<A, B, C, D>(fn: (a: A) => (b: B) => (c: C) => D) => (a: A, b: B, c: C) => D`
- **Returns**: Uncurried 3-argument function
- **Description**: Converts a 3-level curried function to 3-argument form
- **Target**: Same signature (pure transformation, no errors)

---

## Migration Notes

Tuple functions are pure constructors and transformers. Most don't need Result wrapping, but accessor/transformer functions should validate inputs:

1. Constructors (pair, triple, quad) remain pure - no errors possible
2. Curry/uncurry transformations remain pure - no errors possible
3. Accessors (fst, snd) should validate tuple structure
4. Transformers (swap, both, mapFst, mapSnd, bimap) should validate tuple structure and handle transformation errors

## Notes

Tuples provide fixed-size heterogeneous collections. Consider adding: uncurry4, mapTriple, mapQuad, rotateTriple.

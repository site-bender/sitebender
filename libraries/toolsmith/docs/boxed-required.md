# Boxed Functions Required for Formulator Lexer

Functions needed to implement the lexer in pure FP style using lifted monadic functions from Toolsmith.

## Already Implemented ✅

### Core Monads & Constructors

**Result monad:**
- `ok` - Create Ok result
- `error` - Create Error result
- `isOk` - Type guard for Ok
- `isError` - Type guard for Error
- `map` - Map function over Ok value
- `chain` - Flat map (monadic bind)
- `getOrElse` - Extract value with fallback

**Validation monad:**
- `success` - Create Valid result
- `failure` - Create Invalid result with errors
- `isValid` - Type guard for Valid
- `isInvalid` - Type guard for Invalid
- `map` - Map function over Valid value
- `chain` - Flat map (monadic bind)
- `combineValidations` - Accumulate errors from multiple validations

### Lifting Functions

- `liftUnary` - Lift unary function to work with Result/Validation
- `liftBinary` - Lift curried binary function to work with Result/Validation

## Functions to Implement

### String Operations (Priority: HIGH)

1. **`charCodeAt`** - Get Unicode code point from character at position (curried)
   ```typescript
   charCodeAt(index: number)(str: string): Result<string, number>
   // charCodeAt(0)("α") → ok(945)
   // charCodeAt(5)("hi") → error("Index out of bounds")
   ```

2. **`charAt`** - Get character at position (curried)
   ```typescript
   charAt(index: number)(str: string): Result<string, string>
   // charAt(0)("hello") → ok("h")
   // charAt(10)("hi") → error("Index out of bounds")
   ```

3. **`slice`** - Extract substring (curried)
   ```typescript
   slice(start: number)(end: number)(str: string): Result<string, string>
   // slice(0)(3)("hello") → ok("hel")
   ```

4. **`stringLength`** - Get string length (safe wrapper)
   ```typescript
   stringLength(str: string): Result<string, number>
   // stringLength("hello") → ok(5)
   ```

### Object/Map Lookup (Priority: HIGH)

5. **`lookup`** - Safe property access returning Result
   ```typescript
   lookup<K extends PropertyKey, V>(key: K)(obj: Record<K, V>): Result<string, V>
   // lookup(945)(CHAR_MAP) → ok("ALPHA")
   // lookup(9999)(CHAR_MAP) → error("Key not found")
   ```

6. **`has`** - Check if key exists in object
   ```typescript
   has<K extends PropertyKey>(key: K)(obj: Record<K, unknown>): boolean
   // has(945)(CHAR_MAP) → true
   // has(9999)(CHAR_MAP) → false
   ```

### Composition Helpers (Priority: HIGH)

7. **`pipe`** - Function composition left-to-right
   ```typescript
   pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C
   // pipe(charCodeAt(0), lookup(CHAR_MAP))("α") → ok("ALPHA")
   ```

8. **`compose`** - Function composition right-to-left
   ```typescript
   compose<A, B, C>(g: (b: B) => C, f: (a: A) => B): (a: A) => C
   ```

9. **`identity`** - Identity function
   ```typescript
   identity<T>(x: T): T
   ```

### Array Operations (Priority: MEDIUM)

10. **`head`** - Get first element safely
    ```typescript
    head<T>(arr: ReadonlyArray<T>): Result<string, T>
    // head([1, 2, 3]) → ok(1)
    // head([]) → error("Empty array")
    ```

11. **`tail`** - Get all but first element
    ```typescript
    tail<T>(arr: ReadonlyArray<T>): Result<string, ReadonlyArray<T>>
    // tail([1, 2, 3]) → ok([2, 3])
    // tail([]) → error("Empty array")
    ```

12. **`take`** - Take first n elements
    ```typescript
    take<T>(n: number)(arr: ReadonlyArray<T>): ReadonlyArray<T>
    // take(2)([1, 2, 3, 4]) → [1, 2]
    ```

13. **`drop`** - Skip first n elements
    ```typescript
    drop<T>(n: number)(arr: ReadonlyArray<T>): ReadonlyArray<T>
    // drop(2)([1, 2, 3, 4]) → [3, 4]
    ```

### Validation Helpers (Priority: MEDIUM)

14. **`validateWith`** - Apply predicate and return Validation
    ```typescript
    validateWith<T>(
      predicate: (value: T) => boolean,
      errorMsg: string
    )(value: T): Validation<string[], T>
    // validateWith(x => x > 0, "Must be positive")(5) → success(5)
    // validateWith(x => x > 0, "Must be positive")(-1) → failure(["Must be positive"])
    ```

15. **`test`** - Test RegExp (may already exist)
    ```typescript
    test(pattern: RegExp)(str: string): boolean
    // test(/\d/)("a5b") → true
    // test(/\d/)("abc") → false
    ```

### Generator Utilities (Priority: LOW - for later phases)

16. **`fromGenerator`** - Convert generator to Result/Validation
    ```typescript
    fromGenerator<T>(gen: Generator<T>): Result<string, ReadonlyArray<T>>
    ```

17. **`toArray`** - Materialize generator/iterable
    ```typescript
    toArray<T>(iterable: Iterable<T>): ReadonlyArray<T>
    ```

## Implementation Priority

### Phase 1: Essential for Lexer (implement first)
1. `charCodeAt` - Unicode code point lookup
2. `charAt` - Character access
3. `lookup` - Map/object property access
4. `pipe` - Function composition
5. `identity` - Identity function

### Phase 2: Supporting Utilities
6. `slice` - Multi-character operators
7. `stringLength` - Bounds checking
8. `has` - Key existence checks
9. `compose` - Alternative composition

### Phase 3: Error Handling
10. `validateWith` - Predicate validation
11. `test` - RegExp testing

### Phase 4: Array Operations (tokenizer phase)
12. `head` / `tail` - List processing
13. `take` / `drop` - Stream slicing

### Phase 5: Generator Support (deferred)
14. `fromGenerator` - Generator materialization
15. `toArray` - Iterable conversion

## Notes

- All functions must be **curried** and follow the **data-last** pattern for composition
- All functions that can fail should return `Result` or `Validation`
- String index operations should validate bounds and return errors, not throw
- Map/object lookups should return `Result<string, T>` where error describes missing key
- All functions must be **pure** - no side effects, no mutations
- Each function in its own file with **one default export**
- Use **Envoy** comments, not JSDoc
- **No semicolons**, **tabs** for indentation, **double quotes** for strings

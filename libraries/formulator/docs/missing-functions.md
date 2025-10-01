# Toolsmith Boxed Functions Required for Formulator

> **17 lifted monadic functions needed for pure FP lexer/tokenizer implementation**

Based on the plan and the boxed-required.md document, here are the **17 Toolsmith boxed functions** needed for the Formulator implementation:

## String Operations (5 functions)

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

4. **`stringLength`** - Get string length safely
   ```typescript
   stringLength(str: string): Result<string, number>
   // stringLength("hello") → ok(5)
   ```

5. **`test`** - Test RegExp against string
   ```typescript
   test(pattern: RegExp)(str: string): boolean
   // test(/\d/)("a5b") → true
   // test(/\d/)("abc") → false
   ```

## Object/Map Lookup (2 functions)

6. **`lookup`** - Safe property access returning Result
   ```typescript
   lookup<K extends PropertyKey, V>(key: K)(obj: Record<K, V>): Result<string, V>
   // lookup(945)(CHAR_MAP) → ok("ALPHA")
   // lookup(9999)(CHAR_MAP) → error("Key not found")
   ```

7. **`has`** - Check if key exists in object
   ```typescript
   has<K extends PropertyKey>(key: K)(obj: Record<K, unknown>): boolean
   // has(945)(CHAR_MAP) → true
   // has(9999)(CHAR_MAP) → false
   ```

## Composition Helpers (3 functions)

8. **`pipe`** - Function composition left-to-right
   ```typescript
   pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C
   // pipe(charCodeAt(0), lookup(CHAR_MAP))("α") → ok("ALPHA")
   ```

9. **`compose`** - Function composition right-to-left
   ```typescript
   compose<A, B, C>(g: (b: B) => C, f: (a: A) => B): (a: A) => C
   ```

10. **`identity`** - Identity function
    ```typescript
    identity<T>(x: T): T
    ```

## Array Operations (4 functions)

11. **`head`** - Get first element safely
    ```typescript
    head<T>(arr: ReadonlyArray<T>): Result<string, T>
    // head([1, 2, 3]) → ok(1)
    // head([]) → error("Empty array")
    ```

12. **`tail`** - Get all but first element
    ```typescript
    tail<T>(arr: ReadonlyArray<T>): Result<string, ReadonlyArray<T>>
    // tail([1, 2, 3]) → ok([2, 3])
    // tail([]) → error("Empty array")
    ```

13. **`take`** - Take first n elements
    ```typescript
    take<T>(n: number)(arr: ReadonlyArray<T>): ReadonlyArray<T>
    // take(2)([1, 2, 3, 4]) → [1, 2]
    ```

14. **`drop`** - Skip first n elements
    ```typescript
    drop<T>(n: number)(arr: ReadonlyArray<T>): ReadonlyArray<T>
    // drop(2)([1, 2, 3, 4]) → [3, 4]
    ```

## Validation Helpers (1 function)

15. **`validateWith`** - Apply predicate and return Validation
    ```typescript
    validateWith<T>(
      predicate: (value: T) => boolean,
      errorMsg: string
    )(value: T): Validation<string[], T>
    // validateWith(x => x > 0, "Must be positive")(5) → success(5)
    // validateWith(x => x > 0, "Must be positive")(-1) → failure(["Must be positive"])
    ```

## Generator Utilities (2 functions)

16. **`fromGenerator`** - Convert generator to Result/Validation
    ```typescript
    fromGenerator<T>(gen: Generator<T>): Result<string, ReadonlyArray<T>>
    ```

17. **`toArray`** - Materialize generator/iterable
    ```typescript
    toArray<T>(iterable: Iterable<T>): ReadonlyArray<T>
    ```

---

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

---

## Implementation Requirements

All functions must be:

- **Curried** with **data-last** pattern for composition
- **Pure** (no side effects or mutations)
- Return `Result` or `Validation` for operations that can fail
- One function per file with single default export
- Use **Envoy** comments (not JSDoc)
- **No semicolons**, **tabs** for indentation, **double quotes** for strings
- String index operations validate bounds and return errors (don't throw)
- Map/object lookups return `Result<string, T>` where error describes missing key

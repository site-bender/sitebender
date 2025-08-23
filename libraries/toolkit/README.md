# @sitebender/toolkit

A collection of utilities and components for building Sitebender applications.

# Thoughts on the @sitebender/toolkit Library

## a) Design Assessment

**Strengths:**
- **Excellent folder structure** - One function per folder with `index.ts` follows a clear, maintainable pattern
- **Pure FP adherence** - Currying, immutability, and pure functions throughout
- **Documentation quality** - The JSDoc comments with extensive examples are exceptional
- **Naming consistency** - Clear, predictable function names that follow established FP conventions
- **Type safety** - Good TypeScript usage, though could be stronger in places

**Design Observations:**
- The `simple/chainable` dual-layer architecture is well-conceived:
  - `simple/` contains pure FP functions that work with plain values
  - `chainable/` (currently empty) will contain monadic versions working with Either/Maybe
  - Both will have identical function names for consistency
  - Chainable versions will delegate to simple versions where possible
- The currying approach is consistent and enables excellent composition
- The Temporal API adoption for dates is forward-thinking (though requires `--unstable-temporal` flag)

**Potential Improvements:**
- Consider adding type predicates more extensively (e.g., `value is T`)
- Some functions could benefit from generic constraints for better type inference
- Could add `Symbol.for('nodejs.util.inspect.custom')` for better Deno debugging

## c) Potentially Missing Functions

**Missing collection utilities:**
- `frequency` - Count occurrences of each unique element
- `sliding` with step parameter (current `sliding` might not have step)
- `interleave` - Alternate elements from multiple arrays
- `partitionBy` - Partition by consecutive elements satisfying predicate

**Missing string utilities:**
- `levenshtein` - Edit distance between strings
- `similarity` - String similarity percentage
- `truncateMiddle` - Truncate from middle with ellipsis
- `hashCode` - Consistent string hashing

**Missing functional utilities:**
- `constant` - Like `always` but clearer name
- `Y` - Y combinator for recursion
- `lens` composition operators
- `transduce` - Transducer support

## d) Implementation Strategy for Safe/Monadic Layer

**Architecture Approach:**
1. **Mirror Structure** - The `chainable/` folder should mirror `simple/` exactly:
   ```
   chainable/
   ├── array/
   │   ├── map/        # Works with Either<E, Array<T>>
   │   ├── filter/     # Returns Either<E, Array<T>>
   │   └── ...
   ├── string/
   │   ├── split/      # Returns Either<E, Array<string>>
   │   └── ...
   └── ...
   ```

2. **Function Signatures** - Chainable versions wrap inputs/outputs in Either or Maybe:
   ```typescript
   // simple/array/map
   const map = <T, R>(fn: (t: T) => R) => (arr: Array<T>): Array<R>
   
   // chainable/array/map  
   const map = <E, T, R>(fn: (t: T) => Either<E, R>) => 
     (arr: Either<E, Array<T>>): Either<E, Array<R>>
   ```

3. **Delegation Pattern** - Chainable functions should delegate to simple where possible:
   ```typescript
   // chainable/array/filter
   import filterSimple from "../../simple/array/filter/index.ts"
   import { map, right } from "../../../types/either/index.ts"
   
   const filter = <E, T>(predicate: (t: T) => boolean) =>
     map<E, Array<T>, Array<T>>(filterSimple(predicate))
   ```

4. **Error Propagation** - Functions should short-circuit on Left values, but let's discuss this before implementing it.
   ```typescript
   // chainable/array/concat
   const concat = <E, T>(arr2: Either<E, Array<T>>) => 
     (arr1: Either<E, Array<T>>): Either<E, Array<T>> =>
       isLeft(arr1) ? arr1 :
       isLeft(arr2) ? arr2 :
       right(concatSimple(arr2.right)(arr1.right))
   ```

5. **Lifting Strategy** - Create lift utilities for common patterns:
   ```typescript
   // chainable/lift/liftUnary
   const liftUnary = <A, B>(fn: (a: A) => B) =>
     <E>(either: Either<E, A>): Either<E, B> =>
       map(fn)(either)
   
   // chainable/lift/liftBinary
   const liftBinary = <A, B, C>(fn: (a: A) => (b: B) => C) =>
     <E>(a: Either<E, A>) => (b: Either<E, B>): Either<E, C> =>
       isLeft(a) ? a :
       isLeft(b) ? b :
       right(fn(a.right)(b.right))
   ```

**Priority Functions for Chainable Implementation:**
1. Core array operations: map, filter, reduce, flatMap
2. Object operations: path, prop, assoc (handle missing keys)
3. String parsing: split, match, parse functions
4. Type conversions: all conversion functions (already return null on error)
5. Async operations: naturally fit Either for error handling

**Benefits of This Approach:**
- **Consistency** - Same function names in both layers
- **Discoverability** - Easy to find safe version of any function
- **Composability** - Monadic chaining for error handling
- **Gradual Adoption** - Users can mix simple/safe as needed
- **Type Safety** - Errors are encoded in the type system

## e) Other Relevant Observations

**Deno-Specific Considerations:**
1. **Import maps** - Could benefit from import map for cleaner imports
2. **Permissions** - No functions require special Deno permissions (good!)
3. **Web Standards** - Aligns well with Deno's web-standard philosophy
4. **Testing** - Would benefit from property-based testing with fast-check
5. **Benchmarking** - Could use Deno's built-in benchmark tool

**Architecture Suggestions:**

1. **Type exports** - Centralize types:
   ```typescript
   // lib/toolkit/simple/types.ts
   export type Predicate<T> = (value: T) => boolean
   export type Comparator<T> = (a: T, b: T) => number
   ```

2. **Performance variants** - Consider lazy versions:
   ```typescript
   // Lazy evaluation for large datasets
   export function* mapLazy<T, R>(fn: (t: T) => R) {
     return function* (iter: Iterable<T>) {
       for (const item of iter) yield fn(item)
     }
   }
   ```

**Documentation Ideas:**
- Add complexity annotations (O(n), O(n²), etc.)
- Include common composition patterns
- Add migration guide from lodash/ramda
- Create interactive playground examples

**Quality Metrics:**
- 100% pure functions ✅
- 100% curried where applicable ✅
- 0% mutations ✅
- Excellent documentation coverage ✅
- Strong type safety (could be stronger)

The library is shaping up to be a high-quality, well-designed FP utility collection that rivals established libraries like Ramda while being specifically optimized for Deno's modern JavaScript runtime.

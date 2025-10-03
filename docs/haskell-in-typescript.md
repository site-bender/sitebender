# Haskell-in-Typescript Sweet Spot

The sweet spot is: embrace TS’s strengths (unions, async/await, structural typing, performance) to deliver a principled FP core with purity and ADTs, and avoid forcing Haskell’s type system and laziness where TS resists.

## What to faithfully emulate vs. what to adapt

Our goal is solid: keep pure functions, immutability, small composable combinators, and model effects as data (Result, Validation, IO, State). The sweet spot is drawing a clear line between a “Haskell-flavored FP kernel” and “TypeScript-native ergonomics and performance.”

### Emulate (because TS does these well)
- Algebraic data types: Discriminated unions with exhaustive handling; they are first-class in TS and give you the essence of Haskell’s sum types.
- Total functions & purity: Keep referential transparency in your core. Push IO, exceptions, randomness, and time to the boundary.
- Newtypes (brands): Branded primitives to avoid accidental mixing while keeping zero-cost runtime.
- Combinators over inheritance: Prefer small functions that compose; leverage TS’s structural typing to keep APIs flexible.
- Do-notation and helpers: Your do-notation, map/flatMap/apply liftings, and Validation for accumulating errors are wins.

### Adapt (lean into TS/JS where it’s stronger)
- Eager evaluation: Don’t emulate Haskell’s global laziness; use generators or explicit Thunk when laziness is a performance or API need.
- Async model: Prefer Promise/async functions for IO rather than inventing complex Task types unless you truly need cancellation or concurrency control.
- Performance hot paths: Use loops and mutable locals inside internal implementation, especially for map/reduce/sort. Expose pure, immutable APIs on the surface.
- Ergonomics of callbacks: Accept uncurried callbacks for sort/reduce/map internally. Provide curried, data-last combinators at the public layer for composition.
- Pattern matching: Provide a match helper over unions instead of full-blown Haskell pattern syntax; require exhaustiveness via the compiler.

### Avoid (because TS resists or costs outweigh benefits)
- True HKTs: TS lacks native HKTs; emulations are heavy, brittle, and hurt readability and tooling. Prefer concrete typeclass dictionaries per type or module-level instances instead of a generic Functor&lt;F&gt; abstraction.
- Monad transformer stacks: They become hard to read and type in TS. Instead, pick effect types per domain and adapt/combine at boundaries (e.g., Result inside async IO via helpers).
- Deriving/Typeclass coherence: Global implicit instance resolution is not ergonomic in TS. Use explicit instance objects/functions and import them where needed.
- Naive recursion in hot paths: Tail-call optimization is unreliable; prefer iterative implementation under the hood.

## Architecture that balances purity and pragmatism

- Core FP kernel: Define ADTs (Result, Validation, Option, IO, State) plus minimal typeclass-like dictionaries as plain objects (Functor, Monad, Traversable) for specific types only where it pays off. Keep these small and well-tested.
- Interoperability layer: Curried, data-last helpers: map(fn)(array), reduce(step, init)(array), pipe, compose. Internally delegate to native methods or loops.
- Effect boundaries: Explicit modules that “run” effects: runIO(), unsafeRun(), handleError(). Keep all non-pure work confined here.
- Escape hatches: Document sanctioned places where you break purity for performance (loops, mutable locals) and keep them private; expose only pure surfaces.
- Domain modules: Model business logic exclusively with ADTs and pure functions that return Result/Validation. Only the top-level orchestrators use IO/async.

## Practical guidance and conventions

- Currying strategy: Adopt data-last, arity-1 return: map: &lt;A,B&gt;(f: (a:A) =&gt; B) =&gt; (as: ReadonlyArray&lt;A&gt;) =&gt; ReadonlyArray&lt;B&gt;. Allow internal uncurried callbacks for interop.
- Exhaustiveness checking: Enforce match with a never fallback to guarantee all cases are handled.
- Error handling policy:
  - Sync pure: use Result.
  - User-facing validation: use Validation for error accumulation.
  - Async: use Promise&lt;Result&lt;A,E&gt;&gt; and helpers (mapAsync, flatMapAsync) instead of a custom Task unless you need cancellation.
- Newtype brands: Use brands for IDs, currency, etc. Provide constructors and smart validators that return Validation.
- Performance rules: Prefer fusion or combined traversals (e.g., a single loop instead of map→filter→reduce), transducer-like composition where helpful, and avoid boxed monadic operations in tight loops.
- Testing: Property-based tests for combinators and laws where you maintain simple dictionaries (Functor/Monad laws per type). Unit tests for effect boundaries to prove purity invariants.

## Example patterns to illustrate the balance

```ts
// ADT: Result
type Ok<A> = { readonly _tag: 'Ok', readonly value: A }
type Error<E> = { readonly _tag: 'Error', readonly error: E }
type Result<A, E> = Ok<A> | Error<E>

function ok<A>(value: A): Result<A, never> {
  return { _tag: 'Ok', value }
}

function error<E>(error: E): Result<never, E> {
  return { _tag: 'Error', error }
}

// Exhaustive match helper
function matchResult<A, E, R>(
  onOk: (a: A) => R,
  onError: (e: E) => R
): (r: Result<A, E>) => R {
  return function matchResultWithHandlers(r: Result<A, E>): R {
    return isOk(r) ? onOk(r.value) : onError(r.error)
  }
}

// Curried, data-last map that delegates internally
// Note: This is a Toolsmith vanilla function implementation that delegates to native methods.
// Outside Toolsmith vanilla functions, ALWAYS use Toolsmith boxed (monadic) functions.
// Never delegate to OOP methods or loops except within Toolsmith vanilla function implementations.
function map<A, B>(f: (a: A) => B): (as: ReadonlyArray<A>) => ReadonlyArray<B> {
  return function mapWithFunction(as: ReadonlyArray<A>): ReadonlyArray<B> {
    // internal: imperative for performance, public: pure immutable
    return as.map(f)
  }
}

// Async boundary: prefer Promise<Result<...>>
// Note: try/catch acceptable ONLY for external APIs that throw.
// Sitebender functions never throw - always return Result/Validation.
function fetchUser(id: string): Promise<Result<User, string>> {
  return fetch(`/api/users/${id}`)
    .then(function handleResponse(r) {
      return r.ok
        ? r.json().then(ok)
        : error(`HTTP ${r.status}`)
    })
    .catch(function handleError() {
      return error('Network error')
    })
}
```

## Decision rubric for “Haskell fidelity” vs “TS pragmatism”

- If a feature increases composability and safety with minimal runtime or typing overhead in TS (ADTs, brands, curried helpers), emulate it.
- If it fights the type system (HKTs, implicit instance resolution) or tooling (editor perf, inference), prefer explicit, local solutions (concrete dictionaries, helpers).
- If it degrades hot-path performance (monadic loops, recursion), implement imperatively under the hood and expose pure surfaces.
- If it muddies ergonomics (verbose types, transformer stacks), flatten effects and provide targeted helpers at boundaries.

## Summary

Keep the Haskell spirit—purity, small composable functions, ADTs, clear effect boundaries—while leaning into TypeScript’s unions, eager evaluation, async/await, and structural typing. Avoid heavy HKTs, monad transformer stacks, and global instance machinery. Be explicit where TS needs it, lazy only where it pays, and fast internally with pure façades. This balance delivers Haskell-like correctness and composition without sacrificing TS ergonomics or performance.

# Either

A general-purpose sum type representing a value of one of two possible shapes. Either does not imply "error vs success" by itself—use it when both branches are meaningful domain paths. For error handling, use Result. For error accumulation, use Validation. For absence/presence, use Maybe.

- Curried, inference-first helpers (map, chain, fold, …)
- Two meaningful branches with no inherent semantics
- Type guards: isRight / isLeft
- Pure, data-first, tree-shakable utilities (no barrel files)

## Types

- `Either<L, R>` = `Left<L>` | `Right<R>`
- `Left<L>`: `{ _tag: "Left"; left: L }`
- `Right<R>`: `{ _tag: "Right"; right: R }`

## Design guidelines

- Use Either when both branches are intentional domain outcomes (e.g., A-or-B choice), not necessarily failures.
- Prefer Result for success/failure flows that short-circuit on error.
- Prefer Validation when you want to accumulate many errors.
- No barrel files; import only what you need by path for maximal tree-shaking.

## Quick start

```ts
import right from "./right/index.ts"
import left from "./left/index.ts"
import chain from "./chain/index.ts"
import fold from "./fold/index.ts"
import bimap from "./bimap/index.ts"
import { expect } from "@std/expect"

type Domestic = { kind: "Domestic"; zip: string }
type International = { kind: "International"; country: string }

type Shipping = Either<Domestic, International>

const toMessage = fold<International, string, Domestic>(
	(r) => `intl:${r.country}`,
)((l) => `domestic:${l.zip}`)

const s1: Shipping = left({ kind: "Domestic", zip: "94110" })
const s2: Shipping = right({ kind: "International", country: "JP" })

expect(toMessage(s1)).toBe("domestic:94110")
expect(toMessage(s2)).toBe("intl:JP")

// Transform both branches without imposing error semantics
const normalized = bimap<Domestic, International, string, string>((d) => d.zip)(
	(i) => i.country,
)
expect(normalized(s2)).toEqual({ _tag: "Right", right: "JP" })
```

## When to use what

- map(fn): transform the Right branch only.
- chain(fn): sequence computations along the Right branch (fail-fast on Left).
- fold(onRight)(onLeft): exhaustively handle both branches into a single result.
- getOrElse(default): extract Right or return default when Left.
- orElse(alt): keep Right; replace Left with an alternative Either.
- bimap(onLeft)(onRight): transform both branches in one go.
- mapLeft(fn): transform only the Left branch.
- fromNullable(value, onNull): lift nullable into Either (choose which side represents null).

If your Left stands for an error and you rely on mapErr/tryCatch semantics, use Result instead. If you need to gather multiple failures, use Validation.

## Type guards

```ts
import isRight from "./isRight/index.ts"
import isLeft from "./isLeft/index.ts"

const xs = [
	left<"A", "B">("A"),
	right<"A", "B">("B"),
]
const rights = xs.filter(isRight) // Array<Right<"B">>
const lefts = xs.filter(isLeft) // Array<Left<"A">>
```

## Import paths (no barrels)

Import only what you need directly by file path to keep bundles lean and tree-shakable.

```ts
import map from "./map/index.ts"
import chain from "./chain/index.ts"
import fold from "./fold/index.ts"
import bimap from "./bimap/index.ts"
import isRight from "./isRight/index.ts"
import isLeft from "./isLeft/index.ts"
```

## Notes

- For error handling with short-circuiting and dedicated helpers (mapErr, tryCatch), prefer Result.
- For accumulating many errors with structured error types, prefer Validation.
- Examples inside source files use Envoy’s pipe-prefixed doc comment style (`|`) for clarity and consistency.

## Testing and roadmap

Handwritten tests for now; Auditor will replace them once ready.

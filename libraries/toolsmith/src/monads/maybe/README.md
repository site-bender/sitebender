# Maybe

A minimal optional type for absence/presence. Prefer `Maybe<A>` to `A | null | undefined` for explicit control flow.

- Curried, inference-first helpers (map, chain, fold, …)
- Constructors: just, nothing
- Type guards: isJust / isNothing
- Pure, data-first, tree-shakable utilities (no barrel files)

## Types

- `Maybe<A>` = `Just<A>` | `Nothing`
- `Just<A>`: `{ _tag: "Just"; value: A }`
- `Nothing`: `{ _tag: "Nothing" }`

## Design guidelines

- Prefer Maybe for optional values inside core logic; convert to nullable at the edges if needed.
- Fail-fast semantics: chain stops on Nothing.
- No barrel files; import only what you need by path for maximal tree-shaking.

## Quick start

```ts
import just from "./just/index.ts"
import nothing from "./nothing/index.ts"
import chain from "./chain/index.ts"
import fold from "./fold/index.ts"
import getOrElse from "./getOrElse/index.ts"
import { expect } from "@std/expect"

const toInt = (s: string) => (/^\d+$/.test(s) ? just(parseInt(s)) : nothing())

const out = chain((n: number) => (n > 0 ? just(n * 2) : nothing()))(toInt("21"))

const msg = fold<number, string>((n) => `ok:${n}`)(() => "none")(out)
expect(msg).toBe("ok:42")

expect(getOrElse(0)(nothing())).toBe(0)
```

## When to use what

- map(fn): transform the Just value only.
- chain(fn): run another computation that depends on the previous Just value (fail-fast).
- fold(onJust)(onNothing): exhaustively handle both branches into a single result.
- getOrElse(default): extract Just or return default when Nothing.
- orElse(alt): keep Just as-is; replace Nothing with an alternative Maybe.
- fromNullable(value): lift nullable/undefined into Maybe.
- toEither(onNothing): convert Maybe to Either.

## Type guards

```ts
import isJust from "./isJust/index.ts"
import isNothing from "./isNothing/index.ts"

const xs = [just(1), nothing(), just(2)]
const goods = xs.filter(isJust) // Array<Just<number>>
const empties = xs.filter(isNothing) // Array<Nothing>
```

## Import paths (no barrels)

```ts
import map from "./map/index.ts"
import chain from "./chain/index.ts"
import fold from "./fold/index.ts"
import just from "./just/index.ts"
import nothing from "./nothing/index.ts"
```

## Notes

- Use Maybe for optional inputs/joins; switch to Result/Either when you need error info.
- Envoy pipe-prefixed doc comment style (`|`) is used in examples.

## Testing and roadmap

Handwritten tests for now; Logician will replace them once ready.

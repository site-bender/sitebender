import type { Just, Maybe } from "../../../types/fp/maybe/index.ts"

//++ Type guard that checks if a Maybe value is Just (contains a value)
export default function isJust<A>(maybe: Maybe<A>): maybe is Just<A> {
	return maybe._tag === "Just"
}

//?? [EXAMPLE] isJust(just(42)) // true
//?? [EXAMPLE] isJust(nothing()) // false
/*??
 | [EXAMPLE]
 | const maybe = just("hello") as Maybe<string>
 | if (isJust(maybe)) {
 |   console.log(maybe.value.toUpperCase())  // "HELLO" - safe access
 | }
 |
 | [PRO] Type narrows in TypeScript for safe value property access
 | [PRO] Essential for pattern matching and conditional logic
 |
*/

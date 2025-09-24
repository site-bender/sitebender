import type { Either, Left } from "../../../types/fp/either/index.ts"

//++ Type guard that checks if an Either is a Left branch value
export default function isLeft<E, A>(either: Either<E, A>): either is Left<E> {
	return either._tag === "Left"
}

//?? [EXAMPLE] isLeft(left("error")) // true
//?? [EXAMPLE] isLeft(right(42)) // false
/*??
 | [EXAMPLE]
 | const result: Either<string, number> = left("Something went wrong")
 | if (isLeft(result)) {
 |   console.error("Error:", result.left)  // TypeScript knows it's Left<string>
 | } else {
 |   console.log("Success:", result.right) // TypeScript knows it's Right<number>
 | }
 |
 | [PRO] Type narrows in conditionals for safe property access
 | [PRO] Useful with filter/some/every to collect Left values
 | [GOTCHA] Left does not inherently mean failure; semantics are domain-defined
 |
*/

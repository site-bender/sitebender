import type { Either, Right } from "../../../types/fp/either/index.ts"

//++ Type guard that checks if an Either is a Right branch value
export default function isRight<E, A>(
	either: Either<E, A>,
): either is Right<A> {
	return either._tag === "Right"
}

//?? [EXAMPLE] isRight(right(42)) // true
//?? [EXAMPLE] isRight(left("error")) // false
/*??
 | [EXAMPLE]
 | const result: Either<string, number> = right(42)
 | if (isRight(result)) {
 |   console.log("Success:", result.right * 2)  // TypeScript knows it's Right<number>
 | } else {
 |   console.error("Error:", result.left)      // TypeScript knows it's Left<string>
 | }
 |
 | [PRO] Type narrows in conditionals for safe property access
 | [PRO] Useful with filter/some/every to collect Right values
 | [GOTCHA] Right does not inherently mean success; naming is conventional only
 |
*/

import type { Either, Right } from "../../../types/fp/either/index.ts"

//++ Creates a Right value (the Right branch of an Either)
export default function right<A, E = never>(value: A): Either<E, A> {
	return {
		_tag: "Right" as const,
		right: value,
	} as Right<A>
}

//?? [EXAMPLE] right(42) // {_tag: "Right", right: 42}
//?? [EXAMPLE] right({id: 1, name: "Alice"}) // {_tag: "Right", right: {id: 1, name: "Alice"}}
//?? [EXAMPLE] right<number, string>(100) // Either<string, number> with Right(100)
/*??
 | [EXAMPLE]
 | // Type-safe JSON parsing
 | import left from "../left/index.ts"
 |
 | const safeParse = (json: string): Either<string, unknown> => {
 |   try {
 |     return right(JSON.parse(json))
 |   } catch (e) {
 |     return left(`Parse error: ${e}`)
 |   }
 | }
 |
 | safeParse('{"valid": "json"}')  // Right({ valid: "json" })
 | safeParse('invalid json')       // Left("Parse error: ...")
 |
 | // Building computation pipelines
 | const divide = (a: number) => (b: number): Either<string, number> =>
 |   b === 0 ? left("Division by zero") : right(a / b)
 |
 | const sqrt = (n: number): Either<string, number> =>
 |   n < 0 ? left("Cannot take sqrt of negative") : right(Math.sqrt(n))
 |
 | // Usage in pipe
 | pipe(
 |   right(16),
 |   chain(sqrt),        // Right(4)
 |   chain(divide(100))  // Right(25)
 | )
 |
 | [PRO] Represents the Right branch (often used for "primary" value)
 | [PRO] Enables map/chain operations over the Right branch
 | [PRO] Type-safe value wrapping; no runtime cost beyond object
 | [GOTCHA] Naming "Right" does not inherently mean success — semantics are domain-specific
 | [GOTCHA] Type parameter E (Left branch type) defaults to never; specify when needed
 |
*/

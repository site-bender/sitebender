import type { Valid, Validation } from "../../../types/Validation/index.ts"

//++ Creates a Valid validation representing a successful value
export default function valid<A>(value: A): Validation<never, A> {
	return {
		_tag: "Valid" as const,
		value,
	} as Valid<A>
}

//?? [EXAMPLE] valid(42) // {_tag: "Valid", value: 42}
//?? [EXAMPLE] valid("hello") // {_tag: "Valid", value: "hello"}
//?? [EXAMPLE] valid({id: 1, name: "Alice"}) // {_tag: "Valid", value: {id: 1, name: "Alice"}}

/*??
 | [EXAMPLE]
 | const userValidation = valid({ id: 123, name: "Bob" })
 | // {_tag: "Valid", value: { id: 123, name: "Bob" }}
 |
 | // Creating valid results from computations
 | const parseResult = Number("42")
 | const validation = isNaN(parseResult)
 |   ? invalid(["not a number"])
 |   : valid(parseResult)
 | // {_tag: "Valid", value: 42}
 |
 | // Use with map, chain, fold
 | const doubled = map(n => n * 2)(valid(21))
 | // {_tag: "Valid", value: 42}
 |
 | // Type inference works correctly
 | const stringValidation = valid("test")
 | // Validation<never, string> - error type inferred as never
 |
 | const explicitType = valid<ValidationError, number>(100)
 | // Validation<ValidationError, number>
 |
 | [PRO] Simple constructor for successful values
 | [PRO] Type inference usually works without explicit types
 | [PRO] Integrates with all validation monad functions
 | [PRO] Represents the "happy path" in validation flow
 |
 | [GOTCHA] Error type E must be specified or inferred from context
 | [GOTCHA] The value is wrapped, use fold or getOrElse to extract
 | [GOTCHA] Not the same as Maybe/Option - always has a value
 */

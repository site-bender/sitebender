import type { Either, Left } from "../../../types/fp/either/index.ts"

//++ Creates a Left value (the Left branch of an Either)
export default function left<E, A = never>(value: E): Either<E, A> {
	return {
		_tag: "Left" as const,
		left: value,
	} as Left<E>
}

//?? [EXAMPLE] left("User not found") // {_tag: "Left", left: "User not found"}
//?? [EXAMPLE] left({field: "email", message: "Invalid"}) // {_tag: "Left", left: {field: "email", message: "Invalid"}}
//?? [EXAMPLE] left<string, number>("error") // Either<string, number> with Left("error")
/*??
 | [EXAMPLE]
 | // Type-safe error handling
 | import right from "../right/index.ts"
 |
 | const divide = (a: number) => (b: number): Either<string, number> =>
 |   b === 0 ? left("Division by zero") : right(a / b)
 |
 | divide(10)(0)  // Left("Division by zero")
 | divide(10)(2)  // Right(5)
 |
 | // Validation chains with structured errors
 | type ValidationError = { field: string; message: string }
 |
 | const validateAge = (age: number): Either<ValidationError, number> =>
 |   age < 0 ? left({field: "age", message: "Cannot be negative"}) :
 |   age > 150 ? left({field: "age", message: "Unrealistic value"}) :
 |   right(age)
 |
 | // Partial application for error factories
 | const validationFail = (field: string) => (message: string) =>
 |   left<ValidationError, any>({ field, message })
 |
 | const emailError = validationFail("email")("Invalid format")
 | // Left({ field: "email", message: "Invalid format" })
 |
 | [PRO] Short-circuits Right-branch transformations (map/chain) by design
 | [PRO] Type-safe Left branch representation (often used for alternate path / problem info)
 | [PRO] Works in "railway" style pipelines without throwing
 | [GOTCHA] Left does not intrinsically mean error; it is just a branch
 | [GOTCHA] Type parameter A (Right branch type) defaults to never; specify when constructing generic pipelines
 |
*/

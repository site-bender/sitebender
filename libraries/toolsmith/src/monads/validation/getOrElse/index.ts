import type { Validation } from "../../../types/Validation/index.ts"

//++ Extracts the value from a Valid or returns a default value for Invalid
export default function getOrElse<E, A>(
	defaultValue: A,
) {
	return function applyGetOrElse(validation: Validation<E, A>): A {
		if (validation._tag === "Failure") {
			return defaultValue
		}

		return validation.value
	}
}

//?? [EXAMPLE] getOrElse(0)(valid(42)) // 42
//?? [EXAMPLE] getOrElse(0)(invalid(["error"])) // 0

//?? [EXAMPLE] getOrElse("anonymous")(valid("John")) // "John"
//?? [EXAMPLE] getOrElse("anonymous")(invalid([{field: "name", messages: ["required"]}])) // "anonymous"

/*??
 | [EXAMPLE]
 | const userValidation = invalid([{field: "user", messages: ["not found"]}])
 | const defaultUser = { id: 0, name: "Guest" }
 |
 | const user = getOrElse(defaultUser)(userValidation)
 | // { id: 0, name: "Guest" }
 |
 | const validUser = valid({ id: 123, name: "Alice" })
 | const user2 = getOrElse(defaultUser)(validUser)
 | // { id: 123, name: "Alice" }
 |
 | // Useful for providing fallback values
 | const getConfig = (validation) => getOrElse({
 |   timeout: 5000,
 |   retries: 3,
 |   debug: false
 | })(validation)
 |
 | // Chaining with map and getOrElse
 | const result = pipe(
 |   parseNumber(input),
 |   map(n => n * 2),
 |   getOrElse(0)
 | )
 |
 | [PRO] Simple way to unwrap validations with a fallback
 | [PRO] Eliminates need for explicit error handling in many cases
 | [PRO] Useful for providing sensible defaults
 | [PRO] Type-safe extraction with guaranteed return value
 |
 | [GOTCHA] Default value must be the same type as the valid value
 | [GOTCHA] Error information is discarded - use fold if you need it
 | [GOTCHA] Default value is eagerly evaluated, not lazy
 */

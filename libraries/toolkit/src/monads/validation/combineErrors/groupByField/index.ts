import type ValidationError from "../../../../types/ValidationError/index.ts"

//++ Groups validation error messages by field name using accumulator pattern
export default function groupByField(
	acc: Record<string, Array<string>>,
	err: ValidationError,
): Record<string, Array<string>> {
	const existing = acc[err.field] || []

	return {
		...acc,
		[err.field]: [...existing, ...err.messages],
	}
}

//?? [EXAMPLE] groupByField({}, {field: "age", messages: ["too young"]}) // {age: ["too young"]}

//?? [EXAMPLE] groupByField({age: ["must be 18+"]}, {field: "age", messages: ["too young"]})
//?? // {age: ["must be 18+", "too young"]}

/*??
 | [EXAMPLE]
 | const initial = {}
 | const withAge = groupByField(initial, {field: "age", messages: ["must be 18+"]})
 | // {age: ["must be 18+"]}
 |
 | const withBoth = groupByField(withAge, {field: "email", messages: ["invalid format"]})
 | // {age: ["must be 18+"], email: ["invalid format"]}
 |
 | // Used with reduce for accumulating multiple errors
 | const errors = [{field: "age", messages: ["too young"]}, {field: "name", messages: ["required"]}]
 | const grouped = reduce(groupByField)({})(errors)
 | // {age: ["too young"], name: ["required"]}
 |
 | [PRO] Immutable accumulation pattern
 | [PRO] Preserves existing messages for the same field
 | [PRO] Creates new object without mutating input
 | [PRO] Works seamlessly with reduce function
 |
 | [GOTCHA] Does not deduplicate messages within the same field
 | [GOTCHA] Empty arrays are preserved in the accumulator
 */

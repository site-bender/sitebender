import type { Ok } from "../../../types/fp/result/index.ts"

//++ Creates an Ok result representing success
export default function ok<T>(value: T): Ok<T> {
	return {
		_tag: "Ok",
		value,
	}
}

//?? [EXAMPLE]
// ok(42)  // { _tag: "Ok", value: 42 }
// ok("success")  // { _tag: "Ok", value: "success" }
// ok({ id: 1, name: "Alice" })  // { _tag: "Ok", value: { id: 1, name: "Alice" } }

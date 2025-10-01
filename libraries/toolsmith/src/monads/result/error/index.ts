import type { Error } from "../../../types/fp/result/index.ts"

//++ Creates an Error result representing failure
export default function error<E>(err: E): Error<E> {
	return {
		_tag: "Error",
		error: err,
	}
}

// error("Not found")  // { _tag: "Error", error: "Not found" }
// error(new Error("Failed"))  // { _tag: "Error", error: Error("Failed") }
// error({ code: 404, message: "Not found" })  // { _tag: "Error", error: { code: 404, message: "Not found" } }

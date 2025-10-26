import includes from "../../array/includes/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"
import values from "../values/index.ts"

/*++
 + Checks if a value exists in an object's values
 + Returns boolean indicating presence
 + Curried for partial application with fixed object
 */
export default function hasValue<T>(obj: Readonly<Record<string, T>>) {
	return function hasValueInObject(value: T): boolean {
		const valsResult = values(obj)
		const vals = getOrElse([] as ReadonlyArray<T>)(valsResult)

		return includes(vals)(value)
	}
}

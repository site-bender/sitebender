import isEqual from "../isEqual/index.ts"
import not from "../../logic/not/index.ts"

//++ Checks if two values are not deeply equal using Object.is and deep comparison
export default function isUnequal<T>(a: T) {
	return function compareWith<U>(b: U): boolean {
		return not(isEqual(a)(b))
	}
}

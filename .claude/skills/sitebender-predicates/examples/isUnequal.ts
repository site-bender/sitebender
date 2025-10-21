import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

//++ Checks if two values are not deeply equal using Object.is and deep comparison
export default function isUnequal<T>(a: T) {
	return function isUnequalWithA<U>(b: U): boolean {
		return not(isEqual(a)(b))
	}
}

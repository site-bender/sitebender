import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

export default function _hasItems<T>(array: ReadonlyArray<T>): boolean {
	return getOrElse(0)(length(array)) > 0
}

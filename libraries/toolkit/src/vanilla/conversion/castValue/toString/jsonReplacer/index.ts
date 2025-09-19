import isObject from "../../../../validation/isObject/index.ts"
import isBigInt from "../../../../validation/isBigInt/index.ts"
import isSymbol from "../../../../validation/isSymbol/index.ts"
import isFunction from "../../../../validation/isFunction/index.ts"

export default function jsonReplacer(seen: WeakSet<object>) {
	return function replacer(_key: string, val: unknown): unknown {
		if (isObject(val)) {
			if (seen.has(val as object)) {
				return "[Circular]"
			}
			seen.add(val as object)
		}
		if (isBigInt(val)) {
			return val.toString()
		}
		if (isSymbol(val)) {
			return val.toString()
		}
		if (isFunction(val)) {
			return "[Function]"
		}
		return val
	}
}

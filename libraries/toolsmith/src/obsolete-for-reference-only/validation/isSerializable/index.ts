import isFunction from "../isFunction/index.ts"
import isSymbol from "../isSymbol/index.ts"
import isUndefined from "../isUndefined/index.ts"

//++ Type guard that checks if a value can be serialized to JSON
export default function isSerializable(value: unknown): boolean {
	// Values that cannot be serialized
	if (isUndefined(value) || isSymbol(value) || isFunction(value)) {
		return false
	}

	return true
}

import reduce from "../../array/reduce/index.ts"
import _buildObject from "./_buildObject/index.ts"

export default function omit<T extends object, K extends keyof T>(
	keys: ReadonlyArray<string>,
) {
	return function omitWithKeys(obj: T): Omit<T, K> {
		return reduce(_buildObject(obj))({})(keys)
	}
}

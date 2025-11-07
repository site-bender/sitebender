import hasKey from "../../hasKey/index.ts"

//++ [EXCEPTION] Not curried as passed to JS reduce method (approved)
export default function _buildObject(obj: Record<string, unknown>) {
	return function _buildObjectWithObject(
		acc: Record<string, unknown>,
		key: string,
	): Record<string, unknown> {
		return hasKey(obj)(key) ? acc : { ...acc, [key]: obj[key] }
	}
}

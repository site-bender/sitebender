import type { Value } from "../../../types/index.ts"

export default function isMemberOf<T>(options: readonly T[]) {
	return (value: Value): value is T => options.includes(value as T)
}

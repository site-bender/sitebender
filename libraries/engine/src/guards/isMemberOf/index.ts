import type { Value } from "@engineTypes/index.ts"

export default function isMemberOf<T extends Value>(options: readonly T[]) {
	return (value: Value): value is T => options.includes(value as T)
}

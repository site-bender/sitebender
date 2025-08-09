export default function isMemberOf<T>(options: readonly T[]) {
	return (value: unknown): value is T => options.includes(value as T)
}

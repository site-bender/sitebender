//++ Creates a function that freezes object properties recursively

export default function createPropertyFreezer<T>(
	obj: T,
): (deepFreezeFunc: <U>(o: U) => U) => (prop: string) => string {
	return function withDeepFreeze(
		deepFreezeFunc: <U>(o: U) => U,
	): (prop: string) => string {
		return function freezeProperty(prop: string): string {
			const value = (obj as Record<string, unknown>)[prop]

			if (
				value !== null &&
				(typeof value === "object" || typeof value === "function") &&
				!Object.isFrozen(value)
			) {
				deepFreezeFunc(value)
			}

			return prop
		}
	}
}
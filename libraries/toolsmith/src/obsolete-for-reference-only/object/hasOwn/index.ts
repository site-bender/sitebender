//++ Returns true if object has own property with given key
export default function hasOwn<K extends PropertyKey>(key: K) {
	return function hasOwnWithKey<T extends Record<PropertyKey, unknown>>(
		obj: T,
	): boolean {
		return Object.hasOwn(obj, key)
	}
}

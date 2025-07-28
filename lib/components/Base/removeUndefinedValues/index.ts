export default function deepRemoveUndefined(obj) {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		// Recursively clean objects and arrays
		if (typeof value === "object" && value !== null) {
			value = deepRemoveUndefined(value)
		}

		// Only add to new object if not undefined (after recursive cleaning)
		if (value !== undefined) {
			acc[key] = value
		}

		return acc
	}, Array.isArray(obj) ? [] : {}) // Preserve array type if input was array
}

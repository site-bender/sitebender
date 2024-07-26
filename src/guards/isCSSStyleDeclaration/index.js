const isCSSStyleDeclaration = value => {
	if (typeof value !== "object") {
		return false
	}

	if (Array.isArray(value)) {
		return false
	}

	if (Object.getOwnPropertySymbols(value).length > 0) {
		return false
	}

	return true
}

export default isCSSStyleDeclaration

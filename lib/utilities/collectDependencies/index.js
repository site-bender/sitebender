import getSelector from "../getSelector"

const collectDependencies = (condition = {}) => {
	const dependencies =
		typeof condition === "object"
			? Object.entries(condition).reduce((deps, [key, value]) => {
					if (key === "source") {
						const selector = getSelector(value)

						if (selector) {
							deps.push(selector)
						}

						return deps
					}

					if (typeof value === "object" && value != null) {
						return deps.concat(collectDependencies(value))
					}

					return deps
				}, [])
			: []

	return dependencies
}

export default collectDependencies

import getSelector from "../../../../utilities/getSelector/index.ts"

const collectDependencies = (condition: any = {}): string[] => {
	const dependencies: string[] = typeof condition === "object"
		? Object.entries(condition).reduce(
			(deps: string[], [key, value]: [string, any]): string[] => {
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
			},
			[],
		)
		: []

	return dependencies
}

export default collectDependencies

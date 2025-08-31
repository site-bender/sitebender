import getSelector from "../../../pending/dom/getSelector/index.ts"

const collectDependencies = (condition: unknown = {}): string[] => {
	const obj = condition && typeof condition === "object"
		? condition as Record<string, unknown>
		: null
	const dependencies: string[] = obj
		? Object.entries(obj).reduce(
			(deps: string[], [key, value]): string[] => {
				if (key === "source" && value && typeof value === "object") {
					const selector = getSelector(
						value as {
							id?: string
							name?: string
							tag?: string
							selector?: string
							form?: string
						},
					)
					if (selector) deps.push(selector)
					return deps
				}

				if (value && typeof value === "object") {
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

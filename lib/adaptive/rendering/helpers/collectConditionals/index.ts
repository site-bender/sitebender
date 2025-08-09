const collectConditionals = (component: any) => {
	const conditions = Object.entries(component).reduce(
		(conds: any, [key, value]: [string, any]) => {
			if (key === "display" && component.attributes?.id) {
				conds[component.attributes?.id] = value
			}

			if (key === "children") {
				const childDeps = value?.reduce((out: any, item: any) => {
					return {
						...out,
						...collectConditionals(item),
					}
				}, {})

				Object.assign(conds, childDeps)
			}

			return conds
		},
		{},
	)

	return conditions
}

export default collectConditionals

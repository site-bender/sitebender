const collectConditionals = component => {
	const conditions = Object.entries(component).reduce((conds, [key, value]) => {
		if (key === "display" && component.attributes?.id) {
			conds[component.attributes?.id] = value
		}

		if (key === "children") {
			const childDeps = value?.reduce((out, item) => {
				return {
					...out,
					...collectConditionals(item),
				}
			}, [])

			Object.assign(conds, childDeps)
		}

		return conds
	}, {})

	return conditions
}

export default collectConditionals

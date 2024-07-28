const flatMapDescendants = children =>
	children.reduce((out, child) => {
		return [
			...out,
			child.tag,
			...(child.children ? flatMapDescendants(child.children) : []),
		]
	}, [])

const hasDescendant = config => tags => {
	const { children = [] } = config
	const descendants = flatMapDescendants(children)

	return Boolean(descendants.find(descendant => tags.includes(descendant)))
}

export default hasDescendant

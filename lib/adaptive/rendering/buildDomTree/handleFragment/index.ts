import buildDomTree from ".."

const handleFragment = (parent) => (children = []) => (options) => {
	children.forEach((child) => buildDomTree(parent)(child)(options))
}

export default handleFragment

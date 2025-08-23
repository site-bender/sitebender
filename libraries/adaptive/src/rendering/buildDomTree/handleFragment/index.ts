import buildDomTree from "../../index.ts"

const handleFragment = (parent) => (children = []) => (options) => {
	children.forEach((child) => buildDomTree(parent)(child)(options))
}

export default handleFragment

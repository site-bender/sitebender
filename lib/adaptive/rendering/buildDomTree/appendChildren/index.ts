import buildDomTree from ".."

import appendTextNode from "../appendTextNode.js"

const appendChildren = (elem) => (children = []) => (options) => {
	children.forEach((child) => {
		if (child.tag === "TextNode") {
			appendTextNode(elem)(child)

			return
		}

		buildDomTree(elem)(child)(options)

		return
	})
}

export default appendChildren

import buildDomTree from ".."

const appendChildren =
	elem =>
	(children = []) =>
	options => {
		children.forEach(child => {
			if (child.tag === "TextNode") {
				elem.appendChild(document.createTextNode(child.content))

				return
			}

			buildDomTree(elem)(child)(options)

			return
		})
	}

export default appendChildren

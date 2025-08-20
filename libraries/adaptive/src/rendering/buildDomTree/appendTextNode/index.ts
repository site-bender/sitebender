const appendTextNode = (elem) => (config) => {
	if (config.tag === "TextNode") {
		elem.appendChild(document.createTextNode(config.content))
	}
}

export default appendTextNode

type TextNodeConfig = { tag: "TextNode"; content: string }
const appendTextNode = (elem: HTMLElement) => (config: TextNodeConfig) => {
	if (config.tag === "TextNode") {
		elem.appendChild(document.createTextNode(config.content))
	}
}

export default appendTextNode

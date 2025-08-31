type TextNode = { tag: "TextNode"; content: string }
type Node = {
	tag: string
	attributes?: Record<string, unknown>
	children?: Array<Node | TextNode>
}

// Minimal SSR renderer used only by tests; does not affect browser runtime
const render = (config: Node): string => {
	const attr = (a: Record<string, unknown> = {}) =>
		Object.entries(a)
			.map(([k, v]) => ` ${k}="${String(v)}"`).join("")
	const renderChildren = (children: Array<Node | TextNode> = []): string =>
		children.map((c) => {
			if (!c) return ""
			if ((c as TextNode).tag === "TextNode") {
				return String((c as TextNode).content)
			}
			return render(c as Node)
		}).join("")
	const tag = config.tag.toLowerCase()
	return `<${tag}${attr(config.attributes)}>${
		renderChildren(config.children)
	}</${tag}>`
}

export default render

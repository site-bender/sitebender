const TextNode = content => ({
	content: typeof content === "string" ? content : "",
	tag: "TextNode",
})

export default TextNode

const HEADING_ELEMENTS = [
	"H1",
	"H2",
	"H3",
	"H4",
	"H5",
	"H6",
	"Hgroup",
	"Hn",
]

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isHeadingContent = ({ tag }: { tag: string }): boolean =>
	HEADING_ELEMENTS.includes(tag)

export default isHeadingContent

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

/**
 * Type guard to check if an element config represents heading content
 *
 * @example
 * ```typescript
 * isHeadingContent({ tag: "H1" }) // true
 * isHeadingContent({ tag: "P" }) // false
 * ```
 */
const isHeadingContent = ({ tag }: { tag: string }): boolean =>
	HEADING_ELEMENTS.includes(tag)

export default isHeadingContent

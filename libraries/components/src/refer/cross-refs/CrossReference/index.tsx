/**
 * CrossReference component
 *
 * Marks up references to other parts of a document, such as sections,
 * figures, tables, or pages. Provides semantic linking within documents
 * and helps with navigation and document structure understanding.
 *
 * Example usage:
 *
 * <CrossReference target="figure-1" type="figure">
 *   See Figure 1
 * </CrossReference>
 *
 * <CrossReference target="methodology" type="section">
 *   as discussed in the Methodology section
 * </CrossReference>
 *
 * <CrossReference page="42">
 *   (p. 42)
 * </CrossReference>
 */

export type ReferenceType =
	| "section"
	| "chapter"
	| "figure"
	| "table"
	| "equation"
	| "listing"
	| "appendix"
	| "footnote"
	| "page"
	| "paragraph"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "span" | "a" | "cite" | "i"
	// Page number reference
	page?: number | string
	// Target ID or anchor
	target?: string
	// Type of reference
	type?: ReferenceType
}

export default function CrossReference({
	children,
	description: _description,
	element: Element = "span",
	page,
	target,
	type = "section",
	...props
}: Props): JSX.Element {
	const href = target ? `#${target}` : undefined

	const ariaLabel = [
		"cross-reference to",
		type,
		target || (page && `page ${page}`),
	].filter(Boolean).join(" ")

	if (href && Element === "span") {
		return (
			<a
				aria-label={ariaLabel}
				class={`cross-reference cross-reference-${type}`}
				data-page={page}
				data-target={target}
				data-type={type}
				href={href}
				{...props}
			>
				{children}
			</a>
		)
	}

	return (
		<Element
			aria-label={ariaLabel}
			class={`cross-reference cross-reference-${type}`}
			data-page={page}
			data-target={target}
			data-type={type}
			{...props}
		>
			{children}
		</Element>
	)
}

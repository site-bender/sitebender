/**
 * Contraction component
 *
 * Marks up contractions with their expanded forms. Used in educational
 * content, formal writing that requires expansions, and for accessibility
 * to ensure screen readers can properly interpret contractions.
 *
 * Example usage:
 *
 * <Contraction expanded="cannot">can't</Contraction> go to the party.
 *
 * <Contraction expanded="I would" formal>I'd</Contraction> appreciate your help.
 *
 * <Contraction expanded="you all" regional="Southern US">y'all</Contraction>
 */

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "span" | "abbr" | "i" | "em"
	// Full expanded form
	expanded: string
	// Whether this is a formal contraction
	formal?: boolean
	// Regional or dialectal marker
	regional?: string
	// Type of contraction
	type?: "standard" | "informal" | "dialectal" | "archaic"
}

export default function Contraction({
	children,
	description,
	element: Element = "abbr",
	expanded,
	formal,
	regional,
	type = "standard",
	...props
}: Props): JSX.Element {
	const ariaLabel = `${expanded}${regional ? ` (${regional})` : ""}`

	return (
		<Element
			aria-label={ariaLabel}
			class={`contraction contraction-${type}`}
			data-expanded={expanded}
			data-formal={formal}
			data-regional={regional}
			data-type={type}
			title={expanded}
			{...props}
		>
			{children}
		</Element>
	)
}
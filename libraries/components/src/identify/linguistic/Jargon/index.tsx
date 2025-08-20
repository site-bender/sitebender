/**
 * Jargon component
 *
 * Marks up specialized or technical language specific to a field
 * or profession. Helps identify terms that may need explanation
 * for general audiences while preserving precise technical meaning.
 *
 * Example usage:
 *
 * <Jargon field="computing" definition="page not found error">
 *   404 error
 * </Jargon>
 *
 * <Jargon
 *   field="medicine"
 *   definition="heart attack"
 *   formal="myocardial infarction"
 * >
 *   MI
 * </Jargon>
 *
 * <Jargon
 *   field="finance"
 *   acronym="ROI"
 *   expansion="return on investment"
 * >
 *   return on investment
 * </Jargon>
 */

export type Props = {
	// Acronym form if applicable
	acronym?: string
	children?: JSX.Element | Array<JSX.Element> | string
	// Brief definition for tooltips
	definition?: string
	// Description for accessibility
	description?: string
	element?: "span" | "dfn" | "abbr" | "i" | "b"
	// Full expansion of acronym
	expansion?: string
	// Field or domain of the jargon
	field?: string
	// Formal/technical version
	formal?: string
	// Link to glossary or definition
	href?: string
	// Complexity level
	level?: "basic" | "intermediate" | "advanced" | "expert"
}

export default function Jargon({
	acronym,
	children,
	definition,
	description,
	element: Element = "span",
	expansion,
	field,
	formal,
	href,
	level = "intermediate",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		field && `${field} jargon:`,
		definition || expansion || formal,
		acronym && `abbreviated as ${acronym}`,
	].filter(Boolean).join(" ")

	const title = definition || expansion || formal || description

	const content = (
		<Element
			aria-label={ariaLabel}
			class={`jargon jargon-${level}`}
			data-acronym={acronym}
			data-definition={definition}
			data-expansion={expansion}
			data-field={field}
			data-formal={formal}
			data-level={level}
			title={title}
			{...props}
		>
			{children}
		</Element>
	)

	if (href) {
		return (
			<a href={href} class="jargon-link">
				{content}
			</a>
		)
	}

	return content
}

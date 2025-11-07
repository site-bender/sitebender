//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Whether this is a defining instance
	defining?: boolean
	// Brief definition
	definition?: string
	// Description for accessibility
	description?: string
	element?: "dfn" | "b" | "i" | "em" | "mark"
	// Whether this is the first use
	firstUse?: boolean
	// ID of glossary entry
	glossaryId?: string
	// Link to definition or glossary
	href?: string
	// Scope of the term (local to section, document-wide, etc.)
	scope?: "local" | "document" | "global"
}

export default function MentionedTerm({
	children,
	defining = false,
	definition,
	description,
	element: Element = defining ? "dfn" : "b",
	firstUse = false,
	glossaryId,
	href,
	scope = "document",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		defining && "defining",
		firstUse && "first use of",
		"term",
		definition && `meaning: ${definition}`,
	].filter(Boolean).join(" ")

	const content = (
		<Element
			aria-label={ariaLabel}
			class={`mentioned-term${defining ? " mentioned-term-defining" : ""}${
				firstUse ? " mentioned-term-first-use" : ""
			}`}
			data-defining={defining}
			data-definition={definition}
			data-first-use={firstUse}
			data-glossary-id={glossaryId}
			data-scope={scope}
			id={defining && glossaryId ? `term-${glossaryId}` : undefined}
			title={definition || description}
			{...props}
		>
			{children}
		</Element>
	)

	if (href) {
		return (
			<a href={href} class="mentioned-term-link">
				{content}
			</a>
		)
	}

	return content
}

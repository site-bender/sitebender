//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

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

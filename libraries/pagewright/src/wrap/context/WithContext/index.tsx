//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Cultural or regional context
	cultural?: string
	// Description for accessibility
	description?: string
	element?: "div" | "span" | "section" | "article" | "blockquote" | "p"
	// Level of formality
	formality?: "informal" | "casual" | "neutral" | "formal" | "ceremonial"
	// Historical period or era
	period?: string
	// Physical or virtual setting
	setting?: string
	// Specific situation or circumstance
	situation?: string
	// Type of context
	type?: "historical" | "cultural" | "situational" | "fictional" | "technical"
}

export default function WithContext({
	children,
	cultural,
	description: _description,
	element: Element = "span",
	formality,
	period,
	setting,
	situation,
	type = "situational",
	...props
}: Props): JSX.Element {
	const contextParts = []
	if (setting) contextParts.push(`setting: ${setting}`)
	if (period) contextParts.push(`period: ${period}`)
	if (cultural) contextParts.push(`cultural context: ${cultural}`)
	if (situation) contextParts.push(`situation: ${situation}`)
	if (formality) contextParts.push(`formality: ${formality}`)

	const ariaLabel = contextParts.length > 0
		? contextParts.join(", ")
		: undefined

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-context with-context-${type}`}
			data-context-type={type}
			data-cultural={cultural}
			data-formality={formality}
			data-period={period}
			data-setting={setting}
			data-situation={situation}
			{...props}
		>
			{children}
		</Element>
	)
}

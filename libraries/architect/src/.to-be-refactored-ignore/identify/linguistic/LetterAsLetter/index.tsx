//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Description for accessibility
	description?: string
	element?: "span" | "i" | "em" | "b" | "mark"
	// Letter case context
	case?: "uppercase" | "lowercase" | "mixed"
	// Phonetic name of the letter
	phoneticName?: string
}

export default function LetterAsLetter({
	children,
	description: _description,
	element: Element = "i",
	case: letterCase,
	phoneticName,
	...props
}: Props): JSX.Element {
	const ariaLabel = phoneticName
		? `letter ${phoneticName}`
		: `letter ${children}`

	return (
		<Element
			aria-label={ariaLabel}
			class="letter-as-letter"
			data-case={letterCase}
			data-phonetic-name={phoneticName}
			{...props}
		>
			{children}
		</Element>
	)
}

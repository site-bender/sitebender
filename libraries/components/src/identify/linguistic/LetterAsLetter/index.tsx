/**
 * LetterAsLetter component
 *
 * Marks up individual letters when they are being discussed as
 * letters rather than used as part of words. Common in educational
 * content, linguistics, and typography discussions.
 *
 * Example usage:
 *
 * The letter <LetterAsLetter>A</LetterAsLetter> is the first letter of the alphabet.
 *
 * In Spanish, <LetterAsLetter>ñ</LetterAsLetter> is considered a separate letter.
 */

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
	description,
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

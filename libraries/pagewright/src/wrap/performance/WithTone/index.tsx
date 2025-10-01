//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import type { Emoji, Tone } from "../../constants/index.ts"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	element?: "div" | "span" | "i" | "b" | "strong" | "em" | "li" | "mark" | "p"
	// The emoji to display alongside the tone, if any
	// This can be a string or an Emoji constant
	// If not provided, no emoji will be displayed
	// If an emoji is provided, it will be displayed after the text
	// and styled according to the tone
	emoji?: Emoji | string
	tone: Tone | string
}

export default function Tone({
	element: Element = "span",
	emoji,
	tone,
	children,
	...props
}: Props): JSX.Element {
	return (
		<Element
			aria-label={`${tone} tone`}
			class={`with-tone with-tone-${tone}`}
			data-tone={tone}
			data-emoji={emoji}
			{...props}
		>
			<style>
				{`
				.with-tone::after {
					content: attr(data-emoji);
					margin-left: 0.25em;
				}
			`}
			</style>
			{children}
		</Element>
	)
}

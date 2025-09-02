/**
 * WithTone component
 *
 * For expressing a specific emotional tone in text.
 * Supports various tones like angry, happy, sad, etc.
 * Uses CSS to style the text according to the tone.
 * Can also include an emoji to visually represent the tone.
 * Constants for common tones and emojis are provided.
 *
 * Example usage:
 *
 * <WithTone tone={TONE.angry} emoji={EMOJI.angry}>
 *   If you do that again, I'll punch your lights out!
 * </WithTone>
 */
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

/**
 * WithNuance component
 *
 * Captures subtle meanings, implications, and layered communication.
 * Helps AI understand subtext, double meanings, hints, and indirect
 * communication patterns common in human interaction.
 *
 * Example usage:
 *
 * <WithNuance 
 *   subtext="disappointment"
 *   implies="you should have known better"
 * >
 *   Oh, you decided to show up.
 * </WithNuance>
 *
 * <WithNuance 
 *   layered
 *   surface="compliment"
 *   underlying="insult"
 *   technique="backhanded"
 * >
 *   You're so brave to wear that!
 * </WithNuance>
 */

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Conflicting meanings present
	contradiction?: boolean
	// Description for accessibility
	description?: string
	// Double meaning present
	doubleMeaning?: boolean
	element?: "div" | "span" | "em" | "i" | "q"
	// What is hinted at
	hints?: string
	// What is implied but not stated
	implies?: string
	// Ironic reversal
	ironic?: boolean
	// Multiple layers of meaning
	layered?: boolean
	// What is deliberately left unsaid
	omitted?: string
	// Sarcastic intent
	sarcastic?: boolean
	// Hidden or subtle meaning
	subtext?: string
	// Surface-level meaning
	surface?: string
	// Communication technique used
	technique?: "euphemism" | "understatement" | "overstatement" | "backhanded" | "passive-aggressive" | "doublespeak"
	// Underlying or true meaning
	underlying?: string
}

export default function WithNuance({
	children,
	contradiction,
	description,
	doubleMeaning,
	element: Element = "span",
	hints,
	implies,
	ironic,
	layered,
	omitted,
	sarcastic,
	subtext,
	surface,
	technique,
	underlying,
	...props
}: Props): JSX.Element {
	const nuanceParts = [
		subtext && `subtext: ${subtext}`,
		implies && `implies: ${implies}`,
		technique && `technique: ${technique}`,
		layered && "layered meaning"
	].filter(Boolean)
	
	const ariaLabel = nuanceParts.length > 0
		? nuanceParts.join(", ")
		: undefined

	return (
		<Element
			aria-label={ariaLabel}
			class={`with-nuance${technique ? ` with-nuance-${technique}` : ""}`}
			data-contradiction={contradiction}
			data-double-meaning={doubleMeaning}
			data-hints={hints}
			data-implies={implies}
			data-ironic={ironic}
			data-layered={layered}
			data-omitted={omitted}
			data-sarcastic={sarcastic}
			data-subtext={subtext}
			data-surface={surface}
			data-technique={technique}
			data-underlying={underlying}
			{...props}
		>
			{children}
		</Element>
	)
}
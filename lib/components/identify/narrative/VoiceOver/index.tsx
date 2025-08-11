import { getDataAttributes } from "../../../../utilities/getDataAttributes/index.ts"
import { Person } from "../../../enrich/index.ts"
import type { BaseProps } from "../../../../types/index.ts"

export type Props = BaseProps & {
	element?: "div" | "aside" | "p" | "span"
	enrich?: "microdata" | "linkedData" | "both"
	/**
	 * The narrator providing the voice-over
	 */
	narrator?: string
	/**
	 * Type of voice-over (e.g., "narration", "commentary", "exposition", "internal")
	 */
	voiceType?: string
	/**
	 * Temporal relationship to main narrative (e.g., "concurrent", "retrospective", "prospective")
	 */
	timing?: string
	/**
	 * Tone of the voice-over (e.g., "neutral", "ironic", "nostalgic", "dramatic")
	 */
	tone?: string
}

/**
 * Marks narration or commentary that overlays the main narrative.
 * Often used for omniscient narration, retrospective commentary, or character thoughts.
 * 
 * @example
 * <VoiceOver narrator="Older Scout" timing="retrospective">
 *   Looking back now, I realize we never really understood Boo Radley.
 * </VoiceOver>
 * 
 * @example
 * <VoiceOver voiceType="commentary" tone="ironic">
 *   (Little did they know, their troubles were just beginning.)
 * </VoiceOver>
 */
export default function VoiceOver({
	element: Element = "aside",
	enrich,
	narrator,
	voiceType,
	timing,
	tone,
	children,
	...props
}: Props): JSX.Element {
	const dataAttributes = getDataAttributes({
		component: "voice-over",
		narrator,
		voiceType,
		timing,
		tone,
	})

	const baseElement = (
		<Element
			{...props}
			{...dataAttributes}
			class={`voice-over ${props.class || ""}`}
			aria-label={narrator ? `Voice-over by ${narrator}` : "Voice-over narration"}
		>
			{children}
		</Element>
	)

	// Optionally enrich with Person schema for the narrator
	if (enrich && narrator) {
		return (
			<Person
				name={narrator}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</Person>
		)
	}

	return baseElement
}
import type BaseProps from "../../../../types/index.ts"

import Person from "../../../define/Thing/Person/index.tsx"
import getDataAttributes from "../../../helpers/getDataAttributes/index.ts"

export type Props = BaseProps & {
	element?: "div" | "aside" | "p" | "span"
	define?: "microdata" | "linkedData" | "both"
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	narrator?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	voiceType?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	timing?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	tone?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function VoiceOver({
	element: Element = "aside",
	define: _define,
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
			className={`voice-over`}
			aria-label={narrator
				? `Voice-over by ${narrator}`
				: "Voice-over narration"}
		>
			{children}
		</Element>
	)

	// Optionally define with Person schema for the narrator
	if (_define && narrator) {
		return (
			<Person
				name={narrator}
				disableJsonLd={_define === "microdata"}
				disableMicrodata={_define === "linkedData"}
			>
				{baseElement}
			</Person>
		)
	}

	return baseElement
}

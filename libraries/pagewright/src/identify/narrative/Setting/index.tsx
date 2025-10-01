import type BaseProps from "../../../../types/index.ts"

import Event from "../../../define/Thing/Event/index.tsx"
import Place from "../../../define/Thing/Place/index.tsx"
import getDataAttributes from "../../../helpers/getDataAttributes/index.ts"

export type Props = BaseProps & {
	element?: "div" | "section" | "p" | "span"
	define?: "microdata" | "linkedData" | "both"
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	location?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	timePeriod?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	settingType?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	atmosphere?: string
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	significance?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function Setting({
	element: Element = "div",
	define: _define,
	location,
	timePeriod,
	settingType,
	atmosphere,
	significance,
	children,
	...props
}: Props): JSX.Element {
	const dataAttributes = getDataAttributes({
		component: "setting",
		location,
		timePeriod,
		settingType,
		atmosphere,
		significance,
	})

	const baseElement = (
		<Element
			{...props}
			{...dataAttributes}
			className={`setting`}
		>
			{children}
		</Element>
	)

	// Optionally define with Place or Event schema
	if (_define && location) {
		return (
			<Place
				name={location}
				disableJsonLd={_define === "microdata"}
				disableMicrodata={_define === "linkedData"}
			>
				{baseElement}
			</Place>
		)
	}

	if (_define && timePeriod) {
		return (
			<Event
				name={`Setting: ${timePeriod}`}
				startDate={timePeriod}
				disableJsonLd={_define === "microdata"}
				disableMicrodata={_define === "linkedData"}
			>
				{baseElement}
			</Event>
		)
	}

	return baseElement
}

import type { BaseProps } from "../../../../../types/index.ts"

import { getDataAttributes } from "../../../../utilities/getDataAttributes/index.ts"
import { Event, Place } from "../../../define/index.ts"

export type Props = BaseProps & {
	element?: "div" | "section" | "p" | "span"
	define?: "microdata" | "linkedData" | "both"
	/**
	 * The location of the setting
	 */
	location?: string
	/**
	 * The time period of the setting
	 */
	timePeriod?: string
	/**
	 * Type of setting (e.g., "physical", "social", "cultural", "psychological")
	 */
	settingType?: string
	/**
	 * Mood or atmosphere of the setting
	 */
	atmosphere?: string
	/**
	 * Significance to the narrative (e.g., "primary", "secondary", "symbolic")
	 */
	significance?: string
}

/**
 * Describes the time and place where narrative events occur.
 * Used for establishing context and atmosphere in storytelling.
 *
 * @example
 * <Setting location="Victorian London" timePeriod="1888" atmosphere="foggy">
 *   The gas lamps flickered in the dense fog that rolled through the cobblestone streets.
 * </Setting>
 *
 * @example
 * <Setting settingType="psychological" atmosphere="tense">
 *   The room felt smaller with each passing moment, the walls seeming to close in.
 * </Setting>
 */
export default function Setting({
	element: Element = "div",
	define,
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
			class={`setting ${props.class || ""}`}
		>
			{children}
		</Element>
	)

	// Optionally define with Place or Event schema
	if (define && location) {
		return (
			<Place
				name={location}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
			>
				{baseElement}
			</Place>
		)
	}

	if (define && timePeriod) {
		return (
			<Event
				name={`Setting: ${timePeriod}`}
				startDate={timePeriod}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
			>
				{baseElement}
			</Event>
		)
	}

	return baseElement
}

/**
 * SceneSetting component
 *
 * Marks up the setting or location of a scene in narrative text. Provides
 * semantic identification of where and when action takes place, including
 * both physical locations and temporal settings.
 *
 * Example usage:
 *
 * <SceneSetting>A dark forest</SceneSetting>
 *
 * <SceneSetting
 *   location="Longbourn estate"
 *   time="morning"
 *   period="Regency England"
 * >
 *   The drawing room at Longbourn, early morning
 * </SceneSetting>
 *
 * <SceneSetting
 *   location="Death Star"
 *   atmosphere="tense"
 *   element="div"
 *   enrich="both"
 * >
 *   INT. DEATH STAR - THRONE ROOM - DAY
 * </SceneSetting>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// Atmosphere or mood of the setting
	atmosphere?: "peaceful" | "tense" | "mysterious" | "romantic" | "ominous" | "cheerful" | "melancholic"
	// HTML element to use
	element?: "span" | "div" | "aside" | "header"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// Interior or exterior
	interiorExterior?: "interior" | "exterior" | "both"
	// Primary location name
	location?: string
	// Historical period or era
	period?: string
	// Scene identifier
	sceneId?: string
	// Time of day
	time?: "dawn" | "morning" | "afternoon" | "evening" | "night" | "midnight"
	// Type of setting
	type?: "physical" | "temporal" | "emotional" | "social"
}

import { Place } from "../../../enrich/index.ts"

export default function SceneSetting({
	atmosphere,
	children,
	element: Element = "div",
	enrich,
	interiorExterior,
	location,
	period,
	sceneId,
	time,
	type = "physical",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"scene setting",
		type !== "physical" && `${type} setting`,
		location,
		time,
		period,
		atmosphere && `${atmosphere} atmosphere`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`scene-setting setting-${type}`}
			data-atmosphere={atmosphere}
			data-interior-exterior={interiorExterior}
			data-location={location}
			data-period={period}
			data-scene-id={sceneId}
			data-time={time}
			data-type={type}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with Place for enrichment
	if (enrich && location) {
		return (
			<Place
				name={location}
				description={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</Place>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`scene-setting setting-${type}`}
			data-atmosphere={atmosphere}
			data-interior-exterior={interiorExterior}
			data-location={location}
			data-period={period}
			data-scene-id={sceneId}
			data-time={time}
			data-type={type}
			itemProp="contentLocation"
			{...props}
		>
			{children}
		</Element>
	)
}
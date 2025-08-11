/**
 * Foreshadowing component
 *
 * Marks up hints, clues, or indications of future events in narrative text.
 * Provides semantic identification of literary devices that suggest what will
 * happen later in the story, helping readers identify predictive elements.
 *
 * Example usage:
 *
 * <Foreshadowing>
 *   Little did she know how important that key would become.
 * </Foreshadowing>
 *
 * <Foreshadowing
 *   type="symbolic"
 *   subtlety="subtle"
 * >
 *   The storm clouds gathered on the horizon.
 * </Foreshadowing>
 *
 * <Foreshadowing
 *   type="dialogue"
 *   subtlety="obvious"
 *   element="div"
 *   enrich="both"
 * >
 *   "Be careful what you wish for," the old woman warned.
 * </Foreshadowing>
 */
type EnrichmentLevel = "microdata" | "linkedData" | "both"

export type Props = {
	children?: JSX.Element | Array<JSX.Element> | string
	// HTML element to use
	element?: "span" | "div" | "aside" | "mark"
	// Level of semantic enrichment
	enrich?: EnrichmentLevel
	// How obvious the foreshadowing is
	subtlety?: "obvious" | "moderate" | "subtle" | "hidden"
	// Type of foreshadowing
	type?: "direct" | "symbolic" | "prophetic" | "dialogue" | "red-herring" | "chekhov-gun"
}

import { CreativeWork } from "../../../enrich/index.ts"

export default function Foreshadowing({
	children,
	element: Element = "span",
	enrich,
	subtlety = "moderate",
	type = "direct",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"foreshadowing",
		type !== "direct" && type.replace("-", " "),
		subtlety !== "moderate" && `${subtlety} hint`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`foreshadowing foreshadowing-${type}`}
			data-subtlety={subtlety}
			data-type={type}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with CreativeWork for enrichment
	if (enrich) {
		return (
			<CreativeWork
				text={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`foreshadowing foreshadowing-${type}`}
			data-subtlety={subtlety}
			data-type={type}
			itemProp="hasPart"
			{...props}
		>
			{children}
		</Element>
	)
}
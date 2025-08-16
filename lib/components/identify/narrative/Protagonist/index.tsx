import { Person } from "../../../enrich/index.ts"

export default function Protagonist({
	arcType = "growth",
	characterId,
	children,
	element: Element = "span",
	enrich,
	journeyStage,
	multiProtagonist = false,
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		multiProtagonist ? "co-protagonist" : "protagonist",
		journeyStage && `at ${journeyStage.replace("-", " ")} stage`,
		arcType !== "growth" && `${arcType} arc`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="protagonist character-role"
			data-arc-type={arcType}
			data-character-id={characterId}
			data-journey-stage={journeyStage}
			data-multi-protagonist={multiProtagonist}
			data-role="protagonist"
			{...props}
		>
			{enrich ? <span itemProp="name">{children}</span> : children}
		</Element>
	)

	// Wrap with Person component if enriching
	if (enrich && characterId) {
		return (
			<Person
				id={characterId}
				name={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
			>
				{baseElement}
			</Person>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class="protagonist character-role"
			data-arc-type={arcType}
			data-character-id={characterId}
			data-journey-stage={journeyStage}
			data-multi-protagonist={multiProtagonist}
			data-role="protagonist"
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}

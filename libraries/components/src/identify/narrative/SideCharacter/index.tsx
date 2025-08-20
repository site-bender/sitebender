import { Person } from "../../../enrich/index.ts"

export default function SideCharacter({
	characterId,
	children,
	element: Element = "span",
	enrich,
	fate,
	function: characterFunction,
	presence = "recurring",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"side character",
		characterFunction && characterFunction.replace("-", " "),
		presence !== "recurring" && `${presence} appearance`,
		fate && `${fate} by story's end`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="side-character character-role"
			data-character-id={characterId}
			data-fate={fate}
			data-function={characterFunction}
			data-presence={presence}
			data-role="side-character"
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
			class="side-character character-role"
			data-character-id={characterId}
			data-fate={fate}
			data-function={characterFunction}
			data-presence={presence}
			data-role="side-character"
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}

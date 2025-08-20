import { Person } from "../../../enrich/index.ts"

export default function Antagonist({
	characterId,
	children,
	element: Element = "span",
	enrich,
	motivation,
	redeemable = false,
	type = "character",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"antagonist",
		type !== "character" && `${type} antagonist`,
		motivation && `motivated by ${motivation}`,
		redeemable && "redeemable",
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class="antagonist character-role"
			data-character-id={characterId}
			data-motivation={motivation}
			data-redeemable={redeemable}
			data-role="antagonist"
			data-type={type}
			{...props}
		>
			{enrich && type === "character"
				? <span itemProp="name">{children}</span>
				: children}
		</Element>
	)

	// Wrap with Person component if enriching and it's a character
	if (enrich && characterId && type === "character") {
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
			class="antagonist character-role"
			data-character-id={characterId}
			data-motivation={motivation}
			data-redeemable={redeemable}
			data-role="antagonist"
			data-type={type}
			itemProp="character"
			{...props}
		>
			{children}
		</Element>
	)
}

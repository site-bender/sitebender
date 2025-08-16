import { Person } from "../../../enrich/index.ts"

export default function CharacterRelationship({
	children,
	element: Element = "span",
	enrich,
	from,
	reciprocal = false,
	status = "current",
	to,
	type = "friendship",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"relationship",
		type,
		reciprocal && "mutual",
		status !== "current" && status,
		from && to && `between ${from} and ${to}`,
	].filter(Boolean).join(" ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`character-relationship relationship-${type}`}
			data-from={from}
			data-reciprocal={reciprocal}
			data-status={status}
			data-to={to}
			data-type={type}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with Person component if enriching
	if (enrich && to) {
		return (
			<Person
				id={to}
				name={children}
				disableJsonLd={enrich === "microdata"}
				disableMicrodata={enrich === "linkedData"}
				itemProp="knows"
			>
				{baseElement}
			</Person>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`character-relationship relationship-${type}`}
			data-from={from}
			data-reciprocal={reciprocal}
			data-status={status}
			data-to={to}
			data-type={type}
			itemProp="knows"
			{...props}
		>
			{children}
		</Element>
	)
}

import { Person } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	characterId?: string
	element?:
		| keyof HTMLElementTagNameMap
		| ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	relation?: string
	with?: string
	children?: unknown
}

export default function CharacterRelationship({
	children,
	element: Element = "span",
	define,
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

	// Wrap with Person component if defineing
	if (define && to) {
		return (
			<Person
				identifier={to}
				name={typeof children === "string" ? children : undefined}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
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

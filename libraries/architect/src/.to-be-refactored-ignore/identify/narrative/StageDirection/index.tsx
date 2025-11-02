import CreativeWork from "../../../define/Thing/CreativeWork/index.tsx"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	element?:
		| keyof HTMLElementTagNameMap
		| ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	action?: string
	intensity?: "subtle" | "strong"
	children?: unknown
}

export default function StageDirection({
	category,
	characterId,
	children,
	element: Element = "span",
	define,
	placement = "inline",
	type = "action",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"stage direction",
		type !== "action" && type,
		category && `${category} direction`,
		characterId && `for character ${characterId}`,
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`stage-direction direction-${type} placement-${placement}`}
			data-category={category}
			data-character-id={characterId}
			data-placement={placement}
			data-type={type}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with CreativeWork for definement
	if (define) {
		return (
			<CreativeWork
				text={typeof children === "string" ? children : undefined}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`stage-direction direction-${type} placement-${placement}`}
			data-category={category}
			data-character-id={characterId}
			data-placement={placement}
			data-type={type}
			itemProp="workExample"
			{...props}
		>
			{children}
		</Element>
	)
}

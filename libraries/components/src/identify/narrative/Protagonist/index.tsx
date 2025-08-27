import { Person } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	characterId?: string
	element?: keyof HTMLElementTagNameMap | ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	motivation?: string
	arcType?: string
	journeyStage?: string
	multiProtagonist?: boolean
	children?: string
}

export default function Protagonist({
	arcType = "growth",
	characterId,
	children,
	element: Element = "span",
	define,
	journeyStage,
	multiProtagonist = false,
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		multiProtagonist ? "co-protagonist" : "protagonist",
		journeyStage && `at ${(journeyStage as string).replace("-", " ")} stage`,
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
			{define ? <span itemProp="name">{children}</span> : children}
		</Element>
	)

	// Wrap with Person component if defineing
	if (define && characterId) {
		return (
			<Person
				identifier={characterId}
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

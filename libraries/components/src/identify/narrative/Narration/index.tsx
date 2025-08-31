import { CreativeWork, Person } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	element?:
		| keyof HTMLElementTagNameMap
		| ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	narrator?: string
	narratorId?: string
	narratorType?: string
	perspective?: string
	style?: string
	tense?: string
	children?: unknown
}

export default function Narration({
	children,
	element: Element = "div",
	define,
	narrator,
	narratorId,
	narratorType = "omniscient",
	perspective = "third-person",
	style = "descriptive",
	tense = "past",
	...props
}: Props): JSX.Element {
	const ariaLabel = [
		"narration",
		perspective.replace("-", " "),
		narratorType !== "omniscient" && `${narratorType} narrator`,
		narrator && `by ${narrator}`,
		style !== "descriptive" && style.replace("-", " "),
	].filter(Boolean).join(", ")

	const baseElement = (
		<Element
			aria-label={ariaLabel}
			class={`narration narration-${style}`}
			data-narrator={narrator}
			data-narrator-id={narratorId}
			data-narrator-type={narratorType}
			data-perspective={perspective}
			data-style={style}
			data-tense={tense}
			{...props}
		>
			{children}
		</Element>
	)

	// Wrap with CreativeWork and/or Person for definement
	if (define) {
		const workElement = (
			<CreativeWork
				text={typeof children === "string" ? children : undefined}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
			>
				{baseElement}
			</CreativeWork>
		)

		if (narratorId && narrator) {
			return (
				<Person
					identifier={narratorId}
					name={typeof narrator === "string" ? narrator : undefined}
					disableJsonLd={define === "microdata"}
					disableMicrodata={define === "linkedData"}
				>
					{workElement}
				</Person>
			)
		}

		return workElement
	}

	// Default: lightweight with data attributes and basic microdata
	return (
		<Element
			aria-label={ariaLabel}
			class={`narration narration-${style}`}
			data-narrator={narrator}
			data-narrator-id={narratorId}
			data-narrator-type={narratorType}
			data-perspective={perspective}
			data-style={style}
			data-tense={tense}
			itemProp="text"
			{...props}
		>
			{children}
		</Element>
	)
}

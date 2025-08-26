import { Place } from "../../../define/index.ts"

type BaseProps = Record<string, unknown>
export type Props = BaseProps & {
	element?: keyof HTMLElementTagNameMap | ((props: Record<string, unknown>) => unknown)
	define?: "microdata" | "linkedData" | "both"
	location?: string
	time?: string
	atmosphere?: string
	children?: unknown
}

export default function SceneSetting({
	atmosphere,
	children,
	element: Element = "div",
	define,
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

	// Wrap with Place for definement
	if (define && location) {
		return (
			<Place
				name={location}
				description={children}
				disableJsonLd={define === "microdata"}
				disableMicrodata={define === "linkedData"}
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

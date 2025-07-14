import type { BCP47LanguageTag } from "../types/bcp47/index.ts"
import type { ThingProps } from "../types/index.ts"

import cleanObject from "../helpers/createJsonLdScript/cleanObject/index.ts"

// Base Thing component properties
export type BaseThingProps = ThingProps & {
	name: string // Required name for all Things
	children?: never // Prevent children - use explicit name prop
	// Standard component props
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	class?: string
	id?: string
	style?: string
	// Language and internationalization
	inLanguage?: BCP47LanguageTag
	// Element type override for different Thing subtypes
	elementType?: keyof HTMLElementTagNameMap
	// Schema.org type override
	schemaType?: string
	// Additional properties that can be passed to the schema
	additionalSchemaProperties?: Record<string, any>
}

export default function Thing({
	name,
	description,
	url,
	image,
	alternateName,
	disambiguatingDescription,
	identifier,
	mainEntityOfPage,
	potentialAction,
	sameAs,
	subjectOf,
	additionalType,
	itemProp,
	disableMicrodata = false,
	disableLinkedData = false,
	class: additionalClass,
	id,
	style,
	inLanguage,
	elementType = "span",
	schemaType = "Thing",
	additionalSchemaProperties = {},
	...props
}: BaseThingProps) {
	// Build class names
	const classNames = [
		"thing",
		schemaType.toLowerCase().replace(/([A-Z])/g, "-$1").substring(1),
	]
	if (inLanguage) classNames.push(`lang-${inLanguage}`)
	if (additionalClass) classNames.push(additionalClass)

	// Generate JSON-LD unless disabled
	const rawJsonLd = !disableLinkedData
		? {
			"@context": "https://schema.org",
			"@type": schemaType,
			"name": name,
			"description": description,
			"url": url,
			"image": image,
			"alternateName": alternateName,
			"disambiguatingDescription": disambiguatingDescription,
			"identifier": identifier,
			"mainEntityOfPage": mainEntityOfPage,
			"potentialAction": potentialAction,
			"sameAs": sameAs,
			"subjectOf": subjectOf,
			"additionalType": additionalType,
			"inLanguage": inLanguage,
			// Include any additional schema properties
			...additionalSchemaProperties,
		}
		: null

	// Clean the JSON-LD to remove undefined values
	const jsonLd = rawJsonLd ? cleanObject(rawJsonLd as any) : null

	// Use the specified element type with JSX
	const Component = elementType

	return (
		<Component
			class={classNames.join(" ")}
			{...(!disableMicrodata && {
				itemScope: true,
				itemType: `https://schema.org/${schemaType}`,
				itemProp: itemProp,
			})}
			{...(inLanguage && { lang: inLanguage })}
			id={id}
			style={style}
			{...props}
		>
			{name}

			{/* Microdata meta tags - nested within itemScope */}
			{!disableMicrodata && (
				<>
					{description && <meta itemProp="description" content={description} />}
					{url && <meta itemProp="url" content={url} />}
					{image && <meta itemProp="image" content={image} />}
					{alternateName && (
						<meta itemProp="alternateName" content={alternateName} />
					)}
					{disambiguatingDescription && (
						<meta
							itemProp="disambiguatingDescription"
							content={disambiguatingDescription}
						/>
					)}
					{identifier && <meta itemProp="identifier" content={identifier} />}
					{mainEntityOfPage && (
						<meta itemProp="mainEntityOfPage" content={mainEntityOfPage} />
					)}
					{potentialAction && (
						<meta itemProp="potentialAction" content={potentialAction} />
					)}
					{subjectOf && <meta itemProp="subjectOf" content={subjectOf} />}
					{additionalType && (
						<meta itemProp="additionalType" content={additionalType} />
					)}
					{inLanguage && <meta itemProp="inLanguage" content={inLanguage} />}
					{/* Handle array properties */}
					{sameAs &&
						sameAs.map((sa, index) => (
							<meta key={`sameAs-${index}`} itemProp="sameAs" content={sa} />
						))}
				</>
			)}

			{/* JSON-LD script nested within the component */}
			{jsonLd && (
				<script type="application/ld+json">
					{JSON.stringify(jsonLd, null, 2)}
				</script>
			)}
		</Component>
	)
}

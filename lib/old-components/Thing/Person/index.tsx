import type { BCP47LanguageTag } from "../../types/bcp47/index.ts"
import type { ThingProps } from "../../types/index.ts"

import Thing from "../index.tsx"

// Address type for structured addresses
export type Address = {
	streetAddress: string
	addressLocality: string
	addressRegion: string
	postalCode: string
	addressCountry: string
}

// Person-specific properties
export type PersonProps = ThingProps & {
	name: string // Person's full name
	children?: never // Prevent children - use explicit name prop
	// Person-specific properties
	givenName?: string // First name
	familyName?: string // Last name
	additionalName?: string // Middle name(s)
	honorificPrefix?: string // Title (Dr., Prof., etc.)
	honorificSuffix?: string // Suffix (Jr., PhD, etc.)
	email?: string // Email address
	telephone?: string // Phone number
	url?: string // Website/profile URL
	image?: string // Photo URL
	jobTitle?: string // Current job title
	worksFor?: string // Organization name
	affiliation?: string[] // Affiliated organizations
	alumniOf?: string[] // Educational institutions
	award?: string[] // Awards received
	birthDate?: string // Birth date
	birthPlace?: string // Birth place
	nationality?: string // Nationality
	address?: Address // Structured address
	knowsLanguage?: BCP47LanguageTag[] // Languages known
	colleague?: string[] // Colleagues
	follows?: string[] // People followed
	knows?: string[] // People known
	// Standard component props
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	onError?: (error: string) => void
	class?: string
	id?: string
	style?: string
	inLanguage?: BCP47LanguageTag
}

export default function Person({
	name,
	givenName,
	familyName,
	additionalName,
	honorificPrefix,
	honorificSuffix,
	email,
	telephone,
	url,
	description,
	image,
	jobTitle,
	worksFor,
	affiliation,
	alumniOf,
	award,
	birthDate,
	birthPlace,
	nationality,
	address,
	knowsLanguage,
	colleague,
	follows,
	knows,
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
	onError,
	class: additionalClass,
	id,
	style,
	inLanguage,
	...props
}: PersonProps) {
	// Person-specific schema properties
	const personSchemaProperties = {
		// Person-specific properties
		givenName,
		familyName,
		additionalName,
		honorificPrefix,
		honorificSuffix,
		email,
		telephone,
		jobTitle,
		worksFor: worksFor
			? { "@type": "Organization", "name": worksFor }
			: undefined,
		affiliation: affiliation?.map((org) => ({
			"@type": "Organization",
			"name": org,
		})),
		alumniOf: alumniOf?.map((school) => ({
			"@type": "EducationalOrganization",
			"name": school,
		})),
		award,
		birthDate,
		birthPlace,
		nationality,
		knowsLanguage,
		colleague: colleague?.map((c) => ({ "@type": "Person", "name": c })),
		follows: follows?.map((f) => ({ "@type": "Person", "name": f })),
		knows: knows?.map((k) => ({ "@type": "Person", "name": k })),
		address: address
			? {
				"@type": "PostalAddress",
				streetAddress: address.streetAddress,
				addressLocality: address.addressLocality,
				addressRegion: address.addressRegion,
				postalCode: address.postalCode,
				addressCountry: address.addressCountry,
			}
			: undefined,
	}

	// Delegate to Thing component with Person-specific properties
	return (
		<Thing
			name={name}
			description={description}
			url={url}
			image={image}
			alternateName={alternateName}
			disambiguatingDescription={disambiguatingDescription}
			identifier={identifier}
			mainEntityOfPage={mainEntityOfPage}
			potentialAction={potentialAction}
			sameAs={sameAs}
			subjectOf={subjectOf}
			additionalType={additionalType}
			itemProp={itemProp}
			disableMicrodata={disableMicrodata}
			disableLinkedData={disableLinkedData}
			onError={onError}
			class={additionalClass}
			id={id}
			style={style}
			inLanguage={inLanguage}
			elementType="span"
			schemaType="Person"
			additionalSchemaProperties={personSchemaProperties}
			{...props}
		/>
	)
}

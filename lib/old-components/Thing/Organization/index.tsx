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

// Organization-specific properties
export type OrganizationProps = ThingProps & {
	name: string // Organization name
	children?: never // Prevent children - use explicit name prop
	// Organization-specific properties
	address?: Address // Structured address
	telephone?: string // Phone number
	email?: string // Email address
	url?: string // Website URL
	logo?: string // Logo URL
	foundingDate?: string // Founding date
	foundingLocation?: string // Where founded
	founder?: string // Founder name
	numberOfEmployees?: number // Employee count
	industry?: string // Industry/field
	parentOrganization?: string // Parent organization
	subOrganization?: string[] // Sub-organizations
	member?: string[] // Members
	award?: string[] // Awards received
	contactPoint?: {
		telephone?: string
		email?: string
		contactType?: string
		availableLanguage?: BCP47LanguageTag[]
	}
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

export default function Organization({
	additionalType,
	address,
	alternateName,
	award,
	class: additionalClass,
	contactPoint,
	description,
	disableLinkedData = false,
	disableMicrodata = false,
	disambiguatingDescription,
	email,
	founder,
	foundingDate,
	foundingLocation,
	id,
	identifier,
	image,
	inLanguage,
	industry,
	itemProp,
	logo,
	mainEntityOfPage,
	member,
	name,
	numberOfEmployees,
	onError,
	parentOrganization,
	potentialAction,
	sameAs,
	style,
	subOrganization,
	subjectOf,
	telephone,
	url,
	...props
}: OrganizationProps) {
	// Organization-specific schema properties
	const organizationSchemaProperties = {
		// Organization-specific properties
		telephone,
		email,
		logo,
		foundingDate,
		foundingLocation,
		founder: founder ? { "@type": "Person", "name": founder } : undefined,
		numberOfEmployees,
		knowsAbout: industry,
		parentOrganization: parentOrganization
			? { "@type": "Organization", "name": parentOrganization }
			: undefined,
		subOrganization: subOrganization?.map((sub) => ({
			"@type": "Organization",
			"name": sub,
		})),
		member: member?.map((m) => ({ "@type": "Person", "name": m })),
		award,
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
		contactPoint: contactPoint
			? {
				"@type": "ContactPoint",
				telephone: contactPoint.telephone,
				email: contactPoint.email,
				contactType: contactPoint.contactType,
				availableLanguage: contactPoint.availableLanguage,
			}
			: undefined,
	}

	// Delegate to Thing component with Organization-specific properties
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
			schemaType="Organization"
			additionalSchemaProperties={organizationSchemaProperties}
			{...props}
		/>
	)
}

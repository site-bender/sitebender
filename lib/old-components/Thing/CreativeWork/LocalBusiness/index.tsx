import type { CreativeWorkProps } from "../../types/index.ts"

import CreativeWork from "../index.tsx"

// Address type for structured addresses
export type Address = {
	streetAddress: string
	addressLocality: string
	addressRegion: string
	postalCode: string
	addressCountry: string
}

// LocalBusiness-specific properties
export type LocalBusinessProps = CreativeWorkProps & {
	name: string // Business name
	children?: never // Prevent children - use explicit name prop
	// LocalBusiness-specific properties
	businessType?:
		| "Restaurant"
		| "Store"
		| "AutoDealer"
		| "Hotel"
		| "Hospital"
		| "Pharmacy"
		| "Bank"
		| "GasStation"
		| "MovieTheater"
		| "TouristAttraction"
		| "LocalBusiness" // Generic fallback
	address?: Address // Structured address
	telephone?: string // Phone number
	email?: string // Email address
	url?: string // Website URL
	openingHours?: string // Opening hours (e.g., "Mo-Fr 09:00-17:00")
	priceRange?: "$" | "$$" | "$$$" | "$$$$" // Price range indicator
	acceptsReservations?: boolean // Whether reservations are accepted
	currenciesAccepted?: string[] // Accepted currencies
	paymentAccepted?: string[] // Accepted payment methods
	servesCuisine?: string[] // For restaurants
	menu?: string // Menu URL
	hasMap?: string // Map URL
	photo?: string | string[] // Business photos
	logo?: string // Business logo URL
	description?: string // Business description
	aggregateRating?: {
		ratingValue: number
		reviewCount: number
		bestRating?: number
		worstRating?: number
	}
	// Standard component props
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	onError?: (error: string) => void
	class?: string
	id?: string
	style?: string
}

export default function LocalBusiness({
	name,
	businessType = "LocalBusiness",
	address,
	telephone,
	email,
	url,
	openingHours,
	priceRange,
	acceptsReservations,
	currenciesAccepted,
	paymentAccepted,
	servesCuisine,
	menu,
	hasMap,
	photo,
	logo,
	description,
	aggregateRating,
	itemProp,
	disableMicrodata = false,
	disableLinkedData = false,
	onError,
	class: additionalClass,
	id,
	style,
	...props
}: LocalBusinessProps) {
	// Prepare additional properties for schema override
	const additionalProperties: Record<string, any> = {}

	if (telephone) additionalProperties.telephone = telephone
	if (email) additionalProperties.email = email
	if (openingHours) additionalProperties.openingHours = openingHours
	if (priceRange) additionalProperties.priceRange = priceRange
	if (acceptsReservations !== undefined) {
		additionalProperties.acceptsReservations = acceptsReservations
	}
	if (currenciesAccepted) {
		additionalProperties.currenciesAccepted = currenciesAccepted
	}
	if (paymentAccepted) additionalProperties.paymentAccepted = paymentAccepted
	if (servesCuisine) additionalProperties.servesCuisine = servesCuisine
	if (menu) additionalProperties.menu = menu
	if (hasMap) additionalProperties.hasMap = hasMap
	if (logo) additionalProperties.logo = logo

	// Handle structured address
	if (address) {
		additionalProperties.address = {
			"@type": "PostalAddress",
			streetAddress: address.streetAddress,
			addressLocality: address.addressLocality,
			addressRegion: address.addressRegion,
			postalCode: address.postalCode,
			addressCountry: address.addressCountry,
		}
	}

	// Handle photos
	if (photo) {
		additionalProperties.photo = Array.isArray(photo) ? photo : [photo]
	}

	// Handle aggregate rating
	if (aggregateRating) {
		additionalProperties.aggregateRating = {
			"@type": "AggregateRating",
			ratingValue: aggregateRating.ratingValue,
			reviewCount: aggregateRating.reviewCount,
			...(aggregateRating.bestRating &&
				{ bestRating: aggregateRating.bestRating }),
			...(aggregateRating.worstRating &&
				{ worstRating: aggregateRating.worstRating }),
		}
	}

	return (
		<CreativeWork
			title={name}
			description={description}
			url={url}
			image={Array.isArray(photo) ? photo[0] : photo}
			itemProp={itemProp}
			disableMicrodata={disableMicrodata}
			disableLinkedData={disableLinkedData}
			onError={onError}
			class={additionalClass}
			id={id}
			style={style}
			schemaOverride={{
				type: businessType,
				additionalProperties,
			}}
			{...props}
		/>
	)
}

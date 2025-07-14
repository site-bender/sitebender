import type { CreativeWorkProps } from "../../types/index.ts"

import CreativeWork from "../index.tsx"

// Product-specific properties
export type ProductProps = CreativeWorkProps & {
	title: string // Required product name
	children?: never // Prevent children - use explicit title prop
	// Product-specific properties
	brand?: string // Brand name
	price?: number // Price value
	priceCurrency?: string // Currency code (USD, EUR, etc.)
	availability?:
		| "InStock"
		| "OutOfStock"
		| "PreOrder"
		| "Discontinued"
		| "LimitedAvailability"
	sku?: string // Stock keeping unit
	gtin?: string // Global Trade Item Number
	mpn?: string // Manufacturer Part Number
	category?: string // Product category
	model?: string // Product model
	color?: string // Product color
	size?: string // Product size
	weight?: string // Product weight
	dimensions?: string // Product dimensions
	material?: string // Product material
	aggregateRating?: {
		ratingValue: number
		reviewCount: number
		bestRating?: number
		worstRating?: number
	}
	review?: Array<{
		author: string
		ratingValue: number
		reviewBody: string
		datePublished?: string
	}>
	// Basic CreativeWork properties commonly used for products
	description?: string
	image?: string | string[]
	url?: string
	manufacturer?: string
	datePublished?: string
	// Standard component props
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	onError?: (error: string) => void
	class?: string
	id?: string
	style?: string
}

export default function Product({
	title,
	brand,
	price,
	priceCurrency = "USD",
	availability,
	sku,
	gtin,
	mpn,
	category,
	model,
	color,
	size,
	weight,
	dimensions,
	material,
	aggregateRating,
	review,
	description,
	image,
	url,
	manufacturer,
	datePublished,
	itemProp,
	disableMicrodata = false,
	disableLinkedData = false,
	onError,
	class: additionalClass,
	id,
	style,
	...props
}: ProductProps) {
	// Prepare additional properties for schema override
	const additionalProperties: Record<string, any> = {}

	if (brand) additionalProperties.brand = { "@type": "Brand", "name": brand }
	if (sku) additionalProperties.sku = sku
	if (gtin) additionalProperties.gtin = gtin
	if (mpn) additionalProperties.mpn = mpn
	if (category) additionalProperties.category = category
	if (model) additionalProperties.model = model
	if (color) additionalProperties.color = color
	if (size) additionalProperties.size = size
	if (weight) additionalProperties.weight = weight
	if (dimensions) additionalProperties.dimensions = dimensions
	if (material) additionalProperties.material = material
	if (manufacturer) {
		additionalProperties.manufacturer = {
			"@type": "Organization",
			"name": manufacturer,
		}
	}

	// Handle offers (price and availability)
	if (price !== undefined || availability) {
		additionalProperties.offers = {
			"@type": "Offer",
			...(price !== undefined && { price }),
			...(priceCurrency && { priceCurrency }),
			...(availability &&
				{ availability: `https://schema.org/${availability}` }),
		}
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

	// Handle reviews
	if (review && review.length > 0) {
		additionalProperties.review = review.map((r) => ({
			"@type": "Review",
			author: { "@type": "Person", name: r.author },
			reviewRating: {
				"@type": "Rating",
				ratingValue: r.ratingValue,
			},
			reviewBody: r.reviewBody,
			...(r.datePublished && { datePublished: r.datePublished }),
		}))
	}

	return (
		<CreativeWork
			title={title}
			description={description}
			image={Array.isArray(image) ? image[0] : image}
			url={url}
			datePublished={datePublished}
			itemProp={itemProp}
			disableMicrodata={disableMicrodata}
			disableLinkedData={disableLinkedData}
			onError={onError}
			class={additionalClass}
			id={id}
			style={style}
			schemaOverride={{
				type: "Product",
				additionalProperties,
			}}
			{...props}
		/>
	)
}

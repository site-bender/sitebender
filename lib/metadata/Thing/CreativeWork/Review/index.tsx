import type { CreativeWorkProps } from "../../types/index.ts"

import CreativeWork from "../index.tsx"

// Review-specific properties
export type ReviewProps = CreativeWorkProps & {
	reviewBody: string // The actual review text content
	children?: never // Prevent children - use explicit reviewBody prop
	// Review-specific properties
	author?: string // Review author name
	ratingValue?: number // Rating value (1-5, 1-10, etc.)
	bestRating?: number // Best possible rating (default 5)
	worstRating?: number // Worst possible rating (default 1)
	itemReviewed?: string // Name of the item being reviewed
	itemReviewedType?: string // Type of the item being reviewed
	itemReviewedUrl?: string // URL of the item being reviewed
	datePublished?: string // When the review was published
	dateModified?: string // When the review was last modified
	positiveNotes?: string // Positive aspects
	negativeNotes?: string // Negative aspects
	// Standard component props
	itemProp?: string
	disableMicrodata?: boolean
	disableLinkedData?: boolean
	onError?: (error: string) => void
	class?: string
	id?: string
	style?: string
}

export default function Review({
	reviewBody,
	author,
	ratingValue,
	bestRating = 5,
	worstRating = 1,
	itemReviewed,
	itemReviewedType = "Thing",
	itemReviewedUrl,
	datePublished,
	dateModified,
	positiveNotes,
	negativeNotes,
	itemProp,
	disableMicrodata = false,
	disableLinkedData = false,
	onError,
	class: additionalClass,
	id,
	style,
	...props
}: ReviewProps) {
	// Prepare additional properties for schema override
	const additionalProperties: Record<string, any> = {}

	additionalProperties.reviewBody = reviewBody

	if (author) {
		additionalProperties.author = { "@type": "Person", "name": author }
	}
	if (positiveNotes) additionalProperties.positiveNotes = positiveNotes
	if (negativeNotes) additionalProperties.negativeNotes = negativeNotes

	// Handle rating
	if (ratingValue !== undefined) {
		additionalProperties.reviewRating = {
			"@type": "Rating",
			ratingValue,
			bestRating,
			worstRating,
		}
	}

	// Handle item being reviewed
	if (itemReviewed) {
		additionalProperties.itemReviewed = {
			"@type": itemReviewedType,
			"name": itemReviewed,
			...(itemReviewedUrl && { url: itemReviewedUrl }),
		}
	}

	return (
		<CreativeWork
			title={`Review${itemReviewed ? ` of ${itemReviewed}` : ""}`}
			text={reviewBody}
			author={author}
			datePublished={datePublished}
			dateModified={dateModified}
			itemProp={itemProp}
			disableMicrodata={disableMicrodata}
			disableLinkedData={disableLinkedData}
			onError={onError}
			class={additionalClass}
			id={id}
			style={style}
			schemaOverride={{
				type: "Review",
				additionalProperties,
			}}
			{...props}
		/>
	)
}

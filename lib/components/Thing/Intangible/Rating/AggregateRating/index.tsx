import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { RatingProps } from "../../../../../types/Thing/Intangible/Rating/index.ts"
import type { AggregateRatingProps } from "../../../../../types/Thing/Intangible/Rating/AggregateRating/index.ts"

import Rating from "../index.tsx"

export type Props = BaseComponentProps<
	AggregateRatingProps,
	"AggregateRating",
	ExtractLevelProps<ThingProps, IntangibleProps, RatingProps>
>

export default function AggregateRating({
	itemReviewed,
	ratingCount,
	reviewCount,
	schemaType = "AggregateRating",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Rating
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				itemReviewed,
				ratingCount,
				reviewCount,
				...subtypeProperties,
			}}
		/>
	)
}

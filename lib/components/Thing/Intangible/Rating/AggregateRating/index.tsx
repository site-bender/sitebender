import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AggregateRatingProps from "../../../../../types/Thing/AggregateRating/index.ts"
import type RatingProps from "../../../../../types/Thing/Rating/index.ts"

import Rating from "./index.tsx"

export type Props = BaseComponentProps<
	AggregateRatingProps,
	"AggregateRating",
	ExtractLevelProps<AggregateRatingProps, RatingProps>
>

export default function AggregateRating(
	{
		itemReviewed,
		ratingCount,
		reviewCount,
		schemaType = "AggregateRating",
		subtypeProperties = {},
		...props
	}: Props,
) {
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

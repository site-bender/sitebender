import type BaseProps from "../../../../../types/index.ts"
import type AggregateRatingProps from "../../../../../types/Thing/Intangible/Rating/AggregateRating/index.ts"

import Rating from "../index.tsx"

export type Props = AggregateRatingProps & BaseProps

export default function AggregateRating({
	itemReviewed,
	ratingCount,
	reviewCount,
	_type = "AggregateRating",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Rating
			{...props}
			_type={_type}
			subtypeProperties={{
				itemReviewed,
				ratingCount,
				reviewCount,
				...subtypeProperties,
			}}
		>
			{children}
		</Rating>
	)
}

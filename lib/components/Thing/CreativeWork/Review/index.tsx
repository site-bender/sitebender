import type BaseProps from "../../../../types/index.ts"
import type ReviewProps from "../../../../types/Thing/CreativeWork/Review/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ReviewProps & BaseProps

export default function Review({
	associatedClaimReview,
	associatedMediaReview,
	associatedReview,
	itemReviewed,
	negativeNotes,
	positiveNotes,
	reviewAspect,
	reviewBody,
	reviewRating,
	_type = "Review",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				associatedClaimReview,
				associatedMediaReview,
				associatedReview,
				itemReviewed,
				negativeNotes,
				positiveNotes,
				reviewAspect,
				reviewBody,
				reviewRating,
				...subtypeProperties,
			}}
		>{children}</CreativeWork>
	)
}

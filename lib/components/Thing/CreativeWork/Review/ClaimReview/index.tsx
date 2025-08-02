import type BaseProps from "../../../../../types/index.ts"
import type ClaimReviewProps from "../../../../../types/Thing/CreativeWork/Review/ClaimReview/index.ts"

import Review from "../index.tsx"

export type Props = ClaimReviewProps & BaseProps

export default function ClaimReview({
	claimReviewed,
	_type = "ClaimReview",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Review
			{...props}
			_type={_type}
			subtypeProperties={{
				claimReviewed,
				...subtypeProperties,
			}}
		>
			{children}
		</Review>
	)
}

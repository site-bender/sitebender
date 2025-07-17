import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ClaimReviewProps from "../../../../../types/Thing/ClaimReview/index.ts"
import type ReviewProps from "../../../../../types/Thing/Review/index.ts"

import Review from "../index.tsx"

export type Props = BaseComponentProps<
	ClaimReviewProps,
	"ClaimReview",
	ExtractLevelProps<ClaimReviewProps, ReviewProps>
>

export default function ClaimReview(
	{
		claimReviewed,
		schemaType = "ClaimReview",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Review
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				claimReviewed,
				...subtypeProperties,
			}}
		/>
	)
}

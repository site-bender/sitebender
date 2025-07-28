import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { ReviewProps } from "../../../../../types/Thing/CreativeWork/Review/index.ts"
import type { ClaimReviewProps } from "../../../../../types/Thing/CreativeWork/Review/ClaimReview/index.ts"

import Review from "../index.tsx"

export type Props = BaseComponentProps<
	ClaimReviewProps,
	"ClaimReview",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ReviewProps>
>

export default function ClaimReview({
	claimReviewed,
	schemaType = "ClaimReview",
	subtypeProperties = {},
	...props
}): Props {
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

import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

import ClaimReviewComponent from "../../../../../../components/Thing/CreativeWork/Review/ClaimReview/index.tsx"

export interface ClaimReviewProps {
	claimReviewed?: Text
}

type ClaimReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& ClaimReviewProps

export default ClaimReview

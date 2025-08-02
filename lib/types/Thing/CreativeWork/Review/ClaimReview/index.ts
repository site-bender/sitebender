import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

export type ClaimReviewType = "ClaimReview"

export interface ClaimReviewProps {
	"@type"?: ClaimReviewType
	claimReviewed?: Text
}

type ClaimReview = Thing & CreativeWorkProps & ReviewProps & ClaimReviewProps

export default ClaimReview

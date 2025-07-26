import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

export interface CriticReviewProps {
}

type CriticReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& CriticReviewProps

export default CriticReview

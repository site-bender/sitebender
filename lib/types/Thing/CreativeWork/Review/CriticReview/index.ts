import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

import CriticReviewComponent from "../../../../../../components/Thing/CreativeWork/Review/CriticReview/index.tsx"

export interface CriticReviewProps {
}

type CriticReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& CriticReviewProps

export default CriticReview

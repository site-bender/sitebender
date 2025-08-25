import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"
import type { ReviewNewsArticleType } from "./ReviewNewsArticle/index.ts"

export type CriticReviewType = "CriticReview" | ReviewNewsArticleType

export interface CriticReviewProps {
	"@type"?: CriticReviewType
}

type CriticReview = Thing & CreativeWorkProps & ReviewProps & CriticReviewProps

export default CriticReview

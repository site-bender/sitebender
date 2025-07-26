import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ReviewProps } from "../../../Review/index.ts"
import type { CriticReviewProps } from "../../../Review/CriticReview/index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

export interface ReviewNewsArticleProps {
}

type ReviewNewsArticle =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& CriticReviewProps
	& ArticleProps
	& NewsArticleProps
	& ReviewNewsArticleProps

export default ReviewNewsArticle

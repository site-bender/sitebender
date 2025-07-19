// ReviewNewsArticle extends NewsArticle but adds no additional properties
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ReviewNewsArticleProps {}

type ReviewNewsArticle =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& NewsArticleProps
	& ReviewNewsArticleProps

export default ReviewNewsArticle

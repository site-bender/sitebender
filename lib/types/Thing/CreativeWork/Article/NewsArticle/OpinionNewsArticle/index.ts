import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

export interface OpinionNewsArticleProps {}

type OpinionNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& OpinionNewsArticleProps

export default OpinionNewsArticle

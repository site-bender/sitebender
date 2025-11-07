import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

export type OpinionNewsArticleType = "OpinionNewsArticle"

export interface OpinionNewsArticleProps {
	"@type"?: OpinionNewsArticleType
}

type OpinionNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& OpinionNewsArticleProps

export default OpinionNewsArticle

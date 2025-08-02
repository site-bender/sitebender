import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

export type AskPublicNewsArticleType = "AskPublicNewsArticle"

export interface AskPublicNewsArticleProps {
	"@type"?: AskPublicNewsArticleType
}

type AskPublicNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& AskPublicNewsArticleProps

export default AskPublicNewsArticle

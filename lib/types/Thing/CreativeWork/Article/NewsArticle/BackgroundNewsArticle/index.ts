import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

export type BackgroundNewsArticleType = "BackgroundNewsArticle"

export interface BackgroundNewsArticleProps {
	"@type"?: BackgroundNewsArticleType
}

type BackgroundNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& BackgroundNewsArticleProps

export default BackgroundNewsArticle

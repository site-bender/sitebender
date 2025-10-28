import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

export type ReportageNewsArticleType = "ReportageNewsArticle"

export interface ReportageNewsArticleProps {
	"@type"?: ReportageNewsArticleType
}

type ReportageNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& ReportageNewsArticleProps

export default ReportageNewsArticle

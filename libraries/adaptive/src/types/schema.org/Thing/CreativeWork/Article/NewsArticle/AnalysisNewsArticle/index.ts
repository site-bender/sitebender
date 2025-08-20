import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

export type AnalysisNewsArticleType = "AnalysisNewsArticle"

export interface AnalysisNewsArticleProps {
	"@type"?: AnalysisNewsArticleType
}

type AnalysisNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& AnalysisNewsArticleProps

export default AnalysisNewsArticle

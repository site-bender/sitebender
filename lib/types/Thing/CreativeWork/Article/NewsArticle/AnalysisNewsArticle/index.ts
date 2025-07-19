// AnalysisNewsArticle extends NewsArticle but adds no additional properties
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AnalysisNewsArticleProps {}

type AnalysisNewsArticle =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& NewsArticleProps
	& AnalysisNewsArticleProps

export default AnalysisNewsArticle

import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

import AnalysisNewsArticleComponent from "../../../../../../../components/Thing/CreativeWork/Article/NewsArticle/AnalysisNewsArticle/index.tsx"

export interface AnalysisNewsArticleProps {
}

type AnalysisNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& AnalysisNewsArticleProps

export default AnalysisNewsArticle

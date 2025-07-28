import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { NewsArticleProps } from "../index.ts"

import ReportageNewsArticleComponent from "../../../../../../../components/Thing/CreativeWork/Article/NewsArticle/ReportageNewsArticle/index.tsx"

export interface ReportageNewsArticleProps {
}

type ReportageNewsArticle =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& NewsArticleProps
	& ReportageNewsArticleProps

export default ReportageNewsArticle

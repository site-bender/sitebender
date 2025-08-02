import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"
import type { AnalysisNewsArticleType } from "./AnalysisNewsArticle/index.ts"
import type { AskPublicNewsArticleType } from "./AskPublicNewsArticle/index.ts"
import type { BackgroundNewsArticleType } from "./BackgroundNewsArticle/index.ts"
import type { OpinionNewsArticleType } from "./OpinionNewsArticle/index.ts"
import type { ReportageNewsArticleType } from "./ReportageNewsArticle/index.ts"
import type { ReviewNewsArticleType } from "./ReviewNewsArticle/index.ts"

export type NewsArticleType =
	| "NewsArticle"
	| BackgroundNewsArticleType
	| AnalysisNewsArticleType
	| AskPublicNewsArticleType
	| ReportageNewsArticleType
	| ReviewNewsArticleType
	| OpinionNewsArticleType

export interface NewsArticleProps {
	"@type"?: NewsArticleType
	dateline?: Text
	printColumn?: Text
	printEdition?: Text
	printPage?: Text
	printSection?: Text
}

type NewsArticle = Thing & CreativeWorkProps & ArticleProps & NewsArticleProps

export default NewsArticle

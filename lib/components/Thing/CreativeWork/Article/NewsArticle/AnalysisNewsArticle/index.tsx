import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AnalysisNewsArticleProps from "../../../../../../types/Thing/AnalysisNewsArticle/index.ts"
import type NewsArticleProps from "../../../../../../types/Thing/NewsArticle/index.ts"

import NewsArticle from "./index.tsx"

// AnalysisNewsArticle adds no properties to the NewsArticle schema type
export type Props = BaseComponentProps<
	AnalysisNewsArticleProps,
	"AnalysisNewsArticle",
	ExtractLevelProps<AnalysisNewsArticleProps, NewsArticleProps>
>

export default function AnalysisNewsArticle({
	schemaType = "AnalysisNewsArticle",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<NewsArticle
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}

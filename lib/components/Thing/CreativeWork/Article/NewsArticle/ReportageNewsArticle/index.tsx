import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type NewsArticleProps from "../../../../../../types/Thing/NewsArticle/index.ts"
import type ReportageNewsArticleProps from "../../../../../../types/Thing/ReportageNewsArticle/index.ts"

import NewsArticle from "./index.tsx"

// ReportageNewsArticle adds no properties to the NewsArticle schema type
export type Props = BaseComponentProps<
	ReportageNewsArticleProps,
	"ReportageNewsArticle",
	ExtractLevelProps<ReportageNewsArticleProps, NewsArticleProps>
>

export default function ReportageNewsArticle({
	schemaType = "ReportageNewsArticle",
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

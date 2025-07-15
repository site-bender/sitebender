import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type NewsArticleProps from "../../../../../../types/Thing/NewsArticle/index.ts"
import type ReviewNewsArticleProps from "../../../../../../types/Thing/ReviewNewsArticle/index.ts"

import NewsArticle from "./index.tsx"

// ReviewNewsArticle adds no properties to the NewsArticle schema type
export type Props = BaseComponentProps<
	ReviewNewsArticleProps,
	"ReviewNewsArticle",
	ExtractLevelProps<ReviewNewsArticleProps, NewsArticleProps>
>

export default function ReviewNewsArticle({
	schemaType = "ReviewNewsArticle",
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

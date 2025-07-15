import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type NewsArticleProps from "../../../../../../types/Thing/NewsArticle/index.ts"
import type OpinionNewsArticleProps from "../../../../../../types/Thing/OpinionNewsArticle/index.ts"

import NewsArticle from "./index.tsx"

// OpinionNewsArticle adds no properties to the NewsArticle schema type
export type Props = BaseComponentProps<
	OpinionNewsArticleProps,
	"OpinionNewsArticle",
	ExtractLevelProps<OpinionNewsArticleProps, NewsArticleProps>
>

export default function OpinionNewsArticle({
	schemaType = "OpinionNewsArticle",
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

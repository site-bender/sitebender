import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AskPublicNewsArticleProps from "../../../../../../types/Thing/AskPublicNewsArticle/index.ts"
import type NewsArticleProps from "../../../../../../types/Thing/NewsArticle/index.ts"

import NewsArticle from "./index.tsx"

// AskPublicNewsArticle adds no properties to the NewsArticle schema type
export type Props = BaseComponentProps<
	AskPublicNewsArticleProps,
	"AskPublicNewsArticle",
	ExtractLevelProps<AskPublicNewsArticleProps, NewsArticleProps>
>

export default function AskPublicNewsArticle({
	schemaType = "AskPublicNewsArticle",
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

import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BackgroundNewsArticleProps from "../../../../../../types/Thing/BackgroundNewsArticle/index.ts"
import type NewsArticleProps from "../../../../../../types/Thing/NewsArticle/index.ts"

import NewsArticle from "./index.tsx"

// BackgroundNewsArticle adds no properties to the NewsArticle schema type
export type Props = BaseComponentProps<
	BackgroundNewsArticleProps,
	"BackgroundNewsArticle",
	ExtractLevelProps<BackgroundNewsArticleProps, NewsArticleProps>
>

export default function BackgroundNewsArticle({
	schemaType = "BackgroundNewsArticle",
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

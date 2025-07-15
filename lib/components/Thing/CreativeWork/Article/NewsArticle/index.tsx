import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ArticleProps from "../../../../../types/Thing/Article/index.ts"
import type NewsArticleProps from "../../../../../types/Thing/NewsArticle/index.ts"

import Article from "./index.tsx"

export type Props = BaseComponentProps<
	NewsArticleProps,
	"NewsArticle",
	ExtractLevelProps<NewsArticleProps, ArticleProps>
>

export default function NewsArticle(
	{
		dateline,
		printColumn,
		printEdition,
		printPage,
		printSection,
		schemaType = "NewsArticle",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Article
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dateline,
				printColumn,
				printEdition,
				printPage,
				printSection,
				...subtypeProperties,
			}}
		/>
	)
}

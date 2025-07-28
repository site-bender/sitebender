import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { ArticleProps } from "../../../../../types/Thing/CreativeWork/Article/index.ts"
import type { NewsArticleProps } from "../../../../../types/Thing/CreativeWork/Article/NewsArticle/index.ts"

import Article from "../index.tsx"

export type Props = BaseComponentProps<
	NewsArticleProps,
	"NewsArticle",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ArticleProps>
>

export default function NewsArticle({
	dateline,
	printColumn,
	printEdition,
	printPage,
	printSection,
	schemaType = "NewsArticle",
	subtypeProperties = {},
	...props
}): Props {
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

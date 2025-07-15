import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ArticleProps from "../../../../../types/Thing/Article/index.ts"
import type ScholarlyArticleProps from "../../../../../types/Thing/ScholarlyArticle/index.ts"

import Article from "./index.tsx"

// ScholarlyArticle adds no properties to the Article schema type
export type Props = BaseComponentProps<
	ScholarlyArticleProps,
	"ScholarlyArticle",
	ExtractLevelProps<ScholarlyArticleProps, ArticleProps>
>

export default function ScholarlyArticle({
	schemaType = "ScholarlyArticle",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Article
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}

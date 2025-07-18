import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AdvertiserContentArticleProps from "../../../../../types/Thing/AdvertiserContentArticle/index.ts"
import type ArticleProps from "../../../../../types/Thing/Article/index.ts"

import Article from "../index.tsx"

// AdvertiserContentArticle adds no properties to the Article schema type
export type Props = BaseComponentProps<
	AdvertiserContentArticleProps,
	"AdvertiserContentArticle",
	ExtractLevelProps<AdvertiserContentArticleProps, ArticleProps>
>

export default function AdvertiserContentArticle({
	schemaType = "AdvertiserContentArticle",
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

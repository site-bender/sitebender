import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ArticleProps from "../../../../../types/Thing/Article/index.ts"
import type SatiricalArticleProps from "../../../../../types/Thing/SatiricalArticle/index.ts"

import Article from "./index.tsx"

// SatiricalArticle adds no properties to the Article schema type
export type Props = BaseComponentProps<
	SatiricalArticleProps,
	"SatiricalArticle",
	ExtractLevelProps<SatiricalArticleProps, ArticleProps>
>

export default function SatiricalArticle({
	schemaType = "SatiricalArticle",
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

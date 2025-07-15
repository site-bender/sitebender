import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ArticleProps from "../../../../../types/Thing/Article/index.ts"
import type TechArticleProps from "../../../../../types/Thing/TechArticle/index.ts"

import Article from "./index.tsx"

export type Props = BaseComponentProps<
	TechArticleProps,
	"TechArticle",
	ExtractLevelProps<TechArticleProps, ArticleProps>
>

export default function TechArticle(
	{
		dependencies,
		proficiencyLevel,
		schemaType = "TechArticle",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Article
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dependencies,
				proficiencyLevel,
				...subtypeProperties,
			}}
		/>
	)
}

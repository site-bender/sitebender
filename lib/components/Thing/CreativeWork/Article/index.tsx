import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ArticleProps from "../../../../types/Thing/Article/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	ArticleProps,
	"Article",
	ExtractLevelProps<ArticleProps, CreativeWorkProps>
>

export default function Article(
	{
		articleBody,
		articleSection,
		backstory,
		pageEnd,
		pageStart,
		pagination,
		speakable,
		wordCount,
		schemaType = "Article",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				articleBody,
				articleSection,
				backstory,
				pageEnd,
				pageStart,
				pagination,
				speakable,
				wordCount,
				...subtypeProperties,
			}}
		/>
	)
}

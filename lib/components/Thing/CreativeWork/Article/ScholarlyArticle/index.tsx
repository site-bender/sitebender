import type BaseProps from "../../../../../types/index.ts"
import type ScholarlyArticleProps from "../../../../../types/Thing/CreativeWork/Article/ScholarlyArticle/index.ts"

import Article from "../index.tsx"

export type Props = ScholarlyArticleProps & BaseProps

export default function ScholarlyArticle({
	_type = "ScholarlyArticle",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Article
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}

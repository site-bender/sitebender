import type BaseProps from "../../../../../../types/index.ts"
import type { OpinionNewsArticleProps } from "../../../../../../types/Thing/CreativeWork/Article/NewsArticle/OpinionNewsArticle/index.ts"

import NewsArticle from "../index.tsx"

export type Props = OpinionNewsArticleProps & BaseProps

export default function OpinionNewsArticle({
	_type = "OpinionNewsArticle",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<NewsArticle
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}

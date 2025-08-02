import type BaseProps from "../../../../../../types/index.ts"
import type ReviewNewsArticleProps from "../../../../../../types/Thing/CreativeWork/Article/NewsArticle/ReviewNewsArticle/index.ts"

import NewsArticle from "../index.tsx"

export type Props = ReviewNewsArticleProps & BaseProps

export default function ReviewNewsArticle({
	_type = "ReviewNewsArticle",
	children,
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
		>
			{children}
		</NewsArticle>
	)
}

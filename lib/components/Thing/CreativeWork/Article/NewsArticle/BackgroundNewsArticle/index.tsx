import type BaseProps from "../../../../../../types/index.ts"
import type BackgroundNewsArticleProps from "../../../../../../types/Thing/CreativeWork/Article/NewsArticle/BackgroundNewsArticle/index.ts"

import NewsArticle from "../index.tsx"

export type Props = BackgroundNewsArticleProps & BaseProps

export default function BackgroundNewsArticle({
	_type = "BackgroundNewsArticle",
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
		>{children}</NewsArticle>
	)
}

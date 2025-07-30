import type BaseProps from "../../../../../../types/index.ts"
import type AskPublicNewsArticleProps from "../../../../../../types/Thing/CreativeWork/Article/NewsArticle/AskPublicNewsArticle/index.ts"

import NewsArticle from "../index.tsx"

export type Props = AskPublicNewsArticleProps & BaseProps

export default function AskPublicNewsArticle({
	_type = "AskPublicNewsArticle",
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

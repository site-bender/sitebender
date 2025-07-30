import type BaseProps from "../../../../../../types/index.ts"
import type ReportageNewsArticleProps from "../../../../../../types/Thing/CreativeWork/Article/NewsArticle/ReportageNewsArticle/index.ts"

import NewsArticle from "../index.tsx"

export type Props = ReportageNewsArticleProps & BaseProps

export default function ReportageNewsArticle({
	_type = "ReportageNewsArticle",
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

import type BaseProps from "../../../../../../types/index.ts"
import type AnalysisNewsArticleProps from "../../../../../../types/Thing/CreativeWork/Article/NewsArticle/AnalysisNewsArticle/index.ts"

import NewsArticle from "../index.tsx"

export type Props = AnalysisNewsArticleProps & BaseProps

export default function AnalysisNewsArticle({
	_type = "AnalysisNewsArticle",
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

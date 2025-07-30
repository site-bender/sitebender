import type BaseProps from "../../../../../types/index.ts"
import type NewsArticleProps from "../../../../../types/Thing/CreativeWork/Article/NewsArticle/index.ts"

import Article from "../index.tsx"

export type Props = NewsArticleProps & BaseProps

export default function NewsArticle({
	dateline,
	printColumn,
	printEdition,
	printPage,
	printSection,
	_type = "NewsArticle",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Article
			{...props}
			_type={_type}
			subtypeProperties={{
				dateline,
				printColumn,
				printEdition,
				printPage,
				printSection,
				...subtypeProperties,
			}}
		>{children}</Article>
	)
}

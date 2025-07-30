import type BaseProps from "../../../../../types/index.ts"
import type AdvertiserContentArticleProps from "../../../../../types/Thing/CreativeWork/Article/AdvertiserContentArticle/index.ts"

import Article from "../index.tsx"

export type Props = AdvertiserContentArticleProps & BaseProps

export default function AdvertiserContentArticle({
	_type = "AdvertiserContentArticle",
	children,
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
		>{children}</Article>
	)
}

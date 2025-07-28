import type BaseProps from "../../../../../types/index.ts"
import type { SatiricalArticleProps } from "../../../../../types/Thing/CreativeWork/Article/SatiricalArticle/index.ts"

import Article from "../index.tsx"

export type Props = SatiricalArticleProps & BaseProps

export default function SatiricalArticle({
	_type = "SatiricalArticle",
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

import type BaseProps from "../../../../../types/index.ts"
import type TechArticleProps from "../../../../../types/Thing/CreativeWork/Article/TechArticle/index.ts"

import Article from "../index.tsx"

export type Props = TechArticleProps & BaseProps

export default function TechArticle({
	dependencies,
	proficiencyLevel,
	_type = "TechArticle",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Article
			{...props}
			_type={_type}
			subtypeProperties={{
				dependencies,
				proficiencyLevel,
				...subtypeProperties,
			}}
		/>
	)
}

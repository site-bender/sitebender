import type BaseProps from "../../../../types/index.ts"
import type ArticleProps from "../../../../types/Thing/CreativeWork/Article/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ArticleProps & BaseProps

export default function Article({
	articleBody,
	articleSection,
	backstory,
	pageEnd,
	pageStart,
	pagination,
	speakable,
	wordCount,
	_type = "Article",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				articleBody,
				articleSection,
				backstory,
				pageEnd,
				pageStart,
				pagination,
				speakable,
				wordCount,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}

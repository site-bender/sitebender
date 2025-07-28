import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { ArticleProps } from "../../../../types/Thing/CreativeWork/Article/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	ArticleProps,
	"Article",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function Article({
	articleBody,
	articleSection,
	backstory,
	pageEnd,
	pageStart,
	pagination,
	speakable,
	wordCount,
	schemaType = "Article",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
		/>
	)
}

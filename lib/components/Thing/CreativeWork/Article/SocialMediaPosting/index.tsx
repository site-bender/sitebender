import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { ArticleProps } from "../../../../../types/Thing/CreativeWork/Article/index.ts"
import type { SocialMediaPostingProps } from "../../../../../types/Thing/CreativeWork/Article/SocialMediaPosting/index.ts"

import Article from "../index.tsx"

export type Props = BaseComponentProps<
	SocialMediaPostingProps,
	"SocialMediaPosting",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ArticleProps>
>

export default function SocialMediaPosting({
	sharedContent,
	schemaType = "SocialMediaPosting",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Article
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				sharedContent,
				...subtypeProperties,
			}}
		/>
	)
}

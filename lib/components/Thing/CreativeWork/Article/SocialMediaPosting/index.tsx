import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ArticleProps from "../../../../../types/Thing/Article/index.ts"
import type SocialMediaPostingProps from "../../../../../types/Thing/SocialMediaPosting/index.ts"

import Article from "../index.tsx"

export type Props = BaseComponentProps<
	SocialMediaPostingProps,
	"SocialMediaPosting",
	ExtractLevelProps<SocialMediaPostingProps, ArticleProps>
>

export default function SocialMediaPosting(
	{
		sharedContent,
		schemaType = "SocialMediaPosting",
		subtypeProperties = {},
		...props
	}: Props,
) {
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

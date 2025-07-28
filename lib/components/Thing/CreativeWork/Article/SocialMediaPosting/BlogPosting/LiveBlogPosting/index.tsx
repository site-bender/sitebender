import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../../types/index.ts"
import type ThingProps from "../../../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../../../types/Thing/CreativeWork/index.ts"
import type { ArticleProps } from "../../../../../../../types/Thing/CreativeWork/Article/index.ts"
import type { SocialMediaPostingProps } from "../../../../../../../types/Thing/CreativeWork/Article/SocialMediaPosting/index.ts"
import type { BlogPostingProps } from "../../../../../../../types/Thing/CreativeWork/Article/SocialMediaPosting/BlogPosting/index.ts"
import type { LiveBlogPostingProps } from "../../../../../../../types/Thing/CreativeWork/Article/SocialMediaPosting/BlogPosting/LiveBlogPosting/index.ts"

import BlogPosting from "../index.tsx"

export type Props = BaseComponentProps<
	LiveBlogPostingProps,
	"LiveBlogPosting",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ArticleProps, SocialMediaPostingProps, BlogPostingProps>
>

export default function LiveBlogPosting({
	coverageEndTime,
	coverageStartTime,
	liveBlogUpdate,
	schemaType = "LiveBlogPosting",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<BlogPosting
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				coverageEndTime,
				coverageStartTime,
				liveBlogUpdate,
				...subtypeProperties,
			}}
		/>
	)
}

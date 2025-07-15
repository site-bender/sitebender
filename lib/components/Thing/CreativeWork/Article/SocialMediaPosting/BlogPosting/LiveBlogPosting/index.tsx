import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type BlogPostingProps from "../../../../../../../types/Thing/BlogPosting/index.ts"
import type LiveBlogPostingProps from "../../../../../../../types/Thing/LiveBlogPosting/index.ts"

import BlogPosting from "./index.tsx"

export type Props = BaseComponentProps<
	LiveBlogPostingProps,
	"LiveBlogPosting",
	ExtractLevelProps<LiveBlogPostingProps, BlogPostingProps>
>

export default function LiveBlogPosting(
	{
		coverageEndTime,
		coverageStartTime,
		liveBlogUpdate,
		schemaType = "LiveBlogPosting",
		subtypeProperties = {},
		...props
	}: Props,
) {
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

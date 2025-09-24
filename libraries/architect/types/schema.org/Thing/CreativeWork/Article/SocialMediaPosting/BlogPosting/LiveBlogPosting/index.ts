import type { DateTime } from "../../../../../../DataType/index.ts"
import type Thing from "../../../../../index.ts"
import type { CreativeWorkProps } from "../../../../index.ts"
import type { ArticleProps } from "../../../index.ts"
import type { SocialMediaPostingProps } from "../../index.ts"
import type BlogPosting from "../index.ts"
import type { BlogPostingProps } from "../index.ts"

import BlogPostingComponent from "../../../../../../../../../codewright/src/define/Thing/CreativeWork/Article/SocialMediaPosting/BlogPosting/index.tsx"

export type LiveBlogPostingType = "LiveBlogPosting"

export interface LiveBlogPostingProps {
	"@type"?: LiveBlogPostingType
	coverageEndTime?: DateTime
	coverageStartTime?: DateTime
	liveBlogUpdate?: BlogPosting | ReturnType<typeof BlogPostingComponent>
}

type LiveBlogPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps
	& BlogPostingProps
	& LiveBlogPostingProps

export default LiveBlogPosting

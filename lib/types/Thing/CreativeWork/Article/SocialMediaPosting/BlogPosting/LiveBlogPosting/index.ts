import type { DateTime } from "../../../../../../DataType/index.ts"
import type Thing from "../../../../../index.ts"
import type { CreativeWorkProps } from "../../../../index.ts"
import type { ArticleProps } from "../../../index.ts"
import type { SocialMediaPostingProps } from "../../index.ts"
import type { BlogPostingProps } from "../index.ts"
import type BlogPosting from "../index.ts"

import LiveBlogPostingComponent from "../../../../../../../../components/Thing/CreativeWork/Article/SocialMediaPosting/BlogPosting/LiveBlogPosting/index.tsx"

export interface LiveBlogPostingProps {
	coverageEndTime?: DateTime
	coverageStartTime?: DateTime
	liveBlogUpdate?: BlogPosting
}

type LiveBlogPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps
	& BlogPostingProps
	& LiveBlogPostingProps

export default LiveBlogPosting

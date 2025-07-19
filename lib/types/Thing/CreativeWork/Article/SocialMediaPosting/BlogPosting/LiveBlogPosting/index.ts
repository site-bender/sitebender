import type { DateTime } from "../../../../../../DataType/index.ts"
import type Thing from "../../../../../index.ts"
import type { CreativeWorkProps } from "../../../../index.ts"
import type { ArticleProps } from "../../../index.ts"
import type { SocialMediaPostingProps } from "../../index.ts"
import type BlogPosting from "../index.ts"
import type { BlogPostingProps } from "../index.ts"

export interface LiveBlogPostingProps {
	/** The time when the live blog will stop covering the Event. Note that coverage may continue after the Event concludes. */
	coverageEndTime?: DateTime
	/** The time when the live blog will begin covering the Event. Note that coverage may begin before the Event's start time. The LiveBlogPosting may also be created before coverage begins. */
	coverageStartTime?: DateTime
	/** An update to the LiveBlog. */
	liveBlogUpdate?: BlogPosting
}

type LiveBlogPosting =
	& Thing
	& ArticleProps
	& BlogPostingProps
	& CreativeWorkProps
	& SocialMediaPostingProps
	& LiveBlogPostingProps

export default LiveBlogPosting

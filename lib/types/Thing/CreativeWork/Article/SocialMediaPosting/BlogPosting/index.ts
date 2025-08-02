import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { SocialMediaPostingProps } from "../index.ts"
import type { LiveBlogPostingType } from "./LiveBlogPosting/index.ts"

export type BlogPostingType = "BlogPosting" | LiveBlogPostingType

export interface BlogPostingProps {
	"@type"?: BlogPostingType
}

type BlogPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps
	& BlogPostingProps

export default BlogPosting

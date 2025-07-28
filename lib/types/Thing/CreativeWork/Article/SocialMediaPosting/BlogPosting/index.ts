import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { SocialMediaPostingProps } from "../index.ts"

export interface BlogPostingProps {}

type BlogPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps
	& BlogPostingProps

export default BlogPosting

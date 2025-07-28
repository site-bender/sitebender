import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { SocialMediaPostingProps } from "../index.ts"

import BlogPostingComponent from "../../../../../../../components/Thing/CreativeWork/Article/SocialMediaPosting/BlogPosting/index.tsx"

export interface BlogPostingProps {
}

type BlogPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps
	& BlogPostingProps

export default BlogPosting

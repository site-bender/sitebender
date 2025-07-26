import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type BlogPosting from "../Article/SocialMediaPosting/BlogPosting/index.ts"

export interface BlogProps {
	blogPost?: BlogPosting
	blogPosts?: BlogPosting
	issn?: Text
}

type Blog =
	& Thing
	& CreativeWorkProps
	& BlogProps

export default Blog

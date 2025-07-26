import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { SocialMediaPostingProps } from "../index.ts"

export interface DiscussionForumPostingProps {
}

type DiscussionForumPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps
	& DiscussionForumPostingProps

export default DiscussionForumPosting

// DiscussionForumPosting extends SocialMediaPosting but adds no additional properties
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { SocialMediaPostingProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DiscussionForumPostingProps {}

type DiscussionForumPosting =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& SocialMediaPostingProps
	& DiscussionForumPostingProps

export default DiscussionForumPosting

import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { SocialMediaPostingProps } from "../index.ts"

import DiscussionForumPostingComponent from "../../../../../../../components/Thing/CreativeWork/Article/SocialMediaPosting/DiscussionForumPosting/index.tsx"

export interface DiscussionForumPostingProps {
}

type DiscussionForumPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps
	& DiscussionForumPostingProps

export default DiscussionForumPosting

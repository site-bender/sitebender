import type Thing from "../../../index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"
import type { BlogPostingType } from "./BlogPosting/index.ts"
import type { DiscussionForumPostingType } from "./DiscussionForumPosting/index.ts"

import { CreativeWork as CreativeWorkComponent } from "../../../../../../components/index.tsx"

export type SocialMediaPostingType =
	| "SocialMediaPosting"
	| DiscussionForumPostingType
	| BlogPostingType

export interface SocialMediaPostingProps {
	"@type"?: SocialMediaPostingType
	sharedContent?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
}

type SocialMediaPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps

export default SocialMediaPosting

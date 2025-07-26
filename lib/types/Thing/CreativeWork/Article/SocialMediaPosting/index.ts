import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"
import type CreativeWork from "../../index.ts"

export interface SocialMediaPostingProps {
	sharedContent?: CreativeWork
}

type SocialMediaPosting =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& SocialMediaPostingProps

export default SocialMediaPosting

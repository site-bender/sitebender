import type Thing from "../../../index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ArticleProps } from "../index.ts"

export interface SocialMediaPostingProps {
	/** A CreativeWork such as an image, video, or audio clip shared as part of this posting. */
	sharedContent?: CreativeWork
}

type SocialMediaPosting =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& SocialMediaPostingProps

export default SocialMediaPosting

import type CreativeWork from "../../index.ts"
import type Article from "../index.ts"

export default interface SocialMediaPosting extends Article {
	/** A CreativeWork such as an image, video, or audio clip shared as part of this posting. */
	sharedContent?: CreativeWork
}

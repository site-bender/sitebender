import CreativeWork from "../..//index.ts"
import Article from "../index.ts"

export default interface SocialMediaPosting extends Article {
	/** A CreativeWork such as an image, video, or audio clip shared as part of this posting. */
	sharedContent?: CreativeWork
}

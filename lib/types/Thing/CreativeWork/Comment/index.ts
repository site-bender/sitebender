import type { Integer } from "../../../DataType/index.ts"
import type CreativeWork from "../index.ts"

export default interface Comment extends CreativeWork {
	/** The number of downvotes this question, answer or comment has received from the community. */
	downvoteCount?: Integer
	/** The parent of a question, answer or item in general. Typically used for Q/A discussion threads e.g. a chain of comments with the first comment being an [[Article]] or other [[CreativeWork]]. See also [[comment]] which points from something to a comment about it. */
	parentItem?: Comment | CreativeWork
	/** A CreativeWork such as an image, video, or audio clip shared as part of this posting. */
	sharedContent?: CreativeWork
	/** The number of upvotes this question, answer or comment has received from the community. */
	upvoteCount?: Integer
}

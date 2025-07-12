import type { Integer } from "../../../DataType/index.ts"
import type { CreativeWork } from "../index.ts"

// Comment interface - extends CreativeWork
// A comment on an item - for example, a comment on a blog post.
// The comment's content is expressed via the text property, and its topic via about, properties shared with all CreativeWorks.
export interface Comment extends CreativeWork {
	downvoteCount?: Integer
	parentItem?: Comment | CreativeWork
	sharedContent?: CreativeWork
	upvoteCount?: Integer
}

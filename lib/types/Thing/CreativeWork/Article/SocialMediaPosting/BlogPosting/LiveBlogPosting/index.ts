import { DateTime } from "../../../../../../DataType/index.ts"
import BlogPosting from "../index.ts"

export default interface LiveBlogPosting extends BlogPosting {
	/** The time when the live blog will stop covering the Event. Note that coverage may continue after the Event concludes. */
	coverageEndTime?: DateTime
	/** The time when the live blog will begin covering the Event. Note that coverage may begin before the Event's start time. The LiveBlogPosting may also be created before coverage begins. */
	coverageStartTime?: DateTime
	/** An update to the LiveBlog. */
	liveBlogUpdate?: BlogPosting
}

import { Date, DateTime, Text, URL } from "../../../../DataType/index.ts"
import CreativeWork from "../../../CreativeWork/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import UserInteraction from "../index.ts"

export default interface UserComments extends UserInteraction {
	/** The text of the UserComment. */
	commentText?: Text
	/** The time at which the UserComment was made. */
	commentTime?: DateTime | Date
	/** The creator/author of this CreativeWork. This is the same as the Author property for CreativeWork. */
	creator?: Organization | Person
	/** Specifies the CreativeWork associated with the UserComment. */
	discusses?: CreativeWork
	/** The URL at which a reply may be posted to the specified UserComment. */
	replyToUrl?: URL
}

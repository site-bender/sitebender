import { Date, DateTime, Text } from "../../../../DataType/index.ts"
import Series from "../index.ts"

export default interface CreativeWorkSeries extends Series {
	/** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	endDate?: Date | DateTime
	/** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
	issn?: Text
	/** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	startDate?: Date | DateTime
}

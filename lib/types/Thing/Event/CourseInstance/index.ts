import { Text, URL } from "../../../DataType/index.ts"
import Schedule from "../../Intangible/Schedule/index.ts"
import Person from "../../Person/index.ts"
import Event from "../index.ts"

export default interface CourseInstance extends Event {
	/** The medium or means of delivery of the course instance or the mode of study, either as a text label (e.g. "online", "onsite" or "blended"; "synchronous" or "asynchronous"; "full-time" or "part-time") or as a URL reference to a term from a controlled vocabulary (e.g. https://ceds.ed.gov/element/001311#Asynchronous). */
	courseMode?: Text | URL
	/** Represents the length and pace of a course, expressed as a [[Schedule]]. */
	courseSchedule?: Schedule
	/** The amount of work expected of students taking the course, often provided as a figure per week or per month, and may be broken down by type. For example, "2 hours of lectures, 1 hour of lab work and 3 hours of independent study per week". */
	courseWorkload?: Text
	/** A person assigned to instruct or provide instructional assistance for the [[CourseInstance]]. */
	instructor?: Person
}

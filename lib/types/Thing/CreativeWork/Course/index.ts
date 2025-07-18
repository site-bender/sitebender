import type { Language } from "../../../bcp47/index.ts"
import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type CourseInstance from "../../Event/CourseInstance/index.ts"
import type AlignmentObject from "../../Intangible/AlignmentObject/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type StructuredValue from "../../Intangible/StructuredValue/index.ts"
import type EducationalOccupationalCredential from "../EducationalOccupationalCredential/index.ts"
import type CreativeWork from "../index.ts"
import type LearningResource from "../LearningResource/index.ts"
import type Syllabus from "../LearningResource/Syllabus/index.ts"

export default interface Course extends CreativeWork, LearningResource {
	/** A language someone may use with or at the item, service or place. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[inLanguage]]. */
	availableLanguage?: Text | Language
	/** The identifier for the [[Course]] used by the course [[provider]] (e.g. CS101 or 6.001). */
	courseCode?: Text
	/** Requirements for taking the Course. May be completion of another [[Course]] or a textual description like "permission of instructor". Requirements may be a pre-requisite competency, referenced using [[AlignmentObject]]. */
	coursePrerequisites?: AlignmentObject | Course | Text
	/** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
	educationalCredentialAwarded?: EducationalOccupationalCredential | Text | URL
	/** A financial aid type or program which students may use to pay for tuition or fees associated with the program. */
	financialAidEligible?: Text | DefinedTerm
	/** An offering of the course at a specific time and place or through specific media or mode of study or to a specific section of students. */
	hasCourseInstance?: CourseInstance
	/** The number of credits or units awarded by a Course or required to complete an EducationalOccupationalProgram. */
	numberOfCredits?: StructuredValue | Integer
	/** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
	occupationalCredentialAwarded?: EducationalOccupationalCredential | Text | URL
	/** Indicates (typically several) Syllabus entities that lay out what each section of the overall course will cover. */
	syllabusSections?: Syllabus
	/** The total number of students that have enrolled in the history of the course. */
	totalHistoricalEnrollment?: Integer
}

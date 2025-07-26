import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { LearningResourceProps } from "../LearningResource/index.ts"
import type AlignmentObject from "../../Intangible/AlignmentObject/index.ts"
import type CourseInstance from "../../Event/CourseInstance/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type EducationalOccupationalCredential from "../EducationalOccupationalCredential/index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type StructuredValue from "../../Intangible/StructuredValue/index.ts"
import type Syllabus from "../LearningResource/Syllabus/index.ts"

export interface CourseProps {
	availableLanguage?: Language | Text
	courseCode?: Text
	coursePrerequisites?: AlignmentObject | Course | Text
	educationalCredentialAwarded?: EducationalOccupationalCredential | Text | URL
	financialAidEligible?: DefinedTerm | Text
	hasCourseInstance?: CourseInstance
	numberOfCredits?: Integer | StructuredValue
	occupationalCredentialAwarded?: EducationalOccupationalCredential | Text | URL
	syllabusSections?: Syllabus
	totalHistoricalEnrollment?: Integer
}

type Course =
	& Thing
	& CreativeWorkProps
	& LearningResourceProps
	& CourseProps

export default Course

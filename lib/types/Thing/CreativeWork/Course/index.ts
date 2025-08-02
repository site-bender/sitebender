import type { Integer, Text, URL } from "../../../DataType/index.ts"
import type CourseInstance from "../../Event/CourseInstance/index.ts"
import type Thing from "../../index.ts"
import type AlignmentObject from "../../Intangible/AlignmentObject/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Language from "../../Intangible/Language/index.ts"
import type StructuredValue from "../../Intangible/StructuredValue/index.ts"
import type EducationalOccupationalCredential from "../EducationalOccupationalCredential/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { LearningResourceProps } from "../LearningResource/index.ts"
import type Syllabus from "../LearningResource/Syllabus/index.ts"

import CourseComponent from "../../../../components/Thing/CreativeWork/Course/index.ts"
import EducationalOccupationalCredentialComponent from "../../../../components/Thing/CreativeWork/EducationalOccupationalCredential/index.ts"
import SyllabusComponent from "../../../../components/Thing/CreativeWork/LearningResource/Syllabus/index.ts"
import CourseInstanceComponent from "../../../../components/Thing/Event/CourseInstance/index.ts"
import AlignmentObjectComponent from "../../../../components/Thing/Intangible/AlignmentObject/index.ts"
import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import LanguageComponent from "../../../../components/Thing/Intangible/Language/index.ts"
import StructuredValueComponent from "../../../../components/Thing/Intangible/StructuredValue/index.ts"

export type CourseType = "Course"

export interface CourseProps {
	"@type"?: CourseType
	availableLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	courseCode?: Text
	coursePrerequisites?:
		| AlignmentObject
		| Course
		| Text
		| ReturnType<typeof AlignmentObjectComponent>
		| ReturnType<typeof CourseComponent>
	educationalCredentialAwarded?:
		| EducationalOccupationalCredential
		| Text
		| URL
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	financialAidEligible?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
	hasCourseInstance?:
		| CourseInstance
		| ReturnType<typeof CourseInstanceComponent>
	numberOfCredits?:
		| Integer
		| StructuredValue
		| ReturnType<typeof StructuredValueComponent>
	occupationalCredentialAwarded?:
		| EducationalOccupationalCredential
		| Text
		| URL
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	syllabusSections?: Syllabus | ReturnType<typeof SyllabusComponent>
	totalHistoricalEnrollment?: Integer
}

type Course = Thing & CreativeWorkProps & LearningResourceProps & CourseProps

export default Course

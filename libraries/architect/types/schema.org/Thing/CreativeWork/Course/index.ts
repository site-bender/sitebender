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

import EducationalOccupationalCredentialComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/EducationalOccupationalCredential/index.tsx"
import SyllabusComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/LearningResource/Syllabus/index.tsx"
import CourseInstanceComponent from "../../../../../../pagewright/src/define/Thing/Event/CourseInstance/index.tsx"
import AlignmentObjectComponent from "../../../../../../pagewright/src/define/Thing/Intangible/AlignmentObject/index.tsx"
import DefinedTermComponent from "../../../../../../pagewright/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import LanguageComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Language/index.tsx"
import StructuredValueComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/index.tsx"
import { Course as CourseComponent } from "../../../../../pagewright/index.tsx"

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

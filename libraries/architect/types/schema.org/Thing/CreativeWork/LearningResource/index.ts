import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AlignmentObject from "../../Intangible/AlignmentObject/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { CourseType } from "./Course/index.ts"
import type { QuizType } from "./Quiz/index.ts"
import type { SyllabusType } from "./Syllabus/index.ts"

import AlignmentObjectComponent from "../../../../../../codewright/src/define/Thing/Intangible/AlignmentObject/index.tsx"
import DefinedTermComponent from "../../../../../../codewright/src/define/Thing/Intangible/DefinedTerm/index.tsx"

export type LearningResourceType =
	| "LearningResource"
	| CourseType
	| QuizType
	| SyllabusType

export interface LearningResourceProps {
	"@type"?: LearningResourceType
	assesses?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	competencyRequired?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	educationalAlignment?:
		| AlignmentObject
		| ReturnType<typeof AlignmentObjectComponent>
	educationalLevel?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	educationalUse?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
	learningResourceType?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
	teaches?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
}

type LearningResource = Thing & CreativeWorkProps & LearningResourceProps

export default LearningResource

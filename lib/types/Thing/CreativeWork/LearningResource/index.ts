import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type AlignmentObject from "../../Intangible/AlignmentObject/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"

import LearningResourceComponent from "../../../../../components/Thing/CreativeWork/LearningResource/index.tsx"

export interface LearningResourceProps {
	assesses?: DefinedTerm | Text
	competencyRequired?: DefinedTerm | Text | URL
	educationalAlignment?: AlignmentObject
	educationalLevel?: DefinedTerm | Text | URL
	educationalUse?: DefinedTerm | Text
	learningResourceType?: DefinedTerm | Text
	teaches?: DefinedTerm | Text
}

type LearningResource =
	& Thing
	& CreativeWorkProps
	& LearningResourceProps

export default LearningResource

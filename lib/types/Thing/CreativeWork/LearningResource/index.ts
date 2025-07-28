import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AlignmentObject from "../../Intangible/AlignmentObject/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import AlignmentObjectComponent from "../../../../components/Thing/Intangible/AlignmentObject/index.ts"
import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"

export interface LearningResourceProps {
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
	educationalUse?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	learningResourceType?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
	teaches?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
}

type LearningResource = Thing & CreativeWorkProps & LearningResourceProps

export default LearningResource

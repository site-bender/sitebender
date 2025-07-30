import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type { EventProps } from "../index.ts"

import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"

export interface EducationEventProps {
	"@type"?: "EducationEvent"
	assesses?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	educationalLevel?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	teaches?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
}

type EducationEvent = Thing & EventProps & EducationEventProps

export default EducationEvent

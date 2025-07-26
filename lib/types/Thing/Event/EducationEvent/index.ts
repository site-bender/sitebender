import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"

export interface EducationEventProps {
	assesses?: DefinedTerm | Text
	educationalLevel?: DefinedTerm | Text | URL
	teaches?: DefinedTerm | Text
}

type EducationEvent =
	& Thing
	& EventProps
	& EducationEventProps

export default EducationEvent

import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type MedicalEntity from "../../index.ts"

import JointComponent from "../../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Joint/index.tsx"

export interface JointProps {
	biomechnicalClass?: Text
	functionalClass?: MedicalEntity | Text
	structuralClass?: Text
}

type Joint =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& JointProps

export default Joint

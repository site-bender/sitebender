import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MedicalEntity from "../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

import { MedicalEntity as MedicalEntityComponent } from "../../../../../../components/index.tsx"

export type JointType = "Joint"

export interface JointProps {
	"@type"?: JointType
	biomechnicalClass?: Text
	functionalClass?:
		| MedicalEntity
		| Text
		| ReturnType<typeof MedicalEntityComponent>
	structuralClass?: Text
}

type Joint = Thing & MedicalEntityProps & AnatomicalStructureProps & JointProps

export default Joint

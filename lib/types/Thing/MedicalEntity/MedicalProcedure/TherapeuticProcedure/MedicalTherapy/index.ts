import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalProcedureProps } from "../../index.ts"
import type { TherapeuticProcedureProps } from "../index.ts"
import type MedicalContraindication from "../../../MedicalContraindication/index.ts"
import type MedicalEntity from "../../../index.ts"

import MedicalTherapyComponent from "../../../../../../../components/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.tsx"

export interface MedicalTherapyProps {
	contraindication?: MedicalContraindication | Text
	duplicateTherapy?: MedicalTherapy
	seriousAdverseOutcome?: MedicalEntity
}

type MedicalTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps

export default MedicalTherapy

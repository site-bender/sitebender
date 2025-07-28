import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type MedicalEntity from "../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type MedicalContraindication from "../../../MedicalContraindication/index.ts"
import type { MedicalProcedureProps } from "../../index.ts"
import type { TherapeuticProcedureProps } from "../index.ts"

import MedicalEntityComponent from "../../../../../../components/Thing/MedicalEntity/index.ts"
import MedicalContraindicationComponent from "../../../../../../components/Thing/MedicalEntity/MedicalContraindication/index.ts"
import MedicalTherapyComponent from "../../../../../../components/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export interface MedicalTherapyProps {
	contraindication?:
		| MedicalContraindication
		| Text
		| ReturnType<typeof MedicalContraindicationComponent>
	duplicateTherapy?: MedicalTherapy | ReturnType<typeof MedicalTherapyComponent>
	seriousAdverseOutcome?:
		| MedicalEntity
		| ReturnType<typeof MedicalEntityComponent>
}

type MedicalTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps

export default MedicalTherapy

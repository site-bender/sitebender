import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalProcedureProps } from "../../../index.ts"
import type { TherapeuticProcedureProps } from "../../index.ts"
import type { MedicalTherapyProps } from "../index.ts"

import PhysicalTherapyComponent from "../../../../../../../../components/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/PhysicalTherapy/index.tsx"

export interface PhysicalTherapyProps {
}

type PhysicalTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps
	& PhysicalTherapyProps

export default PhysicalTherapy

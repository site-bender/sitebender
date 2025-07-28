import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalProcedureProps } from "../../../index.ts"
import type { TherapeuticProcedureProps } from "../../index.ts"
import type { MedicalTherapyProps } from "../index.ts"

import RadiationTherapyComponent from "../../../../../../../../components/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/RadiationTherapy/index.tsx"

export interface RadiationTherapyProps {
}

type RadiationTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps
	& RadiationTherapyProps

export default RadiationTherapy

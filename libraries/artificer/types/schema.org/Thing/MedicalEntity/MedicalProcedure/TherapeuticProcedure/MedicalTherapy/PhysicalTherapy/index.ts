import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalProcedureProps } from "../../../index.ts"
import type { TherapeuticProcedureProps } from "../../index.ts"
import type { MedicalTherapyProps } from "../index.ts"

export type PhysicalTherapyType = "PhysicalTherapy"

export interface PhysicalTherapyProps {
	"@type"?: PhysicalTherapyType
}

type PhysicalTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps
	& PhysicalTherapyProps

export default PhysicalTherapy

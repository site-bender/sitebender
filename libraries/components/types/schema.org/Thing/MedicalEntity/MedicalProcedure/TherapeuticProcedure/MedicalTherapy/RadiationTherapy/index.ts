import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalProcedureProps } from "../../../index.ts"
import type { TherapeuticProcedureProps } from "../../index.ts"
import type { MedicalTherapyProps } from "../index.ts"

export type RadiationTherapyType = "RadiationTherapy"

export interface RadiationTherapyProps {
	"@type"?: RadiationTherapyType
}

type RadiationTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps
	& RadiationTherapyProps

export default RadiationTherapy

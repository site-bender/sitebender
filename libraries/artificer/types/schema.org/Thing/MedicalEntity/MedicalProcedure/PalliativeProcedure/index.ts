import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"
import type { TherapeuticProcedureProps } from "../TherapeuticProcedure/index.ts"
import type { MedicalTherapyProps } from "../TherapeuticProcedure/MedicalTherapy/index.ts"

export type PalliativeProcedureType = "PalliativeProcedure"

export interface PalliativeProcedureProps {
	"@type"?: PalliativeProcedureType
}

type PalliativeProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps
	& PalliativeProcedureProps

export default PalliativeProcedure

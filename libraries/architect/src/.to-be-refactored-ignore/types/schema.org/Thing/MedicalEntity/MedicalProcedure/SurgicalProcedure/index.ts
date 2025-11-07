import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"

export type SurgicalProcedureType = "SurgicalProcedure"

export interface SurgicalProcedureProps {
	"@type"?: SurgicalProcedureType
}

type SurgicalProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& SurgicalProcedureProps

export default SurgicalProcedure

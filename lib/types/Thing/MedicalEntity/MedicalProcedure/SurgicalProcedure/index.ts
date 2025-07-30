import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"

export interface SurgicalProcedureProps {
	"@type"?: "SurgicalProcedure"}

type SurgicalProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& SurgicalProcedureProps

export default SurgicalProcedure

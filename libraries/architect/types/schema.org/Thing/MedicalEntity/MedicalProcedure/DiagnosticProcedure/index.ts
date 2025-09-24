import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"

export type DiagnosticProcedureType = "DiagnosticProcedure"

export interface DiagnosticProcedureProps {
	"@type"?: DiagnosticProcedureType
}

type DiagnosticProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& DiagnosticProcedureProps

export default DiagnosticProcedure

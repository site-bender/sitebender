import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"

export interface DiagnosticProcedureProps {
}

type DiagnosticProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& DiagnosticProcedureProps

export default DiagnosticProcedure

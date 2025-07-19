// DiagnosticProcedure extends MedicalProcedure but adds no additional properties
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DiagnosticProcedureProps {}

type DiagnosticProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& DiagnosticProcedureProps

export default DiagnosticProcedure

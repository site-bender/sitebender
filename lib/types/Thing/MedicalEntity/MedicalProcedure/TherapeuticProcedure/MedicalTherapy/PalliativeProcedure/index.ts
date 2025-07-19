// PalliativeProcedure extends MedicalTherapy but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalProcedureProps } from "../../../index.ts"

// deno-lint-ignore no-empty-interface
export interface PalliativeProcedureProps {}

type PalliativeProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& PalliativeProcedureProps

export default PalliativeProcedure

// RadiationTherapy extends MedicalTherapy but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalProcedureProps } from "../../../index.ts"
import type { TherapeuticProcedureProps } from "../../index.ts"
import type { MedicalTherapyProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RadiationTherapyProps {}

type RadiationTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& MedicalTherapyProps
	& TherapeuticProcedureProps
	& RadiationTherapyProps

export default RadiationTherapy

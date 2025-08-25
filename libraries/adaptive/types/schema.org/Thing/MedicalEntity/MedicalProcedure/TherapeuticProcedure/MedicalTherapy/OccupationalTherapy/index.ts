import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalProcedureProps } from "../../../index.ts"
import type { TherapeuticProcedureProps } from "../../index.ts"
import type { MedicalTherapyProps } from "../index.ts"

export type OccupationalTherapyType = "OccupationalTherapy"

export interface OccupationalTherapyProps {
	"@type"?: OccupationalTherapyType
}

type OccupationalTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps
	& OccupationalTherapyProps

export default OccupationalTherapy

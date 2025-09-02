import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicalProcedureTypeType = "MedicalProcedureType"

export interface MedicalProcedureTypeProps {
	"@type"?: MedicalProcedureTypeType
}

type MedicalProcedureType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalProcedureTypeProps

export default MedicalProcedureType

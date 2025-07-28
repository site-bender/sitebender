import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalProcedureTypeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalProcedureType/index.tsx"

export interface MedicalProcedureTypeProps {
}

type MedicalProcedureType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalProcedureTypeProps

export default MedicalProcedureType

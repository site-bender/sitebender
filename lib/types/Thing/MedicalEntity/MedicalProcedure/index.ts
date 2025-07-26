import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type MedicalEntity from "../index.ts"
import type MedicalProcedureType from "../../Intangible/Enumeration/MedicalEnumeration/MedicalProcedureType/index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"

export interface MedicalProcedureProps {
	bodyLocation?: Text
	followup?: Text
	howPerformed?: Text
	preparation?: MedicalEntity | Text
	procedureType?: MedicalProcedureType
	status?: EventStatusType | MedicalStudyStatus | Text
}

type MedicalProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps

export default MedicalProcedure

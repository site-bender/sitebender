import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalProcedureType from "../../Intangible/Enumeration/MedicalEnumeration/MedicalProcedureType/index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

import MedicalProcedureTypeComponent from "../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalProcedureType/index.ts"
import MedicalStudyStatusComponent from "../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import EventStatusTypeComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import MedicalEntityComponent from "../../../../components/Thing/MedicalEntity/index.ts"

export interface MedicalProcedureProps {
	"@type"?: "MedicalProcedure"
	bodyLocation?: Text
	followup?: Text
	howPerformed?: Text
	preparation?: MedicalEntity | Text | ReturnType<typeof MedicalEntityComponent>
	procedureType?:
		| MedicalProcedureType
		| ReturnType<typeof MedicalProcedureTypeComponent>
	status?:
		| EventStatusType
		| MedicalStudyStatus
		| Text
		| ReturnType<typeof EventStatusTypeComponent>
		| ReturnType<typeof MedicalStudyStatusComponent>
}

type MedicalProcedure = Thing & MedicalEntityProps & MedicalProcedureProps

export default MedicalProcedure

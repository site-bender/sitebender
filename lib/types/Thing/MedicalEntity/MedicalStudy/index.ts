import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"

import MedicalStudyStatusComponent from "../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import EventStatusTypeComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import MedicalEntityComponent from "../../../../components/Thing/MedicalEntity/index.ts"
import MedicalConditionComponent from "../../../../components/Thing/MedicalEntity/MedicalCondition/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"
import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"

export interface MedicalStudyProps {
	healthCondition?:
		| MedicalCondition
		| ReturnType<typeof MedicalConditionComponent>
	sponsor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	status?:
		| EventStatusType
		| MedicalStudyStatus
		| Text
		| ReturnType<typeof EventStatusTypeComponent>
		| ReturnType<typeof MedicalStudyStatusComponent>
	studyLocation?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
	studySubject?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
}

type MedicalStudy = Thing & MedicalEntityProps & MedicalStudyProps

export default MedicalStudy

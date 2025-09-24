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
import type { MedicalObservationalStudyType } from "./MedicalObservationalStudy/index.ts"
import type { MedicalTrialType } from "./MedicalTrial/index.ts"

import MedicalStudyStatusComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.tsx"
import EventStatusTypeComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.tsx"
import MedicalEntityComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/index.tsx"
import MedicalConditionComponent from "../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalCondition/index.tsx"
import OrganizationComponent from "../../../../../../codewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../codewright/src/define/Thing/Person/index.tsx"
import AdministrativeAreaComponent from "../../../../../../codewright/src/define/Thing/Place/AdministrativeArea/index.tsx"

export type MedicalStudyType =
	| "MedicalStudy"
	| MedicalTrialType
	| MedicalObservationalStudyType

export interface MedicalStudyProps {
	"@type"?: MedicalStudyType
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

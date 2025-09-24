import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Audience from "../Audience/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Service from "../Service/index.ts"
import type { GovernmentPermitType } from "./GovernmentPermit/index.ts"

import AudienceComponent from "../../../../../../codewright/src/define/Thing/Intangible/Audience/index.tsx"
import DurationComponent from "../../../../../../codewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import ServiceComponent from "../../../../../../codewright/src/define/Thing/Intangible/Service/index.tsx"
import OrganizationComponent from "../../../../../../codewright/src/define/Thing/Organization/index.tsx"
import AdministrativeAreaComponent from "../../../../../../codewright/src/define/Thing/Place/AdministrativeArea/index.tsx"

export type PermitType = "Permit" | GovernmentPermitType

export interface PermitProps {
	"@type"?: PermitType
	issuedBy?: Organization | ReturnType<typeof OrganizationComponent>
	issuedThrough?: Service | ReturnType<typeof ServiceComponent>
	permitAudience?: Audience | ReturnType<typeof AudienceComponent>
	validFor?: Duration | ReturnType<typeof DurationComponent>
	validFrom?: Date | DateTime
	validIn?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
	validUntil?: Date
}

type Permit = Thing & IntangibleProps & PermitProps

export default Permit

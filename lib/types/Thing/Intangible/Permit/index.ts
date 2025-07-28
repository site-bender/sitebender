import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Audience from "../Audience/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Service from "../Service/index.ts"

import AudienceComponent from "../../../../components/Thing/Intangible/Audience/index.ts"
import DurationComponent from "../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import ServiceComponent from "../../../../components/Thing/Intangible/Service/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"

export interface PermitProps {
	issuedBy?: Organization | ReturnType<typeof OrganizationComponent>
	issuedThrough?: Service | ReturnType<typeof ServiceComponent>
	permitAudience?: Audience | ReturnType<typeof AudienceComponent>
	validFor?: Duration | ReturnType<typeof DurationComponent>
	validFrom?: Date | DateTime
	validIn?: AdministrativeArea | ReturnType<typeof AdministrativeAreaComponent>
	validUntil?: Date
}

type Permit = Thing & IntangibleProps & PermitProps

export default Permit

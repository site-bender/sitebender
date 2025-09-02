import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Audience from "../Audience/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Service from "../Service/index.ts"
import type { GovernmentPermitType } from "./GovernmentPermit/index.ts"

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"
import { Audience as AudienceComponent } from "../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Service as ServiceComponent } from "../../../../../components/index.tsx"

export type PermitType = "Permit" | GovernmentPermitType

export interface PermitProps {
	"@type"?: PermitType
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

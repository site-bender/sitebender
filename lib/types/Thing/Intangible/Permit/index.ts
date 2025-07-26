import type { Date, DateTime } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Audience from "../Audience/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Organization from "../../Organization/index.ts"
import type Service from "../Service/index.ts"

export interface PermitProps {
	issuedBy?: Organization
	issuedThrough?: Service
	permitAudience?: Audience
	validFor?: Duration
	validFrom?: Date | DateTime
	validIn?: AdministrativeArea
	validUntil?: Date
}

type Permit =
	& Thing
	& IntangibleProps
	& PermitProps

export default Permit

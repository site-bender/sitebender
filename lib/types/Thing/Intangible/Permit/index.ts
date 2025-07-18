import type { Date, DateTime } from "../../../DataType/index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Audience from "../Audience/index.ts"
import type Intangible from "../index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Service from "../Service/index.ts"

export default interface Permit extends Intangible {
	/** The organization issuing the item, for example a [[Permit]], [[Ticket]], or [[Certification]]. */
	issuedBy?: Organization
	/** The service through which the permit was granted. */
	issuedThrough?: Service
	/** The target audience for this permit. */
	permitAudience?: Audience
	/** The duration of validity of a permit or similar thing. */
	validFor?: Duration
	/** The date when the item becomes valid. */
	validFrom?: Date | DateTime
	/** The geographic area where the item is valid. Applies for example to a [[Permit]], a [[Certification]], or an [[EducationalOccupationalCredential]]. */
	validIn?: AdministrativeArea
	/** The date when the item is no longer valid. */
	validUntil?: Date
}

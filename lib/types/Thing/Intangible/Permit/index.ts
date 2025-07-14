import { Date, DateTime } from "../../../DataType/index.ts"
import Organization from "../../Organization/index.ts"
import AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import Audience from "../Audience/index.ts"
import Intangible from "../index.ts"
import Duration from "../Quantity/Duration/index.ts"
import Service from "../Service/index.ts"

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

import {
	Boolean,
	Date,
	DateTime,
	Text,
	Time,
	URL,
} from "../../../DataType/index.ts"
import Thing from "../../../index.ts"
import Place from "../../Place/index.ts"
import CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import Intangible from "../index.ts"
import MediaSubscription from "../MediaSubscription/index.ts"
import Offer from "../Offer/index.ts"
import GeoShape from "../StructuredValue/GeoShape/index.ts"

export default interface ActionAccessSpecification extends Intangible {
	/** The end of the availability of the product or service included in the offer. */
	availabilityEnds?: Date | DateTime | Time
	/** The beginning of the availability of the product or service included in the offer. */
	availabilityStarts?: Date | Time | DateTime
	/** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
	category?: Thing | PhysicalActivityCategory | Text | URL | CategoryCode
	/** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is valid.\n\nSee also [[ineligibleRegion]]. */
	eligibleRegion?: Place | GeoShape | Text
	/** An Offer which must be accepted before the user can perform the Action. For example, the user may need to buy a movie before being able to watch it. */
	expectsAcceptanceOf?: Offer
	/** The ISO 3166-1 (ISO 3166-1 alpha-2) or ISO 3166-2 code, the place, or the GeoShape for the geo-political region(s) for which the offer or delivery charge specification is not valid, e.g. a region where the transaction is not allowed.\n\nSee also [[eligibleRegion]]. */
	ineligibleRegion?: Place | GeoShape | Text
	/** Indicates if use of the media require a subscription  (either paid or free). Allowed values are ```true``` or ```false``` (note that an earlier version had 'yes', 'no'). */
	requiresSubscription?: MediaSubscription | Boolean
}

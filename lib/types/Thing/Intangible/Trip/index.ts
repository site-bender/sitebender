import type { DateTime, Time } from "../../../DataType/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Place from "../../Place/index.ts"
import type Demand from "../Demand/index.ts"
import type Intangible from "../index.ts"
import type ItemList from "../ItemList/index.ts"
import type Offer from "../Offer/index.ts"

export default interface Trip extends Intangible {
	/** The expected arrival time. */
	arrivalTime?: Time | DateTime
	/** The expected departure time. */
	departureTime?: Time | DateTime
	/** Destination(s) ( [[Place]] ) that make up a trip. For a trip where destination order is important use [[ItemList]] to specify that order (see examples). */
	itinerary?: ItemList | Place
	/** An offer to provide this item&#x2014;for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
	offers?: Demand | Offer
	/** Identifies that this [[Trip]] is a subTrip of another Trip.  For example Day 1, Day 2, etc. of a multi-day trip. */
	partOfTrip?: Trip
	/** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
	provider?: Organization | Person
	/** Identifies a [[Trip]] that is a subTrip of this Trip.  For example Day 1, Day 2, etc. of a multi-day trip. */
	subTrip?: Trip
	/** The location of origin of the trip, prior to any destination(s). */
	tripOrigin?: Place
}

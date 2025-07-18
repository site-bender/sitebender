import type { DateTime, Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type ReservationStatusType from "../Enumeration/StatusEnumeration/ReservationStatusType/index.ts"
import type Intangible from "../index.ts"
import type ProgramMembership from "../ProgramMembership/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type Ticket from "../Ticket/index.ts"

export default interface Reservation extends Intangible {
	/** 'bookingAgent' is an out-dated term indicating a 'broker' that serves as a booking agent. */
	bookingAgent?: Organization | Person
	/** The date and time the reservation was booked. */
	bookingTime?: DateTime
	/** An entity that arranges for an exchange between a buyer and a seller.  In most cases a broker never acquires or releases ownership of a product or service involved in an exchange.  If it is not clear whether an entity is a broker, seller, or buyer, the latter two terms are preferred. */
	broker?: Organization | Person
	/** The date and time the reservation was modified. */
	modifiedTime?: DateTime
	/** The currency of the price, or a price component when attached to [[PriceSpecification]] and its subtypes.\n\nUse standard formats: [ISO 4217 currency format](http://en.wikipedia.org/wiki/ISO_4217), e.g. "USD"; [Ticker symbol](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) for cryptocurrencies, e.g. "BTC"; well known names for [Local Exchange Trading Systems](https://en.wikipedia.org/wiki/Local_exchange_trading_system) (LETS) and other currency types, e.g. "Ithaca HOUR". */
	priceCurrency?: Text
	/** Any membership in a frequent flyer, hotel loyalty program, etc. being applied to the reservation. */
	programMembershipUsed?: ProgramMembership
	/** The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller. */
	provider?: Organization | Person
	/** The thing -- flight, event, restaurant, etc. being reserved. */
	reservationFor?: Thing
	/** A unique identifier for the reservation. */
	reservationId?: Text
	/** The current status of the reservation. */
	reservationStatus?: ReservationStatusType
	/** A ticket associated with the reservation. */
	reservedTicket?: Ticket
	/** The total price for the reservation or ticket, including applicable taxes, shipping, etc.\n\nUsage guidelines:\n\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
	totalPrice?: Text | Number | PriceSpecification
	/** The person or organization the reservation or ticket is for. */
	underName?: Organization | Person
}

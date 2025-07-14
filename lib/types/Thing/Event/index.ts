import { Language } from "../../bcp47/index.ts"
import {
	Boolean,
	Date,
	DateTime,
	Integer,
	Text,
	Time,
	URL,
} from "../../DataType/index.ts"
import CreativeWork from "../CreativeWork/index.ts"
import Review from "../CreativeWork/Review/index.ts"
import Thing from "../index.ts"
import Audience from "../Intangible/Audience/index.ts"
import DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import Demand from "../Intangible/Demand/index.ts"
import EventAttendanceModeEnumeration from "../Intangible/Enumeration/EventAttendanceModeEnumeration/index.ts"
import EventStatusType from "../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import Grant from "../Intangible/Grant/index.ts"
import Offer from "../Intangible/Offer/index.ts"
import Duration from "../Intangible/Quantity/Duration/index.ts"
import AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import Schedule from "../Intangible/Schedule/index.ts"
import PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import VirtualLocation from "../Intangible/VirtualLocation/index.ts"
import Organization from "../Organization/index.ts"
import PerformingGroup from "../Organization/PerformingGroup/index.ts"
import Person from "../Person/index.ts"
import Place from "../Place/index.ts"

export default interface Event extends Thing {
	/** The subject matter of the content. */
	about?: Thing
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** The overall rating, based on a collection of reviews or ratings, of the item. */
	aggregateRating?: AggregateRating
	/** A person or organization attending the event. */
	attendee?: Organization | Person
	/** A person attending the event. */
	attendees?: Organization | Person
	/** An intended audience, i.e. a group for whom something was created. */
	audience?: Audience
	/** The person or organization who wrote a composition, or who is the composer of a work performed at some event. */
	composer?: Organization | Person
	/** A secondary contributor to the CreativeWork or Event. */
	contributor?: Organization | Person
	/** A director of e.g. TV, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
	director?: Person
	/** The time admission will commence. */
	doorTime?: Time | DateTime
	/** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	duration?: QuantitativeValue | Duration
	/** The end date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	endDate?: Date | DateTime
	/** The eventAttendanceMode of an event indicates whether it occurs online, offline, or a mix. */
	eventAttendanceMode?: EventAttendanceModeEnumeration
	/** Associates an [[Event]] with a [[Schedule]]. There are circumstances where it is preferable to share a schedule for a series of       repeating events rather than data on the individual events themselves. For example, a website or application might prefer to publish a schedule for a weekly       gym class rather than provide data on every event. A schedule could be processed by applications to add forthcoming events to a calendar. An [[Event]] that       is associated with a [[Schedule]] using this property should not have [[startDate]] or [[endDate]] properties. These are instead defined within the associated       [[Schedule]], this avoids any ambiguity for clients using the data. The property might have repeated values to specify different schedules, e.g. for different months       or seasons. */
	eventSchedule?: Schedule
	/** An eventStatus of an event represents its status; particularly useful when an event is cancelled or rescheduled. */
	eventStatus?: EventStatusType
	/** A person or organization that supports (sponsors) something through some kind of financial contribution. */
	funder?: Organization | Person
	/** A [[Grant]] that directly or indirectly provide funding or sponsorship for this item. See also [[ownershipFundingInfo]]. */
	funding?: Grant
	/** The language of the content or performance or used in an action. Please use one of the language codes from the [IETF BCP 47 standard](http://tools.ietf.org/html/bcp47). See also [[availableLanguage]]. */
	inLanguage?: Text | Language
	/** A flag to signal that the item, event, or place is accessible for free. */
	isAccessibleForFree?: Boolean
	/** Keywords or tags used to describe some item. Multiple textual entries in a keywords list are typically delimited by commas, or by repeating the property. */
	keywords?: URL | Text | DefinedTerm
	/** The location of, for example, where an event is happening, where an organization is located, or where an action takes place. */
	location?: VirtualLocation | PostalAddress | Place | Text
	/** The total number of individuals that may attend an event or venue. */
	maximumAttendeeCapacity?: Integer
	/** The maximum physical attendee capacity of an [[Event]] whose [[eventAttendanceMode]] is [[OfflineEventAttendanceMode]] (or the offline aspects, in the case of a [[MixedEventAttendanceMode]]). */
	maximumPhysicalAttendeeCapacity?: Integer
	/** The maximum virtual attendee capacity of an [[Event]] whose [[eventAttendanceMode]] is [[OnlineEventAttendanceMode]] (or the online aspects, in the case of a [[MixedEventAttendanceMode]]). */
	maximumVirtualAttendeeCapacity?: Integer
	/** An offer to provide this item&#x2014;for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use [[businessFunction]] to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a [[Demand]]. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer. */
	offers?: Demand | Offer
	/** An organizer of an Event. */
	organizer?: Organization | Person
	/** A performer at the event&#x2014;for example, a presenter, musician, musical group or actor. */
	performer?: Organization | Person
	/** The main performer or performers of the event&#x2014;for example, a presenter, musician, or actor. */
	performers?: Organization | Person
	/** Used in conjunction with eventStatus for rescheduled or cancelled events. This property contains the previously scheduled start date. For rescheduled events, the startDate property should be used for the newly scheduled start date. In the (rare) case of an event that has been postponed and rescheduled multiple times, this field may be repeated. */
	previousStartDate?: Date
	/** The CreativeWork that captured all or part of this Event. */
	recordedIn?: CreativeWork
	/** The number of attendee places for an event that remain unallocated. */
	remainingAttendeeCapacity?: Integer
	/** A review of the item. */
	review?: Review
	/** A person or organization that supports a thing through a pledge, promise, or financial contribution. E.g. a sponsor of a Medical Study or a corporate sponsor of an event. */
	sponsor?: Person | Organization
	/** The start date and time of the item (in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601)). */
	startDate?: Date | DateTime
	/** An Event that is part of this event. For example, a conference event includes many presentations, each of which is a subEvent of the conference. */
	subEvent?: Event
	/** Events that are a part of this event. For example, a conference event includes many presentations, each subEvents of the conference. */
	subEvents?: Event
	/** An event that this event is a part of. For example, a collection of individual music performances might each have a music festival as their superEvent. */
	superEvent?: Event
	/** Organization or person who adapts a creative work to different languages, regional differences and technical requirements of a target market, or that translates during some event. */
	translator?: Organization | Person
	/** The typical expected age range, e.g. '7-9', '11-'. */
	typicalAgeRange?: Text
	/** A work featured in some event, e.g. exhibited in an ExhibitionEvent.        Specific subproperties are available for workPerformed (e.g. a play), or a workPresented (a Movie at a ScreeningEvent). */
	workFeatured?: CreativeWork
	/** A work performed in some event, for example a play performed in a TheaterEvent. */
	workPerformed?: CreativeWork
}

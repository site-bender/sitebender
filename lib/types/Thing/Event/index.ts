import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Text,
	Time,
	URL,
} from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type Audience from "../Intangible/Audience/index.ts"
import type CreativeWork from "../CreativeWork/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type Duration from "../Intangible/Quantity/Duration/index.ts"
import type EventAttendanceModeEnumeration from "../Intangible/Enumeration/EventAttendanceModeEnumeration/index.ts"
import type EventStatusType from "../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type Language from "../Intangible/Language/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type Organization from "../Organization/index.ts"
import type PerformingGroup from "../Organization/PerformingGroup/index.ts"
import type Person from "../Person/index.ts"
import type Place from "../Place/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Review from "../CreativeWork/Review/index.ts"
import type Schedule from "../Intangible/Schedule/index.ts"
import type VirtualLocation from "../Intangible/VirtualLocation/index.ts"

export interface EventProps {
	about?: Thing
	actor?: PerformingGroup | Person
	aggregateRating?: AggregateRating
	attendee?: Organization | Person
	attendees?: Organization | Person
	audience?: Audience
	composer?: Organization | Person
	contributor?: Organization | Person
	director?: Person
	doorTime?: DateTime | Time
	duration?: Duration | QuantitativeValue
	endDate?: Date | DateTime
	eventAttendanceMode?: EventAttendanceModeEnumeration
	eventSchedule?: Schedule
	eventStatus?: EventStatusType
	funder?: Organization | Person
	funding?: Grant
	inLanguage?: Language | Text
	isAccessibleForFree?: Boolean
	keywords?: DefinedTerm | Text | URL
	location?: Place | PostalAddress | Text | VirtualLocation
	maximumAttendeeCapacity?: Integer
	maximumPhysicalAttendeeCapacity?: Integer
	maximumVirtualAttendeeCapacity?: Integer
	offers?: Demand | Offer
	organizer?: Organization | Person
	performer?: Organization | Person
	performers?: Organization | Person
	previousStartDate?: Date
	recordedIn?: CreativeWork
	remainingAttendeeCapacity?: Integer
	review?: Review
	sponsor?: Organization | Person
	startDate?: Date | DateTime
	subEvent?: Event
	subEvents?: Event
	superEvent?: Event
	translator?: Organization | Person
	typicalAgeRange?: Text
	workFeatured?: CreativeWork
	workPerformed?: CreativeWork
}

type Event =
	& Thing
	& EventProps

export default Event

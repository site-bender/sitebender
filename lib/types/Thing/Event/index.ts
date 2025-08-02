import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Text,
	Time,
	URL,
} from "../../DataType/index.ts"
import type CreativeWork from "../CreativeWork/index.ts"
import type Review from "../CreativeWork/Review/index.ts"
import type Thing from "../index.ts"
import type Audience from "../Intangible/Audience/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type EventAttendanceModeEnumeration from "../Intangible/Enumeration/EventAttendanceModeEnumeration/index.ts"
import type EventStatusType from "../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type Language from "../Intangible/Language/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type Duration from "../Intangible/Quantity/Duration/index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type Schedule from "../Intangible/Schedule/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type VirtualLocation from "../Intangible/VirtualLocation/index.ts"
import type Organization from "../Organization/index.ts"
import type PerformingGroup from "../Organization/PerformingGroup/index.ts"
import type Person from "../Person/index.ts"
import type Place from "../Place/index.ts"
import type { BusinessEventType } from "./BusinessEvent/index.ts"
import type { ChildrensEventType } from "./ChildrensEvent/index.ts"
import type { ComedyEventType } from "./ComedyEvent/index.ts"
import type { CourseInstanceType } from "./CourseInstance/index.ts"
import type { DanceEventType } from "./DanceEvent/index.ts"
import type { DeliveryEventType } from "./DeliveryEvent/index.ts"
import type { EducationEventType } from "./EducationEvent/index.ts"
import type { EventSeriesType } from "./EventSeries/index.ts"
import type { ExhibitionEventType } from "./ExhibitionEvent/index.ts"
import type { FestivalType } from "./Festival/index.ts"
import type { FoodEventType } from "./FoodEvent/index.ts"
import type { HackathonType } from "./Hackathon/index.ts"
import type { LiteraryEventType } from "./LiteraryEvent/index.ts"
import type { MusicEventType } from "./MusicEvent/index.ts"
import type { PublicationEventType } from "./PublicationEvent/index.ts"
import type { SaleEventType } from "./SaleEvent/index.ts"
import type { ScreeningEventType } from "./ScreeningEvent/index.ts"
import type { SocialEventType } from "./SocialEvent/index.ts"
import type { SportsEventType } from "./SportsEvent/index.ts"
import type { TheaterEventType } from "./TheaterEvent/index.ts"
import type { UserInteractionType } from "./UserInteraction/index.ts"
import type { VisualArtsEventType } from "./VisualArtsEvent/index.ts"

import CreativeWorkComponent from "../../../components/Thing/CreativeWork/index.ts"
import ReviewComponent from "../../../components/Thing/CreativeWork/Review/index.ts"
import EventComponent from "../../../components/Thing/Event/index.ts"
import ThingComponent from "../../../components/Thing/index.ts"
import AudienceComponent from "../../../components/Thing/Intangible/Audience/index.ts"
import DefinedTermComponent from "../../../components/Thing/Intangible/DefinedTerm/index.ts"
import DemandComponent from "../../../components/Thing/Intangible/Demand/index.ts"
import EventAttendanceModeEnumerationComponent from "../../../components/Thing/Intangible/Enumeration/EventAttendanceModeEnumeration/index.ts"
import EventStatusTypeComponent from "../../../components/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import GrantComponent from "../../../components/Thing/Intangible/Grant/index.ts"
import LanguageComponent from "../../../components/Thing/Intangible/Language/index.ts"
import OfferComponent from "../../../components/Thing/Intangible/Offer/index.ts"
import DurationComponent from "../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import AggregateRatingComponent from "../../../components/Thing/Intangible/Rating/AggregateRating/index.ts"
import ScheduleComponent from "../../../components/Thing/Intangible/Schedule/index.ts"
import PostalAddressComponent from "../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import QuantitativeValueComponent from "../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import VirtualLocationComponent from "../../../components/Thing/Intangible/VirtualLocation/index.ts"
import OrganizationComponent from "../../../components/Thing/Organization/index.ts"
import PerformingGroupComponent from "../../../components/Thing/Organization/PerformingGroup/index.ts"
import PersonComponent from "../../../components/Thing/Person/index.ts"
import PlaceComponent from "../../../components/Thing/Place/index.ts"

export type EventType =
	| "Event"
	| MusicEventType
	| SaleEventType
	| DeliveryEventType
	| ChildrensEventType
	| BusinessEventType
	| CourseInstanceType
	| ExhibitionEventType
	| UserInteractionType
	| EducationEventType
	| EventSeriesType
	| FoodEventType
	| SocialEventType
	| ComedyEventType
	| HackathonType
	| SportsEventType
	| TheaterEventType
	| FestivalType
	| ScreeningEventType
	| VisualArtsEventType
	| PublicationEventType
	| LiteraryEventType
	| DanceEventType

export interface EventProps {
	"@type"?: EventType
	about?: Thing | ReturnType<typeof ThingComponent>
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	aggregateRating?:
		| AggregateRating
		| ReturnType<typeof AggregateRatingComponent>
	attendee?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	attendees?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	audience?: Audience | ReturnType<typeof AudienceComponent>
	composer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	contributor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	doorTime?: DateTime | Time
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	endDate?: Date | DateTime
	eventAttendanceMode?:
		| EventAttendanceModeEnumeration
		| ReturnType<typeof EventAttendanceModeEnumerationComponent>
	eventSchedule?: Schedule | ReturnType<typeof ScheduleComponent>
	eventStatus?: EventStatusType | ReturnType<typeof EventStatusTypeComponent>
	funder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	funding?: Grant | ReturnType<typeof GrantComponent>
	inLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	isAccessibleForFree?: Boolean
	keywords?: DefinedTerm | Text | URL | ReturnType<typeof DefinedTermComponent>
	location?:
		| Place
		| PostalAddress
		| Text
		| VirtualLocation
		| ReturnType<typeof PlaceComponent>
		| ReturnType<typeof PostalAddressComponent>
		| ReturnType<typeof VirtualLocationComponent>
	maximumAttendeeCapacity?: Integer
	maximumPhysicalAttendeeCapacity?: Integer
	maximumVirtualAttendeeCapacity?: Integer
	offers?:
		| Demand
		| Offer
		| ReturnType<typeof DemandComponent>
		| ReturnType<typeof OfferComponent>
	organizer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	performer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	performers?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	previousStartDate?: Date
	recordedIn?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	remainingAttendeeCapacity?: Integer
	review?: Review | ReturnType<typeof ReviewComponent>
	sponsor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	startDate?: Date | DateTime
	subEvent?: Event | ReturnType<typeof EventComponent>
	subEvents?: Event | ReturnType<typeof EventComponent>
	superEvent?: Event | ReturnType<typeof EventComponent>
	translator?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	typicalAgeRange?: Text
	workFeatured?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	workPerformed?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
}

type Event = Thing & EventProps

export default Event

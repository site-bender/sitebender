import type {
	Boolean,
	DateTime,
	Integer,
	Text,
	Time,
} from "../../DataType/index.ts"
import type { CreativeWork } from "../CreativeWork/index.ts"
import type {
	AggregateRating,
	Demand,
	Duration,
	EventAttendanceModeEnumeration,
	EventStatusType,
	Grant,
	Language,
	Offer,
	PerformingGroup,
	PostalAddress,
	Review,
	Schedule,
	Thing,
	URL,
	VirtualLocation,
} from "../index.ts"
import type { Audience } from "../Intangible/Audience/index.ts"
import type { DefinedTerm } from "../Intangible/DefinedTerm/index.ts"
import type { Organization } from "../Organization/index.ts"
import type { Person } from "../Person/index.ts"
import type { Place } from "../Place/index.ts"

// Event interface - extends Thing
export interface Event extends Thing {
	about?: Thing
	actor?: PerformingGroup | Person
	aggregateRating?: AggregateRating
	attendee?: Organization | Person
	audience?: Audience
	composer?: Organization | Person
	contributor?: Organization | Person
	director?: Organization | Person
	doorTime?: DateTime | Time
	duration?: Duration
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
	previousStartDate?: Date
	recordedIn?: CreativeWork
	remainingAttendeeCapacity?: Integer
	review?: Review
	sponsor?: Organization | Person
	startDate?: Date | DateTime
	subEvent?: Event
	superEvent?: Event
	translator?: Organization | Person
	typicalAgeRange?: Text
	workFeatured?: CreativeWork
	workPerformed?: CreativeWork
}

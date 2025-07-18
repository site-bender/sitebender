import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../types/index.ts"
import type EventProps from "../../../types/Thing/Event/index.ts"
import type ThingProps from "../../../types/Thing/index.ts"

import Thing from "../index.tsx"

export type Props = BaseComponentProps<
	EventProps,
	"Event",
	ExtractLevelProps<EventProps, ThingProps>
>

export default function Event(
	{
		about,
		actor,
		aggregateRating,
		attendee,
		attendees,
		audience,
		composer,
		contributor,
		director,
		doorTime,
		duration,
		endDate,
		eventAttendanceMode,
		eventSchedule,
		eventStatus,
		funder,
		funding,
		inLanguage,
		isAccessibleForFree,
		keywords,
		location,
		maximumAttendeeCapacity,
		maximumPhysicalAttendeeCapacity,
		maximumVirtualAttendeeCapacity,
		offers,
		organizer,
		performer,
		performers,
		previousStartDate,
		recordedIn,
		remainingAttendeeCapacity,
		review,
		sponsor,
		startDate,
		subEvent,
		subEvents,
		superEvent,
		translator,
		typicalAgeRange,
		workFeatured,
		workPerformed,
		schemaType = "Event",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Thing
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				about,
				actor,
				aggregateRating,
				attendee,
				attendees,
				audience,
				composer,
				contributor,
				director,
				doorTime,
				duration,
				endDate,
				eventAttendanceMode,
				eventSchedule,
				eventStatus,
				funder,
				funding,
				inLanguage,
				isAccessibleForFree,
				keywords,
				location,
				maximumAttendeeCapacity,
				maximumPhysicalAttendeeCapacity,
				maximumVirtualAttendeeCapacity,
				offers,
				organizer,
				performer,
				performers,
				previousStartDate,
				recordedIn,
				remainingAttendeeCapacity,
				review,
				sponsor,
				startDate,
				subEvent,
				subEvents,
				superEvent,
				translator,
				typicalAgeRange,
				workFeatured,
				workPerformed,
				...subtypeProperties,
			}}
		/>
	)
}

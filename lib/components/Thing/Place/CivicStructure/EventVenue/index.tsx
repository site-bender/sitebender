import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type EventVenueProps from "../../../../../types/Thing/EventVenue/index.ts"

import CivicStructure from "../index.tsx"

// EventVenue adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	EventVenueProps,
	"EventVenue",
	ExtractLevelProps<EventVenueProps, CivicStructureProps>
>

export default function EventVenue({
	schemaType = "EventVenue",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}

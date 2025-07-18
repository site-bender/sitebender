import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type MusicEventProps from "../../../../types/Thing/MusicEvent/index.ts"

import Event from "../index.tsx"

// MusicEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	MusicEventProps,
	"MusicEvent",
	ExtractLevelProps<MusicEventProps, EventProps>
>

export default function MusicEvent({
	schemaType = "MusicEvent",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}

import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type HackathonProps from "../../../../types/Thing/Hackathon/index.ts"

import Event from "./index.tsx"

// Hackathon adds no properties to the Event schema type
export type Props = BaseComponentProps<
	HackathonProps,
	"Hackathon",
	ExtractLevelProps<HackathonProps, EventProps>
>

export default function Hackathon({
	schemaType = "Hackathon",
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

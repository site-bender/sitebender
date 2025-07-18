import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type SocialEventProps from "../../../../types/Thing/SocialEvent/index.ts"

import Event from "../index.tsx"

// SocialEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	SocialEventProps,
	"SocialEvent",
	ExtractLevelProps<SocialEventProps, EventProps>
>

export default function SocialEvent({
	schemaType = "SocialEvent",
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

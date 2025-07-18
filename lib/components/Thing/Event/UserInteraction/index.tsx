import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type UserInteractionProps from "../../../../types/Thing/UserInteraction/index.ts"

import Event from "../index.tsx"

// UserInteraction adds no properties to the Event schema type
export type Props = BaseComponentProps<
	UserInteractionProps,
	"UserInteraction",
	ExtractLevelProps<UserInteractionProps, EventProps>
>

export default function UserInteraction({
	schemaType = "UserInteraction",
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

import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EventStatusTypeProps from "../../../../../../types/Thing/EventStatusType/index.ts"
import type StatusEnumerationProps from "../../../../../../types/Thing/StatusEnumeration/index.ts"

import StatusEnumeration from "../index.tsx"

// EventStatusType adds no properties to the StatusEnumeration schema type
export type Props = BaseComponentProps<
	EventStatusTypeProps,
	"EventStatusType",
	ExtractLevelProps<EventStatusTypeProps, StatusEnumerationProps>
>

export default function EventStatusType({
	schemaType = "EventStatusType",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<StatusEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}

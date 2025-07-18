import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ActionStatusTypeProps from "../../../../../../types/Thing/ActionStatusType/index.ts"
import type StatusEnumerationProps from "../../../../../../types/Thing/StatusEnumeration/index.ts"

import StatusEnumeration from "../index.tsx"

// ActionStatusType adds no properties to the StatusEnumeration schema type
export type Props = BaseComponentProps<
	ActionStatusTypeProps,
	"ActionStatusType",
	ExtractLevelProps<ActionStatusTypeProps, StatusEnumerationProps>
>

export default function ActionStatusType({
	schemaType = "ActionStatusType",
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

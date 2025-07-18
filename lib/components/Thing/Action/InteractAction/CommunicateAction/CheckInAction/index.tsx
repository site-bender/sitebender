import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CheckInActionProps from "../../../../../../types/Thing/CheckInAction/index.ts"
import type CommunicateActionProps from "../../../../../../types/Thing/CommunicateAction/index.ts"

import CommunicateAction from "../index.tsx"

// CheckInAction adds no properties to the CommunicateAction schema type
export type Props = BaseComponentProps<
	CheckInActionProps,
	"CheckInAction",
	ExtractLevelProps<CheckInActionProps, CommunicateActionProps>
>

export default function CheckInAction({
	schemaType = "CheckInAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CommunicateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}

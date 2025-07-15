import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CheckOutActionProps from "../../../../../../types/Thing/CheckOutAction/index.ts"
import type CommunicateActionProps from "../../../../../../types/Thing/CommunicateAction/index.ts"

import CommunicateAction from "./index.tsx"

// CheckOutAction adds no properties to the CommunicateAction schema type
export type Props = BaseComponentProps<
	CheckOutActionProps,
	"CheckOutAction",
	ExtractLevelProps<CheckOutActionProps, CommunicateActionProps>
>

export default function CheckOutAction({
	schemaType = "CheckOutAction",
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

import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CommunicateActionProps from "../../../../../../types/Thing/CommunicateAction/index.ts"
import type ShareActionProps from "../../../../../../types/Thing/ShareAction/index.ts"

import CommunicateAction from "../index.tsx"

// ShareAction adds no properties to the CommunicateAction schema type
export type Props = BaseComponentProps<
	ShareActionProps,
	"ShareAction",
	ExtractLevelProps<ShareActionProps, CommunicateActionProps>
>

export default function ShareAction({
	schemaType = "ShareAction",
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

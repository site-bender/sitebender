import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CommunicateActionProps from "../../../../../../types/Thing/CommunicateAction/index.ts"
import type InviteActionProps from "../../../../../../types/Thing/InviteAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = BaseComponentProps<
	InviteActionProps,
	"InviteAction",
	ExtractLevelProps<InviteActionProps, CommunicateActionProps>
>

export default function InviteAction(
	{
		event,
		schemaType = "InviteAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CommunicateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				event,
				...subtypeProperties,
			}}
		/>
	)
}

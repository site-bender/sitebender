import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CommunicateActionProps from "../../../../../../types/Thing/CommunicateAction/index.ts"
import type ReplyActionProps from "../../../../../../types/Thing/ReplyAction/index.ts"

import CommunicateAction from "./index.tsx"

export type Props = BaseComponentProps<
	ReplyActionProps,
	"ReplyAction",
	ExtractLevelProps<ReplyActionProps, CommunicateActionProps>
>

export default function ReplyAction(
	{
		resultComment,
		schemaType = "ReplyAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CommunicateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				resultComment,
				...subtypeProperties,
			}}
		/>
	)
}

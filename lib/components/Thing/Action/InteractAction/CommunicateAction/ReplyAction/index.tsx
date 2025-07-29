import type BaseProps from "../../../../../../types/index.ts"
import type ReplyActionProps from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/ReplyAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = ReplyActionProps & BaseProps

export default function ReplyAction({
	resultComment,
	_type = "ReplyAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CommunicateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				resultComment,
				...subtypeProperties,
			}}
		/>
	)
}

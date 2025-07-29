import type BaseProps from "../../../../../../types/index.ts"
import type InviteActionProps from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/InviteAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = InviteActionProps & BaseProps

export default function InviteAction({
	event,
	_type = "InviteAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CommunicateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				event,
				...subtypeProperties,
			}}
		/>
	)
}

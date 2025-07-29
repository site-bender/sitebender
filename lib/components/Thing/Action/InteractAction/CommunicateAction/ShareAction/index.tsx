import type BaseProps from "../../../../../../types/index.ts"
import type ShareActionProps from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/ShareAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = ShareActionProps & BaseProps

export default function ShareAction({
	_type = "ShareAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CommunicateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}

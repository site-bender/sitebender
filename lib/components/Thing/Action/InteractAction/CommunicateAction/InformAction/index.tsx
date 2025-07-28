import type BaseProps from "../../../../../../types/index.ts"
import type { InformActionProps } from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/InformAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = InformActionProps & BaseProps

export default function InformAction({
	event,
	_type = "InformAction",
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

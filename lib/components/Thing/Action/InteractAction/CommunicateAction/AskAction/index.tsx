import type BaseProps from "../../../../../../types/index.ts"
import type AskActionProps from "../../../../../../types/Thing/Action/InteractAction/CommunicateAction/AskAction/index.ts"

import CommunicateAction from "../index.tsx"

export type Props = AskActionProps & BaseProps

export default function AskAction({
	question,
	_type = "AskAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CommunicateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				question,
				...subtypeProperties,
			}}
		/>
	)
}

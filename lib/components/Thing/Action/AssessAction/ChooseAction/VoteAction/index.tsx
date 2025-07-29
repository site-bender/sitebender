import type BaseProps from "../../../../../../types/index.ts"
import type VoteActionProps from "../../../../../../types/Thing/Action/AssessAction/ChooseAction/VoteAction/index.ts"

import ChooseAction from "../index.tsx"

export type Props = VoteActionProps & BaseProps

export default function VoteAction({
	candidate,
	_type = "VoteAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ChooseAction
			{...props}
			_type={_type}
			subtypeProperties={{
				candidate,
				...subtypeProperties,
			}}
		/>
	)
}

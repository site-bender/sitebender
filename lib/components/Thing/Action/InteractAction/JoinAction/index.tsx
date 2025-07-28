import type BaseProps from "../../../../../types/index.ts"
import type { JoinActionProps } from "../../../../../types/Thing/Action/InteractAction/JoinAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = JoinActionProps & BaseProps

export default function JoinAction({
	event,
	_type = "JoinAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InteractAction
			{...props}
			_type={_type}
			subtypeProperties={{
				event,
				...subtypeProperties,
			}}
		/>
	)
}

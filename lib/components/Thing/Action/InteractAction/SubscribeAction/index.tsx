import type BaseProps from "../../../../../types/index.ts"
import type { SubscribeActionProps } from "../../../../../types/Thing/Action/InteractAction/SubscribeAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = SubscribeActionProps & BaseProps

export default function SubscribeAction({
	_type = "SubscribeAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InteractAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}

import type BaseProps from "../../../../../types/index.ts"
import type FollowActionProps from "../../../../../types/Thing/Action/InteractAction/FollowAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = FollowActionProps & BaseProps

export default function FollowAction({
	followee,
	_type = "FollowAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InteractAction
			{...props}
			_type={_type}
			subtypeProperties={{
				followee,
				...subtypeProperties,
			}}
		>
			{children}
		</InteractAction>
	)
}

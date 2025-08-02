import type BaseProps from "../../../../../types/index.ts"
import type BefriendActionProps from "../../../../../types/Thing/Action/InteractAction/BefriendAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = BefriendActionProps & BaseProps

export default function BefriendAction({
	_type = "BefriendAction",
	children,
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
		>
			{children}
		</InteractAction>
	)
}

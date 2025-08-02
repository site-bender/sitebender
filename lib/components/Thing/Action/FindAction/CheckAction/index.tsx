import type BaseProps from "../../../../../types/index.ts"
import type CheckActionProps from "../../../../../types/Thing/Action/FindAction/CheckAction/index.ts"

import FindAction from "../index.tsx"

export type Props = CheckActionProps & BaseProps

export default function CheckAction({
	_type = "CheckAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FindAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</FindAction>
	)
}

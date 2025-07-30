import type BaseProps from "../../../../../types/index.ts"
import type AddActionProps from "../../../../../types/Thing/Action/UpdateAction/AddAction/index.ts"

import UpdateAction from "../index.tsx"

export type Props = AddActionProps & BaseProps

export default function AddAction({
	_type = "AddAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<UpdateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</UpdateAction>
	)
}

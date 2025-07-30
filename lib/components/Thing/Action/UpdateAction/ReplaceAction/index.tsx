import type BaseProps from "../../../../../types/index.ts"
import type ReplaceActionProps from "../../../../../types/Thing/Action/UpdateAction/ReplaceAction/index.ts"

import UpdateAction from "../index.tsx"

export type Props = ReplaceActionProps & BaseProps

export default function ReplaceAction({
	replacee,
	replacer,
	_type = "ReplaceAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<UpdateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				replacee,
				replacer,
				...subtypeProperties,
			}}
		>{children}</UpdateAction>
	)
}

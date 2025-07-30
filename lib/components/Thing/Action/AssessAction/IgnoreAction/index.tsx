import type BaseProps from "../../../../../types/index.ts"
import type IgnoreActionProps from "../../../../../types/Thing/Action/AssessAction/IgnoreAction/index.ts"

import AssessAction from "../index.tsx"

export type Props = IgnoreActionProps & BaseProps

export default function IgnoreAction({
	_type = "IgnoreAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AssessAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</AssessAction>
	)
}

import type BaseProps from "../../../../../types/index.ts"
import type ReactActionProps from "../../../../../types/Thing/Action/AssessAction/ReactAction/index.ts"

import AssessAction from "../index.tsx"

export type Props = ReactActionProps & BaseProps

export default function ReactAction({
	_type = "ReactAction",
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
		>
			{children}
		</AssessAction>
	)
}

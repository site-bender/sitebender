import type BaseProps from "../../../../../types/index.ts"
import type ListenActionProps from "../../../../../types/Thing/Action/ConsumeAction/ListenAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = ListenActionProps & BaseProps

export default function ListenAction({
	_type = "ListenAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ConsumeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</ConsumeAction>
	)
}

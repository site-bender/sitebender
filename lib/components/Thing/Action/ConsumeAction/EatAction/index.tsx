import type BaseProps from "../../../../../types/index.ts"
import type EatActionProps from "../../../../../types/Thing/Action/ConsumeAction/EatAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = EatActionProps & BaseProps

export default function EatAction({
	_type = "EatAction",
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

import type BaseProps from "../../../../../types/index.ts"
import type DrinkActionProps from "../../../../../types/Thing/Action/ConsumeAction/DrinkAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = DrinkActionProps & BaseProps

export default function DrinkAction({
	_type = "DrinkAction",
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

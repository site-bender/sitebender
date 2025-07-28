import type BaseProps from "../../../../../types/index.ts"
import type { UseActionProps } from "../../../../../types/Thing/Action/ConsumeAction/UseAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = UseActionProps & BaseProps

export default function UseAction({
	_type = "UseAction",
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
		/>
	)
}

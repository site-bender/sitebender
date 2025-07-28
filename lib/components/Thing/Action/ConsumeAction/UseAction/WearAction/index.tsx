import type BaseProps from "../../../../../../types/index.ts"
import type { WearActionProps } from "../../../../../../types/Thing/Action/ConsumeAction/UseAction/WearAction/index.ts"

import UseAction from "../index.tsx"

export type Props = WearActionProps & BaseProps

export default function WearAction({
	_type = "WearAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<UseAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}

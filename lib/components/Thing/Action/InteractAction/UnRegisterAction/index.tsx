import type BaseProps from "../../../../../types/index.ts"
import type { UnRegisterActionProps } from "../../../../../types/Thing/Action/InteractAction/UnRegisterAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = UnRegisterActionProps & BaseProps

export default function UnRegisterAction({
	_type = "UnRegisterAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InteractAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}

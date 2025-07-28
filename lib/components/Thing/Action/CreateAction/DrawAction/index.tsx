import type BaseProps from "../../../../../types/index.ts"
import type { DrawActionProps } from "../../../../../types/Thing/Action/CreateAction/DrawAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = DrawActionProps & BaseProps

export default function DrawAction({
	_type = "DrawAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}

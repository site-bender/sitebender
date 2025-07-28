import type BaseProps from "../../../../../types/index.ts"
import type { DeleteActionProps } from "../../../../../types/Thing/Action/UpdateAction/DeleteAction/index.ts"

import UpdateAction from "../index.tsx"

export type Props = DeleteActionProps & BaseProps

export default function DeleteAction({
	_type = "DeleteAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<UpdateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}

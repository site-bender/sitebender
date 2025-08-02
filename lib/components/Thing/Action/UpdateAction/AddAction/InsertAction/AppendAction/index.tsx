import type BaseProps from "../../../../../../../types/index.ts"
import type AppendActionProps from "../../../../../../../types/Thing/Action/UpdateAction/AddAction/InsertAction/AppendAction/index.ts"

import InsertAction from "../index.tsx"

export type Props = AppendActionProps & BaseProps

export default function AppendAction({
	_type = "AppendAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<InsertAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</InsertAction>
	)
}

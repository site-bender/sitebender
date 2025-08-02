import type BaseProps from "../../../../../../../types/index.ts"
import type PrependActionProps from "../../../../../../../types/Thing/Action/UpdateAction/AddAction/InsertAction/PrependAction/index.ts"

import InsertAction from "../index.tsx"

export type Props = PrependActionProps & BaseProps

export default function PrependAction({
	_type = "PrependAction",
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

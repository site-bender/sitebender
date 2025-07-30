import type BaseProps from "../../../../../types/index.ts"
import type ViewActionProps from "../../../../../types/Thing/Action/ConsumeAction/ViewAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = ViewActionProps & BaseProps

export default function ViewAction({
	_type = "ViewAction",
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
		>{children}</ConsumeAction>
	)
}

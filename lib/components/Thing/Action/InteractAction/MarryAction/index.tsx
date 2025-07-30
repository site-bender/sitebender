import type BaseProps from "../../../../../types/index.ts"
import type MarryActionProps from "../../../../../types/Thing/Action/InteractAction/MarryAction/index.ts"

import InteractAction from "../index.tsx"

export type Props = MarryActionProps & BaseProps

export default function MarryAction({
	_type = "MarryAction",
	children,
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
		>{children}</InteractAction>
	)
}
